import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RestBaseService {
  constructor(private readonly http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    const completeUrl = this.getCompleteUrl(url);
    return this.http.get<T>(completeUrl, {headers: this.buildHeaders()});
  }

  add<T,TDto>(url: string, object: TDto): Observable<T> {
    const completeUrl = this.getCompleteUrl(url);
    return this.http.post<T>(completeUrl, JSON.stringify(object), {headers: this.buildHeaders()});
  }

  delete<T>(url: string, id: string) {
    const completeUrl = this.getCompleteUrlWithQuery(url, id);
    return this.http.delete<T>(completeUrl, {headers: this.buildHeaders()});
  }
  
  deleteAss<T>(url: string) {
    const completeUrl = this.getCompleteUrl(url);
    console.log(completeUrl)
    return this.http.delete<T>(completeUrl, {headers: this.buildHeadersForAss()});
  }

  update<T, TDto>(url: string, object: TDto): Observable<T> {
    const completeUrl = this.getCompleteUrl(url);
    return this.http.patch<T>(completeUrl, object, {headers: this.buildHeaders()});
  }

  private getCompleteUrlWithQuery(url: string, query: string) {
    return `${environment.apiUrl}/${url}/${query}`;
  }

  private getCompleteUrl(url: string) {
    return `${environment.apiUrl}/${url}`;
  }

  private buildHeaders(jsonType:boolean = true): HttpHeaders {
    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
   // if(jsonType)
    //  headers = headers.set('Content-Type', 'application/json; charset=UTF-8');
    headers = headers.set('Cache-Control', 'no-cache');
    if(localStorage.getItem('token') !== null)
      headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
      
    return headers;
  }

  private buildHeadersForAss(): HttpHeaders {
    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Cache-Control', 'no-cache');
    if(localStorage.getItem('token') !== null)
      headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
      
    return headers;

  }
}
