
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from '../services/device.model';
import { DeviceService } from '../services/device.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-device-add-edit',
  templateUrl: './device-add-edit.component.html',
  styleUrls: ['./device-add-edit.component.css']
})
export class DeviceAddEditComponent implements OnInit{

  deviceForm!: FormGroup;
  actionBtn : string ="save"
  education: string[] = [
    'Camera Ezviz C6N',
    'Router Wifi Tenda',
    'Dir conditioning'
  ];

  area: string[] = [
    'Tây hồ',
    'Cầu Giấy',
    'Thanh Xuân'
  ];

  readonly defaultCoordinates: { [location: string]: { latitude: number; longitude: number } } = {
    'Tây hồ': { latitude: 21.064519, longitude:  105.809917 },
    'Cầu Giấy': { latitude:21.036044 , longitude:  105.790054 },
    'Thanh Xuân': { latitude: 21.006170, longitude:  105.805721},
  };

  constructor(
    private _fb: FormBuilder, 
    private firebaseService: FirebaseService,
    private _dialogRef: MatDialogRef<DeviceAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Device
    ){ }

  ngOnInit(): void {
    this.deviceForm = this._fb.group({
      deviceName : ['',Validators.required],
      weight : ['',Validators.required],
      size : ['',Validators.required],
      price : ['',Validators.required],
      location: ["", Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      date : ['',Validators.required],
      note : ['',Validators.required]
    });

    if(this.data){
      this.actionBtn = "update";
      this.deviceForm.patchValue(this.data);
    }
  }

  onLocationChange(location: string) {
    const defaultCoords = this.defaultCoordinates[location];
    if (defaultCoords) {
      this.deviceForm.patchValue({
        latitude: defaultCoords.latitude,
        longitude: defaultCoords.longitude
      });
    }
  }

  addProduct(){
    if(!this.data){
      if(this.deviceForm.valid){
        this.firebaseService.addData(this.deviceForm.value, 'device').then(res=>{
          alert("them thanh cong");
          this.deviceForm.reset();
          this._dialogRef.close('save');
        })
      }
    }else{
      this.updateProduct()
    }
  }

  updateProduct(){
    const dataSubmit = {
      id: this.data.id,
      ...this.deviceForm.value
    } 
    this.firebaseService.updateData(dataSubmit,'device').then(res=>{
        alert("updata thanh cong");
        this.deviceForm.reset();
        this._dialogRef.close('update');
    })
  }
}
