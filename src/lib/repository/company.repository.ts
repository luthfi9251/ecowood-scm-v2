import { db } from '@/db';
import { User } from '../entities/models/user';
import { v4 as uuidv4 } from 'uuid';
import { Company, CompanyRegister } from '../entities/models/company';
import { company } from '@/db/schema/company';
import { eq } from 'drizzle-orm';

export class CompanyRepository {
   async create(companyData: CompanyRegister, userId: string) {
      const companyId = uuidv4();
      return db.insert(company).values({
         id: companyId,
         company_name: companyData.company_name,
         address: companyData.address,
         postal_code: companyData.postal_code,
         city: companyData.city,
         region: companyData.region,
         company_email: companyData.company_email,
         phone: companyData.phone,
         tax_id: companyData.tax_id,
         nib: companyData.nib,
         description: companyData.description,
         company_fields: companyData.company_fields,
         user_id: userId,
      });
   }
   async findByName(companyName: string) {
      return db
         .select()
         .from(company)
         .where(eq(company.company_name, companyName));
   }
   async findByUserId(userId: string) {
      return db.select().from(company).where(eq(company.user_id, userId));
   }
}
