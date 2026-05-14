import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatiereService, Matiere } from '../../../core/services/matiere.service';

@Component({
  selector: 'app-matiere-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <div class="max-w-2xl mx-auto animate-fade-in">

      <!-- Fil d'ariane / Retour -->
      <nav class="mb-8">
        <a routerLink="/matieres"
           class="group flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Retour à la liste
        </a>
      </nav>

      <div class="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-gray-100 overflow-hidden">
        <!-- Header du formulaire -->
        <div class="px-8 py-6 bg-slate-50/50 border-b border-gray-100">
          <h1 class="text-2xl font-black text-gray-900 tracking-tight">
            {{ isEdit ? 'Modifier la matière' : 'Créer une matière' }}
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Les matières permettent de classer les livres par thématiques.
          </p>
        </div>

        <form (ngSubmit)="submit()" class="p-8">
          <div class="mb-8">
            <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Nom de la désignation
            </label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 0 0 3.182 0l4.318-4.318a2.25 2.25 0 0 0 0-3.182L11.159 3.659A2.25 2.25 0 0 0 9.568 3Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>
              </div>
              <input type="text" [(ngModel)]="matiere.nom_matiere" name="nom_matiere"
                     required
                     placeholder="Ex: Intelligence Artificielle, Histoire..."
                     class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white transition-all placeholder:text-gray-300" />
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-4">
            <a routerLink="/matieres"
               class="px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">
              Annuler
            </a>
            <button type="submit"
                    [disabled]="!matiere.nom_matiere"
                    class="disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-green-600/20 flex items-center gap-2 hover:-translate-y-0.5 active:scale-95">
              @if (isEdit) {
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Mettre à jour
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Enregistrer la matière
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
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class MatiereForm implements OnInit {
  private service = inject(MatiereService);
  private route   = inject(ActivatedRoute);
  private router  = inject(Router);

  matiere: Matiere = { nom_matiere: '' };
  isEdit = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.service.getById(+id).subscribe((data: Matiere) => this.matiere = data);
    }
  }

  submit() {
    if (!this.matiere.nom_matiere) return;

    const request = this.isEdit
      ? this.service.update(this.matiere.matiere_id!, this.matiere)
      : this.service.create(this.matiere);

    request.subscribe(() => this.router.navigate(['/matieres']));
  }
}
