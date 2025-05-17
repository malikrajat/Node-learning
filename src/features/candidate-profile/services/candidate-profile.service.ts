import { ICandidateProfile } from 'src/features/user/interfaces/candidate-profile.interface';
import prisma from '../../../globals/prisma';

class CandidateProfileService {
  async create(reqBody: ICandidateProfile, currentUser: UserPayload) {
    const { address, birth_date, cv, full_name, gender, phone } = reqBody;
    const candidateProfile = await prisma.candidateProfile.create({
      data: {
        address,
        birth_date: new Date(birth_date),
        cv,
        full_name,
        gender,
        phone,
        userId: currentUser.id,
      },
    });
    return candidateProfile;
  }

  async getAll() {
    const candidateProfiles = await prisma.candidateProfile.findMany();
    return candidateProfiles;
  }
  async getById(id: number) {
    const candidateProfile = await prisma.candidateProfile.findUnique({
      where: { id },
    });
    return candidateProfile;
  }

  async update(id: number, reqBody: ICandidateProfile) {
    const { address, birth_date, cv, full_name, gender, phone } = reqBody;
    const candidateProfile = await prisma.candidateProfile.update({
      where: {
        userId: id,
      },
      data: {
        address,
        birth_date: birth_date ? new Date(birth_date) : undefined,
        cv,
        full_name,
        gender,
        phone,
      },
    });
    return candidateProfile;
  }
}
export default new CandidateProfileService();
