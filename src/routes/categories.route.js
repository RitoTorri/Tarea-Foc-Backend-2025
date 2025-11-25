import { Router } from 'express';
import { CategoriesController } from '../controllers/categories.controller.js';
import validators from '../validators/categories.validators.js';

const router = Router();
const categories_controller = new CategoriesController();

router.get('/', categories_controller.getAll)

router.get('/:id', validators.validatorId, categories_controller.getOne)

router.post('/', validators.validatorName, validators.validatorNameExist, categories_controller.created)

router.put('/:id',
    validators.validatorId,
    validators.validatorName,
    validators.validatorIdExist,
    validators.validatorNameExist,
    categories_controller.updated
)

router.delete('/:id', validators.validatorId, validators.validatorIdExist, categories_controller.deleted)

export default router;