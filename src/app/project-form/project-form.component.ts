// src/app/home/project-form/project-form.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-project-form',
  standalone: true, // Marking the component as standalone
  imports: [CommonModule, ReactiveFormsModule], // Import necessary modules
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent {
  projectForm: FormGroup;

  @Output() close = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private projectService: ProjectService,private taskService :TaskService) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      tasks: this.fb.array([]), // FormArray for tasks
    });
  }

  get tasks(): FormArray {
    return this.projectForm.get('tasks') as FormArray;
  }

  addTask() {
    const taskFormGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]], // Nouveau champ 'price' avec validation
      imageUrl: ['', Validators.required],                  // Nouveau champ 'imageUrl'
    });
    this.tasks.push(taskFormGroup);
  }

  removeTask(index: number) {
    this.tasks.removeAt(index);
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const newProject: Project = this.projectForm.value;
  
      // Ajouter le projet
      this.projectService.addProject(newProject).subscribe({
        next: (response) => {
          console.log('Project added:', response);
          
          // Associer les tâches au projet sans redéfinir l'ID si déjà présent
          newProject.tasks.forEach((task: Task) => {
            task.project = { id: response.id, name: newProject.name, description: newProject.description, tasks: [] }; // Fournir une liste vide pour tasks
            
            // Ajouter chaque tâche dans la base de données
            this.taskService.addTask(task).subscribe({
              next: (taskResponse) => {
                console.log('Task added:', taskResponse);
              },
              error: (taskError) => {
                console.error('Error adding task:', taskError);
              }
            });
          });
  
          // Fermer ou réinitialiser le formulaire après le succès
          this.close.emit(); // Émet l'événement de fermeture au parent
        },
        error: (error) => {
          console.error('Error adding project:', error);
        },
      });
    }
  }
  
  
  
  }