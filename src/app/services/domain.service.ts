import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})

export class DomainService {
  private apiUrl = `${environment.apiUrl}/domains`;

  constructor(private http: HttpClient) {}

  getAllDomains(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addDomain(domain: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, domain);
  }

  updateDomain(id: number, domain: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, domain);
  }

  deleteDomain(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
