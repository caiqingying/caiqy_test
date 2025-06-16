import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {
  getCurrentDate(): string {
    return new Date().toLocaleDateString('zh-CN');
  }
}
