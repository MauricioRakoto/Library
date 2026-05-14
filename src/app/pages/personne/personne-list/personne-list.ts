import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonneService, Personne } from '../../../core/services/personne.service';

@Component({
  selector: 'app-personne-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="animate-fade-in">
      <!-- Header Section -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Membres</h1>
          <div class="flex items-center gap-2 mt-1">
             <span class="flex h-2 w-2 rounded-full bg-green-500"></span>
             <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">{{ personnes.length }} adhérent(s) actifs</p>
          </div>
        </div>
        <a routerLink="/personnes/nouveau"
           class="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg shadow-green-600/20 flex items-center gap-2 hover:-translate-y-0.5 active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
          </svg>
          Inscrire un membre
        </a>
      </div>

      <!-- Table Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        @if (personnes.length > 0) {
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/50 border-b border-gray-100">
                <th class="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Membre</th>
                <th class="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Genre</th>
                <th class="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Coordonnées</th>
                <th class="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Naissance</th>
                <th class="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              @for (p of personnes; track p.personne_id) {
                <tr class="group hover:bg-green-50/30 transition-all duration-200">
                  <!-- Identité avec Avatar -->
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div [class]="p.sexe === 'M' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'"
                           class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm">
                        {{ p.nom_per.charAt(0) }}{{ p.prenom_per.charAt(0) }}
                      </div>
                      <div>
                        <p class="font-bold text-gray-800 group-hover:text-green-700 transition-colors">{{ p.nom_per }} {{ p.prenom_per }}</p>
                        <p class="text-[10px] font-mono text-gray-400 uppercase">ID #{{ p.personne_id }}</p>
                      </div>
                    </div>
                  </td>

                  <!-- Sexe avec Badge Pill -->
                  <td class="px-6 py-4 text-center">
                    <span [ngClass]="p.sexe === 'M' ? 'bg-blue-50 text-blue-600 ring-blue-500/20' : 'bg-pink-50 text-pink-600 ring-pink-500/20'"
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ring-1 ring-inset">
                      {{ p.sexe === 'M' ? 'Masculin' : 'Féminin' }}
                    </span>
                  </td>

                  <!-- Adresse avec icône -->
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2 text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      <span class="text-sm font-medium">{{ p.adresse }}</span>
                    </div>
                  </td>

                  <!-- Date Naissance -->
                  <td class="px-6 py-4">
                    <span class="text-sm font-semibold text-gray-500 italic">{{ p.date_birth | date:'dd MMM yyyy' }}</span>
                  </td>

                  <!-- Actions -->
                  <td class="px-6 py-4 text-right">
                    <div class="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a [routerLink]="['/personnes/edit', p.personne_id]"
                         class="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </a>
                      <button (click)="delete(p.personne_id!)"
                              class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
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
          <!-- Empty State -->
          <div class="flex flex-col items-center justify-center py-20 text-gray-400 gap-4">
            <div class="p-6 bg-gray-50 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-gray-300">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
            </div>
            <div class="text-center">
              <h3 class="text-lg font-bold text-gray-900">Aucun membre</h3>
              <p class="text-sm">Votre base de données d'adhérents est vide.</p>
            </div>
            <a routerLink="/personnes/nouveau"
               class="mt-2 bg-green-600 text-white px-6 py-2 rounded-xl font-bold shadow-md hover:bg-green-700 transition-colors">
              Ajouter une personne
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
export class PersonneList implements OnInit {
  private service = inject(PersonneService);
  private cdr     = inject(ChangeDetectorRef);
  personnes: Personne[] = [];

  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe({
      next: (data: Personne[]) => {
        this.personnes = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur:', err)
    });
  }

  delete(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet adhérent ?')) {
      this.service.delete(id).subscribe({
        next: () => this.load(),
        error: (err) => console.error('Erreur suppression:', err)
      });
    }
  }
}
