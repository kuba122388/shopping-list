import { computed, effect, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private shoppingListKey: string = "shoppingList"

  constructor() {
    const cache = localStorage.getItem(this.shoppingListKey)
    if (cache) {
      const data = JSON.parse(cache)
      this.products.set(data)
      this.nextId = Math.max(0, ...this.products().map(val => val.id)) + 1
    }

    effect(() =>
      localStorage.setItem(
        this.shoppingListKey,
        JSON.stringify(this.products())
      )
    )
  }

  private nextId = 1;

  filteredProducts = computed(() => this.filterProducts(this.products(), this.category()))
  allProdCount = computed(() => this.products().length)
  toBuyProdCount = computed(() => this.filterProducts(this.products(), "To buy").length)
  boughtProdCount = computed(() => this.filterProducts(this.products(), "Bought").length)

  private products = signal<Product[]>([])
  private category = signal<"All" | "To buy" | "Bought">("All")

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

  addProduct(newProduct: string) {
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

  setCategory(category: "All" | "To buy" | "Bought") {
    this.category.set(category)
  }

  getProducts = this.products
  getCategory = this.category

}
