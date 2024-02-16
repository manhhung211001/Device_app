import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
//declare const mapboxgl:any;
import * as mapboxgl from 'mapbox-gl';
import { DeviceService } from '../services/device.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
// export class MapComponent implements OnInit,AfterViewInit{
//   id: any;
//   device: any;
//   searched = false;

//   @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

//   map!: mapboxgl.Map;
//   marker!: mapboxgl.Marker;
//   route: any;

//   constructor(private deviceService: DeviceService) {}
//   ngAfterViewInit(): void {
//     this.map = new mapboxgl.Map({
//       accessToken:
//       'pk.eyJ1IjoiYmV0YXBjaG9pMTBrIiwiYSI6ImNrY2ZuaWEwNjA2ZW0yeWw4bG9yNnUyYm0ifQ.bFCQ-5yq6cSsrhugfxO2_Q',
//       container: 'map', 
//       style: 'mapbox://styles/mapbox/streets-v12', 
//       center: [105.829346, 21.038014], 
//       zoom: 15, 
//     });
//     this.map.addControl(new mapboxgl.GeolocateControl());
//     this.marker = new mapboxgl.Marker()
//   }

//   ngOnInit()  {
    
//     // this.map = new mapboxgl.Map({
//     //   accessToken:
//     //   'pk.eyJ1IjoiYmV0YXBjaG9pMTBrIiwiYSI6ImNrY2ZuaWEwNjA2ZW0yeWw4bG9yNnUyYm0ifQ.bFCQ-5yq6cSsrhugfxO2_Q',
//     //   container: this.mapContainer.nativeElement, 
//     //   style: 'mapbox://styles/mapbox/streets-v12', 
//     //   center: [105.829346, 21.038014], 
//     //   zoom: 15, 
//     // });
//     // this.marker = new mapboxgl.Marker();

//     this.id = this.route.snapshot.paramMap.get('id');
//     this.deviceService.getDeviceId(this.id).subscribe(
//       (result) => {
//         this.device = result;
//         this.ngAfterViewInit();
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }

//   searchDevice(): void {
//     if (!this.id) {
//       console.log('Please enter an ID');
//       return;
//     }

//     this.deviceService.getDeviceId(this.id).subscribe(
//       (result) => {
//         this.device = result;
//         this.searched = true;

//         if (this.device && this.device.location && this.device.location.latitude && this.device.location.longitude) {
//           // Nếu thiết bị có vị trí, cập nhật vị trí trên bản đồ
//           this.updateMap(this.device.location.latitude, this.device.location.longitude);
//         } else {
//           // Nếu không có vị trí cho thiết bị, hiển thị thông báo
//           console.log('No location found for the device.');
//         }
//       },
//       (error) => {
//         console.error('Error searching for device:', error);
//       }
//     );
//   }

//   updateMap(latitude: number, longitude: number): void {
//     const map = new mapboxgl.Map({
//       accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN',
//       container: 'map',
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [longitude, latitude],
//       zoom: 14
//     });

//     // Add navigation control to the map
//     map.addControl(new mapboxgl.NavigationControl());

//     // Thêm marker cho vị trí của thiết bị trên bản đồ
//     new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
//   }
// }
export class MapComponent implements OnInit {

  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;
  id: any;
  device: any;
  searched: boolean = false;

  

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    // Khởi tạo vị trí ban đầu của bản đồ (ví dụ: trung tâm Hà Nội)
    // Bạn có thể điều chỉnh tùy theo nhu cầu của bạn
    const defaultLatitude = 21.0285;
    const defaultLongitude = 105.8542;
    this.initializeMap(defaultLatitude, defaultLongitude);
  }

  initializeMap(latitude: number, longitude: number): void {
    // Khởi tạo bản đồ tại vị trí trung tâm được chỉ định
    const map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiYmV0YXBjaG9pMTBrIiwiYSI6ImNrY2ZuaWEwNjA2ZW0yeWw4bG9yNnUyYm0ifQ.bFCQ-5yq6cSsrhugfxO2_Q',
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12', 
      center: [longitude, latitude],
      zoom: 14
    });

    // Add navigation control to the map
    map.addControl(new mapboxgl.NavigationControl());

  }

  searchDevice(): void {
    if (!this.id) {
      console.log('Please enter an ID');
      return;
    }

    this.deviceService.getDeviceId(this.id).subscribe(
      (data) => {
        this.device = data;
        this.searched = true;

        if (this.device && this.device.latitude && this.device.longitude) {
          this.updateMap(this.device.latitude, this.device.longitude);
        } else {
          console.log('No location found for the device.');
        }
      },
      (error) => {
        console.error('Error searching for device:', error);
      }
    );
  }

  updateMap(latitude: number, longitude: number): void {
    const map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiYmV0YXBjaG9pMTBrIiwiYSI6ImNrY2ZuaWEwNjA2ZW0yeWw4bG9yNnUyYm0ifQ.bFCQ-5yq6cSsrhugfxO2_Q',
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude],
      zoom: 14
    });

    // Add navigation control to the map
    map.addControl(new mapboxgl.NavigationControl());

    // Thêm marker cho vị trí của thiết bị trên bản đồ
    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
  }
}