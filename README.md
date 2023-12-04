# Top Paris Jo 2024

## Description
Ceci est un poc pour le projet Top Paris Jo 2024, qui a pour but de créer une application web permettant de visualiser les Top Paris des jeux olympiques de 2024.

## Prérequis

Pour exécuter ce projet, vous aurez besoin des éléments suivants installés :

- **Docker**: Utilisé pour créer, déployer et gérer des conteneurs pour les services de l'application.
    - Assurez-vous d'avoir Docker installé et en cours d'exécution sur votre système. Pour l'installation, suivez les instructions sur le [site officiel de Docker](https://docs.docker.com/get-docker/).

- **Docker Compose** : Utilisé pour définir et exécuter des environnements multi-conteneurs avec Docker.
    - Docker Compose est généralement inclus dans les installations de Docker Desktop pour Windows et Mac, mais peut nécessiter une installation séparée sur Linux. Vérifiez les instructions d'installation sur le [site officiel de Docker Compose](https://docs.docker.com/compose/install/).

Ces outils permettent de gérer et d'exécuter les conteneurs nécessaires pour les services MongoDB, Angular, et NestJS de manière isolée et cohérente entre les environnements de développement et de production.

Si vous souhaitez demarrer le POC manuellement en mode dev, vous devez avoir Node.js 18.13.0 ou plus et NPM installés sur votre machine.

## Démarrage rapide pour tester le POC
Il y a deux manières de tester le POC : en utilisant Docker Compose ou en démarrant chaque service manuellement.

### Utilisation de Docker Compose

1. **Avec Docker Compose**
    - Cette méthode est la plus simple et recommandée pour tester rapidement le POC.
    - Exécutez la commande suivante dans le répertoire racine du projet :
      ```bash
      docker-compose up --build
      ```
    - Cette commande va construire et démarrer tous les services (MongoDB, Backend NestJS, Frontend Angular) dans des conteneurs Docker.

### Démarrage Manuel des Services

2. **Démarrage Manuel**
    - Si vous préférez démarrer les services individuellement pour un contrôle plus fin ou pour des besoins de débogage, suivez ces étapes :

   **MongoDB :**
    - Assurez-vous que MongoDB est installé et en cours d'exécution sur votre machine.
    - [Instructions spécifiques pour démarrer MongoDB]

   **Backend NestJS :**
     - Naviguez dans le répertoire du backend et crée un fichier .env en suivant le modèle du fichier .env.example :
      ```bash
      cd ./top-paris-backend
      cp .env.example .env
      ```

     - installez les dépendances :
      ```bash
      npm install
      ```
    - Démarrez le serveur NestJS :
      ```bash
      npm run start:dev
      ```
   - Accédez à l'application via `http://localhost:3000/openapi` dans votre navigateur.

   **Frontend Angular :**
    - Naviguez dans le répertoire du frontend et installez les dépendances :
      ```bash
      cd ./top-paris-frontend
      npm install
      ```
    - Lancez l'application Angular :
      ```bash
      ng serve
      ```

    - Accédez à l'application via `http://localhost:4200` dans votre navigateur.

Ces instructions permettent de tester le POC de deux manières différentes, selon vos préférences.
