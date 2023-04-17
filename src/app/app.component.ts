import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PincodeResponse } from './PincodeResponse';
import { PincodeDetails } from './PincodeDetails';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pincode Details';
  pincode!: string;
  displayedColumns: string[] = ['Country', 'State', 'District', 'Name'];
  dataSource = new MatTableDataSource<PincodeDetails>();
  errorMessage!: string;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private http: HttpClient, private _intl: MatPaginatorIntl) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this._intl.itemsPerPageLabel = 'Items per page:';
  }

  getDetailsByPincode() {
    if (this.pincode) {
      this.http.get<Array<PincodeResponse>>(`https://api.postalpincode.in/pincode/${this.pincode}`)
      .subscribe(response => {
        if (response[0].Status === 'Success') {
          this.dataSource.data = response[0].PostOffice;
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
      this.errorMessage = 'Please enter pincode';
    }
    
  }
}
