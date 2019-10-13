import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders,HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  constructor(private http: HttpClient) { }

  postData(data): any {      
    const body = new HttpParams()          
    .set('grant_type', data.grant_type)          
    .set('username', data.username)    
    .set('password', data.password)    
    return this.http.post(`${environment.API_Url}/token`, body.toString(), {observe:'response',headers: { 'Content-Type': 'application/x-www-form-urlencoded' },});    
  }    
}
