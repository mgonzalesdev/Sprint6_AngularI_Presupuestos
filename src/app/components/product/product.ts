import { Component, input, Signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { MatFormFieldModule } from '@angular/material/form-field';
//import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product',
  imports: [ReactiveFormsModule,
    // MatFormFieldModule,
    // MatInputModule, 
    MatCheckboxModule,
    MatCardModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {
  listProducts = input<IProduct[]>([]);
  // selectedProducts = input<WritableSignal<number[]>>();

  // selectedProducts = input<WritableSignal<Record<number, boolean>>>();
  // selected = input<Record<number, boolean>>();
  //selectedProducts = input<Signal<Record<number, boolean>>>();
  //selectedProducts = input<Record<number, boolean>>();

  // selectedProducts = input<Signal<number[]>>();

  // get selected(): number[] {
  //   return this.selectedProducts?.() ?? [];
  // }
  //console.log(selectedProducts);
  selectedProducts = input<WritableSignal<number[]> | undefined>();

  // get selectedIds(): number[] {
  //   //return this.selectedProducts?.().value ?? [];
  //   const miArray = this.selectedProducts;
  //   //return miArray;
  // }

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
}
  ngOnInit() {
    const signal = this.selectedProducts?.(); // Primer () -> accede al WritableSignal
    const ids = signal?.();                   // Segundo () -> accede al array de números
    console.log('IDs seleccionados inicialmente:', ids);
  }

}
