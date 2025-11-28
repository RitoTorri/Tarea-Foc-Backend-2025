import { prisma } from '../config/prisma.config.js';

const WarehousesServices = {
    getAll: async () => {
        try {
            const warehouses = await prisma.warehouses.findMany({
                where: { status: true },
            });
            if (warehouses.length === 0) {
                return {
                    message: `No se encontraron almacenes`,
                    status: 404,
                    data: {
                        warehouses: [],
                        total: 0
                    },
                };
            }
            return {
                message: `Almacenes encontrados`,
                status: 200,
                data: {
                    warehouses,
                    total: warehouses.length
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
            const warehouse = await prisma.warehouses.findUnique({
                where: {
                    name: name
                },
            });
            if (!warehouse) {
                return {
                    message: `Almacén no encontrado`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Almacén encontrado`,
                    status: 200,
                    data: {
                        warehouse,
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
            const warehouse = await prisma.warehouses.findUnique({
                where: {
                    id: id,
                    status: true,
                },
            });
            if (!warehouse) {
                return {
                    message: `Almacén no encontrado`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Almacén encontrado`,
                    status: 200,
                    data: {
                        warehouse,
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

    create: async (warehouseData) => {
        try {
            const newWarehouse = await prisma.warehouses.create({
                data: {
                    name: warehouseData.name,
                },
            });
            return {
                message: `Almacén creado exitosamente`,
                status: 201,
                data: {
                    warehouse: newWarehouse,
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

    update: async (id, warehouseData) => {
        try {
            const warehouse = await prisma.warehouses.update({
                where: { id: id },
                data: {
                    ...warehouseData
                },
            });
            return {
                message: `Almacén actualizado exitosamente`,
                status: 200,
                data: {
                    warehouse,
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
            const warehouse = await prisma.warehouses.update({
                where: { id: id },
                data: {
                    status: false,
                },
            });
            return {
                message: `Almacén eliminado exitosamente`,
                status: 204,
                data: {
                    warehouse,
                    deleted_at: new Date()
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

export { WarehousesServices };