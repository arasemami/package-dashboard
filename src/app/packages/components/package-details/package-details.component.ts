import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PackageService } from '../../services/package.service';
import { PackageModel } from '../../models/package.model';
import { Observable, switchMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LanguagePipe } from '../../pipes/language.pipe';

@Component({
  selector: 'app-package-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    LanguagePipe,
  ],
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss'],
})
export class PackageDetailsComponent implements OnInit {
  package$!: Observable<PackageModel | undefined>;
  currentLang: 'en' | 'fa' = 'en';

  constructor(
    private route: ActivatedRoute,
    private svc: PackageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.package$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.svc.getById(id);
      })
    );
  }

  edit(id: number) {
    this.router.navigate(['/packages', id, 'edit']);
  }

  toggleLang() {
    this.currentLang = this.currentLang === 'en' ? 'fa' : 'en';
  }
}
