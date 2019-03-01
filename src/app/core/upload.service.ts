import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
  constructor(private http: HttpClient) {}

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
