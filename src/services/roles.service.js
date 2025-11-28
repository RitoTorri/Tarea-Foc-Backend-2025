import { prisma } from '../config/prisma.config.js';

export const RolesServices = {
    getAll: async () => {
        try {
            const roles = await prisma.roles.findMany({
                where: { status: true },
            });
            if (roles.length === 0) {
                return {
                    message: `No se encontraron roles`,
                    status: 404,
                    data: {
                        roles: [],
                        total: 0
                    },
                };
            }
            return {
                message: `Roles encontrados`,
                status: 200,
                data: {
                    roles,
                    total: roles.length
                },
            };
        } catch (error) {
            console.error(error);
            return {
                message: `Error interno del servidor`,
                status: 500,
            };
        }
    },

    getByName: async (name) => {
        try {
            const rol = await prisma.roles.findUnique({
                where: {
                    name: name
                },
            });
            if (!rol) {
                return {
                    message: `Rol no encontrado`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Rol encontrado`,
                    status: 200,
                    data: {
                        rol,
                    },
                };
            }
        } catch (error) {
            console.log(error);
            return {
                message: `Error interno del servidor`,
                status: 500,
            };
        }
    },

    getById: async (id) => {
        try {
            const rol = await prisma.roles.findUnique({
                where: {
                    id: id,
                    status: true,
                },
            });
            if (!rol) {
                return {
                    message: `Rol no encontrado`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Rol encontrado`,
                    status: 200,
                    data: {
                        rol,
                    },
                };
            }
        } catch (error) {
            console.log(error);
            return {
                message: `Error interno del servidor`,
                status: 500,
            };
        }
    },

    create: async (roleData) => {
        try {
            const newRol = await prisma.roles.create({
                data: {
                    name: roleData.name,
                },
            });
            return {
                message: `Rol creado exitosamente`,
                status: 201,
                data: {
                    rol: newRol,
                },
            };
        } catch (error) {
            console.error(error.message);
            return {
                message: `Error interno del servidor`,
                status: 500,
            };
        }
    },

    update: async (id, rolData) => {
        try {
            const rol = await prisma.roles.update({
                where: { id: id },
                data: {
                    ...rolData
                },
            });
            return {
                message: `Rol actualizado exitosamente`,
                status: 200,
                data: {
                    rol,
                },
            };
        } catch (error) {
            console.error(error);
            return {
                message: `Error interno del servidor`,
                status: 500,
            };
        }
    },

    delete: async (id) => {
        try {
            const rol = await prisma.roles.update({
                where: { id: id },
                data: {
                    status: false,
                    deleted_at: new Date()
                },
            });
            return {
                message: `Rol eliminado exitosamente`,
                status: 204,
                data: {
                    rol,
                },
            };
        } catch (error) {
            console.error(error);
            return {
                message: `Error interno del servidor`,
                status: 500,
            };
        }
    },
};