import { Injectable,signal } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { IBudget } from '../models/ibudget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  //private budgets: IBudget[] = [];
    private budgets = signal<IBudget[]>([]);

  getWebCost(languages: number, pages: number): number {
    return pages * languages * 30;
  }

  getTotalCost(products: IProduct[], selectedIds: number[], webCost = 0): number {
    const baseCost = products
      .filter(p => selectedIds.includes(p.id))
      .reduce((sum, p) => sum + p.price, 0);

    return baseCost + webCost;
  }
  saveBudget(budget: IBudget) {
   // this.budgets.push(budget);
   this.budgets.update(b => [...b, budget]);
  }

  getBudgets(){
    return this.budgets;
  }
}
