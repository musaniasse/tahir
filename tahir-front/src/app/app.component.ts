import { Component } from '@angular/core';
import { PlayerComponent } from './components/player/player.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PlayerComponent],
  template: `<app-player></app-player>`,
  styles: [`
    :host { display: block; background: #0f0f1a; min-height: 100vh; }
  `]
})
export class AppComponent {}