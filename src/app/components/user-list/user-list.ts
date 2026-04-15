import { Component, inject } from '@angular/core';
import { ShoppingService } from '../../services/shopping';
import { Category } from '../../models/category';


@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  private shoppingService = inject(ShoppingService)

  Category=Category;

  filteredProducts = this.shoppingService.filteredProducts
  prodToBuyCount = this.shoppingService.toBuyProdCount
  prodBoughtCount = this.shoppingService.boughtProdCount
  prodCount = this.shoppingService.allProdCount
  filteredProdCount = this.shoppingService.filteredProdCount
  category = this.shoppingService.getCategory

  addProduct(name: string) {
    this.shoppingService.addProduct(name)
  }

  toggleProduct(id: number) {
    this.shoppingService.toggleProduct(id)
  }

  removeProduct(productId: number){
    this.shoppingService.removeProduct(productId)
  }

  deleteBoughtProducts(){
    this.shoppingService.deleteBought()
  }

  setCategory(category: Category){
    this.shoppingService.setCategory(category)
  }
}

