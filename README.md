# 🏠 Projet de synthèse : Agence Immobilière – Gestion des commissions immobilières

**Agence Immobilière** est un projet de synthèse conçu pour les **stagiaires de première année en développement web (JavaScript) à l'OFPPT**. Il permet de mettre en pratique les concepts fondamentaux du développement Front-end moderne et de l'interaction avec une API simulée.

L'objectif est de gérer la **rémunération des agents immobiliers** en fonction de leurs performances (nombre de contrats et visites). Tout le code est volontairement **simple, commenté et accessible aux débutants**.

---

## 🚀 Objectifs Pédagogiques

Ce projet met en pratique les compétences suivantes :

* **Manipulation du DOM :** Création dynamique d'interfaces pour l'affichage des contrats, des visites et des statistiques.
* **Objets JavaScript :** Modélisation des données (Agents, Contrats, Visites) et gestion de la logique métier.
* **Appels Asynchrones (Fetch / Promise) :** Communication avec une API REST simulée pour lire et persister les données.
* **Gestion des Événements :** Interactivité utilisateur (formulaires, filtres, simulateur).
* **Logique Algorithmique :** Calculs de paliers de commission et de primes fixes.
* **Gestion des droits :** Différenciation Admin / Agent pour l'accès aux fonctionnalités.

---

## 🛠️ Règles Métier (Logique de Commission)

L'application intègre un moteur de calcul basé sur le **nombre de contrats** et les **visites** de l'agent :


| Condition | Taux / Prime |
|-----------|-------------|
| **1 ou 2 contrats** signés dans le mois | **1 %** du chiffre d'affaires |
| **3 contrats ou plus** dans le mois | **1,5 %** sur **tous** les contrats |
| **15 visites ou plus** dans le mois | **+ 5 000 MAD** de prime fixe |

> **Prime fixe :** Si un agent atteint 15 visites dans le mois, une prime de 5 000 MAD est automatiquement ajoutée à sa commission.

---

## 📂 Structure des Données

Le projet utilise un fichier `db.json` à la racine faisant office de base de données :

* **`users`** : `id`, `name`, `email`, `password` (hashé SHA-256), `role` (admin/agent), `visitesMonth`.
* **`contrats`** : `id`, `agentId`, `prixVente`, `type` (Appartement/Villa/Bureau), `date`.
* **`visites`** : `id`, `agentId`, `mois`, `nombre`.

---

## 🗂️ Structure du Projet

```
agence-🏠 Projet de synthèse : Agence Immobilière – Gestion des commissions immobilières

Agence Immobilière est un projet de synthèse conçu pour les stagiaires de première année en développement web (JavaScript) à l'OFPPT. Il permet de mettre en pratique les concepts fondamentaux du développement Front-end moderne et de l'interaction avec une API simulée.

L'objectif est de gérer la rémunération des agents immobiliers en fonction de leurs performances (nombre de contrats et visites). Tout le code est volontairement simple, commenté et accessible aux débutants.
🚀 Objectifs Pédagogiques

Ce projet met en pratique les compétences suivantes :

    Manipulation du DOM : Création dynamique d'interfaces pour l'affichage des contrats, des visites et des statistiques.
    Objets JavaScript : Modélisation des données (Agents, Contrats, Visites) et gestion de la logique métier.
    Appels Asynchrones (Fetch / Promise) : Communication avec une API REST simulée pour lire et persister les données.
    Gestion des Événements : Interactivité utilisateur (formulaires, filtres, simulateur).
    Logique Algorithmique : Calculs de paliers de commission et de primes fixes.
    Gestion des droits : Différenciation Admin / Agent pour l'accès aux fonctionnalités.

🛠️ Règles Métier (Logique de Commission)

L'application intègre un moteur de calcul basé sur le nombre de contrats et les visites de l'agent :
Condition 	Taux / Prime
1 ou 2 contrats signés dans le mois 	1 % du chiffre d'affaires
3 contrats ou plus dans le mois 	1,5 % sur tous les contrats
15 visites ou plus dans le mois 	+ 5 000 MAD de prime fixe

    Prime fixe : Si un agent atteint 15 visites dans le mois, une prime de 5 000 MAD est automatiquement ajoutée à sa commission.

📂 Structure des Données

Le projet utilise un fichier db.json à la racine faisant office de base de données :

    users : id, name, email, password (hashé SHA-256), role (admin/agent), visitesMonth.
    contrats : id, agentId, prixVente, type (Appartement/Villa/Bureau), date.
    visites : id, agentId, mois, nombre.

🗂️ Structure du Projet

Agence Immobilière/
├── index.html          # Landing page vitrine
├── login.html          # Page de connexion standalone
├── dashboard.html      # Tableau de bord (statistiques)
├── contrats.html       # Gestion des contrats (CRUD)
├── visites.html        # Suivi des visites
├── agents.html         # Gestion des agents (admin only)
├── commissions.html    # Simulateur + classement
├── rapports.html       # Statistiques + exports
├── parametres.html     # Profil + mode sombre
├── style.css           # Design Glassmorphism
├── script.js           # Logique métier centralisée
├── db.json             # Base de données simulée
├── package.json        # Scripts npm
├── sw.js               # Service Worker (PWA)
├── manifest.json       # Manifest PWA
└── README.md           # Documentation (ce fichier)

💻 Installation et Lancement
1. Prérequis

Assurez-vous d'avoir les outils suivants installés sur votre machine :

    Node.js (version 16 ou supérieure)
    VS Code
    L'extension Live Server sur VS Code

Pour vérifier que Node.js est bien installé, ouvrez un terminal et tapez :

node -v

Vous devez voir un numéro de version s'afficher (ex: v20.0.0).
2. Cloner ou télécharger le projet

Si vous avez Git installé :

git clone https://github.com/votre-compte/agence-prestige.git
cd agence-prestige

Sinon, téléchargez le projet en ZIP et extrayez-le dans un dossier de votre choix.
3. Installer json-server

json-server est l'outil qui simule une vraie API à partir du fichier db.json.

Ouvrez un terminal à la racine du projet et tapez :

npm install -g json-server

Pour vérifier que l'installation a réussi :

json-server --version

4. Installer les dépendances du projet

npm install

5. Lancer le serveur API (json-server)

Dans le terminal, à la racine du projet, lancez :

json-server --watch db.json --port 3000

Si tout fonctionne, vous verrez :

Resources
  http://localhost:3000/users
  http://localhost:3000/contrats
  http://localhost:3000/visites

⚠️ Important : Laissez ce terminal ouvert pendant toute la durée de votre travail. Si vous le fermez, l'API s'arrête.
6. Installer l'extension Live Server sur VS Code

    Ouvrez VS Code
    Allez dans l'onglet Extensions (Ctrl+Shift+X)
    Recherchez Live Server (par Ritwick Dey)
    Cliquez sur Install

7. Lancer l'application

    Ouvrez le dossier du projet dans VS Code (Fichier > Ouvrir le dossier)
    Dans l'explorateur de fichiers VS Code, faites un clic droit sur index.html
    Cliquez sur "Open with Live Server"
    Le navigateur s'ouvre automatiquement sur http://127.0.0.1:5500/index.html

✅ L'application est prête. Vous pouvez vous connecter avec les identifiants ci-dessous.
🔐 Comptes de test
Rôle 	Email 	Mot de passe
Administrateur 	admin@prestige.ma 	admin123
Agent 	youssef@prestige.ma 	123456
Agent 	fatima@prestige.ma 	123456
Agent 	karim@prestige.ma 	123456
Agent 	nadia@prestige.ma 	123456
✅ Fonctionnalités réalisées

    ✅ Authentification (connexion / inscription) avec hash SHA-256
    ✅ Gestion de session (localStorage) et redirection automatique
    ✅ Tableau de bord avec KPIs et classement des agents
    ✅ Gestion des contrats — affichage, ajout, suppression, filtres
    ✅ Suivi des visites avec objectif 15 et barre de progression
    ✅ Calcul automatique des commissions (1% / 1.5% + fixe 5000 MAD)
    ✅ Simulateur de commissions interactif (sliders)
    ✅ Gestion des agents — CRUD complet (admin uniquement)
    ✅ Rapports avec graphiques et export CSV + PDF
    ✅ Mode sombre persistant
    ✅ PWA (installable sur mobile / desktop)
    ✅ Tests unitaires intégrés (console)
    ✅ Design Glassmorphism moderne et responsive
    ✅ Contrôle des droits Admin / Agent sur toutes les pages

🧪 Tests unitaires

Les règles métier sont validées par des tests automatiques. Ouvrez la console du navigateur (F12) pour voir les résultats :

🧪 TEST DES RÈGLES MÉTIER (10/10)
✅ Cas 1 (1 contrat + 15 visites) => 15 000,00 MAD
✅ Cas 2 (2 contrats + 14 visites) => 30 000,00 MAD
✅ Cas 3 (3 contrats + 15 visites) => 50 000,00 MAD
✅ TOUS LES TESTS SONT PASSÉS !

📊 Endpoints API (JSON Server)
Méthode 	Endpoint 	Description
GET 	/users 	Liste des utilisateurs
GET 	/contrats 	Liste des contrats
GET 	/visites 	Liste des visites
POST 	/users 	Ajouter un utilisateur
POST 	/contrats 	Ajouter un contrat
POST 	/visites 	Ajouter une visite
PUT 	/users/:id 	Modifier un utilisateur
PUT 	/contrats/:id 	Modifier un contrat
PUT 	/visites/:id 	Modifier une visite
DELETE 	/users/:id 	Supprimer un utilisateur
DELETE 	/contrats/:id 	Supprimer un contrat
DELETE 	/visites/:id 	Supprimer une visite
🎨 Aperçu du design

    Palette : Émeraude (#0F6E56) et Or (#EF9F27)
    Effet Glassmorphism : cartes transparentes avec flou, bordures fines
    Animations : fade-in, icône flottante, hover sur cartes/boutons
    Mode sombre : persistant (toggle dans parametres.html)
    Responsive : s'adapte à tous les écrans (mobile, tablette, desktop)

🏆 Ce que ce projet apporte de plus

Comparé à un projet standard de gestion, Agence Prestige intègre :

    🎯 Simulateur de commissions : visualisation en temps réel de l'impact des performances.
    📄 Export PDF et CSV : rapports professionnels téléchargeables.
    🌙 Mode sombre : amélioration de l'expérience utilisateur.
    📱 PWA : l'application peut être installée sur mobile/desktop.
    🧪 Tests unitaires : validation automatique de la logique métier.
    💎 Design Glassmorphism : interface moderne et élégante.

📝 Licence

© 2025 Agence Prestige – Développé dans le cadre du module JavaScript · OFPPT

Développé par [MOHAMAD AMRAOUI + KHALID TAHIR] – Formation Développement Web/
├── index.html          # Landing page vitrine
├── login.html          # Page de connexion standalone
├── dashboard.html      # Tableau de bord (statistiques)
├── contrats.html       # Gestion des contrats (CRUD)
├── visites.html        # Suivi des visites
├── agents.html         # Gestion des agents (admin only)
├── commissions.html    # Simulateur + classement
├── rapports.html       # Statistiques + exports
├── parametres.html     # Profil + mode sombre
├── style.css           # Design Glassmorphism
├── script.js           # Logique métier centralisée
├── db.json             # Base de données simulée
├── package.json        # Scripts npm
├── sw.js               # Service Worker (PWA)
├── manifest.json       # Manifest PWA
└── README.md           # Documentation (ce fichier)
```

---

## 💻 Installation et Lancement

### 1. Prérequis

Assurez-vous d'avoir les outils suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [VS Code](https://code.visualstudio.com/)
- L'extension **Live Server** sur VS Code

Pour vérifier que Node.js est bien installé, ouvrez un terminal et tapez :

```bash
node -v
```

Vous devez voir un numéro de version s'afficher (ex: v20.0.0).

### 2. Cloner ou télécharger le projet

Si vous avez Git installé :

```bash
git clone https://github.com/votre-compte/agence-prestige.git
cd agence-prestige
```

Sinon, téléchargez le projet en ZIP et extrayez-le dans un dossier de votre choix.

### 3. Installer json-server

json-server est l'outil qui simule une vraie API à partir du fichier db.json.

Ouvrez un terminal à la racine du projet et tapez :

```bash
npm install -g json-server
```

Pour vérifier que l'installation a réussi :

```bash
json-server --version
```

### 4. Installer les dépendances du projet

```bash
npm install
```

### 5. Lancer le serveur API (json-server)

Dans le terminal, à la racine du projet, lancez :

```bash
json-server --watch db.json --port 3000
```

Si tout fonctionne, vous verrez :

```
Resources
  http://localhost:3000/users
  http://localhost:3000/contrats
  http://localhost:3000/visites
```

⚠️ **Important :** Laissez ce terminal ouvert pendant toute la durée de votre travail. Si vous le fermez, l'API s'arrête.

### 6. Installer l'extension Live Server sur VS Code

- Ouvrez VS Code
- Allez dans l'onglet Extensions (Ctrl+Shift+X)
- Recherchez Live Server (par Ritwick Dey)
- Cliquez sur Install

### 7. Lancer l'application

- Ouvrez le dossier du projet dans VS Code (Fichier > Ouvrir le dossier)
- Dans l'explorateur de fichiers VS Code, faites un clic droit sur index.html
- Cliquez sur "Open with Live Server"
- Le navigateur s'ouvre automatiquement sur http://127.0.0.1:5500/index.html

✅ L'application est prête. Vous pouvez vous connecter avec les identifiants ci-dessous.

---

## 🔐 Comptes de test

| Rôle | Email | Mot de passe |
|------|-------|-------------|
| **Administrateur** | admin@prestige.ma | admin123 |
| **Agent** | youssef@prestige.ma | 123456 |
| **Agent** | fatima@prestige.ma | 123456 |
| **Agent** | karim@prestige.ma | 123456 |
| **Agent** | nadia@prestige.ma | 123456 |

---

## ✅ Fonctionnalités réalisées

- ✅ Authentification (connexion / inscription) avec hash SHA-256
- ✅ Gestion de session (localStorage) et redirection automatique
- ✅ Tableau de bord avec KPIs et classement des agents
- ✅ Gestion des contrats — affichage, ajout, suppression, filtres
- ✅ Suivi des visites avec objectif 15 et barre de progression
- ✅ Calcul automatique des commissions (1% / 1.5% + fixe 5000 MAD)
- ✅ Simulateur de commissions interactif (sliders)
- ✅ Gestion des agents — CRUD complet (admin uniquement)
- ✅ Rapports avec graphiques et export CSV + PDF
- ✅ Mode sombre persistant
- ✅ PWA (installable sur mobile / desktop)
- ✅ Tests unitaires intégrés (console)
- ✅ Design Glassmorphism moderne et responsive
- ✅ Contrôle des droits Admin / Agent sur toutes les pages

---

## 🧪 Tests unitaires

Les règles métier sont validées par des tests automatiques.
Ouvrez la console du navigateur (F12) pour voir les résultats :

```
🧪 TEST DES RÈGLES MÉTIER (10/10)
✅ Cas 1 (1 contrat + 15 visites) => 15 000,00 MAD
✅ Cas 2 (2 contrats + 14 visites) => 30 000,00 MAD
✅ Cas 3 (3 contrats + 15 visites) => 50 000,00 MAD
✅ TOUS LES TESTS SONT PASSÉS !
```

---

## 📊 Endpoints API (JSON Server)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/users` | Liste des utilisateurs |
| GET | `/contrats` | Liste des contrats |
| GET | `/visites` | Liste des visites |
| POST | `/users` | Ajouter un utilisateur |
| POST | `/contrats` | Ajouter un contrat |
| POST | `/visites` | Ajouter une visite |
| PUT | `/users/:id` | Modifier un utilisateur |
| PUT | `/contrats/:id` | Modifier un contrat |
| PUT | `/visites/:id` | Modifier une visite |
| DELETE | `/users/:id` | Supprimer un utilisateur |
| DELETE | `/contrats/:id` | Supprimer un contrat |
| DELETE | `/visites/:id` | Supprimer une visite |

---

## 🎨 Aperçu du design

- **Palette :** Émeraude (#0F6E56) et Or (#EF9F27)
- **Effet Glassmorphism :** cartes transparentes avec flou, bordures fines
- **Animations :** fade-in, icône flottante, hover sur cartes/boutons
- **Mode sombre :** persistant (toggle dans parametres.html)
- **Responsive :** s'adapte à tous les écrans (mobile, tablette, desktop)

---

## 🏆 Ce que ce projet apporte de plus

Comparé à un projet standard de gestion, Agence Prestige intègre :

- 🎯 Simulateur de commissions : visualisation en temps réel de l'impact des performances.
- 📄 Export PDF et CSV : rapports professionnels téléchargeables.
- 🌙 Mode sombre : amélioration de l'expérience utilisateur.
- 📱 PWA : l'application peut être installée sur mobile/desktop.
- 🧪 Tests unitaires : validation automatique de la logique métier.
- 💎 Design Glassmorphism : interface moderne et élégante.

---

## 📝 Licence


© 2025 Agence Prestige – Développé dans le cadre du module JavaScript · OFPPT

Développé par [MOHAMAD AMRAOUI + KHALID TAHIR] – Formation Développement Web
