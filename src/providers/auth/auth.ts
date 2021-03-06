import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  membersUrl = 'http://41.185.27.50:1985/members/1';

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  login(username: String, password: String): Observable<Object> {
    return this.http.get<Object>(this.membersUrl);
  }

}
