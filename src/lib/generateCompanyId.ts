// lib/generateCompanyId.ts

import Company from '../app/models/Company';

export async function generateCompanyId() {
  const lastCompany = await Company.findOne().sort({ createdAt: -1 });

  let nextNumber = 1;
  if (lastCompany?.companyId) {
    const lastNumber = parseInt(lastCompany.companyId.replace('COMP', ''), 10);
    if (!isNaN(lastNumber)) {
      nextNumber = lastNumber + 1;
    }
  }

  const padded = nextNumber.toString().padStart(3, '0');
  return `COMP${padded}`; // жишээ: COMP001, COMP002
}
