import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="flex min-h-screen bg-slate-50 font-sans">

      <!-- Sidebar -->
      <aside class="fixed top-0 left-0 h-screen w-64 bg-green-950 flex flex-col z-50 shadow-2xl">

        <!-- Logo Section -->
        <div class="flex items-center gap-3 px-8 py-8">
          <div class="bg-green-500 p-2 rounded-xl shadow-lg shadow-green-500/20 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <span class="text-white font-extrabold text-xl tracking-tight">BIBLIO<span class="text-green-400">SOFT</span></span>
        </div>

        <!-- Navigation -->
        <nav class="flex flex-col gap-2 p-4 flex-1">

          <!-- Matières -->
          <a routerLink="/matieres" routerLinkActive="bg-green-600/20 text-white border-l-4 border-green-500"
             class="group flex items-center gap-4 px-4 py-3.5 rounded-r-xl text-green-300 hover:bg-green-800/50 hover:text-white transition-all duration-300 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover:scale-110 transition-transform">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-19.5 0A2.25 2.25 0 0 0 2.25 15v4.5a2.25 2.25 0 0 0 2.25 2.25h15a2.25 2.25 0 0 0 2.25-2.25V15a2.25 2.25 0 0 0-2.25-2.25m-19.5 0h19.5" />
            </svg>
            <span class="tracking-wide text-sm">Matières</span>
          </a>

          <!-- Personnes -->
          <a routerLink="/personnes" routerLinkActive="bg-green-600/20 text-white border-l-4 border-green-500"
             class="group flex items-center gap-4 px-4 py-3.5 rounded-r-xl text-green-300 hover:bg-green-800/50 hover:text-white transition-all duration-300 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover:scale-110 transition-transform">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
            <span class="tracking-wide text-sm">Personnes</span>
          </a>

          <!-- Livres -->
          <a routerLink="/livres" routerLinkActive="bg-green-600/20 text-white border-l-4 border-green-500"
             class="group flex items-center gap-4 px-4 py-3.5 rounded-r-xl text-green-300 hover:bg-green-800/50 hover:text-white transition-all duration-300 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover:scale-110 transition-transform">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            <span class="tracking-wide text-sm">Livres</span>
          </a>

          <!-- Lectures -->
          <a routerLink="/lectures" routerLinkActive="bg-green-600/20 text-white border-l-4 border-green-500"
             class="group flex items-center gap-4 px-4 py-3.5 rounded-r-xl text-green-300 hover:bg-green-800/50 hover:text-white transition-all duration-300 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover:scale-110 transition-transform">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <span class="tracking-wide text-sm">Lectures</span>
          </a>

          <!-- Emprunts -->
          <a routerLink="/emprunts" routerLinkActive="bg-green-600/20 text-white border-l-4 border-green-500"
             class="group flex items-center gap-4 px-4 py-3.5 rounded-r-xl text-green-300 hover:bg-green-800/50 hover:text-white transition-all duration-300 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover:scale-110 transition-transform">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            <span class="tracking-wide text-sm">Emprunts</span>
          </a>

        </nav>

        <!-- Footer Sidebar -->
        <div class="px-8 py-6 border-t border-green-900/50">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <p class="text-green-500 text-[10px] font-bold uppercase tracking-widest">Système Actif</p>
          </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="ml-64 flex-1">
        <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8 sticky top-0 z-40">
          <div class="flex items-center gap-3">
            <div class="text-right">
              <p class="text-sm font-bold text-gray-900 leading-none">Admin</p>
              <p class="text-[11px] text-green-600 font-medium">Bibliothécaire</p>
            </div>
            <div class="w-9 h-9 rounded-lg bg-green-600 flex items-center justify-center text-white shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
          </div>
        </header>

        <div class="p-8">
          <router-outlet />
        </div>
      </main>
    </div>
  `
})
export class AppComponent {
  title = 'bibliotheque-frontend';
}
