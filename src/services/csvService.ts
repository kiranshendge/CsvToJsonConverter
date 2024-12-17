import { AgeGroup } from '../utils/enums';
import { findUsers, saveUsers } from '../repository/csvRepository';
import { parseCSV } from '../utils/csvParser';
import logger from '../utils/logger';

/**
 * Process CSV file
 * @param filePath
 */
export const processCSV = async (filePath: string) => {
  try {
    const users = await parseCSV(filePath);
    await saveUsers(users);
  } catch (error) {
    logger.error('Error during csv processing:', error);
    throw error;
  }
};

export const calculateAgeDistribution = async () => {
  try {
    const users = await findUsers();
    const ageGroups: Record<AgeGroup, number> = {
      [AgeGroup.Under20]: 0,
      [AgeGroup.Between20And40]: 0,
      [AgeGroup.Between40And60]: 0,
      [AgeGroup.Over60]: 0,
    };
    users.forEach((user: { age: number }) => {
      if (user.age < 20) ageGroups[AgeGroup.Under20]++;
      else if (user.age <= 40) ageGroups[AgeGroup.Between20And40]++;
      else if (user.age <= 60) ageGroups[AgeGroup.Between40And60]++;
      else ageGroups[AgeGroup.Over60]++;
    });

    const total = users.length;
    console.log('Age-Group  %Distribution:');
    Object.keys(ageGroups).forEach((group) => {
      const enumKey = group as AgeGroup;
      console.log(
        `${group}: ${((ageGroups[enumKey] / total) * 100).toFixed(2)}%`
      );
    });
  } catch (error) {
    logger.error('Error during age distribution calculation:', error);
    throw error;
  }
};
