import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  private apiUrl = `${environment.apiUrl}/publishers`;

  constructor(private http: HttpClient) {}

  getAllPublishers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/publishers`);
  }

  addPublisher(publisher: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, publisher);
  }

  updatePublisher(name: string, publisher: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${name}`, publisher);
  }

  deletePublisher(name: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${name}`);
  }
}
