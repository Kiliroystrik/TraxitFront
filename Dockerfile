# Stage 1: Compile and Build angular codebase

# Utiliser l'image officielle de Node.js
FROM node:20.11.1 as build

# Set the working directory
WORKDIR /usr/local/app

# Copier les fichiers package.json et package-lock.json d'abord
# pour tirer parti du cache de Docker
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les fichiers source dans le conteneur
COPY . .

# Installer Angular CLI globalement
RUN npm install -g @angular/cli

# Générer le build de l'application
RUN npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/traxit-front/browser /usr/share/nginx/html

# Set permissions for the build output
RUN chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80
