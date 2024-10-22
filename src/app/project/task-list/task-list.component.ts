import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

// Mise à jour de la tâche vide pour inclure price et imageUrl
const emptyTask = {
  name: '',
  description: '',
  price: 0,  // Ajout du champ price
  imageUrl: '',  // Ajout du champ imageUrl
  project: null,
  id: 0,
};

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DatePipe, TaskFormComponent, AsyncPipe, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  tasks: Task[] = [];
  showModal: boolean = false;
  formType: 'CREATE' | 'UPDATE' = 'CREATE';
  selectedTask: Task = emptyTask;
  tasks$!: Observable<Task[]>;

  private taskService = inject(TaskService);

  constructor() {
    this.updateTasks();
  }

  updateTasks() {
    this.tasks$ = this.taskService.getTasks();
  }


  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.updateTasks();
    });
  }

  updateTask(task: Task) {
    // Sélectionner la tâche pour l'édition, y compris les nouveaux champs
    this.selectedTask = { ...task };  // Récupère également price et imageUrl
    this.formType = 'UPDATE';
    this.showModal = true;
  }

  addNewTask() {
    // Utiliser la tâche vide avec les nouveaux champs pour la création
    this.selectedTask = emptyTask;
    this.formType = 'CREATE';
    this.showModal = true;
  }

  handleModalClose(type: 'SUBMIT' | 'CANCEL') {
    if (type === 'SUBMIT') {
      this.updateTasks();
    }
    this.showModal = false;
  }
}
