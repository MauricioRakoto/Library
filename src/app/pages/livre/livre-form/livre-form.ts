import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LivreService, Livre } from '../../../core/services/livre.service';
import { MatiereService, Matiere } from '../../../core/services/matiere.service';

@Component({
  selector: 'app-livre-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <div class="max-w-3xl mx-auto animate-fade-in">

      <!-- Retour rapide -->
      <nav class="mb-8">
        <a routerLink="/livres"
           class="group flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Retour à la collection
        </a>
      </nav>

      <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-gray-100 overflow-hidden">

        <!-- Header -->
        <div class="px-10 py-8 bg-slate-50/50 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-black text-gray-900 tracking-tight">
              {{ isEdit ? 'Modifier l’ouvrage' : 'Ajouter un ouvrage' }}
            </h1>
            <p class="text-sm text-gray-500 font-medium">Référencement du livre dans la base de données</p>
          </div>
          <div class="hidden sm:block text-slate-300">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-12 h-12">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
             </svg>
          </div>
        </div>

        <form (ngSubmit)="submit()" class="p-10 space-y-8">

          <!-- Section 1: Identité -->
          <div class="space-y-6">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                  <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                </svg>
              </span>
              <h2 class="text-xs font-black text-gray-400 uppercase tracking-widest">Informations générales</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[11px] font-bold text-gray-500 ml-1">Titre de l'ouvrage</label>
                <input type="text" [(ngModel)]="livre.nom_livre" name="nom_livre" placeholder="Ex: Le Petit Prince"
                       class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-semibold" />
              </div>
              <div class="space-y-2">
                <label class="text-[11px] font-bold text-gray-500 ml-1">Auteur</label>
                <input type="text" [(ngModel)]="livre.auteur" name="auteur" placeholder="Ex: Antoine de Saint-Exupéry"
                       class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-semibold" />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-[11px] font-bold text-gray-500 ml-1">Résumé ou Description</label>
              <textarea [(ngModel)]="livre.desc" name="desc" placeholder="Décrivez brièvement le contenu du livre..." rows="3"
                        class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-semibold resize-none"></textarea>
            </div>
          </div>

          <!-- Section 2: Logistique & Catégorie -->
          <div class="space-y-6 pt-4">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                  <path fill-rule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.532a2.447 2.447 0 0 0-1.93 1.93A44.335 44.335 0 0 0 1 10c0 2.474.18 4.9.532 7.042.12.72.63 1.303 1.338 1.48a43.11 43.11 0 0 0 14.26 0c.708-.177 1.218-.76 1.338-1.48.352-2.141.532-4.568.532-7.042s-.18-4.9-.532-7.042a2.447 2.447 0 0 0-1.93-1.93A44.335 44.335 0 0 0 10 2Zm0 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                </svg>
              </span>
              <h2 class="text-xs font-black text-gray-400 uppercase tracking-widest">Suivi & Classement</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[11px] font-bold text-gray-500 ml-1">Date d'acquisition (Entrée)</label>
                <input type="date" [(ngModel)]="livre.date_entre" name="date_entre"
                       class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-semibold" />
              </div>
              <div class="space-y-2">
                <label class="text-[11px] font-bold text-gray-500 ml-1">Date de retrait (Optionnel)</label>
                <input type="date" [(ngModel)]="livre.date_sortie" name="date_sortie"
                       class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-semibold" />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-[11px] font-bold text-gray-500 ml-1">Matière / Catégorie</label>
              <div class="relative">
                <select [(ngModel)]="livre.matiere_id" name="matiere_id"
                        class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all appearance-none font-bold text-gray-700 cursor-pointer">
                  <option [value]="0" disabled>-- Sélectionner une matière --</option>
                  @for (m of matieres; track m.matiere_id) {
                    <option [value]="m.matiere_id">{{ m.nom_matiere }}</option>
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

          <!-- Actions footer -->
          <div class="flex items-center justify-end gap-4 pt-8 border-t border-gray-100">
            <a routerLink="/livres"
               class="px-6 py-3 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
              Annuler
            </a>
            <button type="submit"
                    [disabled]="!livre.nom_livre || !livre.auteur"
                    class="disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 text-white px-10 py-3.5 rounded-2xl text-sm font-black transition-all shadow-xl shadow-green-600/20 flex items-center gap-2 hover:-translate-y-1 active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
              </svg>
              {{ isEdit ? 'Sauvegarder les modifications' : 'Confirmer l\'ajout' }}
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
  `]
})
export class LivreForm implements OnInit {
  private service        = inject(LivreService);
  private matiereService = inject(MatiereService);
  private route          = inject(ActivatedRoute);
  private router         = inject(Router);

  livre: Livre = { nom_livre: '', auteur: '', desc: '', date_entre: '', date_sortie: '', matiere_id: 0 };
  matieres: Matiere[] = [];
  isEdit = false;

  ngOnInit() {
    this.matiereService.getAll().subscribe((data: Matiere[]) => this.matieres = data);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.service.getById(+id).subscribe((data: Livre) => this.livre = data);
    }
  }

  submit() {
    if (!this.livre.nom_livre || !this.livre.auteur) return;

    const obs = this.isEdit
      ? this.service.update(this.livre.livre_id!, this.livre)
      : this.service.create(this.livre);

    obs.subscribe(() => this.router.navigate(['/livres']));
  }
}
