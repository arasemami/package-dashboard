import { Pipe, PipeTransform } from '@angular/core';
import { PackageModel } from '../models/package.model';

@Pipe({ name: 'language' })
export class LanguagePipe implements PipeTransform {
  transform(
    pkg: PackageModel,
    lang: 'en' | 'fa' = 'en',
    key: 'name' | 'description' = 'name'
  ): string {
    if (!pkg) return '';
    if (lang === 'fa') {
      const fallback = key === 'name' ? pkg.name : pkg.description;
      return key === 'name'
        ? pkg.nameFa ?? fallback
        : pkg.descriptionFa ?? fallback;
    } else {
      return key === 'name' ? pkg.name : pkg.description;
    }
  }
}
