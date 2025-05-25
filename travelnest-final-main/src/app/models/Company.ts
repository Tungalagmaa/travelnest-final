import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICompany extends Document {
  email: string;
  password: string;
  companyId: string;
  role: 'company';
  companyName: string;
  regNumber: string;
  phoneNumber?: string;
  website?: string;
  address?: {
    building?: string;
    district?: string;
    city?: string;
  };
}

const CompanySchema = new Schema<ICompany>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyId: { type: String, unique: true }, 
  role: { type: String, enum: ['company'], default: 'company' },
  companyName: { type: String, required: true },
  regNumber: { type: String, required: true },
  phoneNumber: String,
  website: String,
  address: {
    building: String,
    district: String,
    city: String,
  },
});

// Зөв export
const Company: Model<ICompany> = mongoose.models.Company || mongoose.model<ICompany>('Company', CompanySchema);
export default Company;
