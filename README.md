# 🏠 Projet de synthèse : Agence Prestige – Gestion des commissions immobilières

**Agence Prestige** est un projet de synthèse conçu pour les stagiaires de première année en développement web (JavaScript) à l'OFPPT.  
Il permet de mettre en pratique les concepts fondamentaux du développement Front-end moderne et de l'interaction avec une API simulée.

L'objectif est de gérer la **rémunération des agents immobiliers** en fonction de leurs performances (nombre de contrats et visites).  
Tout le code est volontairement simple, commenté et accessible aux débutants.

---

## 🚀 Objectifs Pédagogiques

Ce projet met en pratique les compétences suivantes :

- **Manipulation du DOM** : Création dynamique d'interfaces pour l'affichage des contrats, des visites et des statistiques.
- **Objets JavaScript** : Modélisation des données (Agents, Contrats, Visites) et gestion de la logique métier.
- **Appels Asynchrones (Fetch / Promise)** : Communication avec une API REST simulée pour lire et persister les données.
- **Gestion des Événements** : Interactivité utilisateur (formulaires, filtres, simulateur).
- **Logique Algorithmique** : Calculs de paliers de commission et de primes fixes.
- **Gestion des droits** : Différenciation Admin / Agent pour l'accès aux fonctionnalités.

---

## 🛠️ Règles Métier (Logique de Commission)

L'application intègre un moteur de calcul basé sur le **nombre de contrats** et les **visites** de l'agent :

| Condition | Taux / Prime |
|-----------|--------------|
| 1 ou 2 contrats signés dans le mois | **1 %** du chiffre d'affaires |
| 3 contrats ou plus dans le mois | **1,5 %** sur **tous** les contrats |
| 15 visites ou plus dans le mois | **+ 5 000 MAD** de prime fixe |

> **Prime fixe** : Si un agent atteint 15 visites dans le mois, une prime de 5 000 MAD est automatiquement ajoutée à sa commission.

---

## 📂 Structure des Données

Le projet utilise un fichier `db.json` à la racine faisant office de base de données :

- **users** : `id`, `name`, `email`, `password` (hashé SHA-256), `role` (admin/agent), `visitesMonth`.
- **contrats** : `id`, `agentId`, `prixVente`, `type` (Appartement/Villa/Bureau), `date`.
- **visites** : `id`, `agentId`, `mois`, `nombre`.

---

## 🗂️ Structure du Projet
agence-prestige/
├── index.html # Landing page vitrine
├── login.html # Page de connexion standalone
├── dashboard.html # Tableau de bord (statistiques)
├── contrats.html # Gestion des contrats (CRUD)
├── visites.html # Suivi des visites
├── agents.html # Gestion des agents (admin only)
├── commissions.html # Simulateur + classement
├── rapports.html # Statistiques + exports
├── parametres.html # Profil + mode sombre
├── style.css # Design Glassmorphism
├── script.js # Logique métier centralisée
├── db.json # Base de données simulée
├── package.json # Scripts npm
├── sw.js # Service Worker (PWA)
├── manifest.json # Manifest PWA
└── README.md # Documentation (ce fichier)

---

## 💻 Installation et Lancement

### 1. Prérequis

Assurez-vous d'avoir les outils suivants installés sur votre machine :

- **Node.js** (version 16 ou supérieure)
- **VS Code**
- **L'extension Live Server** sur VS Code

Pour vérifier que Node.js est bien installé, ouvrez un terminal et tapez :

```bash
node -v
Vous devez voir un numéro de version s'afficher (ex: v20.0.0).
2. Cloner ou télécharger le projet

Si vous avez Git installé :
bash

git clone https://github.com/votre-compte/agence-prestige.git
cd agence-prestige

Sinon, téléchargez le projet en ZIP et extrayez-le dans un dossier de votre choix.
3. Installer json-server

json-server est l'outil qui simule une vraie API à partir du fichier db.json.

Ouvrez un terminal à la racine du projet et tapez :
bash

npm install -g json-server

Pour vérifier que l'installation a réussi :
bash

json-server --version

4. Installer les dépendances du projet
bash

npm install

5. Lancer le serveur API (json-server)

Dans le terminal, à la racine du projet, lancez :
bash

json-server --watch db.json --port 3000

Si tout fonctionne, vous verrez :
text

Resources
  http://localhost:3000/users
  http://localhost:3000/contrats
  http://localhost:3000/visites

    ⚠️ Important : Laissez ce terminal ouvert pendant toute la durée de votre travail. Si vous le fermez, l'API s'arrête.

6. Lancer l'application

    Ouvrez le dossier du projet dans VS Code.

    Dans l'explorateur de fichiers VS Code, faites un clic droit sur index.html.

    Cliquez sur "Open with Live Server".

    Le navigateur s'ouvre automatiquement sur http://127.0.0.1:5500/index.html.
> ✅ L'application est prête. Vous pouvez vous connecter avec les identifiants ci-dessous.

---

## 🔐 Comptes de test

| Rôle | Email | Mot de passe |
| --- | --- | --- |
| **Administrateur** | abakar@gmail.com | 100900 |

---

## ✅ Fonctionnalités réalisées

* [x] Authentification (connexion / inscription) avec hash SHA-256
* [x] Gestion de session (localStorage) et redirection automatique
* [x] Tableau de bord avec statistiques et classement des avocats
* [x] Gestion des dossiers — affichage, ajout, modification, suppression
* [x] Filtres sur les dossiers (statut, avocat, recherche)
* [x] Calcul automatique des honoraires selon le grade
* [x] Prime de succès automatique (+10% si dossier "Gagné")
* [x] Gestion des avocats — modification du grade et salaire (admin uniquement)
* [x] Contrôle des droits Admin / Avocat sur toutes les pages

---

**Développé dans le cadre du module JavaScript — Formation Développement Web · OFPPT**
