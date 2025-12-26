This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

.md`
**Emplacement :** Racine du projet

```markdown
# XCCM - Cross-Cultural Content Management Platform

API REST moderne construite avec Next.js 15, Prisma, MongoDB et TypeScript.

## 🚀 Fonctionnalités

- ✅ **Authentification JWT sécurisée** avec bcrypt
- ✅ **Documentation Swagger/OpenAPI 3.0** interactive
- ✅ **Validation des données** avec Zod
- ✅ **Base de données MongoDB** avec Prisma ORM
- ✅ **Architecture professionnelle** avec Next.js 15 App Router
- ✅ **Type-safety complet** avec TypeScript
- ✅ **Middleware de protection** des routes API

## 📋 Prérequis

- Node.js 18.17 ou supérieur
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

## 🛠️ Installation

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd my-prisma-app
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Copiez le fichier `.env.example` en `.env` et configurez vos variables :

```bash
cp .env.example .env
```

Modifiez le fichier `.env` avec vos informations :

```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"
JWT_SECRET="votre_secret_jwt_super_securise_32_caracteres_minimum"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 4. Générer le client Prisma

```bash
npx prisma generate
```

### 5. (Optionnel) Pousser le schéma vers MongoDB

```bash
npx prisma db push
```

### 6. Lancer le serveur de développement

```bash
npm run dev
```

L'application sera accessible sur http://localhost:3000

## 📚 Documentation

- **Page d'accueil** : http://localhost:3000
- **Documentation Swagger** : http://localhost:3000/docs
- **Healthcheck** : http://localhost:3000/api/health

## 🔐 Endpoints API

### Authentification

| Méthode | Endpoint | Description | Protection |
|---------|----------|-------------|------------|
| POST | `/api/auth/register` | Inscription d'un nouvel utilisateur | Publique |
| POST | `/api/auth/login` | Connexion et obtention du token JWT | Publique |
| GET | `/api/auth/me` | Récupérer les informations de l'utilisateur connecté | Protégée |
| POST | `/api/auth/logout` | Déconnexion de l'utilisateur | Protégée |

### Utilitaires

| Méthode | Endpoint | Description | Protection |
|---------|----------|-------------|------------|
| GET | `/api/health` | Vérifier l'état de l'API | Publique |
| GET | `/api/docs` | Spécification OpenAPI JSON | Publique |

## 🧪 Tester l'API

### Avec curl

```bash
# Inscription
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123",
    "lastname": "Doe",
    "firstname": "John",
    "org": "XCCM Inc.",
    "occupation": "Développeur"
  }'

# Connexion
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123"
  }'

# Récupérer les informations utilisateur (avec token)
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer VOTRE_TOKEN_JWT"
```

### Avec Swagger UI

1. Accédez à http://localhost:3000/docs
2. Cliquez sur "Authorize" en haut à droite
3. Entrez votre token JWT (sans le préfixe "Bearer")
4. Testez les endpoints directement depuis l'interface

## 📁 Structure du projet

```
my-prisma-app/
├── prisma/
│   └── schema.prisma           # Schéma Prisma
├── src/
│   ├── app/
│   │   ├── api/                # Routes API
│   │   │   ├── auth/           # Authentification
│   │   │   ├── docs/           # Spécification OpenAPI
│   │   │   └── health/         # Healthcheck
│   │   ├── docs/               # Page Swagger UI
│   │   ├── layout.tsx          # Layout principal
│   │   └── page.tsx            # Page d'accueil
│   ├── lib/                    # Bibliothèques
│   │   ├── prisma.ts           # Client Prisma
│   │   ├── auth.ts             # Fonctions d'authentification
│   │   └── swagger.ts          # Configuration Swagger
│   ├── middleware.ts           # Middleware de protection
│   ├── types/                  # Types TypeScript
│   └── utils/                  # Fonctions utilitaires
├── .env                        # Variables d'environnement
├── next.config.ts              # Configuration Next.js
└── package.json                # Dépendances
```

## 🔒 Sécurité

- Mots de passe hashés avec **bcrypt** (10 rounds)
- Tokens JWT avec expiration configurable
- Validation stricte des entrées avec **Zod**
- Middleware de protection des routes sensibles
- Headers CORS configurables

## 🛡️ Modèle de données

Le projet utilise MongoDB avec les modèles suivants :

- **User** : Utilisateurs de la plateforme
- **Project** : Projets collaboratifs
- **Document** : Documents générés
- **Part, Chapter, Paragraph, Notion** : Structure hiérarchique des contenus
- **Invitation** : Invitations collaboratives
- **Like** : Système de likes sur les documents

## 📦 Scripts disponibles

```bash
npm run dev          # Lancer le serveur de développement
npm run build        # Compiler pour la production
npm run start        # Lancer le serveur de production
npm run lint         # Linter le code
npx prisma studio    # Ouvrir Prisma Studio (GUI pour la DB)
npx prisma generate  # Générer le client Prisma
npx prisma db push   # Pousser le schéma vers MongoDB
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

ENSPY

## 👨‍💻 Auteur

XCCM Team
```

---

## ✅ RÉCAPITULATIF COMPLET

Vous avez maintenant **TOUS** les fichiers nécessaires pour votre projet Next.js 15 avec authentification JWT complète !

### 📦 Commandes finales pour tout créer

```bash
# 1. Créer tous les dossiers
mkdir -p src/app/api/auth/{register,login,logout,me}
mkdir -p src/app/api/{docs,health}
mkdir -p src/app/docs
mkdir -p src/lib
mkdir -p src/types
mkdir -p src/utils

# 2. Générer le client Prisma
npx prisma generate

# 3. Lancer le projet
npm run dev
```

### 🎯 URLs à tester

1. **Page d'accueil** : http://localhost:3000
2. **Documentation Swagger** : http://localhost:3000/docs
3. **Healthcheck** : http://localhost:3000/api/health
4. **Inscription** : POST http://localhost:3000/api/auth/register
5. **Connexion** : POST http://localhost:3000/api/auth/login
6. **Profil utilisateur** : GET http://localhost:3000/api/auth/me

Tout est maintenant complet et fonctionnel ! 🚀
