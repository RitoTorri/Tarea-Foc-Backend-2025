import { Router } from 'express';
import { UserController } from '../controllers/users.controller.js';
import validators from '../validators/users.validators.js';

const router = Router();
const users_controller = new UserController();

router.get('/', users_controller.getAll)

router.get('/:id', validators.validatorId, users_controller.getOne)

router.post('/',
    validators.validatorName,
    validators.validatorEmail,
    validators.validatorPassword,
    validators.validatorRolId,
    validators.validatorRoleExist,
    validators.validatorEmailExist,
    users_controller.created
)

router.put('/:id',
    validators.validatorName,
    validators.validatorEmail,
    validators.validatorPassword,
    validators.validatorRolId,
    validators.validatorIdExist,
    validators.validatorRoleExist,
    validators.validatorEmailExist,
    users_controller.updated
)

router.delete('/:id', validators.validatorId, validators.validatorIdExist, users_controller.deleted)

export default router;