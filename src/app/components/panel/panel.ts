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

  pagesChanged = output<number>();
  languagesChanged = output<number>();

  constructor(private budgetService: BudgetService, private dialog: MatDialog) {
  }
  ngOnInit() {
    this.pages.set(this.initialPages());
    this.languages.set(this.initialLanguages());
  }


  onPagesChange(value: string) {
    let pages = Number(value);
    this.pages.set(pages);
    this.pagesChanged.emit(pages);
  }

  onLanguagesChange(value: string) {
    let languages = Number(value)
    this.languages.set(languages);
    this.languagesChanged.emit(languages);
  }

  openHelp(title: string, message: string) {
    this.dialog.open(HelpDialog, {
      data: { title, message }
    });
  }
}
