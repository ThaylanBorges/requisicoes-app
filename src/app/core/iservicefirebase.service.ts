import { Model } from './model';
import { map, Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';

// firebase
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

// interface
import { Icrud } from './icrd.interface';

export abstract class ServiceFirebase<T extends Model> implements Icrud<T> {
  ref: AngularFirestoreCollection<T>;

  constructor(
    protected type: { new (): T },
    protected firestore: AngularFirestore,
    public path: string
  ) {
    this.ref = this.firestore.collection<T>(this.path);
  }

  get(id: string): Observable<T> {
    const doc = this.ref.doc<T>(id);

    return doc.get().pipe(map((snapshot) => this.docToClass(snapshot)));
  }

  docToClass(snapshotDoc: any): T {
    const data = snapshotDoc.data() as T;

    // remove a propriedade 'id' do objeto se ela existir nos dados
    if ('id' in data) {
      delete (data as any).id;
    }

    const obj = {
      ...data, // espalhando o resto das propriedades
      id: snapshotDoc.id, // definindo a propriedade 'id' no final
    };

    const typed = plainToClass(this.type, obj);
    return typed;
  }

  list(): Observable<T[]> {
    return this.ref.valueChanges();
  }

  async createOrUpdate(item: T): Promise<T> {
    const id = item.id;

    let obj: T;

    if (item instanceof this.type) {
      obj = item.toObject() as T;
    } else {
      obj = item;
    }

    if (id) {
      await this.ref.doc(id).set(obj);
      return obj;
    } else {
      const res = await this.ref.add(obj);
      obj.id = res.id;
      await this.ref.doc(res.id).set(obj);
      return obj;
    }
  }

  delete(id: string): Promise<void> {
    return this.ref.doc(id).delete();
  }
}
