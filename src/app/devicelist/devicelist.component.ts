import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeviceAddEditComponent } from '../device-add-edit/device-add-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Device } from '../services/device.model';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-devicelist',
  templateUrl: './devicelist.component.html',
  styleUrls: ['./devicelist.component.css']
})
export class DevicelistComponent implements OnInit {

  displayedColumns: any[] = [
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

  constructor(private _dialog: MatDialog,
    private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.getDeviceList();
  }

  openAddEditDevice() {
    const dialogRef = this._dialog.open(DeviceAddEditComponent, { width: '30%' });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val === 'save') {
        }
      },
    });
  }

  getDeviceList() {
    this.firebaseService.getDatas('device').subscribe((res: any) => {     
      res.forEach((item: any) => {
        item.date = item.date.toDate()
      })
      console.log('data: ', res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  editProduct(row: Device) {
    this._dialog.open(DeviceAddEditComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe({
      next: (val) => {
        if (val === 'update') {
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

  deleteDevice(id: any) {
    this.firebaseService.deleteData(id, 'device').then(res => {
      alert('device deleted!');
    })
  }
}

