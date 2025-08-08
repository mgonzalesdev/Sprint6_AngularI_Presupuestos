import { Component, signal, WritableSignal, computed } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/products';
import { IProduct } from '../../models/iproduct';
import { Product } from '../product/product';

@Component({
  selector: 'app-home',
  imports: [Product, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected listProducts: IProduct[] = [];
  //selected = signal<Record<number, boolean>>({});
  //form: FormGroup;
  //selected = signal<{ [key: string]: boolean }>({});
  protected selected = signal<number[]>([]);
  form = new FormGroup({});


    protected total = computed(() => {
    const selectedIds = this.selected();
    return this.listProducts
      .filter(p => selectedIds.includes(p.id))
      .reduce((sum, p) => sum + p.price, 0);
  });

  constructor(private productService: ProductService) {
    this.listProducts = this.productService.getProducts();
    // this.selected.set(Object.fromEntries(this.listProducts.map(p => [p.id, false])));//convierte el array en un objeto (id,estado_selecionado);
    const allSelectedIds = this.listProducts.map(p => p.id);
    this.selected.set(allSelectedIds);
    console.log('Productos cargados:', this.listProducts);
    //console.log('Estado inicial:', this.selected());
  }

}
