import { AccountingController } from 'controller/AccountingController';
import { FactorController } from 'controller/FactorController';
import { IndirectController } from 'controller/IndirectController';
import { OrderSummaryController } from 'controller/OrdersController';
import { Router } from 'express';

const orderSummaryController = new OrderSummaryController();
const factorController = new FactorController();
const indirectController = new IndirectController();
const accountingController = new AccountingController();

const router = Router();

router.get('/order', orderSummaryController.handle);
router.get('/factor', factorController.handle);
router.get('/indirect', indirectController.handle);
router.get('/accounting', accountingController.handle);

export { router };
