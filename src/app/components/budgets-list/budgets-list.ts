import { Component, ViewChild, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../../services/budget';
import { IBudget } from '../../models/ibudget';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule],
  templateUrl: './budgets-list.html',
  styleUrl: './budgets-list.css'
})
export class BudgetsList {
  private budgetService = inject(BudgetService);

  displayedColumns: string[] = ['clientName', 'phone', 'email', 'products', 'totalCost', 'date'];
  dataSource = new MatTableDataSource<IBudget>([]);

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor() {
    effect(() => {
      const budgets = this.budgetService.getBudgets(); 
      this.dataSource.data = budgets;                   
    });
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: IBudget, property: string) => {
      switch (property) {
        case 'clientName': return item.clientName?.toLowerCase() ?? '';
        case 'date': return new Date(item.date).getTime();
        default: return (item as any)[property];
      }
    };

    this.dataSource.filterPredicate = (data: IBudget, filter: string) =>
      data.clientName?.toLowerCase().includes(filter);
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  formatProducts(products: any[]): string {
    return products.map(p => p.name).join(', ');
  }
}