# Tarea-Foc-2025

API de gestión. Con CRUDS funcionales y distintos modulos de trabajo.

## 👥 **Equipo de Desarrollo**

| Nombre |
|---------|
| Jesús Cortez |
| Jesús Camacho |
| Santiago Rodriguez |
| Erika Ramirez |

---

## 📋 Requerimientos

Necesitas tener instalado los siguiente::
<div align="center">
    <img src="https://skillicons.dev/icons?i=nodejs,express,npm,postgresql" height="48" />
</div>

## ⚡ Instalación

1. Clona el repositorio
```bash
    git clone https://github.com/RitoTorri/Tarea-Foc-Backend-2025
    cd Tarea-Foc-Backend-2025
```

2. Instala las dependencias
```bash
    npm install
```

## 🔧 Configuración del .env

1. Una vez instaladas las dependencias vas a cambiar la extension del archivo `.env.example` a `.env`
Este archivo contiene la siguiente estructura:
```bash
# Url del puerto de ejecucion
API_PORT=

# Url de la base de datos
DATABASE_URL="provider://user:password@host:port/name_db"
```  
`API_PORT`: Este es el puerto donde se ejecutara la aplicacion puede ser 3000, 3785, etc.  

`DATABASE_URL`: Este es el url de la base de datos donde:  
    - `provider`: Es el proveedor de la base de datos, puede ser `postgresql`, `mysql`, `mongodb`, etc.  
    - `user`: Es el usuario de la base de datos.  
    - `password`: Es la contraseña del usuario de la base de datos.  
    - `host`: Es la ip o dominio del servidor de la base de datos.  
    - `port`: Es el puerto del servidor de la base de datos.  
    - `name_db`: Es el nombre de la base de datos.  

```bash 
# Ejemplo de como se veria configurado
DATABASE_URL="postgresql://postgres:micontraseña@localhost:5432/database"
```

## 🗄️ Configuracion de prisma 

Una vez configurado el archivo `.env` e instalado todas las dependencias, debes configurar la base de datos con prisma. Ejecuta los siguientes comandos para configurar prisma:
```bash
# Primero carga el esquema de la base de datos
npx prisma migrate dev --name init

# Luego genera el cliente de prisma
npx prisma generate

```

## 🚀 Ejecución

Ejecuta el siguiente comando para ejecutar la aplicación:
```bash
npm run start:dev
```

## Diagrama de arquitectura

<div align="center">

![Diagrama de arquitectura](/Arquitectura_Por_Capas.png)

</div>

## 🎯 Funcionalidades

### 📊 Gestión Completa de Módulos
El sistema ofrece una **administración integral** de todos los recursos a través de una API REST robusta y segura.

### 🔄 Operaciones CRUD Completas
Cada módulo del sistema cuenta con operaciones **CRUD completas** (Crear, Leer, Actualizar, Eliminar) que permiten:

1. **📝 Crear** nuevos registros en cada módulo
2. **👀 Consultar** información específica o listados completos  
3. **✏️ Actualizar** datos existentes de forma segura
4. **🗑️ Eliminar** registros mediante borrado lógico (soft delete)

### 🛡️ Validaciones y Seguridad
1. **Validación en tiempo real** de todos los datos ingresados
2. **Verificación de existencia** de registros relacionados
3. **Protección contra duplicados** en campos únicos
4. **Manejo seguro de estados** (activo/inactivo)

### 🔗 Relaciones y Consistencia
1. **Gestión de relaciones** entre diferentes módulos
2. **Integridad referencial** asegurada en todas las operaciones
3. **Validación cruzada** entre módulos interconectados
