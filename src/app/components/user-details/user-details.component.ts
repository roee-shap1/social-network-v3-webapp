import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {UserService} from '../../services/user.service';
import {User} from '../../user';


@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {
	@Input() user: User;

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private userService: UserService
	) {}
	ngOnInit() {}

	getPost(): void {
		const username = this.route.snapshot.paramMap.get('username');
		this.userService.getUser(username)
			.subscribe(user => this.user = user);
	}

	goBack(): void {
		this.location.back();
	}

	save(): void {
		this.userService.updateUser(this.user)
			.subscribe(() => this.goBack());
	}
}
