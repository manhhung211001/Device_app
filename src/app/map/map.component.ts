import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { DeviceService } from '../services/device.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;

  id: any;
  device: any;
  searched: boolean = false;
  ad:any;
  

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    // Khởi tạo vị trí ban đầu của bản đồ 
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
    if (this.marker) {
      this.marker.remove();
    }
    this.marker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(this.map);
  }
}