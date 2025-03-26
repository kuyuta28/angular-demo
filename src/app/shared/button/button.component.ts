import { Component, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `<button 
    (click)="onClick.emit()" 
    class="inline-block px-5 py-2 text-white bg-primary hover:bg-primary-dark rounded transition-colors">
      <ng-content></ng-content>
    </button>`,
  styles: []
})
export class ButtonComponent {
  @Input() onClick = new EventEmitter<void>();
}
