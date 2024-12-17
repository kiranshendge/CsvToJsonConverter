import { Request, Response } from 'express';
import { processCSV, calculateAgeDistribution } from '../services/csvService';
import { disconnect } from '../repository/csvRepository';
import logger from '../utils/logger';

export const uploadCSV = async (req: Request, res: Response) => {
  try {
    await processCSV(process.env.CSV_FILE_PATH!);
    await calculateAgeDistribution();
    res
      .status(200)
      .send({ message: 'CSV file processed and age distribution calculated.' });
  } catch (error) {
    logger.error('Error during CSV upload handling:', error);
    res
      .status(500)
      .send({ message: 'Failed to process CSV file.', error: error });
  } finally {
    try {
      await disconnect();
    } catch (error) {
      logger.error('Failed to disconnect from the database:', error);
    }
  }
};
