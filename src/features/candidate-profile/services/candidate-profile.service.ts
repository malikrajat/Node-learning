import { ICandidateProfile } from 'src/features/user/interfaces/candidate-profile.interface';
import prisma from '../../../globals/prisma';
import { BadRequestException } from '../../../globals/cores/error.core';

// import { BadRequestException } from 'src/globals/cores/error.core';

class CandidateProfileService {
  async create(requestBody: ICandidateProfile, currentUser: UserPayload) {
    const { address, birth_date, cv, full_name, gender, phone } = requestBody;

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

  async getCandidateById(id: number) {
    const candidateProfile = await prisma.candidateProfile.findUnique({
      where: { id },
    });

    if (!candidateProfile)
      throw new BadRequestException(`Candidate with id ${id} doesnt exists`);

    return candidateProfile;
  }

  async update(id: number, requestBody: ICandidateProfile) {
    await this.getCandidateById(id);

    const { address, birth_date, cv, full_name, gender, phone } = requestBody;

    const candidate = await prisma.candidateProfile.update({
      where: { id },
      data: {
        address,
        birth_date: birth_date ? new Date(birth_date) : undefined,
        cv,
        full_name,
        gender,
        phone,
      },
    });
    return candidate;
  }

  async remove(id: number) {
    await this.getCandidateById(id);

    await prisma.candidateProfile.delete({
      where: { id },
    });
  }
}

export default new CandidateProfileService();
