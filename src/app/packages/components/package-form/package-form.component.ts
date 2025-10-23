import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PackageService } from '../../services/package.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-package-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './package-form.component.html',
  styleUrls: ['./package-form.component.scss'],
})
export class PackageFormComponent implements OnInit {
  isEdit = false;
  pkgId?: number;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private svc: PackageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.pkgId = Number(id);
      this.svc
        .getById(this.pkgId)
        .pipe(take(1))
        .subscribe((p) => {
          if (p) {
            this.form.patchValue(p);
          } else {
            // not found: navigate back
            this.router.navigate(['/packages']);
          }
        });
    }
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      nameFa: [''],
      description: ['', [Validators.required]],
      descriptionFa: [''],
      status: ['active', [Validators.required]],
      region: ['', [Validators.required]],
      createdAt: [new Date().toISOString().slice(0, 10), [Validators.required]],
    });
  }

  save() {
    if (this.form.invalid) return;
    const payload: any = this.form.value;
    if (this.isEdit && this.pkgId != null) {
      this.svc
        .update(this.pkgId, payload)
        .pipe(take(1))
        .subscribe(() => this.router.navigate(['/packages']));
    } else {
      this.svc
        .create(payload)
        .pipe(take(1))
        .subscribe(() => this.router.navigate(['/packages']));
    }
  }

  cancel() {
    this.router.navigate(['/packages']);
  }
}
