import { Component, signal } from '@angular/core';
import { UserListContainer } from './components/user-list/user-list-container';

@Component({
  selector: 'app-root',
  imports: [UserListContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Shopping_list');
}
