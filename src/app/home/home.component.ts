import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [] // Remove CSS file reference
})
export class HomeComponent {
  title = 'angular-demo';

  onButtonClick() {
    console.log('Button clicked!');
  }
}
