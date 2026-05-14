import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Personne {
  personne_id?: number;
  nom_per: string;
  prenom_per: string;
  sexe: string;
  adresse: string;
  date_birth: string;
}

@Injectable({ providedIn: 'root' })
export class PersonneService {
  private url = `${environment.apiUrl}/personnes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Personne[]>                          { return this.http.get<Personne[]>(this.url); }
  getById(id: number): Observable<Personne>                 { return this.http.get<Personne>(`${this.url}/${id}`); }
  create(data: Personne): Observable<Personne>              { return this.http.post<Personne>(this.url, data); }
  update(id: number, data: Personne): Observable<Personne>  { return this.http.put<Personne>(`${this.url}/${id}`, data); }
  delete(id: number): Observable<void>                      { return this.http.delete<void>(`${this.url}/${id}`); }
}
