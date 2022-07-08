import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetComponent } from './assets/asset.component';

const routes: Routes = [
  {
    path : 'asset-data', component:AssetComponent,
  },
  {
    path : '**' , redirectTo : 'asset-data'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
