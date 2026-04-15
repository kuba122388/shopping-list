# 🛒 Modern Angular Shopping List

A simple yet powerful shopping list application built with **Angular 21**.
This project demonstrates modern Angular development using **Signals**, clean architecture, and reactive state management.

---

## ✨ Features

* ✅ Add, remove, and toggle products
* 🔄 Real-time updates using Angular Signals
* 📊 Live statistics (total, to buy, bought)
* 🔍 Filter products by category:

  * All
  * To Buy
  * Bought
* 🧹 Bulk delete of bought products
* 💾 Persistent storage with `localStorage`
* 🎨 Clean and responsive UI with hover effects

---

## 🛠️ Tech Stack

* **Angular 21**
* **TypeScript**
* **Angular Signals** (`signal`, `computed`, `effect`)
* **SCSS**
* **Standalone Components**

---

## 🧠 Architecture & Concepts

### 🔹 State Management (Signals)

The application uses Angular Signals for reactive state:

* `signal()` → holds state
* `computed()` → derives data
* `effect()` → side effects (localStorage sync)

---

### 🔹 Service-Based Architecture

All business logic is handled inside a dedicated service:

```ts
ShoppingService
```

Responsibilities:

* managing products state
* filtering logic
* handling CRUD operations
* syncing with localStorage

---

### 🔹 Data Models

#### Product Interface

```ts
export interface Product {
  id: number;
  name: string;
  bought: boolean;
}
```

#### Category Enum

```ts
export enum Category {
  All = "All",
  ToBuy = "To buy",
  Bought = "Bought",
}
```

---

### 🔹 Reactive Derived State

Examples of computed values:

* filtered products
* product counts
* category-based filtering

```ts
filteredProducts = computed(() =>
  this.filterProducts(this.products(), this.category())
);
```

---

## 🎨 UI Highlights

* Responsive layout
* Smooth hover effects
* Visual distinction for bought items
* Clean and minimal design

---

## 🚀 Getting Started

### Prerequisites

* Node.js (LTS recommended)
* Angular CLI

---

### Installation

```bash
git clone https://github.com/your-username/shopping-list.git
cd shopping-list
npm install
ng serve
```

---

### Run the app

```bash
ng serve
```

Then open:

```
http://localhost:4200
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── user-list/
│   ├── services/
│   │   └── shopping.service.ts
│   ├── models/
│   │   └── category.ts
│   ├── interfaces/
│   │   └── product.ts
```

---

## 🔥 Key Learnings

This project demonstrates:

* Modern Angular (Signals-based)
* Separation of concerns (UI vs logic)
* Reactive thinking without RxJS
* Clean and scalable architecture
* Local storage persistence

---

## 📌 Future Improvements

* ✏️ Edit product name
* 🔍 Search functionality
* 📡 API integration (HttpClient + RxJS)
* 🎬 Animations
* 📱 Mobile UX improvements

---

## 👨‍💻 Author

Built as a learning project to master modern Angular patterns.

---

## ⭐ Summary

This project is a great example of:

> **Modern Angular without unnecessary complexity — clean, reactive, and scalable.**
