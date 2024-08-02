import { Injectable } from '@angular/core';
import { RestBaseService } from './rest-base.service';

@Injectable({
  providedIn: 'root',
})
export class FileReaderService {
  readonly endpoint: string = 'File';

  constructor(private readonly baseService: RestBaseService) {}

  getFile(fileName: string) {
    return this.baseService.get(
      `${this.endpoint}/GetFile?fileName=${fileName}`
    );
  }

  readImage(byteArray: string): string {
    return 'data:image/png;base64,' + byteArray;
  }
}
