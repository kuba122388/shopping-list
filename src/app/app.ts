import { Component, signal } from '@angular/core';
import { UserList } from "./components/user-list/user-list";

@Component({
  selector: 'app-root',
  imports: [UserList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Shopping_list');

}
