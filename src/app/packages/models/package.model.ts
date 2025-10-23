export type PackageStatus = 'active' | 'inactive' | 'pending';

export interface PackageModel {
  id: number;
  name: string;
  nameFa?: string;
  description: string;
  descriptionFa?: string;
  status: PackageStatus;
  createdAt: string;
  region: string;
}
