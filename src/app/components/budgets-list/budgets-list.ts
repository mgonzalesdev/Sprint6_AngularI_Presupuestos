import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../../services/budget';
import { IBudget } from '../../models/ibudget';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-budgets-list',
  imports: [CommonModule, MatTableModule],
  templateUrl: './budgets-list.html',
  styleUrl: './budgets-list.css'
})
export class BudgetsList {
  // protected listBudgets: IBudget[] = [];

  // constructor(private budgetService: BudgetService) {
  //   this.listBudgets = this.budgetService.getBudgets();
  //   console.log('Presupuetos guardados:', this.listBudgets);
  // }
  budgetService = inject(BudgetService);
  displayedColumns: string[] = ['clientName', 'phone', 'email', 'products', 'totalCost'];
  //dataSource: any[] = [];
  dataSource = computed(() => this.budgetService.getBudgets()());

 // constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.dataSource = this.budgetService.getBudgets();
  }

  formatProducts(products: any[]): string {
    return products.map(p => p.name).join(', ');
  }
}
