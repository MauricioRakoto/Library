import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonneService, Personne } from '../../../core/services/personne.service';

@Component({
  selector: 'app-personne-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <div class="max-w-3xl mx-auto animate-fade-in">

      <!-- Barre de navigation haute -->
      <nav class="mb-8">
        <a routerLink="/personnes"
           class="group inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-800 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Retour à la liste des membres
        </a>
      </nav>

      <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-gray-100 overflow-hidden">
        <!-- Header -->
        <div class="px-10 py-8 bg-gradient-to-r from-slate-50 to-white border-b border-gray-100">
          <div class="flex items-center gap-4">
            <div class="bg-green-100 p-3 rounded-2xl text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-black text-gray-900 tracking-tight">
                {{ isEdit ? 'Modifier le profil' : 'Nouvelle inscription' }}
              </h1>
              <p class="text-sm text-gray-500 font-medium">Informations personnelles de l'adhérent</p>
            </div>
          </div>
        </div>

        <form (ngSubmit)="submit()" class="p-10 space-y-8">

          <!-- Section Nom / Prénom -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Nom de famille</label>
              <div class="relative group">
                <input type="text" [(ngModel)]="personne.nom_per" name="nom_per" placeholder="ex: DUPONT"
                       class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white transition-all font-semibold" />
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Prénom</label>
              <input type="text" [(ngModel)]="personne.prenom_per" name="prenom_per" placeholder="ex: Jean"
                     class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white transition-all font-semibold" />
            </div>
          </div>

          <!-- Section Genre / Date -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Genre / Sexe</label>
              <div class="relative">
                <select [(ngModel)]="personne.sexe" name="sexe"
                        class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white transition-all appearance-none font-semibold cursor-pointer text-gray-700">
                  <option value="">Sélectionner...</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Date de naissance</label>
              <input type="date" [(ngModel)]="personne.date_birth" name="date_birth"
                     class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white transition-all font-semibold text-gray-700" />
            </div>
          </div>

          <!-- Section Adresse -->
          <div class="space-y-2">
            <label class="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Adresse de résidence</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <input type="text" [(ngModel)]="personne.adresse" name="adresse" placeholder="ex: 12 Rue des Lilas, 75000 Paris"
                     class="w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white transition-all font-semibold" />
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-4 pt-6 border-t border-gray-50">
            <a routerLink="/personnes"
               class="px-6 py-3 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
              Abandonner
            </a>
            <button type="submit"
                    [disabled]="!personne.nom_per || !personne.prenom_per"
                    class="disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 text-white px-10 py-3.5 rounded-2xl text-sm font-black transition-all shadow-xl shadow-green-600/20 flex items-center gap-2 hover:-translate-y-1 active:scale-95">
              @if (isEdit) {
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Mettre à jour le membre
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Finaliser l'inscription
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.4s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    input[type="date"]::-webkit-calendar-picker-indicator {
      cursor: pointer;
      filter: invert(0.5);
    }
  `]
})
export class PersonneForm implements OnInit {
  private service = inject(PersonneService);
  private route   = inject(ActivatedRoute);
  private router  = inject(Router);

  personne: Personne = { nom_per: '', prenom_per: '', sexe: '', adresse: '', date_birth: '' };
  isEdit = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.service.getById(+id).subscribe((data: Personne) => this.personne = data);
    }
  }

  submit() {
    if (!this.personne.nom_per || !this.personne.prenom_per) return;

    const request = this.isEdit
      ? this.service.update(this.personne.personne_id!, this.personne)
      : this.service.create(this.personne);

    request.subscribe(() => this.router.navigate(['/personnes']));
  }
}
