import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap, catchError} from 'rxjs/operators';

import {LogService} from './log.service';
import {Post} from '../post';


const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	'x-access-token': localStorage.getItem('token')
};

@Injectable({providedIn: 'root'}) export class PostService {
	private URL = '/api/posts';
	constructor(
		private http: HttpClient,
		private logService: LogService
	) {}

	/** Log a PostService message with the MessageService */
	private log(message: string) {
		this.logService.add('PostService: ' + message);
	}

	/** GET posts from the server */
	getPosts(): Observable<Post[]> {
		return this.http.get<Post[]>(this.URL).pipe(
			tap(_ => this.log(`Fetched posts.`)),
			catchError(this.handleError('getPosts', []))
		);
	}

	/** GET post by id. Will 404 if id not found */
	getPost(id: string): Observable<Post> {
		return this.http.get<Post>(`${this.URL}/${id}`).pipe(
			tap(_ => this.log(`Fetched post ID ${id}.`)),
			catchError(this.handleError<Post>(`getPost ${id}`))
		);
	}

	//////// Edit methods //////////

	/** POST: add a new post to the server */
	addPost(post: Post): Observable<Post> {
		return this.http.post<Post>(this.URL, post, httpOptions).pipe(
			tap((post: Post) => this.log(`Added post w/ the postname "${post.id}".`)),
			catchError(this.handleError<Post>('addPost'))
		);
	}

	/** PUT: update the post on the server */
	updatePost(post: Post): Observable<any> {
		return this.http.put(this.URL, post, httpOptions).pipe(
			tap(_ => this.log(`Updated the post "${post.id}".`)),
			catchError(this.handleError<any>('updatePost'))
		);
	}

	/** DELETE: delete the post from the server */
	deletePost(post: Post | string): Observable<Post> {
		const id = (typeof post === 'string')? post : post.id;
		const url = `${this.URL}/${id}`;
		return this.http.delete<Post>(url, httpOptions).pipe(
			tap(_ => this.log(`Deleted the post ID "${id}".`)),
			catchError(this.handleError<Post>('deletePost'))
		);
	}

	/**
	* Handle HTTP operations that failed and let the app continue.
	* @param operation - name of the operation that failed
	* @param result - optional value to return as the observable result
	*/
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			this.log(`${operation} failed: ${error.message}`);
			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
