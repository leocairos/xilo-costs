import { Router } from 'express';
import { GetResumoOPController } from 'GetResumoOPController';

const getResumoOPController = new GetResumoOPController();

const router = Router();

router.get('/orders', getResumoOPController.handle);

export { router };
