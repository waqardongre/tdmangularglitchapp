import { Component } from '@angular/core';
import { developer } from './global.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tdmManager';

  ngOnInit(): void {
    console.log(developer)
  }
}
