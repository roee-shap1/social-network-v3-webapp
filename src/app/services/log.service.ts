import {Injectable, HostListener} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap, retryWhen, delay, take} from 'rxjs/operators';


const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		'x-access-token': localStorage.getItem('token')
	})
};

@Injectable({providedIn: 'root'}) export class LogService {
	private log: string[] = [];
	private URL: string = '/api/logs';
	constructor(private http: HttpClient) {}

	add(entry: string): void {
		this.log.push(entry);
		console.log(entry);
		// this.putLog(entry).subscribe(console.log);
	}
	clear(): void {
		this.log = [];
	}

	@HostListener('window:beforeunload', ['$event']) onLeave() {
		this.dumpLogToStorage()
			.subscribe(() => console.log('Logs dumped successfully.'));
	}

	putLog(entry: string): Observable<string> {
		return this.http.put<string>(this.URL, entry, httpOptions).pipe(
			tap(_ => console.log(`Log entry sent.`)),
			catchError(this.handleError<string>('putLog')),
			retryWhen(err => err.pipe(delay(3000), take(3))),
		);
	}

	// getLogsFromStorage(): Observable<string[]> {
	// 	return this.http.get<string[]>(this.URL).pipe(
	// 		tap(_ => console.log(`Fetched the log file.`)),
	// 		catchError(this.handleError('getLogsFromStorage', []))
	// 	);
	// }
	dumpLogToStorage(): Observable<string[]> {
		return this.http.post<string[]>(this.URL, this.log, httpOptions).pipe(
			tap(_ => this.add(`The logs have been dumped successfully.`)),
			catchError(this.handleError<string[]>('dumpLogToStorage'))
		);
	}

	/**
	* Handle HTTP operations that failed and let the app continue.
	* @param operation - name of the operation that failed
	* @param result - optional value to return as the observable result
	*/
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			this.add(`LogService: ${operation} failed: ${error.message}`);
			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
