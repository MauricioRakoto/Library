import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmpruntService, Emprunt } from '../../../core/services/emprunt.service';

@Component({
  selector: 'app-emprunt-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="animate-fade-in">
      <!-- Header avec indicateurs -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-black text-gray-900 tracking-tight">Gestion des Emprunts</h1>
          <p class="text-sm font-medium text-gray-500 mt-1">Suivi des sorties et des retours de livres</p>
        </div>
        <div class="flex gap-3">
          <a routerLink="/emprunts/nouveau"
             class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-green-600/20 hover:-translate-y-0.5 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
            Nouvel Emprunt
          </a>
        </div>
      </div>

      <!-- Table Card -->
      <div class="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-gray-100 overflow-hidden">
        @if (emprunts.length > 0) {
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50/50 border-b border-gray-100">
                  <th class="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Ouvrage & Emprunteur</th>
                  <th class="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Début</th>
                  <th class="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Date de Retour</th>
                  <th class="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                @for (e of emprunts; track e.emprunt_id) {
                  <tr class="group hover:bg-slate-50/50 transition-colors">
                    <!-- Info Livre & Personne -->
                    <td class="px-6 py-5">
                      <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center border border-green-100">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd" d="M9.664 1.319a.75.75 0 0 1 .672 0l7.5 3.75a.75.75 0 0 1 0 1.342l-7.5 3.75a.75.75 0 0 1-.672 0l-7.5-3.75a.75.75 0 0 1 0-1.342l7.5-3.75ZM2.458 10.735l6.705 3.353a.75.75 0 0 0 .674 0l6.703-3.352a.75.75 0 1 1 .67 1.343l-6.703 3.352a2.25 2.25 0 0 1-2.022 0l-6.705-3.353a.75.75 0 1 1 .678-1.343Zm-.002 4.413 6.705 3.352a.75.75 0 0 0 .674 0l6.703-3.352a.75.75 0 1 1 .67 1.343l-6.703 3.352a2.25 2.25 0 0 1-2.022 0l-6.705-3.352a.75.75 0 1 1 .678-1.343Z" clip-rule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p class="font-bold text-gray-900 leading-tight">
                            {{ e.livre?.nom_livre || 'Livre ID: ' + e.livre_id }}
                          </p>
                          <p class="text-xs font-semibold text-gray-500 mt-0.5">
                            Par {{ e.personne?.nom_per }} {{ e.personne?.prenom_per }}
                          </p>
                        </div>
                      </div>
                    </td>

                    <!-- Heure & Début -->
                    <td class="px-6 py-5 text-center">
                      <p class="text-sm font-bold text-gray-700">{{ e.debut_emp | date:'dd MMM yyyy' }}</p>
                      <p class="text-[10px] font-black text-gray-400 uppercase mt-0.5">à {{ e.heure_emp }}</p>
                    </td>

                    <!-- Date Retour + Statut -->
                    <td class="px-6 py-5 text-center">
                      <div class="inline-flex flex-col items-center">
                        <span [class]="isExpired(e.fin_emp)
                          ? 'bg-red-50 text-red-600 border-red-100'
                          : 'bg-green-50 text-green-700 border-green-100'"
                          class="px-4 py-1.5 rounded-xl text-xs font-black border">
                          {{ e.fin_emp | date:'dd/MM/yyyy' }}
                        </span>
                        @if (isExpired(e.fin_emp)) {
                          <span class="text-[9px] font-black text-red-400 uppercase mt-1 tracking-tighter">Retard constaté</span>
                        }
                      </div>
                    </td>

                    <!-- Actions -->
                    <td class="px-6 py-5 text-right">
                      <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a [routerLink]="['/emprunts/edit', e.emprunt_id]"
                           class="p-2.5 text-amber-600 hover:bg-amber-100 rounded-xl transition-colors border border-transparent hover:border-amber-200">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </a>
                        <button (click)="delete(e.emprunt_id!)"
                                class="p-2.5 text-red-500 hover:bg-red-100 rounded-xl transition-colors border border-transparent hover:border-red-200">
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
          <div class="flex flex-col items-center justify-center py-20 px-6">
            <div class="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6 border border-slate-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </div>
            <p class="text-xl font-black text-gray-900">Aucun emprunt en cours</p>
            <p class="text-sm text-gray-500 mt-2 mb-8">Tous les livres sont actuellement en rayon.</p>
            <a routerLink="/emprunts/nouveau"
               class="bg-green-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-green-600/20 hover:bg-green-700 transition-all">
              Créer un emprunt
            </a>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class EmpruntList implements OnInit {
  private service = inject(EmpruntService);
  private cdr     = inject(ChangeDetectorRef);
  emprunts: Emprunt[] = [];

  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe({
      next: (data: Emprunt[]) => {
        this.emprunts = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur:', err)
    });
  }

  isExpired(date: string): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) < today;
  }

  delete(id: number) {
    if (confirm('Voulez-vous vraiment annuler cet emprunt ?')) {
      this.service.delete(id).subscribe({
        next: () => this.load(),
        error: (err) => console.error('Erreur suppression:', err)
      });
    }
  }
}
