
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from '../services/device.model';
import { DeviceService } from '../services/device.service';

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
    'Cty 1',
    'Cty 2',
    'Cty 3'
  ];

  constructor(
    private _fb: FormBuilder, 
    private _deviceSevice: DeviceService, 
    private _dialogRef: MatDialogRef<DeviceAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Device
    ){
    // this.deviceForm = this._fb.group({

    //   deviceName: '',
    //   weight: '',
    //   size: '',
    //   price: '',
    //   location: '',
    //   date: '',
    //   note: ''
  
    // });
  }



  ngOnInit(): void {
    this.deviceForm = this._fb.group({
      deviceName : ['',Validators.required],
      weight : ['',Validators.required],
      size : ['',Validators.required],
      price : ['',Validators.required],
      location : ['',Validators.required],
      date : ['',Validators.required],
      note : ['',Validators.required]
    });

    if(this.data){
      this.actionBtn = "update";
      this.deviceForm.controls['deviceName'].setValue(this.data.deviceName);
      this.deviceForm.controls['weight'].setValue(this.data.weight);
      this.deviceForm.controls['size'].setValue(this.data.size);
      this.deviceForm.controls['price'].setValue(this.data.price);
      this.deviceForm.controls['location'].setValue(this.data.location);
      this.deviceForm.controls['date'].setValue(this.data.date);
      this.deviceForm.controls['note'].setValue(this.data.note);
    }
  }

  addProduct(){
    if(!this.data){
      if(this.deviceForm.valid){
        this._deviceSevice.addDevice(this.deviceForm.value).subscribe({
          next:(res)=>{
            alert("them thanh cong");
            this.deviceForm.reset();
            this._dialogRef.close('save');
          },
          error:()=>{
            alert("Them that bai")
          }
          
        })
        
      }
    }else{
      this.updateProduct()
    }
  }
  updateProduct(){
    this._deviceSevice.putDevice(this.data.id, this.deviceForm.value).subscribe({
      next:(res)=>{
        alert("updata thanh cong");
        this.deviceForm.reset();
        this._dialogRef.close('update');
      },
      error:()=>{
        alert("updata that bai");
      }
    })
    
  }

}
