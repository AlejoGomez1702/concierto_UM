import { VentaService } from './../../servicios/venta.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EstadioService } from 'src/app/servicios/estadio.service';
import { DialogoComponent } from '../dialogo/dialogo.component';

import Swal from 'sweetalert2'
import { DialogoListaUsuariosComponent } from '../dialogo-lista-usuarios/dialogo-lista-usuarios.component';

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
  indice: number,
  id: number
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
    private estadioServicio: EstadioService,
    private dialogo: MatDialog,
    private servicioVenta: VentaService
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
        const data = asiento.data();
        
        const asientoNuevo = {
          indice: data['indice'],
          ocupado: data['ocupado'],
          ubicacion: data['ubicacion'],
          valor1: data['valor1'],
          valor2: data['valor2'],
          vip: data['vip'],
          id: asiento.id
        }
        this.asientos.push(<any>asientoNuevo);
      })
    });
  }

  escojerCompra(asiento){
    if (asiento.ocupado === 2) {
      Swal.fire('Asiento no disponible','Esta asiento ya está ocupado para las dos funciones del concierto','warning')
      return; 
    }
    Swal.fire({
      title: 'Información de compra',
      text: 'Deseas asociar tus datos con la compra? ',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, asociar mis datos',
      cancelButtonText: 'No, continuar como anomimo'
    }).then((result) => {
      if (result.value) {
        const dialogRefU = this.dialogo.open(DialogoListaUsuariosComponent,{
          
        })
        dialogRefU.afterClosed().subscribe(
          user => {
            if (user) {
              this.consultarOcupacion(asiento,user)
            }else{
              return;
            }
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.consultarOcupacion(asiento)
      }
    })
  }

  comprarBoleta(asiento, dia?)
  {
    const { ocupado }  = asiento;
    
    switch (ocupado) {
      case 0:
        this.servicioVenta.agregarVenta({asiento: asiento.id,dia})
        .then(respuesta => {
          this.estadioServicio.actualizarAsiento(asiento.id,1).then(
            res => {
              Swal.fire('Compra realizada', 'Su asiento ha quedado asignado correctamente', 'success')
              this.asientos = []
              this.obtenerAsientos()
            }
          )
        }).catch(error => {
          console.log(error);
        })
        break;
      case 1:
        this.servicioVenta.agregarVenta({asiento: asiento.id,dia:2})
        .then(respuesta => {
          this.estadioServicio.actualizarAsiento(asiento.id,2).then(
            res => {
              Swal.fire('Compra realizada', 'Su asiento ha quedado asignado correctamente para el segundo día del concierto', 'success')
              this.asientos = []
              this.obtenerAsientos()
            }
          )
        }).catch(error => {
          console.log(error);
        })
        break;
      default:
        console.log('No se puede vender boletas para este asiento');
        break;
    }

  }

  consultarOcupacion(asiento, user?){
    const { ocupado } = asiento;
    if (ocupado === 0) {
      const dialogRef = this.dialogo.open(DialogoComponent,{
        width: '300px',
        data: {asiento}
      })
      dialogRef.afterClosed().subscribe(
        data => {
          const { dia, datos } = data;
          this.comprarBoleta(datos.asiento, dia)
        }
      )
    }else{
      this.comprarBoleta(asiento);
    }
  }

}
