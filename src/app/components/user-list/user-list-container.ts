import { Component, inject } from '@angular/core';
import { ShoppingService } from '../../services/shopping';
import { Category } from '../../models/category';
import { UserList } from './user-list';

@Component({
  selector: 'app-user-list-container',
  imports: [UserList],
  templateUrl: './user-list-container.html',
})
export class UserListContainer {
  private shoppingService = inject(ShoppingService);

  filteredProducts = this.shoppingService.filteredProducts;
  prodToBuyCount = this.shoppingService.toBuyProdCount;
  prodBoughtCount = this.shoppingService.boughtProdCount;
  prodCount = this.shoppingService.allProdCount;
  filteredProdCount = this.shoppingService.filteredProdCount;
  category = this.shoppingService.getCategory;

  addProduct(name: string) { this.shoppingService.addProduct(name); }
  toggleProduct(id: number) { this.shoppingService.toggleProduct(id); }
  removeProduct(id: number) { this.shoppingService.removeProduct(id); }
  deleteBoughtProducts() { this.shoppingService.deleteBought(); }
  setCategory(category: Category) { this.shoppingService.setCategory(category); }
}