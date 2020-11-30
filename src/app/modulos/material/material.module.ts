import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
<<<<<<< HEAD
import { MatDialogModule } from "@angular/material/dialog";
=======
import {MatTableModule} from '@angular/material/table';
>>>>>>> e19faa2ba313d307d8a8ee83dea44e97366bc10e


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
<<<<<<< HEAD
    MatDialogModule
=======
    MatTableModule
>>>>>>> e19faa2ba313d307d8a8ee83dea44e97366bc10e
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
<<<<<<< HEAD
    MatDialogModule
=======
    MatTableModule
>>>>>>> e19faa2ba313d307d8a8ee83dea44e97366bc10e
  ]
})
export class MaterialModule { }
