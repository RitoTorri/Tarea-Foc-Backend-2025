import { AreasServices } from '../services/areas.service.js';
import { body, param, validationResult } from 'express-validator';
import { WarehousesServices } from '../services/warehouses.service.js';

// Valida que el campo nombre no este vacio
const validatorName = async (req, res, next) => {
    await body('name').notEmpty().withMessage('El campo nombre no puede estar vacío').run(req);

    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({
            message: errors.array()[0].msg,
        });
    }

    next();
};

// Valida que el campo id sea un número entero
const validatorId = async (req, res, next) => {
    await param('id').isInt().withMessage('El campo id debe ser un número entero').run(req);

    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({
            message: errors.array()[0].msg,
        });
    }

    next();
};

// Valida que el campo warehouse_id sea un número entero
const validatorWarehouseId = async (req, res, next) => {
    await body('warehouse_id')
        .isInt().withMessage('El campo warehouse_id debe ser un número entero válido')
        .run(req);

    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({
            message: errors.array()[0].msg,
        });
    }

    next();
};

const validatorWarehouseExist = async (req, res, next) => {
    const { warehouse_id } = req.body;

    const { message, status, data } = await WarehousesServices.getById(Number(warehouse_id));

    if (status === 404) {
        return res.status(status).json({
            message: message
        })
    }

    next();
}

// Valida que exista un registro con el id que se le pasa por parámetro
const validatorIdExist = async (req, res, next) => {
    const { id } = req.params;

    const { message, status, data } = await AreasServices.getById(Number(id));

    if (status === 404) {
        return res.status(status).json({
            message: message
        })
    }

    next();
}

// Valida que exista un registro con el nombre que se le pasa por parámetro
const validatorNameExist = async (req, res, next) => {
    const { message, status, data } = await AreasServices.getByName(req.body.name);

    if (status === 200) {
        return res.status(400).json({
            message: `El nombre del área ya existe`,
        });
    }

    next();
}

export default {
    validatorId, validatorName, validatorNameExist,
    validatorIdExist, validatorWarehouseExist, validatorWarehouseId
};