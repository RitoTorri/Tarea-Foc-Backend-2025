import { prisma } from '../config/prisma.config.js';

const CategoriesServices = {
    getAll: async () => {
        try {
            const categories = await prisma.categories.findMany({
                where: { status: true },
            });
            if (categories.length === 0) {
                return {
                    message: `No se encontraron categorías`,
                    status: 404,
                    data: {
                        categories: [],
                        total: 0
                    },
                };
            }
            return {
                message: `Categorías encontradas`,
                status: 200,
                data: {
                    categories,
                    total: categories.length
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

    getById: async (id) => {
        try {
            const categorie = await prisma.categories.findUnique({
                where: {
                    id: id,
                    status: true,
                },
            });
            if (!categorie) {
                return {
                    message: `Categoría no encontrada`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Categoría encontrada`,
                    status: 200,
                    data: {
                        categorie,
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

    create: async (categoryData) => {
        try {
            const newCategory = await prisma.categories.create({
                data: {
                    name: categoryData.name,
                },
            });
            return {
                message: `Categoría creada exitosamente`,
                status: 201,
                data: {
                    category: newCategory,
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

    getByName: async (name) => {
        try {
            const categorie = await prisma.categories.findUnique({
                where: {
                    name: name
                },
            });
            if (!categorie) {
                return {
                    message: `Categoría no encontrada`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Categoría encontrada`,
                    status: 200,
                    data: {
                        categorie,
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

    update: async (id, categoryData) => {
        try {
            const categorie = await prisma.categories.update({
                where: { id: id },
                data: {
                    ...categoryData
                },
            });
            return {
                message: `Categoría actualizada exitosamente`,
                status: 200,
                data: {
                    categorie,
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
            const categorie = await prisma.categories.update({
                where: { id: id },
                data: {
                    status: false,
                    deleted_at: new Date()
                },
            });
            return {
                message: `Categoría eliminada exitosamente`,
                status: 204,
                data: {
                    categorie,
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

export { CategoriesServices };