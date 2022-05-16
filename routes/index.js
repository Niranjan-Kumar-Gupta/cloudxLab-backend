import express from 'express';
import formController from '../controllers/formController';

const router = express.Router();

router.post('/submitform',formController.submitForm);

export default router;