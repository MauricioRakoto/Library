import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: '', redirectTo: 'matieres', pathMatch: 'full' },

  // Matière
  {
    path: 'matieres',
    loadComponent: () =>
      import('./pages/matiere/matiere-list/matiere-list').then(m => m.MatiereList)
  },
  {
    path: 'matieres/nouveau',
    loadComponent: () =>
      import('./pages/matiere/matiere-form/matiere-form').then(m => m.MatiereForm)
  },
  {
    path: 'matieres/edit/:id',
    loadComponent: () =>
      import('./pages/matiere/matiere-form/matiere-form').then(m => m.MatiereForm)
  },

  // Personne
  {
    path: 'personnes',
    loadComponent: () =>
      import('./pages/personne/personne-list/personne-list').then(m => m.PersonneList)
  },
  {
    path: 'personnes/nouveau',
    loadComponent: () =>
      import('./pages/personne/personne-form/personne-form').then(m => m.PersonneForm)
  },
  {
    path: 'personnes/edit/:id',
    loadComponent: () =>
      import('./pages/personne/personne-form/personne-form').then(m => m.PersonneForm)
  },

  // Livre
  {
    path: 'livres',
    loadComponent: () =>
      import('./pages/livre/livre-list/livre-list').then(m => m.LivreList)
  },
  {
    path: 'livres/nouveau',
    loadComponent: () =>
      import('./pages/livre/livre-form/livre-form').then(m => m.LivreForm)
  },
  {
    path: 'livres/edit/:id',
    loadComponent: () =>
      import('./pages/livre/livre-form/livre-form').then(m => m.LivreForm)
  },

  // Lecture
  {
    path: 'lectures',
    loadComponent: () =>
      import('./pages/lecture/lecture-list/lecture-list').then(m => m.LectureList)
  },
  {
    path: 'lectures/nouveau',
    loadComponent: () =>
      import('./pages/lecture/lecture-form/lecture-form').then(m => m.LectureForm)
  },
  {
    path: 'lectures/edit/:id',
    loadComponent: () =>
      import('./pages/lecture/lecture-form/lecture-form').then(m => m.LectureForm)
  },

  // Emprunt
  {
    path: 'emprunts',
    loadComponent: () =>
      import('./pages/emprunt/emprunt-list/emprunt-list').then(m => m.EmpruntList)
  },
  {
    path: 'emprunts/nouveau',
    loadComponent: () =>
      import('./pages/emprunt/emprunt-form/emprunt-form').then(m => m.EmpruntForm)
  },
  {
    path: 'emprunts/edit/:id',
    loadComponent: () =>
      import('./pages/emprunt/emprunt-form/emprunt-form').then(m => m.EmpruntForm)
  },

  { path: '**', redirectTo: 'matieres' }
];
