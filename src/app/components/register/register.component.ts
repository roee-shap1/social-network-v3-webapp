import { Component, OnInit } from '@angular/core';

import {RegisterService} from '../../services/register.service';
import {User} from '../../user';


@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
	private username: String;
	private email: String;
	private password: String;
	private password2: String;
	private name: String
	private bio: String;
	private dateOfBirth: Date;
	private gender: String;
	constructor(
		private registerService: RegisterService
	) {}
	ngOnInit() {}

	checkRequiredFields(): Boolean {
		if(this.username && this.password && (this.password === this.password2)) return true;
		else return false;
	}
	registerUser() {
		if(this.checkRequiredFields()) {
			this.registerService.addUser({
				username: this.username,
				email: this.email,
				password: this.password,
				name: this.name,
				bio: this.bio,
				gender: this.gender,
			} as User).subscribe(data => {
				if(!data) return;
				if(data.error) console.error(data.error);
				if(data.token && data.expiration) {
					localStorage.setItem('token', JSON.stringify(data.token));
					localStorage.setItem('expiration', JSON.stringify(data.expiration));
				}
			});
		}
		else console.warn('There was an error in some of the required fields.');
	}
}
