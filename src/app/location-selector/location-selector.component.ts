import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PincodeDetails } from '../PincodeDetails';
import { PincodeResponse } from '../PincodeResponse';

export interface Token {
  auth_token: string;
}

@Component({
  selector: 'location-component',
  templateUrl: './location-selector.component.html'
})
export class LocationSelector {
  countries = [{"name" : "India"}];
  states: any[] | undefined;
  cities: any[] | undefined;
  displayedColumns: string[] = ['Country', 'State', 'District', 'Name', 'PinCode'];
  dataSource = new MatTableDataSource<PincodeDetails>();
  selectedCountry: any;
  selectedState: any;
  token : string | undefined;

  errorMessage!: string;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    var headersValue = {
      "Accept": "application/json",
      "api-token": "IHt-NNbZNV0P45iKMJHygYtWq9ldBLuTRb3SzMebpHpKRDJZ5Q0zO8MinQPsaTnFXl4",
      "user-email": "mohitrisingstar1@gmail.com"
    };
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headersValue), 
    };
    this.http.get<Token>("https://www.universal-tutorial.com/api/getaccesstoken", requestOptions)
      .subscribe((data) => {
        this.token = data.auth_token;
      });
  }

  onCountrySelected(event: any) {
    const countryId = event.value;
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({"Authorization": "Bearer " + this.token}), 
    };
      this.http.get<any[]>(`https://www.universal-tutorial.com/api/states/${countryId}`, requestOptions)
      .subscribe((data) => {
        this.states = data;
      });
  }

  onStateSelected(event: any) {
    const stateId = event.value;
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({"Authorization": "Bearer " + this.token}), 
    };
      this.http.get<any[]>(`https://www.universal-tutorial.com/api/cities/${stateId}`, requestOptions)
      .subscribe((data) => {
        this.cities = data;
      });
  }

  onCitySelected(event: any) {
    const cityId = event.value;
    if (cityId) {
      this.http.get<Array<PincodeResponse>>(`https://api.postalpincode.in/postoffice/${cityId}`)
      .subscribe(response => {
        if (response[0].Status === 'Success') {
          this.dataSource.data = response[0].PostOffice.filter(
            postOffice => postOffice.District === cityId);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.errorMessage = '';
        } else {
          this.dataSource.data = [];
          this.errorMessage = response[0].Message;
        }
      }, error => {
        this.dataSource.data = [];
        this.errorMessage = 'An error occurred while fetching the data';
      });
    } else {
      this.errorMessage = 'Please enter valid city';
    }
  }
}
