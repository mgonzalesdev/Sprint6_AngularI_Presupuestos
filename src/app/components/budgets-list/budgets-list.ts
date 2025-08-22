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

  // Sin AfterViewInit: static:true permite tener el ViewChild listo en ngOnInit
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor() {
    // Reactividad real: cuando cambie la signal en el servicio, refrescamos la tabla
    effect(() => {
      const budgets = this.budgetService.getBudgets()(); // <-- OJO: leer la signal
      this.dataSource.data = budgets;                    // actualiza la tabla
    });
  }

  ngOnInit(): void {
    // Conectar el sort una vez (sin orden inicial)
    this.dataSource.sort = this.sort;

    // (Opcional) Mejorar el ordenado por fecha y nombre
    this.dataSource.sortingDataAccessor = (item: IBudget, property: string) => {
      switch (property) {
        case 'clientName': return item.clientName?.toLowerCase() ?? '';
        case 'date': return new Date(item.date).getTime();
        default: return (item as any)[property];
      }
    };

    // Filtro solo por nombre de cliente
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