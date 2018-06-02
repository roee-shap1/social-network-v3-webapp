import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap, retryWhen, delay, take} from 'rxjs/operators';

import { LogService } from './log.service';
import {User} from '../user';


const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'}) export class RegisterService {
	private URL: string = '/api/register';
	constructor(
		private http: HttpClient,
		private logService: LogService
	) {}

	/** Log a RegisterService message with the LogService */
	private log(message: string): void {
		this.logService.add(`RegisterService: ${message}`);
	}

	addUser(user: User): Observable<any> {
		return this.http.post<any>(this.URL, user, httpOptions).pipe(
			catchError(this.handleError<any>('register')),
			tap(res => this.log(
				(res.token)? `Registered as: ${user.username}.` : `There was an error in registering you.`
			)),
			retryWhen(err => err.pipe(delay(1000), take(5)))
		);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			this.log(`${operation} failed: ${error.message}`);
			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
