import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() { }

  getProducts(): IProduct[] {
    return [
      {
        id: 1,
        name: 'Seo',
        description: 'Programación de una web responsive completa',
        price: 300
      },
      {
        id: 2,
        name: 'Ads',
        description: 'Programación de una web responsive completa',
        price: 400
      },
      {
        id: 3,
        name: 'Web',
        description: 'Programación de una web responsive completa',
        price: 500
      }
    ];
  }

}
