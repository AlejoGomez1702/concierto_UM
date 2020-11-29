import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EstadioService 
{
  // Asientos del concierto.
  public asientos = [];

  constructor(
    private firestore: AngularFirestore
  ) 
  { }

  async iniciarNuevoConcierto()
  {

    // 20 asientos NORTE y SUR
    for (let i = 0; i < 20; i++) 
    {
      await this.firestore.collection('asientos').add({
          ocupado: 1,
          valor1: 1000,
          valor2: 2000,
          vip: false,
          ubicacion: 'norte',
          indice: i 
        }
      );

      await this.firestore.collection('asientos').add({
          ocupado: 2,
          valor1: 1000,
          valor2: 2000,
          vip: false,
          ubicacion: 'sur',
          indice: i   
        }
      );   
    }
    
    // 10 asientos ORIENTE Y OCCIDENTE
    for (let i = 0; i < 10; i++) 
    {
      await this.firestore.collection('asientos').add({
          ocupado: 0,
          valor1: 1000,
          valor2: 2000,
          vip: false,
          ubicacion: 'oriente',
          indice: i   
        }
      );

      await this.firestore.collection('asientos').add({
          ocupado: 0,
          valor1: 1000,
          valor2: 2000,
          vip: false,
          ubicacion: 'occidente',
          indice: i   
        }
      );
    }
  }

  obtenerAsientos()
  {
    return this.firestore.collection('asientos').get();
  }

  handleResponse(res)
  {
    console.log(res);
  }





}
