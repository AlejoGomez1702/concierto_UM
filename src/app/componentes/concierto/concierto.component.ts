import { Component, OnInit } from '@angular/core';
import { ConciertoService } from 'src/app/servicios/concierto.service';

export interface Concierto{
  id: string,
  nombre: string,
  descripcion: string,
  dia: number,
  descuento?: number
};

@Component({
  selector: 'app-concierto',
  templateUrl: './concierto.component.html',
  styleUrls: ['./concierto.component.css']
})
export class ConciertoComponent implements OnInit 
{
  public nombre = '';

  public conciertos: Concierto[] = [];

  constructor(
    private conciertoServicio: ConciertoService
  ) 
  { 
    this.obtenerConciertos();
  }

  ngOnInit(): void 
  {
    this.obtenerConciertos();
  }

  async obtenerConciertos()
  {
    await this.conciertoServicio.obtenerConciertos().subscribe((conciertos) => {
      conciertos.forEach((concierto) => {
        // console.log(<Asiento>asiento.data());
        this.conciertos.push(<Concierto>concierto.data());
      })
    });
  }

  guardarDatos(index)
  {
    console.log(this.conciertos);
    console.log(this.nombre);
    // const concierto = this.conciertos[index];
    // const id: string = (index + 1) + '';
    // this.conciertoServicio.editarConcierto(id, concierto).then(
    //   () => {console.log('Se Edito bien');}
    // ).catch(() => console.log('Error editando'));
  }

}
