import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { Budgets } from './pages/budgets/budgets';

export const routes: Routes = [
    { path: '', component: Welcome, pathMatch: 'full' },
    { path: 'budgets', component: Budgets },
    { path: '**', redirectTo: '' }
];
