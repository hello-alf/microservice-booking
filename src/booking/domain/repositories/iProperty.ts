import { Property } from '../model/property.model';

export interface iPropertyRepository {
  save: (property: any) => Promise<void>;

  findById: (id: string) => Promise<any | null>;
}
