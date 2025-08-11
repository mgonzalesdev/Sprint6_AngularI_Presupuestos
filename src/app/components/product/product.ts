import { Component, input, Signal, WritableSignal,output } from '@angular/core';
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
  selectedProducts = input<WritableSignal<number[]> | undefined>();
webCostChanged = output<number>();

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
        if (productId === 3 && !checked) {
      this.webCostChanged.emit(0);
    }
  }

  ngOnInit() {
    const signal = this.selectedProducts?.(); // Primer () -> accede al WritableSignal
    const ids = signal?.();                   // Segundo () -> accede al array de números
    console.log('IDs seleccionados inicialmente:', ids);
  }

}
