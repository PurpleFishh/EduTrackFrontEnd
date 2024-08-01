import { AfterContentInit, Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss'],
})
export class LegendComponent implements OnChanges {
  @Input() completeText: string | undefined;
  @Input() incompleteText: string | undefined;
  @Input() complete: number = 0;
  @Input() incomplete: number = 0;
  @Input() total: number = 0;
  procentage: number = 0;

  ngOnChanges() {
    if (this.total !== 0)
      this.procentage = Math.round((this.complete / this.total) * 100);
    else
      this.procentage = Math.round(
        (this.complete / (this.complete + this.incomplete)) * 100
      );
  }
}
