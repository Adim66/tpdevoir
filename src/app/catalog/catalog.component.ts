import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Project } from '../project.model'; // Ajuste le chemin selon ton projet
import { ProjectService } from '../project.service'; // Service pour récupérer les projets
import { Task } from '../task.model'; // Importer Task
@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;

  constructor(private projectService: ProjectService,private cartService: CartService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((data: Project[]) => {
      this.projects = data;
    });
  }

  showTasks(project: Project): void {
    this.selectedProject = project;
  }

  hideTasks(): void {
    this.selectedProject = null;
  }
  toggleTaskSelection(task: Task): void {
    if (this.isTaskSelected(task)) {
      this.cartService.removeTaskFromCart(task.id);  // Retirer du panier si déjà sélectionnée
    } else {
      this.cartService.addTaskToCart(task);  // Ajouter au panier
    }
  }

  isTaskSelected(task: Task): boolean {
    return this.cartService.getCartTasks().some(t => t.id === task.id); // Vérifier si la tâche est dans le panier
  }
}

