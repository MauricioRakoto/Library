import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { EmpruntService } from './emprunt.service';
import { LectureService } from './lecture.service';

export interface Notification {
  id: number;
  type: 'danger' | 'warning' | 'info';
  categorie: 'emprunt' | 'lecture';
  titre: string;
  message: string;
  detail: string;
  date: string;
  lu: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private empruntService = inject(EmpruntService);
  private lectureService = inject(LectureService);

  private _notifications = new BehaviorSubject<Notification[]>([]);
  notifications$ = this._notifications.asObservable();

  get count(): number {
    return this._notifications.value.filter(n => !n.lu).length;
  }

  charger() {
    forkJoin({
      emprunts: this.empruntService.getAll(),
      lectures: this.lectureService.getAll(),
    }).subscribe({
      next: ({ emprunts, lectures }) => {
        const notifs: Notification[] = [];
        let id = 1;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // ── EMPRUNTS : debut_emp → fin_emp ──────────────────────────
        (emprunts as any[]).forEach(e => {
          const debut = new Date(e.debut_emp);
          const fin   = new Date(e.fin_emp);
          debut.setHours(0, 0, 0, 0);
          fin.setHours(0, 0, 0, 0);

          const dureeTotal = Math.ceil((fin.getTime() - debut.getTime()) / 86400000);
          const joursRestants = Math.ceil((fin.getTime() - today.getTime()) / 86400000);

          const nom   = e.personne?.nom_per
            ? `${e.personne.nom_per} ${e.personne.prenom_per}`
            : `Emprunt #${e.emprunt_id}`;
          const livre = e.livre?.nom_livre || `Livre #${e.livre_id}`;

          if (joursRestants < 0) {
            // Retard
            notifs.push({
              id: id++,
              type: 'danger',
              categorie: 'emprunt',
              titre: 'Emprunt en retard',
              message: `${nom} — "${livre}"`,
              detail: `Retard de ${Math.abs(joursRestants)}j (durée prévue : ${dureeTotal}j)`,
              date: e.fin_emp,
              lu: false,
            });
          } else if (joursRestants <= 3) {
            // Retour imminent
            notifs.push({
              id: id++,
              type: 'warning',
              categorie: 'emprunt',
              titre: 'Retour imminent',
              message: `${nom} — "${livre}"`,
              detail: `Retour dans ${joursRestants}j sur ${dureeTotal}j d'emprunt`,
              date: e.fin_emp,
              lu: false,
            });
          }
        });

        // ── LECTURES : debut_heure → fin_heure ─────────────────────
        (lectures as any[]).forEach(l => {
          if (!l.debut_heure || !l.fin_heure) return;

          const [dh, dm] = l.debut_heure.split(':').map(Number);
          const [fh, fm] = l.fin_heure.split(':').map(Number);

          const debutMin = dh * 60 + dm;
          const finMin   = fh * 60 + fm;
          const dureeMin = finMin - debutMin;

          const nom   = l.personne?.nom_per
            ? `${l.personne.nom_per} ${l.personne.prenom_per}`
            : `Lecture #${l.lecture_id}`;
          const livre = l.livre?.nom_livre || `Livre #${l.livre_id}`;
          const dateStr = l.date_lect;

          if (dureeMin < 0) {
            // Heure fin < heure début → incohérence
            notifs.push({
              id: id++,
              type: 'danger',
              categorie: 'lecture',
              titre: 'Horaire lecture invalide',
              message: `${nom} — "${livre}"`,
              detail: `Fin (${l.fin_heure}) antérieure au début (${l.debut_heure})`,
              date: dateStr,
              lu: false,
            });
          } else if (dureeMin === 0) {
            // Début = Fin → durée nulle
            notifs.push({
              id: id++,
              type: 'warning',
              categorie: 'lecture',
              titre: 'Durée de lecture nulle',
              message: `${nom} — "${livre}"`,
              detail: `Début et fin identiques (${l.debut_heure})`,
              date: dateStr,
              lu: false,
            });
          } else if (dureeMin > 240) {
            // Lecture > 4h → alerte longue durée
            const heures  = Math.floor(dureeMin / 60);
            const minutes = dureeMin % 60;
            notifs.push({
              id: id++,
              type: 'warning',
              categorie: 'lecture',
              titre: 'Lecture longue durée',
              message: `${nom} — "${livre}"`,
              detail: `Durée : ${heures}h${minutes > 0 ? minutes + 'min' : ''} (${l.debut_heure} → ${l.fin_heure})`,
              date: dateStr,
              lu: false,
            });
          }
        });

        // Trier : danger en premier, puis warning
        notifs.sort((a, b) => {
          const order: any = { danger: 0, warning: 1, info: 2 };
          return order[a.type] - order[b.type];
        });

        this._notifications.next(notifs);
      },
      error: err => console.error('Erreur notifications:', err)
    });
  }

  marquerLu(id: number) {
    const updated = this._notifications.value.map(n =>
      n.id === id ? { ...n, lu: true } : n
    );
    this._notifications.next(updated);
  }

  toutMarquerLu() {
    const updated = this._notifications.value.map(n => ({ ...n, lu: true }));
    this._notifications.next(updated);
  }
}
