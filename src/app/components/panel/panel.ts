import { Component, input,signal, output } from '@angular/core';
import { BudgetService } from '../../services/budget';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialog } from '../help-dialog/help-dialog';

@Component({
  selector: 'app-panel',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './panel.html',
  styleUrl: './panel.css'
})
export class Panel {
   pages = signal(0);
  languages = signal(0);

  webCostChanged = output<number>();

  constructor(private budgetService: BudgetService,  private dialog: MatDialog) {
    this.emitCost();
  }

  onPagesChange(value: string) {
    this.pages.set(Number(value));
    this.emitCost();
  }

  onLanguagesChange(value: string) {
    this.languages.set(Number(value));
    this.emitCost();
  }

  private emitCost() {
    const cost = this.budgetService.getWebCost(this.pages(), this.languages());
    this.webCostChanged.emit(cost);
  }
    openHelp(title: string, message: string) {
    this.dialog.open(HelpDialog, {
      data: { title, message }
    });
  }
}
