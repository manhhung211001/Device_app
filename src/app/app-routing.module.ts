import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { DeviceAddEditComponent } from './device-add-edit/device-add-edit.component';
import { DevicelistComponent } from './devicelist/devicelist.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'devicelist', component: DevicelistComponent},
  {path: 'map', component: MapComponent},
  {path:'device-add-edit', component:DeviceAddEditComponent},
  {path: 'charts', component:ChartsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
