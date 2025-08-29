import { Component, input, signal, output } from '@angular/core';
import { BudgetService } from '../../services/budget';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialog } from '../help-dialog/help-dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-panel',
  imports: [MatButtonModule, MatIconModule,MatFormFieldModule],
  templateUrl: './panel.html',
  styleUrl: './panel.css'
})
export class Panel {
  pages = signal(0);
  languages = signal(0);

  initialPages = input<number>(0);
  initialLanguages = input<number>(0);

  //webCostChanged = output<number>();
  pagesChanged = output<number>();
  languagesChanged = output<number>();

  constructor(private budgetService: BudgetService, private dialog: MatDialog) {
    // this.emitCost();
  }
  ngOnInit() {
    // Asignamos valores iniciales que vienen desde la URL
    this.pages.set(this.initialPages());
    this.languages.set(this.initialLanguages());

    // Emitimos coste inicial
   // this.emitCost();
  }


  onPagesChange(value: string) {
    let pages = Number(value);
    this.pages.set(pages);
    this.pagesChanged.emit(pages);
    //this.emitCost();
  }

  onLanguagesChange(value: string) {
    let languages = Number(value)
    this.languages.set(languages);
    this.languagesChanged.emit(languages);
   // this.emitCost();
  }

  // private emitCost() {
  //   const cost = this.budgetService.getWebCost(this.pages(), this.languages());
  //   this.webCostChanged.emit(cost);
  // }
  openHelp(title: string, message: string) {
    this.dialog.open(HelpDialog, {
      data: { title, message }
    });
  }
}
