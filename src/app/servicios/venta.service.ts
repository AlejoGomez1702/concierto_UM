import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private firestore: AngularFirestore) { }

  agregarVenta(datos){
    const { asiento, dia } = datos;
    return this.firestore.collection('ventas').add({
      asiento,
      dia,
      creada_en: Date.now()
    });
  }

}
