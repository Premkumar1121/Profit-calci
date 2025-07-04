import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfitComponent } from "./product-list/product-list.component";


@Component({
  selector: 'app-root',
  imports: [ProfitComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProfitCalci';
}
