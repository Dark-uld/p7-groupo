# P7-Groupomania, par R.Pirathepan

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Info

Projet développé sous NuxtJS version 2.15.8, framework de Vue.
Base de donnée SQL créé grâce au systme de gestion de base MariaDB et admininistration faite grâce au logiciel HeidiSQL.

Le fichier groupomania.sql contient les rêquetes nécessaires pour la construction de la base de donnée.
La base de donnée est nommée groupomania et comprend 4 tables : users, posts, comments et likes. Les colonnes "updatedAt" et "createdAt" sont nécessaires au fonctionement de la base de donnée.
L'utilisateur de la database doit avoir les privilèges au mininum de : "SELECT", "DELETE", "INSERT" et "UPDATE".


## Variables d'environnement

Des variables d'environnement sont nécessaires pour le bon fonctionnnement du projet, ils sont situés dans un fichier .env à placer à la racine du dossier.

 Voici la liste des variables:
-PORT=3000
-secretToken= (un string contenant des lettres miniscules/majuscules et des chiffres  qui sera utilisé par jsonwebtoken pour crypté les tokens d'identifications)
-DB_HOST=localhost
-DB_USER= (nom d'utilisateur pour base de donnée (autre que root))
-DB_PASS= (mot de passe d'utilisateur pour base de donnée)
-DB_DATABASE=groupomania
-API_URL=http://localhost:3000/api



## Administration

Plusieurs niveaux d'administrations (users.isAdmin) existent :
- "2" : l'utilisateur ne peut pas supprimer son compte depuis le site que ce soit sur la page d'administration et la page mon compte, peut supprimer un user/ modifier son rang d'admin. N'apparait pas dans la liste des users sur la page d'admin.
- "1" : Peut donner le rang d'admin "1" à un autre user. Peut supprimer son propre compte ou celui d'un autre utilisateur sauf user de rang "2"
- "0" : Rang par défaut attribuer à la création du compte. Peut supprimer son compte. N'a pas accès à la page d'administration.

Le rang "2" peut être attribué à un utilisateur grâce au logiciel HeidiSQL. Une reconnection de l'utilisateur sera nécessaire pour mettre à jour son rang.
