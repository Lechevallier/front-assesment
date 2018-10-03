import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: 'item.html'
})
export class ItemComponent {
    @Input() src: string;
    @Input() alt: string;
    @Input() color: string;
}
