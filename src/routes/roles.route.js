import { Router } from 'express';
import { RolesController } from '../controllers/roles.controller.js';
import validators from '../validators/roles.validators.js';

const router = Router();
const area_controller = new RolesController();

router.get('/', area_controller.getAll)

router.get('/:id', validators.validatorId, area_controller.getOne)

router.post('/', validators.validatorName, validators.validatorNameExist, area_controller.created)

router.put('/:id',
    validators.validatorId,
    validators.validatorName,
    validators.validatorIdExist,
    validators.validatorNameExist,
    area_controller.updated
)

router.delete('/:id', validators.validatorId, validators.validatorIdExist, area_controller.deleted)

export default router;