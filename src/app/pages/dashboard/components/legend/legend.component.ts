import { AfterContentInit, Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements  OnChanges {
  @Input() completeText: string | undefined;
  @Input() incompleteText: string | undefined;
  @Input() complete: number = 0;
  @Input() incomplete: number = 0;
  procentage: number = 0;

  ngOnChanges(){
    this.procentage = Math.round((this.complete / (this.complete + this.incomplete)) * 100);
  }

}
