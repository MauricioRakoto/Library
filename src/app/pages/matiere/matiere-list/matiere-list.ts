import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatiereService, Matiere } from '../../../core/services/matiere.service';

@Component({
  selector: 'app-matiere-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="animate-fade-in">
      <!-- Header avec style raffiné -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Matières</h1>
          <div class="flex items-center gap-2 mt-1">
            <span class="flex h-2 w-2 rounded-full bg-green-500"></span>
            <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">{{ matieres.length }} ressources répertoriées</p>
          </div>
        </div>
        <a routerLink="/matieres/nouveau"
           class="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg shadow-green-600/20 flex items-center gap-2 hover:-translate-y-0.5 active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nouvelle matière
        </a>
      </div>

      <!-- Conteneur de Table -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        @if (matieres.length > 0) {
          <table class="w-full text-left">
            <thead>
            <tr class="bg-slate-50/50 border-b border-gray-100">
              <th class="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">ID</th>
              <th class="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Désignation</th>
              <th class="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              @for (m of matieres; track m.matiere_id) {
                <tr class="group hover:bg-green-50/30 transition-all duration-200">
                  <td class="px-8 py-5">
                    <span class="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">#{{ m.matiere_id }}</span>
                  </td>
                  <td class="px-8 py-5">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.193-.171.422-.267.662-.267h15.176c.24 0 .47.096.662.267l1.71 1.518c.24.214.288.56.113.834a1.125 1.125 0 0 1-1.835.132L18.41 10.5H5.59l-1.84 1.777a1.125 1.125 0 0 1-1.835-.132c-.175-.274-.127-.62.113-.834l1.711-1.518ZM19.5 21h-15c-.828 0-1.5-.672-1.5-1.5v-6.75h18V19.5c0 .828-.672 1.5-1.5 1.5Z" />
                        </svg>
                      </div>
                      <span class="font-semibold text-gray-700 group-hover:text-green-700 transition-colors">
                        {{ m.nom_matiere }}
                      </span>
                    </div>
                  </td>
                  <td class="px-8 py-5">
                    <div class="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a [routerLink]="['/matieres/edit', m.matiere_id]"
                         class="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors tooltip" title="Modifier">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </a>
                      <button (click)="delete(m.matiere_id!)"
                              class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors tooltip" title="Supprimer">
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
        } @else {
          <!-- Empty State Stylé -->
          <div class="flex flex-col items-center justify-center py-20 bg-gray-50/50">
            <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900">Aucune matière</h3>
            <p class="text-gray-500 text-sm mb-6">Commencez par ajouter votre première matière à l'inventaire.</p>
            <a routerLink="/matieres/nouveau"
               class="bg-white border border-gray-200 text-gray-700 px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm">
              Ajouter maintenant
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
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class MatiereList implements OnInit {
  private service = inject(MatiereService);
  private cdr     = inject(ChangeDetectorRef);
  matieres: Matiere[] = [];

  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe({
      next: (data: Matiere[]) => {
        this.matieres = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur:', err)
    });
  }

  delete(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette matière ?')) {
      this.service.delete(id).subscribe({
        next: () => this.load(),
        error: (err) => console.error('Erreur suppression:', err)
      });
    }
  }
}
