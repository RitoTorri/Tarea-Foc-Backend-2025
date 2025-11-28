import { prisma } from '../config/prisma.config.js';

const ProductsServices = {
    getAll: async () => {
        try {
            const products = await prisma.products.findMany({
                where: { status: true },
            });
            if (products.length === 0) {
                return {
                    message: `No se encontraron productos`,
                    status: 404,
                    data: {
                        products: [],
                        total: 0
                    },
                };
            }
            return {
                message: `Productos encontrados`,
                status: 200,
                data: {
                    products,
                    total: products.length
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

    getByNameAndArea: async (name, area_id) => {
        try {
            const product = await prisma.products.findFirst({
                where: {
                    name: name,
                    area_id: area_id,
                },
            });
            if (!product) {
                return {
                    message: `Producto no encontrado`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Producto encontrado`,
                    status: 200,
                    data: {
                        product,
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
            const product = await prisma.products.findUnique({
                where: {
                    id: id,
                    status: true,
                },
            });
            if (!product) {
                return {
                    message: `Producto no encontrado`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Producto encontrado`,
                    status: 200,
                    data: {
                        product,
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

    create: async (productData) => {
        try {
            const newProduct = await prisma.products.create({
                data: {
                    name: productData.name,
                    price: productData.price,
                    quantity: productData.quantity,
                    category_id: productData.category_id,
                    area_id: productData.area_id,
                },
            });
            return {
                message: `Producto creado exitosamente`,
                status: 201,
                data: {
                    product: newProduct,
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

    update: async (id, productData) => {
        try {
            const product = await prisma.products.update({
                where: { id: id },
                data: {
                    ...productData
                },
            });
            return {
                message: `Producto actualizado exitosamente`,
                status: 200,
                data: {
                    product,
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
            const product = await prisma.products.update({
                where: { id: id },
                data: {
                    status: false,
                    deleted_at: new Date()
                },
            });
            return {
                message: `Producto eliminado exitosamente`,
                status: 204,
                data: {
                    product,
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

export { ProductsServices };