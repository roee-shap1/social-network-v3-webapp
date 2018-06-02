import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap, retryWhen, delay, take} from 'rxjs/operators';

import { LogService } from './log.service';


const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'}) export class LoginService {
	private URL: string = '/api/login';
	constructor(
		private http: HttpClient,
		private logService: LogService
	) {}

	/** Log a LoginService message with the LogService */
	private log(message: string) {
		this.logService.add('LoginService: ' + message);
	}

	login(username, password): Observable<any> {
		return this.http.post<any>(
			this.URL,
			{username, password},
			httpOptions
		)
		.pipe(
			catchError(this.handleError<any>('login')),
			tap(data => this.log(
				(data && data.token)? `Logged in as: ${username}.` : `There was an error in logging you in.`
			)),
			retryWhen(err => err.pipe(delay(2000), take(3)))
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
