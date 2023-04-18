import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LocationSelector } from './location-selector/location-selector.component';

const routes: Routes = [
  {path: 'find-by-pincode', component: AppComponent},
  {path: 'find-by-city', component: LocationSelector},
  {path: '', redirectTo: '/find-by-pincode', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
