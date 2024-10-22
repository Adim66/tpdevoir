import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminAppHeaderComponent } from '../admin-app-header/admin-app-header.component';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { Task } from '../task.model';
import { TaskService } from '../task.service'; // Assurez-vous d'importer le service

@Component({
  selector: 'app-catalog-config',
  templateUrl: './catalog-config.component.html',
  styleUrls: ['./catalog-config.component.css'],
  imports: [AdminAppHeaderComponent, ProjectFormComponent, NgFor, NgIf, AsyncPipe],
  standalone: true,
})
export class CatalogConfigComponent {
  projects$!: Observable<Project[]>;
  isLoading = true;
  showProjectForm = false;
  selectedProject: Project | null = null;
  showTaskForm = false;
  isEditingTask = false;
  taskToEdit: Task | null = null;

  private projectService = inject(ProjectService);
  private taskService = inject(TaskService); // Injecter le TaskService

  constructor() {
    this.loadProjects();
  }

  loadProjects() {
    this.projects$ = this.projectService.getProjects();
    this.projects$.subscribe(() => this.isLoading = false);
  }

  addNewProject() {
    this.showProjectForm = true;
  }

  handleProjectFormClose() {
    this.showProjectForm = false;
    this.loadProjects(); 
  }

  handleProjectSave(formData: any) {
    this.projectService.addProject(formData).subscribe(() => {
      this.loadProjects();
    });
  }

  trackByProjectId(index: number, project: Project): number {
    return project.id;
  }

  viewProjectDetails(project: Project) {
    this.selectedProject = project;
  }

  addTask(task: Task) {
    if (this.selectedProject) {
      this.taskService.addTask(task).subscribe(() => {
        // Ajoutez la tâche à la liste localement
        this.selectedProject!.tasks.push(task);
        this.showTaskForm = false;
      });
    }
  }

  editTask(task: Task) {
    this.taskToEdit = task;
    this.isEditingTask = true;
    this.showTaskForm = true; 
  }

  deleteTask(taskId: number) {
    if (this.selectedProject) {
      // Utiliser le TaskService pour supprimer la tâche
      this.taskService.deleteTask(taskId).subscribe(() => {
        // Supprimer la tâche localement de la liste des tâches du projet sélectionné
        this.selectedProject!.tasks = this.selectedProject!.tasks.filter(task => task.id !== taskId);
      });
    }
  }

  handleTaskFormClose() {
    this.showTaskForm = false;
    this.isEditingTask = false;
    this.taskToEdit = null; 
  }

  handleTaskSave(task: Task) {
    if (this.isEditingTask && this.taskToEdit) {
      // Mise à jour de la tâche
      this.taskService.updateTask(task).subscribe(() => {
        // Mettez à jour la tâche dans la liste localement
        const index = this.selectedProject!.tasks.findIndex(t => t.id === this.taskToEdit!.id);
        if (index !== -1) {
          this.selectedProject!.tasks[index] = task;
        }
        this.handleTaskFormClose();
      });
    } else {
      this.addTask(task);
    }
  }
}
