import { Injectable } from '@angular/core';

// angularFireStorage
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private storage: AngularFireStorage) {}

  async uploadFile(event: any, path: string) {
    const file = event.target.files[0];
    const filePath = `${path}/${new Date().getTime().toString()}`;
    const fileRef = this.storage.ref(filePath);

    await this.storage.upload(filePath, file);

    return new Promise((resolve, reject) => {
      fileRef.getDownloadURL().subscribe({
        next: (url) => resolve(url),
        error: (error) => reject(error),
      });
    });
  }
}
