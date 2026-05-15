import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmpruntService, Emprunt } from '../../../core/services/emprunt.service';
import { LivreService, Livre } from '../../../core/services/livre.service';
import { PersonneService, Personne } from '../../../core/services/personne.service';

@Component({
  selector: 'app-emprunt-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <div class="max-w-3xl mx-auto animate-fade-in">

      <nav class="mb-8">
        <a routerLink="/emprunts"
           class="group inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-800 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Retour à la liste des emprunts
        </a>
      </nav>

      <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-gray-100 overflow-hidden">

        <!-- Header -->
        <div class="px-10 py-8 bg-gradient-to-r from-slate-50 to-white border-b border-gray-100">
          <div class="flex items-center gap-4">
            <div class="bg-green-100 p-3 rounded-2xl text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-black text-gray-900 tracking-tight">
                {{ isEdit ? 'Modifier l\'emprunt' : 'Nouvel emprunt' }}
              </h1>
              <p class="text-sm text-gray-500 font-medium">
                {{ isEdit ? 'Modification de l\'emprunt du ' + emprunt.debut_emp : 'Enregistrer un emprunt de livre' }}
              </p>
            </div>
          </div>
        </div>

        @if (loading) {
          <!-- Skeleton loader -->
          <div class="p-10 space-y-6 animate-pulse">
            <div class="grid grid-cols-2 gap-6">
              <div class="h-12 bg-gray-100 rounded-2xl"></div>
              <div class="h-12 bg-gray-100 rounded-2xl"></div>
            </div>
            <div class="h-12 bg-gray-100 rounded-2xl"></div>
            <div class="grid grid-cols-2 gap-6">
              <div class="h-12 bg-gray-100 rounded-2xl"></div>
              <div class="h-12 bg-gray-100 rounded-2xl"></div>
            </div>
            <div class="h-12 bg-gray-200 rounded-2xl w-1/3 ml-auto"></div>
          </div>
        } @else {
          <form (ngSubmit)="submit()" class="p-10 space-y-6">

            <!-- Livre & Personne -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Livre</label>
                <div class="relative">
                  <select [(ngModel)]="emprunt.livre_id" name="livre_id"
                          class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white transition-all appearance-none font-semibold cursor-pointer text-gray-700">
                    <option value="">-- Choisir un livre --</option>
                    @for (l of livres; track l.livre_id) {
                      <option [value]="l.livre_id">{{ l.nom_livre }}</option>
                    }
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                      <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Personne</label>
                <div class="relative">
                  <select [(ngModel)]="emprunt.personne_id" name="personne_id"
                          class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white transition-all appearance-none font-semibold cursor-pointer text-gray-700">
                    <option value="">-- Choisir une personne --</option>
                    @for (p of personnes; track p.personne_id) {
                      <option [value]="p.personne_id">{{ p.nom_per }} {{ p.prenom_per }}</option>
                    }
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                      <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Heure emprunt -->
            <div class="space-y-2">
              <label class="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Heure de l'emprunt</label>
              <input type="time" [(ngModel)]="emprunt.heure_emp" name="heure_emp"
                     class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white transition-all font-semibold text-gray-700" />
            </div>

            <!-- Dates -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Date de début</label>
                <input type="date" [(ngModel)]="emprunt.debut_emp" name="debut_emp"
                       class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white transition-all font-semibold text-gray-700" />
              </div>
              <div class="space-y-2">
                <label class="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Date de retour prévue</label>
                <input type="date" [(ngModel)]="emprunt.fin_emp" name="fin_emp"
                       class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white transition-all font-semibold text-gray-700" />
              </div>
            </div>

            <!-- Message erreur -->
            @if (erreur) {
              <div class="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm border border-red-100">
                ⚠️ {{ erreur }}
              </div>
            }

            <!-- Actions -->
            <div class="flex items-center justify-end gap-4 pt-6 border-t border-gray-50">
              <a routerLink="/emprunts"
                 class="px-6 py-3 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
                Abandonner
              </a>
              <button type="submit"
                      class="bg-green-600 hover:bg-green-700 text-white px-10 py-3.5 rounded-2xl text-sm font-black transition-all shadow-xl shadow-green-600/20 flex items-center gap-2 hover:-translate-y-1 active:scale-95">
                @if (isEdit) {
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  Mettre à jour l'emprunt
                } @else {
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Enregistrer l'emprunt
                }
              </button>
            </div>

          </form>
        }

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
  `]
})
export class EmpruntForm implements OnInit {
  private service         = inject(EmpruntService);
  private livreService    = inject(LivreService);
  private personneService = inject(PersonneService);
  private route           = inject(ActivatedRoute);
  private router          = inject(Router);
  private cdr             = inject(ChangeDetectorRef);

  emprunt: Emprunt = { heure_emp: '', debut_emp: '', fin_emp: '', livre_id: 0, personne_id: 0 };
  livres: Livre[]       = [];
  personnes: Personne[] = [];
  isEdit  = false;
  loading = false;
  erreur  = '';

  ngOnInit() {
    this.livreService.getAll().subscribe({
      next: (data: Livre[]) => { this.livres = data; this.cdr.detectChanges(); },
      error: (err) => console.error(err)
    });
    this.personneService.getAll().subscribe({
      next: (data: Personne[]) => { this.personnes = data; this.cdr.detectChanges(); },
      error: (err) => console.error(err)
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit  = true;
      this.loading = true;

      this.service.getById(+id).subscribe({
        next: (data: Emprunt) => {
          this.emprunt = data;         // ← charger les données
          this.loading = false;
          this.cdr.detectChanges();    // ← forcer l'affichage
        },
        error: (err) => {
          console.error('Erreur chargement:', err);
          this.loading = false;
          this.erreur  = 'Impossible de charger cet emprunt.';
          this.cdr.detectChanges();
        }
      });
    }
  }

  submit() {
    const payload: Emprunt = {
      ...this.emprunt,
      livre_id:    +this.emprunt.livre_id,
      personne_id: +this.emprunt.personne_id,
      heure_emp: this.emprunt.heure_emp.length === 5
        ? this.emprunt.heure_emp + ':00'
        : this.emprunt.heure_emp,
    };

    if (!payload.livre_id || !payload.personne_id) {
      this.erreur = 'Veuillez choisir un livre et une personne.';
      return;
    }
    this.erreur = '';

    if (this.isEdit) {
      this.service.update(payload.emprunt_id!, payload).subscribe({
        next: () => this.router.navigate(['/emprunts']),
        error: (err) => {
          this.erreur = 'Erreur lors de la mise à jour.';
          console.error(err.error);
        }
      });
    } else {
      this.service.create(payload).subscribe({
        next: () => this.router.navigate(['/emprunts']),
        error: (err) => {
          this.erreur = 'Erreur lors de l\'enregistrement.';
          console.error(err.error);
        }
      });
    }
  }
}
