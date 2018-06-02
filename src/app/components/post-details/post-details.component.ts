import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {PostService} from '../../services/post.service';
import {Post} from '../../post';


@Component({
	selector: 'app-post-details',
	templateUrl: './post-details.component.html',
	styleUrls: ['./post-details.component.css']
})

export class PostDetailsComponent implements OnInit {
	@Input() post: Post;

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private postService: PostService
	) {}
	ngOnInit() {
		this.getPost();
	}

	getPost(): void {
		const id = this.route.snapshot.paramMap.get('id');
		this.postService.getPost(id)
			.subscribe(post => this.post = post);
	}

	goBack(): void {
		this.location.back();
	}

	save(): void {
		this.postService.updatePost(this.post)
			.subscribe(() => this.goBack());
	}
}
