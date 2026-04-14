import { Component, computed, signal } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  private nextId = 1;

  filteredProducts = computed(() => this.filterProducts(this.products(), this.category()))
  allProdCount = computed(() => this.products().length)
  toBuyProdCount = computed(() => this.filterProducts(this.products(), "To buy").length)
  boughtProdCount = computed(() => this.filterProducts(this.products(), "Bought").length)
  

  products = signal<Product[]>([])
  category = signal<"All" | "To buy" | "Bought">("All")

  private filterProducts(
    products: Product[],
    category: "All" | "To buy" | "Bought"
  ): Product[] {
    switch (category) {
      case "All":
        return products;

      case "To buy":
        return products.filter(p => !p.bought);

      case "Bought":
        return products.filter(p => p.bought);
    }
  }

  addProuct(newProduct: string) {
    if (!newProduct.trim()) return;

    this.products.update(list => [
      ...list,
      {
        id: this.nextId++,
        name: newProduct,
        bought: false
      }
    ]);
  }

  removeProduct(chosenProductId: number) {
    this.products.update(list => list.filter((val) => val.id != chosenProductId))
  }

  toggleProduct(productId: number) {
    this.products.update(list => list.map((val) => val.id !== productId ? val : { ...val, bought: !val.bought }))
  }

  deleteBought() {
    this.products.update(list => list.filter((val) => !val.bought))
  }

}

