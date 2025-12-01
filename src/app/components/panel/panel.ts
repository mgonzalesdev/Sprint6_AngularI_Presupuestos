import { Component, input, signal, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialog } from '../help-dialog/help-dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-panel',
  imports: [MatButtonModule, MatIconModule,MatFormFieldModule,MatInputModule],
  templateUrl: './panel.html',
  styleUrl: './panel.css'
})
export class Panel {
  //pages = signal(1);
  //languages = signal(1);

  initialPages = input<number>(1);
  initialLanguages = input<number>(1);

  pagesChanged = output<number>();
  languagesChanged = output<number>();

  constructor(private dialog: MatDialog) {
  }  

  onPagesChange(value: string) {
    let pages = Number(value);
    this.pagesChanged.emit(pages);
  }

  onLanguagesChange(value: string) {
    let languages = Number(value)
    this.languagesChanged.emit(languages);
  }

  openHelp(title: string, message: string) {
    this.dialog.open(HelpDialog, {
      data: { title, message }
    });
  }
}
