import { Component, OnInit, Input } from '@angular/core';

import {LoginService} from '../../services/login.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	@Input() private username: string;
	@Input() private password: string;
	constructor(private loginService: LoginService) {}
	ngOnInit() {
		this.isTokenExpired();
	}

	checkRequiredFields(): Boolean {
		if(this.username && this.password) return true;
		else return false;
	}
	login() {
		if(!this.checkRequiredFields()) return;
		this.loginService.login(this.username, this.password)
			.subscribe(data => {
				if(!data) return;
				if(data.error) console.error(data.error);
				else if(data.token && data.expiration) {
					window.localStorage.setItem('token', JSON.stringify(data.token));
					window.localStorage.setItem('isAdmin', JSON.stringify(data.isAdmin));
					window.localStorage.setItem('expiration', JSON.stringify(data.expiration));
				}
			});
	}
	logout(): void {
		localStorage.removeItem('token');
		localStorage.removeItem('isAdmin');
		localStorage.removeItem('expiration');
	}
	isLoggedIn(): Boolean {
		return (
			localStorage.getItem('token') &&
			localStorage.getItem('isAdmin') &&
			localStorage.getItem('expiration')
		)? true : false;
	}
	isTokenExpired(): Boolean {
		if(new Date().getTime() > (+localStorage.getItem('expiration'))) {
			this.logout();
			return true;
		}
		else return false;
	}
}
