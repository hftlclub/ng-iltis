import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { retry, map } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { FileUploadResponse } from '../shared/models/file-upload-response.interface';
import { UploadService } from './upload.service';
import { Product, ProductFactory } from '../shared/models/product';
import { SizeType, SizeTypeFactory } from '../shared/models/sizetype';
import { CrateType } from '../shared/models/cratetype';
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
      .pipe(
        retry(3),
        map(raw => raw.map(p => ProductFactory.fromObj(p)))
      );
  }

  getSingle(id: number, showInactiveSizes = false): Observable<Product> {
    return this.http.get(`${this.api}/product/${id}?showInactiveSizes=${showInactiveSizes}`)
      .pipe(
        retry(3),
        map(raw => ProductFactory.fromObj(raw))
      );
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.api}/product`, product);
  }

  update(productId: number, product: Product): Observable<any> {
    return this.http.put(`${this.api}/product/${productId}`, product, { responseType: 'text' });
  }

  checkDeletable(productId: number): Observable<any> {
    return this.http.get(`${this.api}/product/${productId}/deletable`, { responseType: 'text' });
  }

  delete(productId: number): Observable<any> {
    return this.http.delete(`${this.api}/product/${productId}`, { responseType: 'text' });
  }

  checkUnused(productId: number): Observable<any> {
    return this.http.get(`${this.api}/product/${productId}/unused`, { responseType: 'text' });
  }

  setActive(productId: number, activation: boolean = true): Observable<any> {
    return this.http.put(`${this.api}/product/${productId}`, { active: activation }, { responseType: 'text' });
  }


  /* product sizes */
  createSizeForProduct(productId: number, size: Size): Observable<any> {
    return this.http.post(`${this.api}/product/${productId}/size`, size, { responseType: 'text' });
  }

  updateSizeForProduct(productId: number, sizeTypeId: number, size: Size): Observable<any> {
    return this.http.put(`${this.api}/product/${productId}/size/${sizeTypeId}`, size, { responseType: 'text' });
  }

  checkProductSizeDeletable(productId: number, sizeTypeId: number): Observable<any> {
    return this.http.get(`${this.api}/product/${productId}/size/${sizeTypeId}/deletable`, { responseType: 'text' });
  }

  deleteSizeForProduct(productId: number, sizeTypeId: number): Observable<any> {
    return this.http.delete(`${this.api}/product/${productId}/size/${sizeTypeId}`, { responseType: 'text' });
  }


  /* crate types for product */
  getPossibleCrateTypesForProduct(productId: number): Observable<CrateType[]> {
    return this.http.get<CrateType[]>(`${this.api}/product/${productId}/possible/cratetypes`);
  }

  createCrateTypeForProduct(productId: number, crateType: CrateType): Observable<any> {
    return this.http.post(`${this.api}/product/${productId}/cratetype`, crateType, { responseType: 'text' });
  }

  deleteCrateTypeForProduct(productId: number, crateTypeId: number): Observable<any> {
    return this.http.delete(`${this.api}/product/${productId}/cratetype/${crateTypeId}`, { responseType: 'text' });
  }


  /* product image */
  uploadProductImage(file: File, productId: number): Observable<FileUploadResponse> {
    return this.us.uploadFile(file, `${this.api}/product/${productId}/image`);
  }

}
