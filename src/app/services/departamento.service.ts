import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/iservicefirebase.service';
import { Departamento } from '../models/departamento.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService extends ServiceFirebase<Departamento> {
  constructor(firestore: AngularFirestore) {
    super(Departamento, firestore, 'departamentos');
  }
}
