import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-welcome',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {

}
