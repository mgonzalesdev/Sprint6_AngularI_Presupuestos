import { Component, signal, WritableSignal, computed } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/products';
import { IProduct } from '../../models/iproduct';
import { Product } from '../product/product';
import { BudgetService } from '../../services/budget';

@Component({
  selector: 'app-home',
  imports: [Product, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected listProducts: IProduct[] = [];
  protected selected = signal<number[]>([]);
  form = new FormGroup({});
  protected webCost = signal(0);

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
}


