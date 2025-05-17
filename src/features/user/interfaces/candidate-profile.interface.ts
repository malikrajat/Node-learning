import { Gender } from '@prisma/client';

export interface ICandidateProfile {
  address: string;
  birth_date: string;
  cv: string;
  full_name: string;
  gender: Gender;
  phone: string;
  userId?: number;
}
