import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Matiere {
  matiere_id?: number;
  nom_matiere: string;
}

@Injectable({ providedIn: 'root' })
export class MatiereService {
  private url = `${environment.apiUrl}/matieres`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Matiere[]>                          { return this.http.get<Matiere[]>(this.url); }
  getById(id: number): Observable<Matiere>                 { return this.http.get<Matiere>(`${this.url}/${id}`); }
  create(data: Matiere): Observable<Matiere>               { return this.http.post<Matiere>(this.url, data); }
  update(id: number, data: Matiere): Observable<Matiere>   { return this.http.put<Matiere>(`${this.url}/${id}`, data); }
  delete(id: number): Observable<void>                     { return this.http.delete<void>(`${this.url}/${id}`); }
}
