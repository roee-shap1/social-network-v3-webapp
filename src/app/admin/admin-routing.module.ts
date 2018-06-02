import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AdminRoutingRoutingModule } from './admin-routing-routing.module';
import { AdminComponent } from './admin.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManagePostsComponent } from './components/manage-posts/manage-posts.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth.guard';


const adminRoutes: Routes = [{
	path: '',
	component: AdminComponent,
	children: [{
		path: '',
		children: [
			{path: '', component: AdminDashboardComponent},
			{path: 'users', component: ManageUsersComponent},
			{path: 'posts', component: ManagePostsComponent},
		]
	}],
	canActivate: [AuthGuard]
}];

@NgModule({
	imports: [
		CommonModule,
		AdminRoutingRoutingModule,
		RouterModule.forChild(adminRoutes)
	],
	declarations: [
		RouterModule
	]
})

export class AdminRoutingModule {}
