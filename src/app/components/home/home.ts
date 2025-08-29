import { Component, signal, WritableSignal, computed, effect } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../services/products';
import { IProduct } from '../../models/iproduct';
import { Product } from '../product/product';
import { BudgetService } from '../../services/budget';
import { BudgetsList } from '../budgets-list/budgets-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Product, ReactiveFormsModule, BudgetsList, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected listProducts: IProduct[] = [];
  protected selected = signal<number[]>([]);

  //protected webCost = signal(0);
  protected pages = signal(0);
  protected languages = signal(0);

  form = new FormGroup({
    clientName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    private productService: ProductService,
    private budgetService: BudgetService,
    private router: Router,
    private route: ActivatedRoute) {
    this.listProducts = this.productService.getProducts();

    console.log('Productos cargados:', this.listProducts);
    console.log('Productos se:', this.selected());

    this.loadFromUrl();

    // Cada vez que cambian los productos o webCost, actualizamos la URL
    effect(() => {
      this.updateUrl();
    });

  }
  private loadFromUrl() {
    this.route.queryParamMap.subscribe(params => {
      const productsParam = params.get('products');
      //  const webCostParam = params.get('webCost');

      const pagesParam = params.get('pages');
      const languagesParam = params.get('languages');


      if (productsParam) {
        const ids = productsParam.split(',').map(Number);
        this.selected.set(ids);
      }

      // if (webCostParam) {
      //   this.webCost.set(Number(webCostParam));
      // }
      if (pagesParam) {
        this.pages.set(Number(pagesParam));
      }
      if (languagesParam) {
        this.languages.set(Number(languagesParam));
      }
    });
  }

  // Actualizar la URL cuando hay cambios
  private updateUrl() {
    const queryParams: any = {};

    if (this.selected().length > 0) {
      queryParams.products = this.selected().join(',');
    }

    // if (this.webCost() > 0) {
    //   queryParams.webCost = this.webCost();
    // }
    if (this.pages() > 0) queryParams.pages = this.pages();
    if (this.languages() > 0) queryParams.languages = this.languages();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }
  onPagesChange(pages: number) {
    this.pages.set(pages);
  }

  onLanguagesChange(langs: number) {
    this.languages.set(langs);
  }
  protected total = computed(() =>
    this.budgetService.getTotalCost(
      this.listProducts,
      this.selected(),
      this.budgetService.getWebCost(this.languages(), this.pages())
    )
  );

  saveBudget() {
    if (this.form.invalid) return;
    if (this.selected().length === 0) {
      alert('Debes seleccionar al menos un producto.');
      return;
    }

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
    // this.webCost.set(0);
    this.pages.set(0);
    this.languages.set(0);
  }

}


