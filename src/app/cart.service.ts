import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Task[] = [];

  // Ajouter une tâche au panier
  addTaskToCart(task: Task): void {
    this.cart.push(task);
  }

  // Retirer une tâche du panier
  removeTaskFromCart(taskId: number): void {
    this.cart = this.cart.filter(task => task.id !== taskId);
  }

  // Récupérer toutes les tâches du panier
  getCartTasks(): Task[] {
    return this.cart;
  }

  // Vider le panier après paiement
  clearCart(): void {
    this.cart = [];
  }

  // Calculer le prix total des tâches dans le panier
  getTotalPrice(): number {
    return this.cart.reduce((total, task) => total + task.price, 0);
  }
}
