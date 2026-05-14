import { Component, OnInit, inject } from '@angular/core';
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
    <div class="max-w-2xl mx-auto animate-fade-in">

      <!-- En-tête avec navigation -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-black text-gray-900">{{ isEdit ? 'Modifier l’emprunt' : 'Nouveau prêt' }}</h1>
            <p class="text-sm text-gray-500 font-medium">Gestion du flux des ouvrages</p>
          </div>
        </div>
        <a routerLink="/emprunts" class="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
          Annuler
        </a>
      </div>

      <div class="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-gray-100 overflow-hidden">
        <form (ngSubmit)="submit()" class="p-10 space-y-8">

          <!-- Section : Attribution -->
          <div class="space-y-6">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-4 bg-green-500 rounded-full"></span>
              <h2 class="text-xs font-black text-gray-400 uppercase tracking-widest">Identification</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[11px] font-bold text-gray-500 ml-1">Livre à emprunter</label>
                <div class="relative">
                  <select [(ngModel)]="emprunt.livre_id" name="livre_id"
                          class="w-full px-5 py-4 bg-slate-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all appearance-none cursor-pointer">
                    <option [value]="0" disabled>Sélectionner un livre</option>
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
                <label class="text-[11px] font-bold text-gray-500 ml-1">Emprunteur</label>
                <div class="relative">
                  <select [(ngModel)]="emprunt.personne_id" name="personne_id"
                          class="w-full px-5 py-4 bg-slate-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all appearance-none cursor-pointer">
                    <option [value]="0" disabled>Sélectionner l'adhérent</option>
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
          </div>

          <!-- Section : Calendrier -->
          <div class="space-y-6 pt-4">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-4 bg-blue-500 rounded-full"></span>
              <h2 class="text-xs font-black text-gray-400 uppercase tracking-widest">Planification</h2>
            </div>

            <div class="bg-slate-50 rounded-[2rem] p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden">
               <!-- Décoration fond -->
               <div class="absolute -right-4 -bottom-4 text-slate-200/50">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-32 h-32">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                 </svg>
               </div>

               <div class="space-y-2 relative">
                <label class="text-[11px] font-black text-slate-400 uppercase tracking-tight">Date de sortie</label>
                <input type="date" [(ngModel)]="emprunt.debut_emp" name="debut_emp"
                       class="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all shadow-sm" />
              </div>

              <div class="space-y-2 relative">
                <label class="text-[11px] font-black text-slate-400 uppercase tracking-tight">Heure exacte</label>
                <input type="time" [(ngModel)]="emprunt.heure_emp" name="heure_emp"
                       class="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all shadow-sm" />
              </div>

              <div class="md:col-span-2 space-y-2 relative border-t border-slate-200 pt-6">
                <label class="text-[11px] font-black text-red-400 uppercase tracking-tight">Retour prévu au plus tard le</label>
                <input type="date" [(ngModel)]="emprunt.fin_emp" name="fin_emp"
                       class="w-full px-5 py-4 bg-red-50/50 border border-red-100 rounded-2xl text-sm font-bold text-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-400 transition-all shadow-sm" />
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-4 pt-4">
            <button type="submit"
                    [disabled]="!emprunt.livre_id || !emprunt.personne_id"
                    class="w-full md:w-auto bg-green-600 hover:bg-green-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white px-10 py-4 rounded-2xl text-sm font-black transition-all shadow-xl shadow-green-600/20 flex items-center justify-center gap-3 hover:-translate-y-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
              </svg>
              {{ isEdit ? 'Valider les changements' : 'Confirmer le prêt' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
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

  emprunt: Emprunt = { heure_emp: '', debut_emp: '', fin_emp: '', livre_id: 0, personne_id: 0 };
  livres: Livre[]       = [];
  personnes: Personne[] = [];
  isEdit = false;

  ngOnInit() {
    this.livreService.getAll().subscribe((data: Livre[]) => this.livres = data);
    this.personneService.getAll().subscribe((data: Personne[]) => this.personnes = data);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.service.getById(+id).subscribe((data: Emprunt) => this.emprunt = data);
    }
  }

  submit() {
    if (this.emprunt.livre_id === 0 || this.emprunt.personne_id === 0) return;

    const obs = this.isEdit
      ? this.service.update(this.emprunt.emprunt_id!, this.emprunt)
      : this.service.create(this.emprunt);

    obs.subscribe(() => this.router.navigate(['/emprunts']));
  }
}
