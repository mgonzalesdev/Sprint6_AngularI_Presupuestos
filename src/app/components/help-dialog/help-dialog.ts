import { Component, Inject } from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-help-dialog',
  imports: [MatDialogModule,MatButton],
  templateUrl: './help-dialog.html',
  styleUrl: './help-dialog.css'
})
export class HelpDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }) { }
}
