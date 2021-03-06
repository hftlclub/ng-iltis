import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FileUploadResponse } from '../shared/models/file-upload-response.interface';

@Injectable()
export class UploadService {

  constructor(private http: HttpClient) { }

  getFileFromInput(fileBrowser: HTMLInputElement): File {
    if (fileBrowser.files && fileBrowser.files[0]) {
      return fileBrowser.files[0];
    }
  }

  uploadFile(file: File, destUrl: string): Observable<any> {
    const formData = new FormData();
    formData.set('file', file);

    return this.http.put(destUrl, formData);
  }

}
