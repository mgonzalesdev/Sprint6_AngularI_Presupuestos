import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { Home } from './components/home/home';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'budget_app';
}
