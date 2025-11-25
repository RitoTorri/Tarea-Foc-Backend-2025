// Imports
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Imports de las rutas
import areasRoutes from '../routes/areas.route.js';
import categoriesRoutes from '../routes/categories.route.js';
import productsRoutes from '../routes/products.route.js';
import rolesRoutes from '../routes/roles.route.js';
import usersRoutes from '../routes/users.route.js';
import werehousesRoutes from '../routes/warehouses.route.js';

// Cargamos las variables de entorno
dotenv.config()

// Exportamos la clase Servidor
export class Server {
    // Propiedades
    app;
    port;
    url_base;

    // Constructor
    constructor() {
        // Inicializamos las variables y funciones necesarias
        this.app = express();
        this.port = process.env.API_PORT;
        this.url_base = '/api/v1';
        this.middlewares()
        //rutas
        this.rutas = {
            areas: `${this.url_base}/areas`,
            categories: `${this.url_base}/categories`,
            products: `${this.url_base}/products`,
            roles: `${this.url_base}/roles`,
            users: `${this.url_base}/users`,
            warehouses: `${this.url_base}/warehouses`,
        };
        this.routes();
    }

    // Métodos
    middlewares = () => {
        this.app.use(cors())
        this.app.use(express.json());
    }

    routes = () => {
        this.app.use(this.rutas.areas, areasRoutes)
        this.app.use(this.rutas.categories, categoriesRoutes)
        this.app.use(this.rutas.products, productsRoutes)
        this.app.use(this.rutas.roles, rolesRoutes)
        this.app.use(this.rutas.users, usersRoutes)
        this.app.use(this.rutas.warehouses, werehousesRoutes)
    }

    listen = () => {
        this.app.listen(this.port, () => {
            console.log(`server running at http://localhost:${this.port}`);
        })
    }
}
