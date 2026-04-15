import { computed, effect, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private shoppingListKey = "shoppingList"

  constructor() {
    const cache = localStorage.getItem(this.shoppingListKey)
    if (cache) {
      try {
        const data = JSON.parse(cache)
        this.products.set(data)
        this.nextId = Math.max(0, ...this.products().map(val => val.id)) + 1
      } catch {
        console.warn('Invalid localStorage')
      }
    }

    effect(() =>
      localStorage.setItem(
        this.shoppingListKey,
        JSON.stringify(this.products())
      )
    )
  }

  private nextId = 1;

  private products = signal<Product[]>([])
  private category = signal<Category>(Category.All)

  filteredProducts = computed(() => this.filterProducts(this.products(), this.category()))
  filteredProdCount = computed(() => this.filteredProducts().length)
  allProdCount = computed(() => this.products().length)

  toBuyProducts = computed(() => this.filterProducts(this.products(), Category.ToBuy));
  boughtProducts = computed(() => this.filterProducts(this.products(), Category.Bought));

  toBuyProdCount = computed(() => this.toBuyProducts().length);
  boughtProdCount = computed(() => this.boughtProducts().length);


  private filterProducts(
    products: Product[],
    category: Category
  ): Product[] {
    switch (category) {
      case Category.All:
        return products;

      case Category.ToBuy:
        return products.filter(p => !p.bought);

      case Category.Bought:
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

  setCategory(category: Category) {
    this.category.set(category)
  }

  getProducts = this.products
  getCategory = this.category

}
