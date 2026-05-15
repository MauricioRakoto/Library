import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatiereService, Matiere } from '../../../core/services/matiere.service';

@Component({
  selector: 'app-matiere-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <div>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">
            {{ isEdit ? 'Modifier la matière' : 'Nouvelle matière' }}
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            {{ isEdit ? 'Mettre à jour : ' + matiere.nom_matiere : 'Ajouter une nouvelle matière' }}
          </p>
        </div>
        <a routerLink="/matieres"
           class="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          ← Retour
        </a>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-lg">

        @if (loading) {
          <!-- Skeleton loader pendant le chargement -->
          <div class="animate-pulse">
            <div class="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
            <div class="h-12 bg-gray-100 rounded-xl mb-6"></div>
            <div class="h-10 bg-gray-200 rounded-xl w-1/3 ml-auto"></div>
          </div>
        } @else {
          <form (ngSubmit)="submit()">
            <div class="mb-5">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Nom de la matière
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.193-.171.422-.267.662-.267h15.176c.24 0 .47.096.662.267l1.71 1.518c.24.214.288.56.113.834a1.125 1.125 0 0 1-1.835.132L18.41 10.5H5.59l-1.84 1.777a1.125 1.125 0 0 1-1.835-.132c-.175-.274-.127-.62.113-.834l1.711-1.518Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  [(ngModel)]="matiere.nom_matiere"
                  name="nom_matiere"
                  required
                  placeholder="Ex: Intelligence Artificielle, Histoire..."
                  class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            @if (erreur) {
              <div class="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4 border border-red-100">
                ⚠️ {{ erreur }}
              </div>
            }

            <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <a routerLink="/matieres"
                 class="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Annuler
              </a>
              <button type="submit"
                      class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors">
                {{ isEdit ? '💾 Mettre à jour' : '➕ Enregistrer' }}
              </button>
            </div>
          </form>
        }

      </div>
    </div>
  `
})
export class MatiereForm implements OnInit {
  private service = inject(MatiereService);
  private route   = inject(ActivatedRoute);
  private router  = inject(Router);
  private cdr     = inject(ChangeDetectorRef);

  matiere: Matiere = { nom_matiere: '' };
  isEdit  = false;
  loading = false;
  erreur  = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit  = true;
      this.loading = true;                          // ← afficher skeleton

      this.service.getById(+id).subscribe({
        next: (data: Matiere) => {
          this.matiere = data;                      // ← charger la donnée
          this.loading = false;
          this.cdr.detectChanges();                 // ← forcer l'affichage
        },
        error: (err) => {
          console.error('Erreur chargement:', err);
          this.loading = false;
          this.erreur  = 'Impossible de charger la matière.';
          this.cdr.detectChanges();
        }
      });
    }
  }

  submit() {
    if (!this.matiere.nom_matiere.trim()) {
      this.erreur = 'Le nom de la matière est obligatoire.';
      return;
    }
    this.erreur = '';

    if (this.isEdit) {
      this.service.update(this.matiere.matiere_id!, this.matiere).subscribe({
        next: () => this.router.navigate(['/matieres']),
        error: (err) => {
          this.erreur = 'Erreur lors de la mise à jour.';
          console.error(err);
        }
      });
    } else {
      this.service.create(this.matiere).subscribe({
        next: () => this.router.navigate(['/matieres']),
        error: (err) => {
          this.erreur = 'Erreur lors de l\'enregistrement.';
          console.error(err);
        }
      });
    }
  }
}
