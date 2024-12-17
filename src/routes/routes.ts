import { Router } from 'express';
import { uploadCSV } from '../controllers/csvController';

const router: Router = Router();

router.post('/upload-csv', uploadCSV);

export default router;
