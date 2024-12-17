import getPrismaClient from './dbClient';
import { UserRecord } from '../models/user.model';
import logger from '../utils/logger';

const prisma = getPrismaClient();
const BATCH_SIZE = parseInt(process.env.BATCH_SIZE || '1000', 10);

/**
 * Save users from parsed data to PostgreSql DB
 * @param users
 */
export const saveUsers = async (users: UserRecord[]): Promise<void> => {
  try {
    for (let i = 0; i < users.length; i += BATCH_SIZE) {
      const batch = users.slice(i, i + BATCH_SIZE);

      // Check for existing users
      const existingUsers = await prisma.user.findMany({
        where: {
          OR: batch.map((user) => ({
            name: user.name,
          })),
        },
      });

      const existingUsersMap = new Map(
        existingUsers.map((user) => [`${user.name}`, user.id])
      );

      // Separate inserts and updates
      const updates = batch.filter((user) =>
        existingUsersMap.has(`${user.name}`)
      );
      const inserts = batch.filter(
        (user) => !existingUsersMap.has(`${user.name}`)
      );

      // Perform bulk updates
      for (const user of updates) {
        await prisma.user.update({
          where: { id: existingUsersMap.get(`${user.name}`)! },
          data: user,
        });
      }

      // Perform bulk inserts
      await prisma.user.createMany({
        data: inserts,
      });
    }
  } catch (error) {
    logger.error('Error during insert or update operations:', error);
    throw error;
  }
};

/**
 * Find all users from database
 * @returns
 */
export const findUsers = async (): Promise<any[]> => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    logger.error('Error during get users:', error);
    throw error;
  }
};

/**
 * close database connection
 */
export const disconnect = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
  } catch (error) {
    logger.error('Error during database disconnection:', error);
    throw error;
  }
};
