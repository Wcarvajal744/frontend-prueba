import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home';

export const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];