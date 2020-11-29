import { Component, OnInit } from '@angular/core';
import { EstadioService } from 'src/app/servicios/estadio.service';

export interface Grada {
  color: string;
  columnas: number;
  rows: number;
  text: string;
};

export interface Asiento{
  ocupado: number, //0=> 2 dias, 1=> 1 dia, 0=> ocupado.
  valor1: number,
  valor2: number,
  vip: boolean,
  ubicacion: string,
  indice: number
}


@Component({
  selector: 'app-estadio',
  templateUrl: './estadio.component.html',
  styleUrls: ['./estadio.component.css']
})
export class EstadioComponent implements OnInit 
{
  // Todos los asientos del estadio.
  public asientos: Asiento[] =[];

  // Grada NORTE.
  public gradaNorte: Grada = {text: 'Norte', columnas: 6, rows: 1, color: '#DDBDF1'};
  // Grada OCCIDENTAL.
  public gradaOccidental: Grada = {text: 'Occidental', columnas: 1, rows: 4, color: '#DDBDF1'};
  // Grada ORIENTAL.
  public gradaOriental: Grada = {text: 'Oriental', columnas: 1, rows: 4, color: '#DDBDF1'};
  // Grada SUR.
  public gradaSur: Grada = {text: 'Sur', columnas: 6, rows: 1, color: '#DDBDF1'};

  constructor(
    private estadioServicio: EstadioService
  ) 
  { }

  ngOnInit(): void 
  {
    this.obtenerAsientos();
  }

  obtenerAsientos()
  {
    this.estadioServicio.obtenerAsientos().subscribe((asientos) => {
      asientos.forEach((asiento) => {
        // console.log(<Asiento>asiento.data());
        this.asientos.push(<Asiento>asiento.data());
      })
    });
  }

  comprarBoleta(indice)
  {
    const estado = this.asientos[indice].ocupado;
    if(estado == 0) //Disponible para los 2 dias
    {
      console.log('2 dias');
      
    }
    else if(estado == 1) //Disponible solo para 1 dia
    {
      console.log('1 dia');
    }
    else if(estado == 2) //NO esta disponible
    {
      console.log('no');

    }

  }

}
