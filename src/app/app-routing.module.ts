import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {PostDetailsComponent} from './components/post-details/post-details.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './admin/auth.guard';


const routes: Routes = [
	{ path: '', component: DashboardComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'users/:username', component: UserDetailsComponent },
	{ path: 'posts/:id', component: PostDetailsComponent },
	{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
	// { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})

export class AppRoutingModule {}
