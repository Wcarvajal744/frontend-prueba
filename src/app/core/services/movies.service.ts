// src/app/core/services/movies.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiKey = '8e5823424d53e0580ec42e11ee570132'; // <- tu API Key real
  private apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=es-ES&page=1`;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<{ results: Movie[] }> {
    return this.http.get<{ results: Movie[] }>(this.apiUrl);
  }
}