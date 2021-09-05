import { AccountingController } from 'controller/AccountingController';
import { BalanceController } from 'controller/BalanceController';
import { FactorController } from 'controller/FactorController';
import { IndirectController } from 'controller/IndirectController';
import { OrderSummaryController } from 'controller/OrdersController';
import { OrderSummaryControllerV2 } from 'controller/OrdersControllerV2';
import { Router } from 'express';

const orderSummaryController = new OrderSummaryController();
const orderSummaryControllerV2 = new OrderSummaryControllerV2();
const factorController = new FactorController();
const indirectController = new IndirectController();
const accountingController = new AccountingController();
const balanceController = new BalanceController();

const router = Router();

router.get('/order', orderSummaryController.handle);
router.get('/order-v2', orderSummaryControllerV2.handle);
router.get('/factor', factorController.handle);
router.get('/indirect', indirectController.handle);
router.get('/accounting', accountingController.handle);
router.get('/balance', balanceController.handle);
router.get('/last-balance', balanceController.handleLast);

export { router };
