import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  constructor(private http: HttpClient) {}

  isDomainUnique(domainName: string): Observable<boolean> {
    const url = `${environment.apiUrl}/domains/check-unique?name=${domainName}`;
    return this.http.get<boolean>(url);
  }
  
}
