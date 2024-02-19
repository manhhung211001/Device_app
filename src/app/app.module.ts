import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {MapComponent} from './map/map.component';
import {DevicelistComponent} from './devicelist/devicelist.component';
import {DeviceAddEditComponent} from './device-add-edit/device-add-edit.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NgChartsModule} from 'ng2-charts';
import {ChartsComponent} from './charts/charts.component';
import {DeviceService} from './services/device.service';
import {FormsModule} from '@angular/forms';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FirebaseService } from './services/firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    DevicelistComponent,
    DeviceAddEditComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatTreeModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSortModule,
    MatSnackBarModule,
    NgChartsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyDPdv4UdEFeBppguBfo8E3zf1Mni_XfLOI",
      authDomain: "device-vht.firebaseapp.com",
      projectId: "device-vht",
      storageBucket: "device-vht.appspot.com",
      messagingSenderId: "742606330830",
      appId: "1:742606330830:web:8c7563f782b0bd4d4b699f",
      measurementId: "G-SW462LXYKW"
    })),
    provideFirestore(() => getFirestore()),
  ],
  providers: [DeviceService,FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
