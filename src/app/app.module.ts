import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LocationSelector } from './location-selector/location-selector.component';

import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FindByPincodeComponent } from './find-by-pincode/find-by-pincode.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    BrowserAnimationsModule, 
    HttpClientModule, 
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatOptionModule,
    MatSelectModule,
    AppRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule
  ],
  declarations: [
    AppComponent,
    LocationSelector,
    FindByPincodeComponent,
    PageNotFoundComponent
   ],
   providers: [
   ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
