import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

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

  update<T, TDto>(url: string, id: string, object: TDto): Observable<T> {
    const completeUrl = this.getCompleteUrlWithQuery(url, id);
    return this.http.put<T>(completeUrl, JSON.stringify(object), {headers: this.buildHeaders()});
  }

  private getCompleteUrlWithQuery(url: string, query: string) {
    return `${environment.apiUrl}/${url}/${query}`;
  }

  private getCompleteUrl(url: string) {
    return `${environment.apiUrl}/${url}`;
  }

  private buildHeaders(): HttpHeaders {
    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Cache-Control', 'no-cache');
      
    return headers;
  }
}
