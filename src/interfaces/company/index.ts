import { DigitalMarketingInterface } from 'interfaces/digital-marketing';
import { VisualInterface } from 'interfaces/visual';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  digital_marketing?: DigitalMarketingInterface[];
  visual?: VisualInterface[];
  user?: UserInterface;
  _count?: {
    digital_marketing?: number;
    visual?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
