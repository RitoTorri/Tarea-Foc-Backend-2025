import { UsersServices } from '../services/users.service.js';
import { body, param, validationResult } from 'express-validator';
import { RolesServices } from '../services/roles.service.js';

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

// Valida que el campo email no esté vacío y tenga formato válido
const validatorEmail = async (req, res, next) => {
    await body('email')
        .notEmpty().withMessage('El campo email no puede estar vacío')
        .isEmail().withMessage('El formato del email no es válido')
        .normalizeEmail()
        .run(req); // ✅ SOLO UN .run(req)

    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({
            message: errors.array()[0].msg, // ✅ errors.array()[0].msg
        });
    }

    next();
};

// Valida que el campo contraseña no esté vacío y cumpla requisitos mínimos
const validatorPassword = async (req, res, next) => {
    await body('password')
        .notEmpty().withMessage('El campo contraseña no puede estar vacío')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres') // ✅ .isLength() separado
        .run(req);

    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({
            message: errors.array()[0].msg,
        });
    }

    next();
};

// Valida que el campo rol_id sea un número entero
const validatorRolId = async (req, res, next) => {
    await body('role_id')
        .isInt().withMessage('El campo role_id debe ser un número entero válido') // ✅ Agregar .isInt()
        .run(req);

    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({
            message: errors.array()[0].msg,
        });
    }

    next();
};

const validatorRoleExist = async (req, res, next) => {
    const { role_id } = req.body;

    const { message, status, data } = await RolesServices.getById(Number(role_id));

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

    const { message, status, data } = await UsersServices.getById(Number(id));

    if (status === 404) {
        return res.status(status).json({
            message: message
        })
    }

    next();
}

// Valida que exista un registro con el nombre que se le pasa por parámetro
const validatorEmailExist = async (req, res, next) => {
    const { message, status, data } = await UsersServices.getByEmail(req.body.email);

    if (status === 200) {
        return res.status(400).json({
            message: `El email ya esta en uso`,
        });
    }

    next();
}

export default {
    validatorId, validatorName, validatorEmailExist,
    validatorIdExist, validatorRoleExist, validatorPassword,
    validatorEmail, validatorRolId
};