import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from './device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private _http: HttpClient) {}

  addDevice(data: Device){
    return this._http.post<Device>("http://localhost:3000/device",data);
  }

  getDeviceList(){
    return this._http.get<Device[]>("http://localhost:3000/device");
  }

  deleteDevice(id: any){
    return this._http.delete("http://localhost:3000/device/"+id);
  }

  putDevice(id: any,data: Device){
    return this._http.put<Device>("http://localhost:3000/device/"+ id , data);
  }
}
