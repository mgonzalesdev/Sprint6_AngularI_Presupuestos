import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isInvalid = !!(control && control.invalid);
    // borde rojo del input solo si hubo interacción (dirty O touched)
    const userInteracted = !!(control && (control.dirty || control.touched));

    return isInvalid && userInteracted;
  }
}