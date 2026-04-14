import { Component, inject } from '@angular/core';
import { ShoppingService } from '../../services/shopping';


@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  private shoppingService = inject(ShoppingService)

  products = this.shoppingService.filteredProducts
  prodToBuyCount = this.shoppingService.toBuyProdCount
  prodBoughtCount = this.shoppingService.boughtProdCount
  prodCount = this.shoppingService.allProdCount
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

  setCategory(category: "All" | "To buy" | "Bought"){
    this.shoppingService.setCategory(category)
  }
}

