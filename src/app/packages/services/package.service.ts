import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PackageModel } from '../models/package.model';
import { MOCK_PACKAGES } from '../mocks/mock-packages';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private packagesSubject = new BehaviorSubject<PackageModel[]>([
    ...MOCK_PACKAGES,
  ]);
  packages$ = this.packagesSubject.asObservable();

  private nextId = Math.max(...MOCK_PACKAGES.map((p) => p.id)) + 1;

  constructor() {}

  getAll(): Observable<PackageModel[]> {
    return this.packages$;
  }

  getById(id: number): Observable<PackageModel | undefined> {
    return this.packages$.pipe(map((list) => list.find((p) => p.id === id)));
  }

  create(
    pkg: Omit<PackageModel, 'id' | 'createdAt'> & { createdAt?: string }
  ): Observable<PackageModel> {
    const newPkg: PackageModel = {
      ...pkg,
      id: this.nextId++,
      createdAt: pkg.createdAt ?? new Date().toISOString().slice(0, 10),
    } as PackageModel;

    const current = this.packagesSubject.getValue();
    this.packagesSubject.next([...current, newPkg]);
    return of(newPkg);
  }

  update(
    id: number,
    patch: Partial<PackageModel>
  ): Observable<PackageModel | undefined> {
    const current = this.packagesSubject.getValue();
    const idx = current.findIndex((p) => p.id === id);
    if (idx === -1) return of(undefined);
    const updated = { ...current[idx], ...patch };
    const next = [...current];
    next[idx] = updated;
    this.packagesSubject.next(next);
    return of(updated);
  }

  delete(id: number): Observable<boolean> {
    const current = this.packagesSubject.getValue();
    const next = current.filter((p) => p.id !== id);
    this.packagesSubject.next(next);
    return of(true);
  }
}
