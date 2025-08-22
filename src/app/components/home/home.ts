import { Component, signal, WritableSignal, computed } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../services/products';
import { IProduct } from '../../models/iproduct';
import { Product } from '../product/product';
import { BudgetService } from '../../services/budget';
import { BudgetsList } from '../budgets-list/budgets-list';

@Component({
  selector: 'app-home',
  imports: [Product, ReactiveFormsModule,BudgetsList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected listProducts: IProduct[] = [];
  protected selected = signal<number[]>([]);
  protected webCost = signal(0);
  form = new FormGroup({
    clientName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private productService: ProductService, private budgetService: BudgetService) {
    this.listProducts = this.productService.getProducts();
    console.log('Productos cargados:', this.listProducts);
    console.log('Productos se:', this.selected());
  }
  protected total = computed(() =>
    this.budgetService.getTotalCost(
      this.listProducts,
      this.selected(),
      this.webCost()
    )
  );

  saveBudget() {
    if (this.form.invalid) return;
    
    const budget = {
      clientName: this.form.value.clientName!,
      phone: this.form.value.phone!,
      email: this.form.value.email!,
      products: this.listProducts.filter(p => this.selected().includes(p.id)),
      totalCost: this.total(),
      date: new Date()
    }
    this.budgetService.saveBudget(budget);
    console.log('Presupuestos guardados:', this.budgetService.getBudgets());
    this.form.reset();
    this.selected.set([]);
    this.webCost.set(0);
  }
  
}


