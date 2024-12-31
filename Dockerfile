# Étape de build
FROM node:18-alpine AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de définition de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm ci
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application pour la production
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "dev"]
