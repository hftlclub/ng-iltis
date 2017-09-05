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

  getAll(showInactiveProducts = false, showInactiveSizes = false): Observable<Product[]> {
    return this.http.get<any[]>(`${this.api}/products?showInactiveProducts=${showInactiveProducts}&showInactiveSizes=${showInactiveSizes}`)
      .retry(3)
      .map(raw => raw.map(p => ProductFactory.fromObj(p)));
  }

  getSingle(id: number, showInactiveSizes = false): Observable<Product> {
    return this.http.get(`${this.api}/product/${id}?showInactiveSizes=${showInactiveSizes}`)
      .retry(3)
      .map(raw => ProductFactory.fromObj(raw));
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.api}/product`, product);
  }

  update(productId: number, product: Product): Observable<any> {
    return this.http.put(`${this.api}/product/${productId}`, product);
  }

  delete(productId: number): Observable<any> {
    return this.http.delete(`${this.api}/product/${productId}`);
  }

  getAllSizeTypes(): Observable<SizeType[]> {
    // TODO: this is just a stub
    return Observable.of([
      new SizeType(1, 0.5, 'Flasche', false),
      new SizeType(2, 0.2, 'Flasche', false),
      new SizeType(3, 0.33, 'Becher', false)
    ]).delay(2000);
  }

  createSizeForProduct(productId: number, size: Size): Observable<any> {
    return this.http.post(`${this.api}/product/${productId}/size`, size);
  }

  updateSizeForProduct(productId: number, sizeTypeId: number, size: Size): Observable<any> {
    return this.http.put(`${this.api}/product/${productId}/size/${sizeTypeId}`, size);
  }

  deleteSizeForProduct(productId: number, sizeTypeId: number): Observable<any> {
    return this.http.delete(`${this.api}/product/${productId}/size/${sizeTypeId}`);
  }

  uploadProductImage(file: File, productId: number): Observable<FileUploadResponse> {
    return this.us.uploadFile(file, `${this.api}/product/${productId}/image`);
  }

}
