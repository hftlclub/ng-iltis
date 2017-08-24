import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var FormData: any;
declare var File: any;

@Injectable()
export class UploadService {

  constructor(private http: HttpClient) { }

  getFileFromInput(fileBrowser: HTMLInputElement): File {
    if (fileBrowser.files && fileBrowser.files[0]) {
      return fileBrowser.files[0];
    }
  }

  uploadFile(file: any) { // HTMLInputElement
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);

    return this.http.post('https://cdn.hftl.club/files/upload?secret=', formData)
  }

}
