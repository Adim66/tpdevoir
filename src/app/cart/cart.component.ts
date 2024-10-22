import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service'; // Importer CartService
import { Task } from '../task.model'; // Importer Task

@Component({
  selector: 'app-cart',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartTasks: Task[] = [];
  totalPrice: number = 0;
  cardHolderName: string = 'Adim'; // Nom du titulaire de la carte
  cardExpiry: string = 'Boubaker'; // Date d'expiration
  lastFourDigits: string = '1234'; // Derniers 4 chiffres de la carte

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartTasks = this.cartService.getCartTasks(); // Récupérer les tâches dans le panier
    this.totalPrice = this.cartService.getTotalPrice(); // Calculer le prix total
  }

  processPayment(): void {
    alert('Paiement effectué avec succès !');  // Simuler le paiement
    this.cartService.clearCart();  // Vider le panier après paiement
    this.cartTasks = [];
    this.totalPrice = 0;
  }
}
