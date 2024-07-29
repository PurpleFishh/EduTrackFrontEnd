import { AfterContentInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements  AfterContentInit {
  @Input() completeText: string | undefined;
  @Input() incompleteText: string | undefined;
  @Input() complete: number = 0;
  @Input() incomplete: number = 0;
  procentage = 0;

  ngAfterContentInit(){
    this.procentage = Math.round((this.complete / (this.complete + this.incomplete)) * 100);
  }

}
