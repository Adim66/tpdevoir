import { Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { CatalogConfigComponent } from './catalog-config/catalog-config.component';
import { CatalogComponent } from './catalog/catalog.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectComponent } from './project/project.component';
import { RegisterComponent } from './register/register.component';
export const routes: Routes = [

    { path: 'AppHeader', component: AppHeaderComponent, canActivate: [AuthGuard]},
    { path: 'CatalogConfig', component: CatalogConfigComponent, canActivate: [AuthGuard]},
    { path: 'Catalog', component: CatalogComponent, canActivate: [AuthGuard]},
    { path: 'Home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'AdminHome', component: AdminHomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'Cart', component: CartComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'Profile', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'project' , component: ProjectComponent, canActivate: [AuthGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route
  ];
