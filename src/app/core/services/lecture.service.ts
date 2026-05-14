import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Lecture {
  lecture_id?: number;
  debut_heure: string;
  fin_heure: string;
  date_lect: string;
  livre_id: number;
  personne_id: number;
  livre?: { nom_livre: string };
  personne?: { nom_per: string; prenom_per: string };
}

@Injectable({ providedIn: 'root' })
export class LectureService {
  private url = `${environment.apiUrl}/lectures`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Lecture[]>                          { return this.http.get<Lecture[]>(this.url); }
  getById(id: number): Observable<Lecture>                 { return this.http.get<Lecture>(`${this.url}/${id}`); }
  create(data: Lecture): Observable<Lecture>               { return this.http.post<Lecture>(this.url, data); }
  update(id: number, data: Lecture): Observable<Lecture>   { return this.http.put<Lecture>(`${this.url}/${id}`, data); }
  delete(id: number): Observable<void>                     { return this.http.delete<void>(`${this.url}/${id}`); }
}
