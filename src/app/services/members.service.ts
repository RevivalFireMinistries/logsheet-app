import { Member } from './../shared/member';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class MembersService {

  url = 'http://41.185.27.50:3140/assemblies/1/members';
  logSheetUrl = 'http://localhost:1985/logsheets';
  //url = '../data/members.json';

  constructor(private http: HttpClient) {
  }

  getMembers(): Observable<Member> {
    return this.http.get<Member>(this.url);
  }

  saveLogSheet(logsheet:any): Observable<Object> {
   return this.http.post(this.logSheetUrl, logsheet)
  }
}
