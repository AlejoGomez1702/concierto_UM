import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConciertoComponent } from './componentes/concierto/concierto.component';
import { EstadioComponent } from './componentes/estadio/estadio.component';

const routes: Routes = [
  {path: '', component: EstadioComponent},
  {path: 'concierto', component: ConciertoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
