import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageListComponent } from './components/package-list/package-list.component';
import { PackageFormComponent } from './components/package-form/package-form.component';
import { PackageDetailsComponent } from './components/package-details/package-details.component';

const routes: Routes = [
  { path: '', component: PackageListComponent },
  { path: 'new', component: PackageFormComponent },
  { path: ':id', component: PackageDetailsComponent },
  { path: ':id/edit', component: PackageFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackagesRoutingModule {}
