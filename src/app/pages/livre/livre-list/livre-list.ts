import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LivreService, Livre } from '../../../core/services/livre.service';

@Component({
  selector: 'app-livre-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="animate-fade-in">
      <!-- En-tête -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-black text-gray-900 tracking-tight">Collection</h1>
          <p class="text-sm font-medium text-gray-500 mt-1 flex items-center gap-2">
            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            {{ livres.length }} ouvrage(s) répertorié(s)
          </p>
        </div>
        <a routerLink="/livres/nouveau"
           class="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-green-600/20 hover:-translate-y-0.5 active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
          Ajouter un ouvrage
        </a>
      </div>

      <!-- Table Card -->
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        @if (livres.length > 0) {
          <div class="overflow-x-auto">
            <table class="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr class="bg-slate-50/50">
                  <th class="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Livre & Auteur</th>
                  <th class="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Catégorie</th>
                  <th class="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Flux (Entrée/Sortie)</th>
                  <th class="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                @for (l of livres; track l.livre_id) {
                  <tr class="group hover:bg-green-50/30 transition-colors">
                    <!-- Titre et Auteur -->
                    <td class="px-6 py-5">
                      <div class="flex items-center gap-4">
                        <div class="w-10 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-green-600 transition-colors shadow-sm border border-gray-100">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                          </svg>
                        </div>
                        <div>
                          <p class="font-bold text-gray-900 group-hover:text-green-700 transition-colors">{{ l.nom_livre }}</p>
                          <p class="text-xs text-gray-500 font-medium italic">par {{ l.auteur }}</p>
                        </div>
                      </div>
                    </td>

                    <!-- Matière -->
                    <td class="px-6 py-5">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/10">
                        {{ l.matiere?.nom_matiere || l.matiere_id }}
                      </span>
                    </td>

                    <!-- Dates Entrée / Sortie -->
                    <td class="px-6 py-5">
                      <div class="flex flex-col gap-1">
                        <div class="flex items-center gap-2 text-[11px]">
                          <span class="text-gray-400 font-bold w-4">IN</span>
                          <span class="text-gray-600 font-medium">{{ l.date_entre | date:'dd/MM/yyyy' }}</span>
                        </div>
                        <div class="flex items-center gap-2 text-[11px]">
                          <span class="text-gray-400 font-bold w-4">OUT</span>
                          <span [class]="l.date_sortie ? 'text-amber-600' : 'text-gray-300 italic'">
                            {{ l.date_sortie ? (l.date_sortie | date:'dd/MM/yyyy') : 'Non défini' }}
                          </span>
                        </div>
                      </div>
                    </td>

                    <!-- Actions -->
                    <td class="px-6 py-5 text-right">
                      <div class="flex justify-end gap-2">
                        <a [routerLink]="['/livres/edit', l.livre_id]"
                           class="p-2.5 text-amber-600 hover:bg-amber-50 rounded-xl transition-all active:scale-90"
                           title="Modifier">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </a>
                        <button (click)="delete(l.livre_id!)"
                                class="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
                                title="Supprimer">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
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
          <!-- État Vide -->
          <div class="flex flex-col items-center justify-center py-24 px-6 text-center">
            <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-12 h-12">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Bibliothèque vide</h3>
            <p class="text-gray-500 max-w-sm mb-8 italic">Il n'y a aucun livre enregistré pour le moment. Commencez par en ajouter un.</p>
            <a routerLink="/livres/nouveau"
               class="bg-green-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20">
              Enregistrer le premier livre
            </a>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    th {
      white-space: nowrap;
    }
  `]
})
export class LivreList implements OnInit {
  private service = inject(LivreService);
  private cdr     = inject(ChangeDetectorRef);
  livres: Livre[] = [];

  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe({
      next: (data: Livre[]) => {
        this.livres = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur:', err)
    });
  }

  delete(id: number) {
    if (confirm('Voulez-vous vraiment retirer cet ouvrage de la collection ?')) {
      this.service.delete(id).subscribe({
        next: () => this.load(),
        error: (err) => console.error('Erreur suppression:', err)
      });
    }
  }
}
