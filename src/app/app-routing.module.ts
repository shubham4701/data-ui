import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindByPincodeComponent } from './find-by-pincode/find-by-pincode.component';
import { LocationSelector } from './location-selector/location-selector.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'find-by-pincode', component: FindByPincodeComponent },
  { path: 'find-by-city', component: LocationSelector },
  { path: '', redirectTo: '/find-by-pincode', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
