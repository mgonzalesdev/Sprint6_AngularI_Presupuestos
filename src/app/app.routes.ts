import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { Home } from './components/home/home';

export const routes: Routes = [
    { path: '', component: Welcome, pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: '**', redirectTo: '' }
];
