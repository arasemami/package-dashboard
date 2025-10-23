import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { PackageService } from '../../services/package.service';
import { PackageModel } from '../../models/package.model';
import { MatOptionModule } from '@angular/material/core';

import { Observable, combineLatest } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';
import { RouterModule, Router } from '@angular/router';
import { LanguagePipe } from '../../pipes/language.pipe';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatOptionModule,
    RouterModule,
    LanguagePipe,
  ],
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss'],
})
export class PackageListComponent implements OnInit {
  search = new FormControl('');
  statusFilter = new FormControl('all');
  currentLang: 'en' | 'fa' = 'en';
  displayedColumns = [
    'id',
    'name',
    'status',
    'region',
    'createdAt',
    'description',
    'actions',
  ];

  readonly packages$: Observable<PackageModel[]>;

  constructor(private svc: PackageService, private router: Router) {
    const search$ = this.search.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged()
    );
    const status$ = this.statusFilter.valueChanges.pipe(startWith('all'));

    this.packages$ = combineLatest([this.svc.packages$, search$, status$]).pipe(
      map(([list, term, status]) => {
        const t = (term ?? '').toLowerCase().trim();
        return list.filter((p) => {
          const matchesTerm =
            !t ||
            p.name.toLowerCase().includes(t) ||
            p.description?.toLowerCase().includes(t);
          const matchesStatus = status === 'all' ? true : p.status === status;
          return matchesTerm && matchesStatus;
        });
      })
    );
  }

  ngOnInit(): void {}

  trackById(index: number, item: PackageModel) {
    return item.id;
  }

  goNew() {
    this.router.navigate(['/packages/new']);
  }

  toggleLang() {
    this.currentLang = this.currentLang === 'en' ? 'fa' : 'en';
  }
}
