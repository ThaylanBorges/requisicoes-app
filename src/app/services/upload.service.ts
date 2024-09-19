import { Injectable } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private storage: AngularFireStorage) {}

  async uploadFile(file: any) {
    const filePath = `funcionarios/${new Date().getTime().toString()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    await task;
    fileRef.getDownloadURL().subscribe((url) => {
      url;
    });

    return task;
  }
}
