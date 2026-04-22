import { Component, input, output } from '@angular/core';
import { Category } from '../../models/category';
import { Product } from '../../interfaces/product';


@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {

  products = input<Product[]>([]);
  prodCount = input<number>(0);
  prodToBuyCount = input<number>(0);
  prodBoughtCount = input<number>(0);
  filteredProdCount = input<number>(0);
  category = input<Category>(Category.All);

  add = output<string>();
  toggle = output<number>();
  remove = output<number>();
  deleteBought = output<void>();
  categoryChange = output<Category>();

  Category = Category;


  onAdd(name: string, inputEl: HTMLInputElement) {
    if (!name.trim()) return;
    this.add.emit(name);
    inputEl.value = '';
  }
}

