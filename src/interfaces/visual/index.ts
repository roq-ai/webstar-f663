import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface VisualInterface {
  id?: string;
  image: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  _count?: {};
}

export interface VisualGetQueryInterface extends GetQueryInterface {
  id?: string;
  image?: string;
  company_id?: string;
}
