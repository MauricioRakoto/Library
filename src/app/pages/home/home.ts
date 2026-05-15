import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatiereService } from '../../core/services/matiere.service';
import { PersonneService } from '../../core/services/personne.service';
import { LivreService } from '../../core/services/livre.service';
import { LectureService } from '../../core/services/lecture.service';
import { EmpruntService } from '../../core/services/emprunt.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="animate-fade-in">

      <!-- Hero -->
      <div class="bg-green-900 rounded-2xl px-10 py-10 mb-8 flex items-center justify-between overflow-hidden relative">
        <div class="relative z-10">
          <h1 class="text-3xl font-black text-white tracking-tight mb-2">
            Bienvenue dans votre Bibliothèque
          </h1>
          <p class="text-green-300 text-sm font-medium max-w-md">
            Gérez vos livres, vos lecteurs, vos lectures et vos emprunts depuis un seul endroit.
          </p>
          <a routerLink="/livres/nouveau"
             class="inline-flex items-center gap-2 mt-6 bg-white text-green-900 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-green-50 transition-all shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Ajouter un livre
          </a>
        </div>

        <!-- Icône décorative à la place de l'image -->
        <div class="hidden md:flex items-center justify-center w-40 h-40 bg-green-800 rounded-3xl border border-green-700 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-20 h-20 text-green-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-green-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.193-.171.422-.267.662-.267h15.176c.24 0 .47.096.662.267l1.71 1.518c.24.214.288.56.113.834a1.125 1.125 0 0 1-1.835.132L18.41 10.5H5.59l-1.84 1.777a1.125 1.125 0 0 1-1.835-.132c-.175-.274-.127-.62.113-.834l1.711-1.518Z" />
            </svg>
          </div>
          <p class="text-3xl font-black text-gray-900">{{ stats.matieres }}</p>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">Matières</p>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-blue-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <p class="text-3xl font-black text-gray-900">{{ stats.personnes }}</p>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">Personnes</p>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-amber-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <p class="text-3xl font-black text-gray-900">{{ stats.livres }}</p>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">Livres</p>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-purple-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            </svg>
          </div>
          <p class="text-3xl font-black text-gray-900">{{ stats.lectures }}</p>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">Lectures</p>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div class="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-red-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
            </svg>
          </div>
          <p class="text-3xl font-black text-gray-900">{{ stats.emprunts }}</p>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">Emprunts</p>
        </div>
      </div>

      <!-- Accès rapides -->
      <h2 class="text-lg font-black text-gray-800 mb-4 tracking-tight">Accès rapides</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <a routerLink="/matieres" class="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-green-100 group-hover:bg-green-600 rounded-xl flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-green-600 group-hover:text-white transition-colors">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.193-.171.422-.267.662-.267h15.176c.24 0 .47.096.662.267l1.71 1.518c.24.214.288.56.113.834a1.125 1.125 0 0 1-1.835.132L18.41 10.5H5.59l-1.84 1.777a1.125 1.125 0 0 1-1.835-.132c-.175-.274-.127-.62.113-.834l1.711-1.518Z" />
              </svg>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-gray-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
          <h3 class="font-black text-gray-800 mb-1">Matières</h3>
          <p class="text-sm text-gray-400">Gérer les catégories de livres</p>
        </a>

        <a routerLink="/personnes" class="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-blue-100 group-hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-blue-600 group-hover:text-white transition-colors">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
          <h3 class="font-black text-gray-800 mb-1">Personnes</h3>
          <p class="text-sm text-gray-400">Gérer les membres et adhérents</p>
        </a>

        <a routerLink="/livres" class="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-amber-100 group-hover:bg-amber-500 rounded-xl flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-amber-600 group-hover:text-white transition-colors">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-gray-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
          <h3 class="font-black text-gray-800 mb-1">Livres</h3>
          <p class="text-sm text-gray-400">Consulter la collection complète</p>
        </a>

        <a routerLink="/lectures" class="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-purple-100 group-hover:bg-purple-600 rounded-xl flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-purple-600 group-hover:text-white transition-colors">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              </svg>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-gray-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
          <h3 class="font-black text-gray-800 mb-1">Lectures</h3>
          <p class="text-sm text-gray-400">Suivre les sessions de lecture</p>
        </a>

        <a routerLink="/emprunts" class="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-red-100 group-hover:bg-red-500 rounded-xl flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-red-500 group-hover:text-white transition-colors">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
              </svg>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-gray-300 group-hover:text-red-400 group-hover:translate-x-1 transition-all">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
          <h3 class="font-black text-gray-800 mb-1">Emprunts</h3>
          <p class="text-sm text-gray-400">Gérer les emprunts en cours</p>
        </a>

        <a routerLink="/livres/nouveau" class="group bg-green-600 hover:bg-green-700 rounded-2xl p-6 border border-green-600 shadow-sm hover:shadow-md transition-all">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-green-300 group-hover:translate-x-1 transition-all">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
          <h3 class="font-black text-white mb-1">Nouveau livre</h3>
          <p class="text-sm text-green-300">Ajouter un livre rapidement</p>
        </a>

      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class Home implements OnInit {
  private matiereService  = inject(MatiereService);
  private personneService = inject(PersonneService);
  private livreService    = inject(LivreService);
  private lectureService  = inject(LectureService);
  private empruntService  = inject(EmpruntService);
  private cdr             = inject(ChangeDetectorRef);

  stats = { matieres: 0, personnes: 0, livres: 0, lectures: 0, emprunts: 0 };

  ngOnInit() {
    this.matiereService.getAll().subscribe({ next: d => { this.stats.matieres = d.length; this.cdr.detectChanges(); } });
    this.personneService.getAll().subscribe({ next: d => { this.stats.personnes = d.length; this.cdr.detectChanges(); } });
    this.livreService.getAll().subscribe({ next: d => { this.stats.livres = d.length; this.cdr.detectChanges(); } });
    this.lectureService.getAll().subscribe({ next: d => { this.stats.lectures = d.length; this.cdr.detectChanges(); } });
    this.empruntService.getAll().subscribe({ next: d => { this.stats.emprunts = d.length; this.cdr.detectChanges(); } });
  }
}
