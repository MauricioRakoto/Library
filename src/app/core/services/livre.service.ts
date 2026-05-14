import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Livre {
  livre_id?: number;
  nom_livre: string;
  auteur: string;
  desc: string;
  date_entre: string;
  date_sortie: string;
  matiere_id: number;
  matiere?: { nom_matiere: string };
}

@Injectable({ providedIn: 'root' })
export class LivreService {
  private url = `${environment.apiUrl}/livres`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Livre[]>                        { return this.http.get<Livre[]>(this.url); }
  getById(id: number): Observable<Livre>               { return this.http.get<Livre>(`${this.url}/${id}`); }
  create(data: Livre): Observable<Livre>               { return this.http.post<Livre>(this.url, data); }
  update(id: number, data: Livre): Observable<Livre>   { return this.http.put<Livre>(`${this.url}/${id}`, data); }
  delete(id: number): Observable<void>                 { return this.http.delete<void>(`${this.url}/${id}`); }
}
