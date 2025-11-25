import { Router } from 'express';
import { AreasController } from '../controllers/areas.controller.js';
import validators from '../validators/areas.validators.js';

const router = Router();
const areas_controller = new AreasController();

router.get('/', areas_controller.getAll)

router.get('/:id', validators.validatorId, areas_controller.getOne)

router.post('/',
    validators.validatorName,
    validators.validatorWarehouseId,
    validators.validatorWarehouseExist,
    validators.validatorNameExist,
    areas_controller.created
)

router.put('/:id',
    validators.validatorId,
    validators.validatorName,
    validators.validatorWarehouseId,
    validators.validatorIdExist,
    validators.validatorWarehouseExist,
    validators.validatorNameExist,
    areas_controller.updated
)

router.delete('/:id', validators.validatorId, validators.validatorIdExist, areas_controller.deleted)

export default router;