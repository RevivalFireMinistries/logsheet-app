import { Member } from './../shared/member';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class MembersService {

  membersUrl = 'http://localhost:1985/members/1';
  logSheetUrl = 'http://localhost:1985/logsheets';
  //url = '../data/members.json';

  constructor(private http: HttpClient) {
  }

  getMembers(): Observable<Member> {
    return this.http.get<Member>(this.membersUrl);
  }

  saveLogSheet(logsheet:any): Observable<Object> {
   return this.http.post(this.logSheetUrl, logsheet)
  }
}
