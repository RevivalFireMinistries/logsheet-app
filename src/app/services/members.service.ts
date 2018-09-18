import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class MembersService {

  url = 'http://41.185.27.50:3140/assemblies/6/members';

  constructor(private http: HttpClient) {
  }

  getMembers(): Observable<any> {
    return this.http.get(this.url);
  }
}
