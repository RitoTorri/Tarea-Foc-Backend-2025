import { prisma } from '../config/prisma.config.js';

const AreasServices = {
    getAll: async () => {
        try {
            const areas = await prisma.areas.findMany({
                where: { status: true },
            });
            if (areas.length === 0) {
                return {
                    message: `No se encontraron áreas`,
                    status: 404,
                    data: {
                        areas: [],
                        total: 0
                    },
                };
            }
            return {
                message: `Áreas encontradas`,
                status: 200,
                data: {
                    areas,
                    total: areas.length
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
            const area = await prisma.areas.findFirst({
                where: {
                    name: name,
                },
            });
            if (!area) {
                return {
                    message: `Área no encontrada`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Área encontrada`,
                    status: 200,
                    data: {
                        area,
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
            const area = await prisma.areas.findUnique({
                where: {
                    id: id,
                    status: true,
                },
            });
            if (!area) {
                return {
                    message: `Área no encontrada`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Área encontrada`,
                    status: 200,
                    data: {
                        area,
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

    create: async (areaData) => {
        try {
            const newArea = await prisma.areas.create({
                data: {
                    name: areaData.name,
                    warehouse_id: areaData.warehouse_id,
                },
            });
            return {
                message: `Área creada exitosamente`,
                status: 201,
                data: {
                    area: newArea,
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

    update: async (id, areaData) => {
        try {
            const area = await prisma.areas.update({
                where: { id: id },
                data: {
                    ...areaData
                },
            });
            return {
                message: `Área actualizada exitosamente`,
                status: 200,
                data: {
                    area,
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
            const area = await prisma.areas.update({
                where: { id: id },
                data: {
                    status: false,
                    deleted_at: new Date()
                },
            });
            return {
                message: `Área eliminada exitosamente`,
                status: 204,
                data: {
                    area,
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

export { AreasServices };