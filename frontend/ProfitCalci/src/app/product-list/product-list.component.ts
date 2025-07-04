import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfitService, ProfitResult } from '../api.service';

@Component({
  standalone: true,
  selector: 'app-profit',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProfitComponent {
  distance: number = 0;
  weight: number = 0;
  priority: string = 'standard';

  result: ProfitResult | null = null;
  error: string | null = null;

  constructor(private profitService: ProfitService) {}

  calculate() {
    this.result = null;
    this.error = null;

    this.profitService.calculateProfit({
      distance: this.distance,
      weight: this.weight,
      priority: this.priority
    }).subscribe({
      next: res => this.result = res,
      error: err => this.error = err.error?.error || 'API error'
    });
  }
}
