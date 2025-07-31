# Questionnaire - Application Fullstack (Flask + React)

Ce projet est une application de gestion de questionnaires destinée à collecter, stocker et analyser les besoins ou retours d'utilisateurs via un formulaire interactif.  
L'architecture repose sur un backend Python/Flask et un frontend React (Vite).

---

## Fonctionnalités

- **Frontend (React)**
  - Formulaire complet pour la saisie des réponses utilisateurs.
  - Validation et gestion dynamique des champs.
  - Affichage des résultats et accès administrateur pour l'analyse statistique.
  - Visualisation graphique (ACM) des résultats pour l'administrateur.
- **Backend (Flask)**
  - API REST pour la soumission et l'analyse des réponses.
  - Stockage des données dans une base MariaDB (SQLAlchemy).
  - Analyse en composantes multiples (MCA/ACM) avec la librairie Prince.
  - Sécurisation de l'accès à l'analyse par token admin.

---

## Structure du projet

```
questionnaire/
├── backend/
│   ├── app.py
│   ├── Procfile
│   └── models/
│       └── models.py
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── README.md
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── main.jsx
│       ├── services/
│       │   └── api.js
│       └── components/
│           └── QuestionnaireForm.jsx
```

---

## Installation & Lancement

### Backend (Flask)

1. Place-toi dans le dossier `backend`.
2. Installe l'environnement virtuel et les dépendances :
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    ```
3. Configure la base de données (voir `app.py` pour la chaîne de connexion MariaDB).
4. Lance le serveur :
    ```bash
    python app.py
    ```
   Ou, pour la production :
    ```bash
    gunicorn app:app
    ```

### Frontend (React)

1. Place-toi dans le dossier `frontend`.
2. Installe les dépendances :
    ```bash
    npm install
    ```
3. Lance le serveur de développement :
    ```bash
    npm run dev
    ```

---

## Utilisation

- Accède à l'application frontend (par défaut sur http://localhost:5173).
- Remplis le questionnaire et soumets-le.
- Pour lancer une analyse ACM (admin), entre le token admin dans le champ prévu (voir `SECRET_ADMIN_TOKEN` dans le backend).

---

## Déploiement

- **Backend** : Utilise Gunicorn et un Procfile pour déploiement sur Render, Heroku, etc.
- **Frontend** : Build (`npm run build`) puis héberge sur Netlify, Vercel, etc.

---

## Sécurité

- **Important** : Ne laisse jamais le token admin ou les identifiants de BDD en clair dans le code source en production. Utilise des variables d'environnement.

---

## Contributeurs

- @AndrianTiana200745

---

## Licence

MIT (ou à préciser)
