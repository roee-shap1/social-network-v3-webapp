import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import { LogService } from './log.service';
import { User } from '../user';


const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		'x-access-token': localStorage.getItem('token')
	})
};

@Injectable({providedIn: 'root'}) export class UserService {
	private URL = '/api/users';
	constructor(
		private http: HttpClient,
		private logService: LogService
	) {}

	/** Log a UserService message with the LogService */
	private log(message: string) {
		this.logService.add('UserService: ' + message);
	}

	/** GET users from the server */
	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.URL).pipe(
			tap(users => this.log(`Fetched users.`)),
			catchError(this.handleError('getUsers', []))
		);
	}

	/** GET user by username. Will 404 if the username was not found */
	getUser(username: string): Observable<User> {
		return this.http.get<User>(`${this.URL}/${username}`).pipe(
			tap(_ => this.log(`Fetched user ${username}.`)),
			catchError(this.handleError<User>(`getUser ${username}`))
		);
	}

	//////// Edit methods //////////

	/** POST: add a new user to the server */
	addUser(user: User): Observable<User> {
		return this.http.post<User>(this.URL, user, httpOptions).pipe(
			tap((user: User) => this.log(`Added user w/ the username "${user.username}".`)),
			catchError(this.handleError<User>('addUser'))
		);
	}

	/** PUT: update the user on the server */
	updateUser(user: User): Observable<any> {
		return this.http.put(this.URL, user, httpOptions).pipe(
			tap(_ => this.log(`Updated the user "${user.username}".`)),
			catchError(this.handleError<any>('updateUser'))
		);
	}

	/** DELETE: delete the user from the server */
	deleteUser(user: User | string): Observable<User> {
		const username = (typeof user === 'string')? user : user.username;
		const url = `${this.URL}/${username}`;
		return this.http.delete<User>(url, httpOptions).pipe(
			tap(_ => this.log(`Deleted the user "${username}".`)),
			catchError(this.handleError<User>('deleteUser'))
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
