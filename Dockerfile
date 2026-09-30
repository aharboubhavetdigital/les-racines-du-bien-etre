# Étape 1 : Build de l'application
FROM node:20-alpine AS builder

WORKDIR /app

# Copier uniquement les fichiers de configuration nécessaires pour l'installation des dépendances
COPY package*.json ./

# Installer les dépendances (npm ci est préférable pour des builds plus rapides et fiables)
RUN npm install

# Copier le reste du code source
COPY . .

# Lancer la construction de l'application Vite (génère le dossier dist)
RUN npm run build

# Étape 2 : Serveur web Nginx
FROM nginx:alpine

# Supprimer la configuration Nginx par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copier notre configuration Nginx personnalisée (pour gérer le routage SPA)
COPY nginx.conf /etc/nginx/conf.d

# Copier les fichiers statiques construits dans Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
