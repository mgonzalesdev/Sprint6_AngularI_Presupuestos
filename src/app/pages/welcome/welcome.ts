import { Component } from '@angular/core';
import { Budgets } from '../budgets/budgets';

@Component({
  selector: 'app-welcome',
  imports: [Budgets],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {

}
