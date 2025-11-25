import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import validators from '../validators/products.validators.js';

const router = Router();
const products_controller = new ProductsController();

router.get('/', products_controller.getAll)

router.get('/:id', validators.validatorId, products_controller.getOne)

router.post('/',
    validators.validatorName,
    validators.validatorPrice,
    validators.validatorQuantity,
    validators.validatorCategoryId,
    validators.validatorAreaId,
    validators.validatorCategoryExist,
    validators.validatorAreaExist,
    validators.validatorNameAreaExist,
    products_controller.created
)

router.put('/:id',
    validators.validatorId,
    validators.validatorName,
    validators.validatorPrice,
    validators.validatorQuantity,
    validators.validatorCategoryId,
    validators.validatorAreaId,
    validators.validatorIdExist,
    validators.validatorCategoryExist,
    validators.validatorAreaExist,
    validators.validatorNameAreaExist,
    products_controller.updated
)

router.delete('/:id', validators.validatorId, validators.validatorIdExist, products_controller.deleted)

export default router;