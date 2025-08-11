import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';
@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  getWebCost(languages: number, pages: number): number {
    return pages * languages * 30;
  }

  getTotalCost(products: IProduct[], selectedIds: number[], webCost = 0): number {
    const baseCost = products
      .filter(p => selectedIds.includes(p.id))
      .reduce((sum, p) => sum + p.price, 0);

    return baseCost + webCost;
  }
}
