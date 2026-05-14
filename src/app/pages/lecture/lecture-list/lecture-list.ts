import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LectureService, Lecture } from '../../../core/services/lecture.service';

@Component({
  selector: 'app-lecture-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="animate-fade-in">
      <!-- Header avec statistiques rapides -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-black text-gray-900 tracking-tight">Sessions de Lecture</h1>
          <p class="text-sm font-medium text-gray-500 mt-1">
            Historique des temps de lecture et emprunts sur place
          </p>
        </div>
        <div class="flex items-center gap-3">
          <div class="hidden lg:flex flex-col items-end px-4 border-r border-gray-200">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</span>
            <span class="text-lg font-black text-green-600 leading-none">{{ lectures.length }}</span>
          </div>
          <a routerLink="/lectures/nouveau"
             class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-green-600/20 hover:-translate-y-0.5 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
            Enregistrer une séance
          </a>
        </div>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        @if (lectures.length > 0) {
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50/50 border-b border-gray-100">
                  <th class="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Livre & Lecteur</th>
                  <th class="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Date</th>
                  <th class="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Plage Horaire</th>
                  <th class="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                @for (l of lectures; track l.lecture_id) {
                  <tr class="group hover:bg-slate-50/80 transition-colors">
                    <!-- Relation Livre / Personne -->
                    <td class="px-6 py-5">
                      <div class="flex items-start gap-4">
                        <div class="bg-white p-2 rounded-xl shadow-sm border border-gray-100 text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                          </svg>
                        </div>
                        <div>
                          <p class="font-bold text-gray-900 leading-tight group-hover:text-green-700 transition-colors">
                            {{ l.livre?.nom_livre || 'Livre #' + l.livre_id }}
                          </p>
                          <p class="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3">
                              <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                            </svg>
                            {{ l.personne?.nom_per }} {{ l.personne?.prenom_per }}
                          </p>
                        </div>
                      </div>
                    </td>

                    <!-- Date -->
                    <td class="px-6 py-5 text-center">
                      <div class="inline-block bg-slate-100 rounded-lg px-3 py-1.5 border border-slate-200">
                        <p class="text-sm font-bold text-slate-700">{{ l.date_lect | date:'dd MMM' }}</p>
                        <p class="text-[10px] text-slate-400 font-bold uppercase">{{ l.date_lect | date:'yyyy' }}</p>
                      </div>
                    </td>

                    <!-- Heures -->
                    <td class="px-6 py-5">
                      <div class="flex items-center justify-center gap-3">
                        <div class="flex flex-col items-center">
                          <span class="text-[9px] font-black text-green-500 uppercase">Début</span>
                          <span class="text-sm font-mono font-bold text-gray-700 bg-green-50 px-2 py-1 rounded border border-green-100">
                            {{ l.debut_heure }}
                          </span>
                        </div>
                        <div class="h-[1px] w-4 bg-gray-200 mt-3"></div>
                        <div class="flex flex-col items-center">
                          <span class="text-[9px] font-black text-red-400 uppercase">Fin</span>
                          <span class="text-sm font-mono font-bold text-gray-700 bg-red-50 px-2 py-1 rounded border border-red-100">
                            {{ l.fin_heure }}
                          </span>
                        </div>
                      </div>
                    </td>

                    <!-- Actions -->
                    <td class="px-6 py-5 text-right">
                      <div class="flex justify-end gap-2">
                        <a [routerLink]="['/lectures/edit', l.lecture_id]"
                           class="p-2 text-amber-600 hover:bg-amber-100 rounded-xl transition-all shadow-sm bg-amber-50/30 border border-amber-100">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </a>
                        <button (click)="delete(l.lecture_id!)"
                                class="p-2 text-red-500 hover:bg-red-100 rounded-xl transition-all shadow-sm bg-red-50/30 border border-red-100">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        } @else {
          <!-- Empty State -->
          <div class="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div class="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6 rotate-3 border border-slate-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 class="text-xl font-black text-gray-900 mb-2">Aucune activité enregistrée</h3>
            <p class="text-gray-500 max-w-xs mb-8">Les sessions de lecture apparaîtront ici dès qu'un membre commencera à lire.</p>
            <a routerLink="/lectures/nouveau"
               class="bg-green-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-green-600/20 hover:bg-green-700 transition-all">
              Démarrer une lecture
            </a>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.4s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LectureList implements OnInit {
  private service = inject(LectureService);
  private cdr     = inject(ChangeDetectorRef);
  lectures: Lecture[] = [];

  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe({
      next: (data: Lecture[]) => {
        this.lectures = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur:', err)
    });
  }

  delete(id: number) {
    if (confirm('Voulez-vous supprimer cette session de l’historique ?')) {
      this.service.delete(id).subscribe({
        next: () => this.load(),
        error: (err) => console.error('Erreur suppression:', err)
      });
    }
  }
}
