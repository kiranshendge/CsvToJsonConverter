import { UserRecord } from '../models/user.model';
import fs from 'fs';
import { parse } from 'csv-parse';

/**
 * Parse CSV file data
 * @param filePath
 * @returns
 */
export const parseCSV = (filePath: string): Promise<UserRecord[]> => {
  return new Promise((resolve, reject) => {
    const records: UserRecord[] = [];
    const parser = fs
      .createReadStream(filePath)
      .pipe(parse({ columns: true, delimiter: ',' }));

    parser.on('data', (row) => {
      const name = `${row['name.firstName']} ${row['name.lastName']}`;
      const age = parseInt(row.age);
      const address: Record<string, any> = {};
      const additionalInfo: Record<string, any> = {};

      for (const key in row) {
        const path = key.split('.');
        if (path[0] === 'address') {
          nestProperty(address, path.slice(1), row[key]);
        } else if (!['name.firstName', 'name.lastName', 'age'].includes(key)) {
          nestProperty(additionalInfo, path, row[key]);
        }
      }

      records.push({ name, age, address, additionalInfo });
    });

    parser.on('end', () => resolve(records));
    parser.on('error', (error) => reject(error));
  });
};

/**
 * Handle the nested properties
 * @param obj
 * @param path
 * @param value
 * @returns
 */
const nestProperty = (obj: Record<string, any>, path: string[], value: any) => {
  if (path.length === 1) {
    obj[path[0]] = value;
    return;
  }
  const [first, ...rest] = path;
  obj[first] = obj[first] || {};
  nestProperty(obj[first], rest, value);
};
