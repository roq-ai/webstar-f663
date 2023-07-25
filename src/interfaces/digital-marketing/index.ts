import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface DigitalMarketingInterface {
  id?: string;
  seo?: string;
  sem?: string;
  ppc_campaigns?: string;
  smm?: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  _count?: {};
}

export interface DigitalMarketingGetQueryInterface extends GetQueryInterface {
  id?: string;
  seo?: string;
  sem?: string;
  ppc_campaigns?: string;
  smm?: string;
  company_id?: string;
}
