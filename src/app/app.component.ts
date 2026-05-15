import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from './core/services/notification';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="flex min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900">

      <!-- Sidebar -->
      <aside class="fixed top-0 left-0 h-screen w-72 bg-[#062016] flex flex-col z-50 shadow-[4px_0_24px_rgba(0,0,0,0.05)] border-r border-white/5">
        <div class="flex items-center gap-4 px-8 py-10">
          <div class="relative">
            <div class="absolute inset-0 bg-green-400 blur-md opacity-20"></div>
            <div class="relative bg-gradient-to-br from-green-400 to-green-600 p-2.5 rounded-2xl shadow-lg text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
          </div>
          <div class="flex flex-col">
            <span class="text-white font-black text-xl tracking-tight leading-none">BIBLIO<span class="text-green-400">SOFT</span></span>
            <span class="text-[10px] text-green-500/60 font-bold uppercase tracking-[0.2em] mt-1">Management v2.0</span>
          </div>
        </div>

        <nav class="flex flex-col gap-1.5 p-6 flex-1">
          <p class="px-4 text-[10px] font-black text-green-700 uppercase tracking-widest mb-2">Menu Principal</p>

          <a routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Tableau de bord</span>
          </a>

          <a routerLink="/matieres" routerLinkActive="active-link" class="nav-link">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Matières</span>
          </a>

          <a routerLink="/personnes" routerLinkActive="active-link" class="nav-link">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Lecteurs</span>
          </a>

          <a routerLink="/livres" routerLinkActive="active-link" class="nav-link">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Catalogue</span>
          </a>

          <a routerLink="/lectures" routerLinkActive="active-link" class="nav-link">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Lectures</span>
          </a>

          <a routerLink="/emprunts" routerLinkActive="active-link" class="nav-link">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span>Flux Emprunts</span>
          </a>
        </nav>

        <div class="p-6 mt-auto">
          <div class="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span class="text-[10px] font-black text-green-500 uppercase tracking-widest">Connecté</span>
            </div>
            <p class="text-[11px] text-green-100/50 mt-1 font-medium">Serveur opérationnel v24.1</p>
          </div>
        </div>
      </aside>

      <!-- Main -->
      <main class="ml-72 flex-1 min-h-screen">

        <!-- Header -->
        <header class="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-10 sticky top-0 z-40">
          <h2 class="text-sm font-bold text-slate-400 uppercase tracking-widest">Espace Gestionnaire</h2>

          <div class="flex items-center gap-6">

            <!-- Bouton Notification -->
            <button (click)="ouvrirModal()"
                    class="relative text-slate-400 hover:text-green-600 transition-colors p-2 rounded-xl hover:bg-green-50">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              @if (notifCount > 0) {
                <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white">
                  {{ notifCount > 9 ? '9+' : notifCount }}
                </span>
              }
            </button>

            <div class="h-8 w-px bg-slate-200"></div>

            <!-- Profil -->
            <div class="flex items-center gap-4 group cursor-pointer">
              <div class="text-right">
                <p class="text-sm font-black text-slate-800 leading-none group-hover:text-green-600 transition-colors">Administrateur</p>
                <p class="text-[11px] text-slate-400 font-bold mt-1 uppercase">Poste Central</p>
              </div>
              <div class="w-10 h-10 rounded-xl bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-slate-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        <!-- Content -->
        <div class="p-10 max-w-[1600px] mx-auto">
          <router-outlet />
        </div>
      </main>

      <!-- ===== MODAL NOTIFICATIONS ===== -->
      @if (showModal) {
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 modal-overlay"
             (click)="fermerModal()">

          <div class="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden modal-content"
               (click)="$event.stopPropagation()">

            <!-- Header modal -->
            <div class="flex items-center justify-between px-8 py-6 border-b border-gray-100">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-black text-gray-900 text-lg">Notifications</h3>
                  <p class="text-xs text-gray-400 mt-0.5">
                    @if (notifCount > 0) {
                      {{ notifCount }} alerte(s) non lue(s)
                    } @else {
                      Tout est à jour
                    }
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                @if (notifCount > 0) {
                  <button (click)="toutLu()"
                          class="text-xs font-bold text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors">
                    Tout marquer lu
                  </button>
                }
                <button (click)="fermerModal()"
                        class="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- 4 compteurs -->
            @if (notifications.length > 0) {
              <div class="grid grid-cols-4 gap-2 px-8 py-4 bg-gray-50 border-b border-gray-100">
                <div class="bg-white rounded-xl p-3 border border-red-100 text-center">
                  <p class="text-xl font-black text-red-500">{{ countByType('danger') }}</p>
                  <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Retards</p>
                </div>
                <div class="bg-white rounded-xl p-3 border border-amber-100 text-center">
                  <p class="text-xl font-black text-amber-500">{{ countByType('warning') }}</p>
                  <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Alertes</p>
                </div>
                <div class="bg-white rounded-xl p-3 border border-blue-100 text-center">
                  <p class="text-xl font-black text-blue-500">{{ countByCategorie('emprunt') }}</p>
                  <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Emprunts</p>
                </div>
                <div class="bg-white rounded-xl p-3 border border-purple-100 text-center">
                  <p class="text-xl font-black text-purple-500">{{ countByCategorie('lecture') }}</p>
                  <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Lectures</p>
                </div>
              </div>
            }

            <!-- Liste notifications -->
            <div class="overflow-y-auto max-h-96">
              @if (notifications.length === 0) {
                <div class="flex flex-col items-center justify-center py-16 text-gray-400">
                  <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg class="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p class="font-black text-gray-700">Aucune alerte</p>
                  <p class="text-sm mt-1">Tous les emprunts et lectures sont corrects !</p>
                </div>
              }

              @for (n of notifications; track n.id) {
                <div (click)="marquerLu(n.id)"
                     class="flex items-start gap-4 px-8 py-4 border-b border-gray-50 cursor-pointer transition-all duration-200"
                     [class.bg-white]="n.lu"
                     [class.bg-slate-50]="!n.lu"
                     [class.opacity-60]="n.lu">

                  <!-- Icône type -->
                  @if (n.type === 'danger') {
                    <div class="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                  }
                  @if (n.type === 'warning') {
                    <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg class="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  }

                  <!-- Contenu -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <div>
                        <p class="text-sm font-black text-gray-800">{{ n.titre }}</p>
                        <!-- Badge catégorie -->
                        <span [class]="n.categorie === 'emprunt'
                          ? 'inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 mt-0.5'
                          : 'inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-600 mt-0.5'">
                          {{ n.categorie === 'emprunt' ? 'Emprunt' : 'Lecture' }}
                        </span>
                      </div>
                      @if (!n.lu) {
                        <span class="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1.5"></span>
                      }
                    </div>
                    <p class="text-sm text-gray-600 mt-1 font-medium">{{ n.message }}</p>
                    <p class="text-xs text-gray-400 mt-0.5">{{ n.detail }}</p>
                    <div class="flex items-center gap-2 mt-2">
                      <svg class="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span class="text-xs text-gray-400 font-medium">{{ n.date | date:'dd/MM/yyyy' }}</span>
                      @if (!n.lu) {
                        <span class="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold">
                          Cliquer pour marquer lu
                        </span>
                      }
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- Footer modal -->
            <div class="flex items-center justify-between px-8 py-5 bg-gray-50 border-t border-gray-100">
              <a routerLink="/emprunts" (click)="fermerModal()"
                 class="text-sm font-bold text-green-600 hover:text-green-700 transition-colors flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Voir tous les emprunts
              </a>
              <button (click)="fermerModal()"
                      class="bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
                Fermer
              </button>
            </div>

          </div>
        </div>
      }

    </div>
  `,
  styles: [`
    .nav-link {
      @apply flex items-center gap-4 px-5 py-3.5 rounded-2xl text-green-300/70
      hover:bg-white/5 hover:text-white transition-all duration-300
      font-semibold text-[13px] tracking-wide;
    }
    .active-link {
      @apply bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg
      shadow-green-900/40 translate-x-1;
    }
    .active-link svg { @apply scale-110; }
    main { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .modal-overlay { animation: fadeIn 0.2s ease-out; }
    .modal-content { animation: scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95) translateY(8px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
  `]
})
export class AppComponent implements OnInit {
  private notifService = inject(NotificationService);
  private cdr          = inject(ChangeDetectorRef);

  notifications: Notification[] = [];
  notifCount = 0;
  showModal  = false;

  ngOnInit() {
    this.notifService.charger();
    this.notifService.notifications$.subscribe(notifs => {
      this.notifications = notifs;
      this.notifCount    = notifs.filter(n => !n.lu).length;
      this.cdr.detectChanges();
    });
  }

  ouvrirModal()  { this.showModal = true; }
  fermerModal()  { this.showModal = false; }
  marquerLu(id: number) { this.notifService.marquerLu(id); }
  toutLu()       { this.notifService.toutMarquerLu(); }

  countByType(type: string): number {
    return this.notifications.filter(n => n.type === type).length;
  }

  countByCategorie(cat: string): number {
    return this.notifications.filter(n => n.categorie === cat).length;
  }
}
