import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManagePostsComponent } from './components/manage-posts/manage-posts.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';

import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
	imports: [
		CommonModule,
		AdminRoutingModule
	],
	declarations: [
		AdminComponent,
		AdminDashboardComponent,
		ManageUsersComponent,
		ManagePostsComponent
	]
})

export class AdminModule {}
