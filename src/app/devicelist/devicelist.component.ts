import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DeviceAddEditComponent } from '../device-add-edit/device-add-edit.component';
import { DeviceService } from '../services/device.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Device } from '../services/device.model';
@Component({
  selector: 'app-devicelist',
  templateUrl: './devicelist.component.html',
  styleUrls: ['./devicelist.component.css']
})
export class DevicelistComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'deviceName', 
    'weight', 
    'size',
    'price',
    'location',
    'date',
    'note',
    'action'
  ];
  dataSource!: MatTableDataSource<Device>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _deviceService: DeviceService){}

  ngOnInit(): void {
    this.getDeviceList();
  }
 
  openAddEditDevice(){
    const dialogRef = this._dialog.open(DeviceAddEditComponent,{ width:'30%'});
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val=== 'save'){
          this.getDeviceList();
        }
      },
    });
  }

  // openAddEditDevice(row : Device){
  //   this._dialog.open(DeviceAddEditComponent,{
  //     width:'30%',
  //   }).afterClosed().subscribe(val=>{
  //     if(val === 'save'){
  //       this.getDeviceList();
  //     }
  //   })
  // }

  getDeviceList(){
    this._deviceService.getDeviceList().subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }
  editProduct(row:Device){
    this._dialog.open(DeviceAddEditComponent,{
        width:'30%',
        data:row
    }).afterClosed().subscribe({
      next: (val) =>{
      if(val === 'update'){
        this.getDeviceList();
      }
    },
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteDevice(id: any){
    this._deviceService.deleteDevice(id).subscribe({
      next: (res)=>{
        alert('device deleted!');
        this.getDeviceList();
      },
      error: console.log,
    });
  }


}

