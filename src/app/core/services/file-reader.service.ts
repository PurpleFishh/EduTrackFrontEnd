import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  constructor() { }

  readImage(byteArray: string): string {
    return 'data:image/png;base64,' + byteArray;
  }
}
