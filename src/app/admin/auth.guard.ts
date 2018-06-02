import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'}) export class AuthGuard implements CanActivate {
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if(
			window.localStorage.getItem('token') &&
			(+window.localStorage.getItem('expiration')) < new Date().getTime()
		) return true;
		else return false;
	}
}
