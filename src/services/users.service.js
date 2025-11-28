import { prisma } from '../config/prisma.config.js';

const UsersServices = {
    getAll: async () => {
        try {
            const users = await prisma.users.findMany({
                where: { status: true },
            });
            if (users.length === 0) {
                return {
                    message: `No se encontraron usuarios`,
                    status: 404,
                    data: {
                        users: [],
                        total: 0
                    },
                };
            }
            return {
                message: `Usuarios encontrados`,
                status: 200,
                data: {
                    users,
                    total: users.length
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

    getByEmail: async (email) => {
        try {
            const user = await prisma.users.findUnique({
                where: {
                    email: email
                },
            });
            if (!user) {
                return {
                    message: `Usuario no encontrado`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Usuario encontrado`,
                    status: 200,
                    data: {
                        user,
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
            const user = await prisma.users.findUnique({
                where: {
                    id: id,
                    status: true,
                },
            });
            if (!user) {
                return {
                    message: `Usuario no encontrado`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Usuario encontrado`,
                    status: 200,
                    data: {
                        user,
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

    create: async (userData) => {
        try {
            const newUser = await prisma.users.create({
                data: {
                    ...userData
                },
            });
            return {
                message: `Usuario creado exitosamente`,
                status: 201,
                data: {
                    user: newUser,
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

    update: async (id, userData) => {
        try {
            const user = await prisma.users.update({
                where: { id: id },
                data: {
                    ...userData
                },
            });
            return {
                message: `Usuario actualizado exitosamente`,
                status: 200,
                data: {
                    user,
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
            const user = await prisma.users.update({
                where: { id: id },
                data: {
                    status: false,
                    deleted_at: new Date()
                },
            });
            return {
                message: `Usuario eliminado exitosamente`,
                status: 204,
                data: {
                    user,
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

export { UsersServices };