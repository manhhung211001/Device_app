import { Component,OnInit } from '@angular/core';
import { Chart  } from 'chart.js';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit{

data:any;
datadevice:any[]=[];
datalocation:any[]=[];
deviceCountsByLocation: any;

constructor(private deviceservice:DeviceService){}

ngOnInit() {
  this.deviceservice.getDeviceList().subscribe(res => {
    this.data = res;
    if (this.data != null) {
      this.countDevicesByLocation();
      this.showChartData();
    }
  });
}

countDevicesByLocation() {
  const deviceCountMap = new Map();

  this.data.forEach((item: { deviceName: any; location: any; }) => {
    const deviceName = item.deviceName;
    const location = item.location;

    const key = `${deviceName}-${location}`;
    deviceCountMap.set(key, (deviceCountMap.get(key) || 0) + 1);
  });

  // Convert the map to an array of objects
  this.deviceCountsByLocation = Array.from(deviceCountMap.entries()).map(([key, count]) => {
    const [deviceName, location] = key.split('-');
    return { deviceName, location, count };
  });
}

showChartData() {
  const uniqueLocations = Array.from(new Set(this.data.map((item: { location: any; }) => item.location)));
  const uniqueDeviceNames = Array.from(new Set(this.data.map((item: { deviceName: any; }) => item.deviceName)));

  const datasets = uniqueDeviceNames.map(deviceName => {
    const data = uniqueLocations.map(location => {
      const key = `${deviceName}-${location}`;
      const entry = this.deviceCountsByLocation.find((item: { deviceName: unknown; location: unknown; }) => item.deviceName === deviceName && item.location === location);
      return entry ? entry.count : 0;
    });
    return {
      data: data,
      label: deviceName,
    };
  });
  this.showchartdata(uniqueLocations, datasets);
}

showchartdata(datalocation: any[], datasets: any[]) {
  new Chart("myChart", {
    type: 'bar',
    data: {
      labels: datalocation,
      datasets: datasets,
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
}
