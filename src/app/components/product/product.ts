import { Component, input, Signal, WritableSignal, output } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { Panel } from '../panel/panel';

@Component({
  selector: 'app-product',
  imports: [ReactiveFormsModule,
    MatCheckboxModule,
    MatCardModule,
    Panel],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {
  listProducts = input<IProduct[]>([]);
  selectedProducts = input<WritableSignal<number[]> | null>(null);

  pages = input<number>(1);
  languages = input<number>(1);

  pagesChanged = output<number>();
  languagesChanged = output<number>();

  get selectedIds(): number[] {
    return this.selectedProducts?.()?.() ?? [];
  }

  isSelected(productId: number): boolean {
    return this.selectedIds.includes(productId);
  }

  onToggle(productId: number, checked: boolean) {
    const signal = this.selectedProducts?.();
    if (!signal) return;

    const current = signal();
    const updated = checked
      ? [...current, productId]
      : current.filter(id => id !== productId);

    signal.set(updated);
    const index = this.listProducts().find(product => product.custom_details === true);
    const idProductCustom = index ? index.id : -1;
    if (productId === idProductCustom && !checked) {
      this.pagesChanged.emit(1);
      this.languagesChanged.emit(1);
    }
  }

  onPagesChanged(pages: number) {
    this.pagesChanged.emit(pages);
  }

  onLanguagesChanged(lang: number) {
    this.languagesChanged.emit(lang);
  }

  ngOnInit() {
    const signal = this.selectedProducts?.();
    const ids = signal?.();
    console.log('IDs seleccionados inicialmente:', ids);
  }

}
