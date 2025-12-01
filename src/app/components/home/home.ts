import { Component, signal, WritableSignal, computed, effect } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ProductService } from '../../services/products';
import { IProduct } from '../../models/iproduct';
import { Product } from '../product/product';
import { BudgetService } from '../../services/budget';
import { BudgetsList } from '../budgets-list/budgets-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomErrorStateMatcher } from '../../shared/custom-error-state';

@Component({
  selector: 'app-home',
  imports: [Product, ReactiveFormsModule, BudgetsList, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  protected listProducts: IProduct[] = [];
  protected selected = signal<number[]>([]);
  protected pages = signal(1);
  protected languages = signal(1);

  form = new FormGroup({
    clientName: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(50)]),
    phone: new FormControl('',[Validators.required, Validators.pattern(/^\+?\d{9,15}$/)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  customMatcher = new CustomErrorStateMatcher();
  constructor(
    private productService: ProductService,
    private budgetService: BudgetService,
    private router: Router,
    private route: ActivatedRoute) {

    this.listProducts = this.productService.getProducts();

    console.log('Productos cargados:', this.listProducts);

    this.loadFromUrl();

    effect(() => {
      const page = this.pages();
      const lang = this.languages();
      const selected = this.selected();

      this.updateUrl(page, lang, selected);
    });
  }

  private loadFromUrl() {
    const params = this.route.snapshot.queryParamMap;
    const productsParam = params.get('products');
    const pagesParam = params.get('pages');
    const languagesParam = params.get('languages');

    if (productsParam) this.selected.set(productsParam.split(',').map(Number));
    if (pagesParam) this.pages.set(Number(pagesParam));
    if (languagesParam) this.languages.set(Number(languagesParam));
  }

  // Actualiza la URL cuando hay cambios this.selected()
  private updateUrl(page: number, languages: number, selected: number[]) {
    const queryParams: any = {};
    console.log("UpdateUrl " + selected);

    if (selected.length > 0) {
      queryParams.products = selected.join(',');
    }
    const index = this.listProducts.find(product => product.custom_details === true);
    const idProductCustom = index ? index.id : -1;

    if (selected.includes(idProductCustom)) {
      queryParams.pages = page;
      queryParams.languages = languages;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      replaceUrl: true
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
    if (this.selected().length === 0) {
      alert('Debes seleccionar al menos un producto.');
      return;
    }
    let details = "";
    const index = this.listProducts.find(product => product.custom_details === true);
    const idProductCustom = index ? index.id : -1;
    if (this.selected().includes(idProductCustom)) {
      details = "Nro paginas: " + this.pages() + ", Nro de lenguajes:" + this.languages();
    }
    const budget = {
      clientName: this.form.value.clientName!,
      phone: this.form.value.phone!,
      email: this.form.value.email!,
      products: this.listProducts.filter(p => this.selected().includes(p.id)),
      details: details,
      totalCost: this.total(),
      date: new Date()
    }

    this.budgetService.saveBudget(budget);
    console.log('Presupuestos guardados:', this.budgetService.getBudgets());
    this.resetForm();
  }

  private resetForm() {
    this.selected.set([]);
    this.pages.set(1);
    this.languages.set(1);

    this.form.reset();

    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsUntouched();
      this.form.get(key)?.markAsPristine();
    });
  }

}


