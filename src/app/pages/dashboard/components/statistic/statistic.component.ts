import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent {
 @Input() title: string | undefined;
  @Input()
  procentage!: number;
  @Input() description: string | undefined;
}
