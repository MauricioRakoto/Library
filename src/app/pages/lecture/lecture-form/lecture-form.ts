import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LectureService, Lecture } from '../../../core/services/lecture.service';
import { LivreService, Livre } from '../../../core/services/livre.service';
import { PersonneService, Personne } from '../../../core/services/personne.service';

@Component({
  selector: 'app-lecture-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <div class="max-w-2xl mx-auto animate-fade-in">

      <!-- Fil d'ariane / Retour -->
      <nav class="mb-8 flex items-center gap-2 text-sm font-bold">
        <a routerLink="/lectures" class="text-gray-400 hover:text-green-600 transition-colors">Lectures</a>
        <span class="text-gray-300">/</span>
        <span class="text-gray-900">{{ isEdit ? 'Édition de session' : 'Nouvelle session' }}</span>
      </nav>

      <div class="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-gray-100 overflow-hidden">

        <!-- Header stylisé -->
        <div class="px-10 py-10 bg-gradient-to-br from-slate-50 to-white border-b border-gray-100 relative">
          <div class="relative z-10">
            <h1 class="text-3xl font-black text-gray-900 tracking-tight">
              {{ isEdit ? 'Modifier la séance' : 'Nouvelle lecture' }}
            </h1>
            <p class="text-sm text-gray-500 font-medium mt-2">
              Associez un lecteur à un ouvrage et définissez le temps passé.
            </p>
          </div>
          <div class="absolute top-8 right-10 text-green-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-24 h-24 rotate-12">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        </div>

        <form (ngSubmit)="submit()" class="p-10 space-y-8">

          <!-- Section : Acteurs -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Livre sélectionné</label>
              <div class="relative">
                <select [(ngModel)]="lecture.livre_id" name="livre_id"
                        class="w-full px-5 py-4 bg-slate-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all appearance-none cursor-pointer">
                  <option [value]="0" disabled>Choisir un livre...</option>
                  @for (l of livres; track l.livre_id) {
                    <option [value]="l.livre_id">{{ l.nom_livre }}</option>
                  }
                </select>
                <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Lecteur</label>
              <div class="relative">
                <select [(ngModel)]="lecture.personne_id" name="personne_id"
                        class="w-full px-5 py-4 bg-slate-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all appearance-none cursor-pointer">
                  <option [value]="0" disabled>Choisir une personne...</option>
                  @for (p of personnes; track p.personne_id) {
                    <option [value]="p.personne_id">{{ p.nom_per }} {{ p.prenom_per }}</option>
                  }
                </select>
                <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Section : Temps -->
          <div class="bg-green-50/50 rounded-3xl p-8 space-y-6 border border-green-100/50">
            <div class="space-y-2">
              <label class="text-[11px] font-black text-green-700/60 uppercase tracking-widest ml-1">Date de la séance</label>
              <input type="date" [(ngModel)]="lecture.date_lect" name="date_lect"
                     class="w-full px-5 py-4 bg-white border border-green-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all" />
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[11px] font-black text-green-700/60 uppercase tracking-widest ml-1">Heure de début</label>
                <div class="relative">
                  <input type="time" [(ngModel)]="lecture.debut_heure" name="debut_heure"
                         class="w-full px-5 py-4 bg-white border border-green-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all" />
                </div>
              </div>
              <div class="space-y-2">
                <label class="text-[11px] font-black text-green-700/60 uppercase tracking-widest ml-1">Heure de fin</label>
                <div class="relative">
                  <input type="time" [(ngModel)]="lecture.fin_heure" name="fin_heure"
                         class="w-full px-5 py-4 bg-white border border-green-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all" />
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between pt-4">
            <a routerLink="/lectures" class="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
              Annuler
            </a>
            <button type="submit"
                    [disabled]="!lecture.livre_id || !lecture.personne_id"
                    class="bg-gray-900 hover:bg-black disabled:bg-gray-200 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl text-sm font-black transition-all shadow-xl shadow-gray-900/20 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
              </svg>
              {{ isEdit ? 'Mettre à jour la session' : 'Enregistrer la lecture' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    input[type="time"]::-webkit-calendar-picker-indicator {
      filter: invert(48%) sepia(13%) saturate(3207%) hue-rotate(110deg) brightness(95%) contrast(80%);
      cursor: pointer;
    }
  `]
})
export class LectureForm implements OnInit {
  private service         = inject(LectureService);
  private livreService    = inject(LivreService);
  private personneService = inject(PersonneService);
  private route           = inject(ActivatedRoute);
  private router          = inject(Router);

  lecture: Lecture = { debut_heure: '', fin_heure: '', date_lect: '', livre_id: 0, personne_id: 0 };
  livres: Livre[]     = [];
  personnes: Personne[] = [];
  isEdit = false;

  ngOnInit() {
    this.livreService.getAll().subscribe((data: Livre[]) => this.livres = data);
    this.personneService.getAll().subscribe((data: Personne[]) => this.personnes = data);

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.service.getById(+id).subscribe((data: Lecture) => this.lecture = data);
    }
  }

  submit() {
    if (this.lecture.livre_id === 0 || this.lecture.personne_id === 0) return;

    const obs = this.isEdit
      ? this.service.update(this.lecture.lecture_id!, this.lecture)
      : this.service.create(this.lecture);

    obs.subscribe(() => this.router.navigate(['/lectures']));
  }
}
