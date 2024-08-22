import { instanceToPlain } from 'class-transformer';

export abstract class Model {
  id!: string;

  toObject(): Object {
    let obj: any = instanceToPlain(this);
    delete obj.id;
    return obj;
  }
}
