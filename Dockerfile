# Utilizar una imagen de Node.js como base
FROM node:20-slim

# Establecer el directorio de trabajo en el contenedor
WORKDIR /REDTRON_API

# Copiar el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias
RUN npm install --production

# Instalar TypeScript de forma global
RUN npm install -g typescript

# Copiar el resto de los archivos al contenedor
COPY . .

# Exponer el puerto de la base de datos
EXPOSE 3001

# Ejecutar el comando para iniciar la aplicación
CMD [ "npm", "run", "dev" ]

