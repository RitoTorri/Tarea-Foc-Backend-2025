import { Router } from 'express';
import { WarehousesController } from '../controllers/warehouses.controller.js';
import validators from '../validators/warehouses.validators.js';

const router = Router();
const warehouses_controller = new WarehousesController();

router.get('/', warehouses_controller.getAll)

router.get('/:id', validators.validatorId, warehouses_controller.getOne)

router.post('/', validators.validatorName, validators.validatorNameExist, warehouses_controller.created)

router.put('/:id',
    validators.validatorId,
    validators.validatorName,
    validators.validatorIdExist,
    validators.validatorNameExist,
    warehouses_controller.updated
)

router.delete('/:id', validators.validatorId, validators.validatorIdExist, warehouses_controller.deleted)

export default router;