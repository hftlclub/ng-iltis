import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { FileUploadResponse } from '../shared/models/file-upload-response.interface';
import { UploadService } from './upload.service';
import { Product, ProductFactory } from '../shared/models/product';
import { SizeType, SizeTypeFactory } from '../shared/models/sizetype';
import { Size, SizeFactory } from '../shared/models/size';

@Injectable()
export class ProductService {

  productUpdated = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    private us: UploadService,
    @Inject('API_URL') private api
  ) { }

  getAll(): Observable<Product[]> {
    return this.http.get<any[]>(`${this.api}/products`)
      .retry(3)
      .map(raw => raw.map(p => ProductFactory.fromObj(p)));
  }

  getSingle(id: number): Observable<Product> {
    return this.http.get(`${this.api}/product/${id}`)
      .retry(3)
      .map(raw => ProductFactory.fromObj(raw));
  }

  create(product: Product): Observable<any> {
    return this.http.post(`${this.api}/product`, product);
  }

  getAllSizeTypes(): Observable<SizeType[]> {
    // TODO: this is just a stub
    return Observable.of([
      new SizeType(1, 0.5, 'Flasche', false),
      new SizeType(2, 0.2, 'Flasche', false),
      new SizeType(3, 0.33, 'Becher', false)
    ]).delay(2000);
  }

  updateSizeForProduct(productId: number, size: Size): Observable<any> {
    // TODO: this is just a stub
    console.log('updateSizeForProduct() called');
    console.log('size:', size);
    console.log('productId:', productId);
    return Observable.of('foobar').delay(2000);
  }

  deleteSizeForProduct(productId: number, sizeTypeId: number): Observable<any> {
    // TODO: this is just a stub
    console.log('deleteSizeForProduct() called');
    console.log('sizeTypeId:', sizeTypeId);
    console.log('productId:', productId);
    return Observable.of('foobar').delay(2000);
  }

  createSizeForProduct(productId: number, size: Size): Observable<any> {
    // TODO: this is just a stub
    console.log('createSizeForProduct() called');
    console.log('size:', size);
    console.log('productId:', productId);
    return Observable.of('foobar').delay(2000);
  }

  uploadProductImage(file: File, productId: number): Observable<FileUploadResponse> {
    return this.us.uploadFile(file, `${this.api}/product/${productId}/image`);
  }

}
