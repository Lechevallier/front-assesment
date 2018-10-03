import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-value',
  templateUrl: 'value.html'
})
export class ValueComponent {
    @Input() label: string;
    @Input() value: string;
}
