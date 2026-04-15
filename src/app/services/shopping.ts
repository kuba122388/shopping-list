import { computed, effect, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private shoppingListKey = "shoppingList"

  /**
 * Initializes the shopping list state.
 * Loads data from localStorage (if available) and keeps it in sync using an Angular effect.
 */
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

  /** Stores the list of all products */
  private products = signal<Product[]>([])

  /** Currently selected filter category */
  private category = signal<Category>(Category.All)

  filteredProducts = computed(() => this.filterProducts(this.products(), this.category()))
  filteredProdCount = computed(() => this.filteredProducts().length)
  allProdCount = computed(() => this.products().length)

  toBuyProducts = computed(() => this.filterProducts(this.products(), Category.ToBuy));
  boughtProducts = computed(() => this.filterProducts(this.products(), Category.Bought));

  toBuyProdCount = computed(() => this.toBuyProducts().length);
  boughtProdCount = computed(() => this.boughtProducts().length);


  /**
 * Filters products based on selected category.
 */
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

  /**
 * Adds a new product to the list.
 * Ignores empty input values.
 */
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

  /**
   * Removes a product from the list by its id.
   */
  removeProduct(chosenProductId: number) {
    this.products.update(list => list.filter((val) => val.id != chosenProductId))
  }

  /**
 * Toggles the 'bought' status of a product.
 */
  toggleProduct(productId: number) {
    this.products.update(list => list.map((val) => val.id !== productId ? val : { ...val, bought: !val.bought }))
  }

  /**
 * Removes all products marked as bought.
 */
  deleteBought() {
    this.products.update(list => list.filter((val) => !val.bought))
  }

  /**
 * Updates the current filter category.
 */
  setCategory(category: Category) {
    this.category.set(category)
  }

  getProducts = this.products
  getCategory = this.category

}
