import { Component, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `<button (click)="onClick.emit()"><ng-content></ng-content></button>`,
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() onClick = new EventEmitter<void>();
}
