export interface Job {
  id: number;
  title: string;
  type: string;
  description: string;
  location: string;
  salary: string;
  company: CompanyDetails;
}

interface CompanyDetails {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
}

interface ErrorRepsonse {
  message?: string;
  code: number;
}
