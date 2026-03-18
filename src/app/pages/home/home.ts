// src/app/pages/home/home.component.ts
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../core/services/movies.service';
import { Movie } from '../../models/movie.model';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root', // mantenemos app-root para bootstrap
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  // ✨ Cambié esto: ahora usamos MatTableDataSource en lugar de un array simple
  dataSource = new MatTableDataSource<Movie>([]);
  displayedColumns: string[] = ['title', 'release_date', 'vote_average', 'poster_path'];
  loading = false;
  filter = new FormControl('');

  // ✨ Se agrega ViewChild para el paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private moviesService: MoviesService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.fetchMovies();

    // ✨ Filtrado en tiempo real usando MatTableDataSource
    this.filter.valueChanges.subscribe((value) => {
      this.dataSource.filter = (value ?? '').trim().toLowerCase();
    });
  }

  // ✨ Asignamos el paginador después de que la vista se haya inicializado
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  fetchMovies() {
    this.loading = true;
    this.moviesService.getMovies().subscribe({
      next: (data) => {
        console.log(data); // 🔹 Para verificar la respuesta real
        // ✨ Asignamos los datos al MatTableDataSource
        this.dataSource.data = data.results;
        setTimeout(() => (this.loading = false)); // Evita ExpressionChangedAfterItHasBeenCheckedError
      },
      error: (err) => {
        console.error(err);
        setTimeout(() => (this.loading = false));
        this.snackBar.open('Error cargando películas', 'Cerrar', { duration: 3000 });
      },
    });
  }
}
