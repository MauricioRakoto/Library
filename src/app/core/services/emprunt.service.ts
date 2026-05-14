import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Emprunt {
  emprunt_id?: number;
  heure_emp: string;
  debut_emp: string;
  fin_emp: string;
  livre_id: number;
  personne_id: number;
  livre?: { nom_livre: string };
  personne?: { nom_per: string; prenom_per: string };
}

@Injectable({ providedIn: 'root' })
export class EmpruntService {
  private url = `${environment.apiUrl}/emprunts`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Emprunt[]>                          { return this.http.get<Emprunt[]>(this.url); }
  getById(id: number): Observable<Emprunt>                 { return this.http.get<Emprunt>(`${this.url}/${id}`); }
  create(data: Emprunt): Observable<Emprunt>               { return this.http.post<Emprunt>(this.url, data); }
  update(id: number, data: Emprunt): Observable<Emprunt>   { return this.http.put<Emprunt>(`${this.url}/${id}`, data); }
  delete(id: number): Observable<void>                     { return this.http.delete<void>(`${this.url}/${id}`); }
}
