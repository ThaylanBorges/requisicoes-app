import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/iservicefirebase.service';
import { Funcionario } from '../models/funcionario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService extends ServiceFirebase<Funcionario> {
  constructor(firestore: AngularFirestore) {
    super(Funcionario, firestore, 'funcionarios');
  }

  getFuncionarioLogado(email: string) {
    return this.firestore
      .collection<Funcionario>('funcionarios', (ref) =>
        ref.where('email', '==', email)
      )
      .valueChanges();
  }
}
