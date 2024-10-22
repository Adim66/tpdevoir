import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { ProjectComponent } from '../project/project.component';
import { ProjectFormComponent } from '../project-form/project-form.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AsyncPipe, ProjectFormComponent, AppHeaderComponent, ProjectComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
}