import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraSuperiorComponent } from './componentes/barra-superior/barra-superior.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { EstadioService } from './servicios/estadio.service';
import { ConciertoService } from './servicios/concierto.service';

// Modulo de ANGULAR MATERIAL.
import { MaterialModule } from './modulos/material/material.module';
// import { FormsModule } from '@angular/forms';


import { EstadioComponent } from './componentes/estadio/estadio.component';
import { ConciertoComponent } from './componentes/concierto/concierto.component';
 
@NgModule({
  declarations: [
    AppComponent,
    BarraSuperiorComponent,
    EstadioComponent,
    ConciertoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,    
    // ReactiveFormsModule,
    // FormsModule,

  ],
  providers: [EstadioService, ConciertoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
