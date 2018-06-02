import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }    from '@angular/forms';

import { AppComponent } from './app.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import {LogService} from './services/log.service';
import {UserService} from './services/user.service';
import {PostService} from './services/post.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ManageUsersComponent } from './admin/components/manage-users/manage-users.component';
import { ManagePostsComponent } from './admin/components/manage-posts/manage-posts.component';


@NgModule({
	declarations: [
		AppComponent,
		PostDetailsComponent,
		UserDetailsComponent,
		DashboardComponent,
		LoginComponent,
		RegisterComponent,
		AdminDashboardComponent,
		AdminComponent,
		ManageUsersComponent,
		ManagePostsComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		FormsModule
	],
	providers: [
		LogService,
		UserService,
		PostService
	],
	bootstrap: [AppComponent]
})

export class AppModule {}
