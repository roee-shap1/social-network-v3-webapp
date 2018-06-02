import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {LoginService} from '../../services/login.service';
import {RegisterService} from '../../services/register.service';
import {User} from '../../user';
import {Post} from '../../post';


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
	posts: Post[] = [];
	users: User[] = [];

	constructor(
		private userService: UserService,
		private postService: PostService
	) {}
	ngOnInit() {}

	logout(): void {
		localStorage.removeItem('token');
		localStorage.removeItem('expiration');
		console.log(`You've been logged out.`);
	}
	isLoggedIn(): Boolean {
		return (localStorage.getItem('token') && localStorage.getItem('expiration'))? true : false;
	}
	refresh(): void {
		window.location.reload();
	}
}
