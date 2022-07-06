import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetDataChartsComponent } from './asset-data-charts/asset-data-charts.component';

const routes: Routes = [
  {
    path : 'asset-data', component:AssetDataChartsComponent,
  },
  {
    path : '**' , component : AssetDataChartsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
