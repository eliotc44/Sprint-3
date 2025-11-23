# **ReadMe SAE 301-303**

CapMaster est une application web de visualisation de données dédiée à l'orientation en Master. Elle permet aux utilisateurs de consulter des statistiques sur les formations universitaires en France.  
L'outil récupère les informations via une API dédiée ([https://monmaster-api-uni.up.railway.app/api/](https://monmaster-api-uni.up.railway.app/api/)) et présente les données sous forme de graphiques interactifs et de cartes géographiques pour faciliter la prise de décision des étudiants.

Les fonctionnalités principales sont :

* la visualisation géographique de l'établissement et des formations suggérées.  
* les statistiques d'admission (taux d'accès, répartition hommes/femmes, origine des candidats).  
* les données d'insertion professionnelle (salaire, taux d'emploi).  
* un système de persona pour contextualiser le profil type d'un étudiant selon la discipline et permet à l'utilisateur de mieux se projeter.

# **Présentation technique**

## *Architecture globale*

Le projet est une Single Page Application, développée en JavaScript natif. Elle nécessite qu'un serveur web soit requis pour le chargement des modules.

* frontend : HTML5, CSS3, JavaScript.  
* backend/API : L'application communique avec une API externe hébergée sur railway.app développée par Eliot Chataigner.  
* données : Format JSON via requêtes HTTP fetch.

## *Stack technologique et bibliothèques*

L'application s'appuie sur des bibliothèques chargées via CDN :

* leaflet.js (et MarkerCluster) : Gestion des cartes interactives (localisation des établissements et suggestions).  
* ECharts (Apache) : Génération des graphiques statistiques (Donuts, Bar charts, Polar charts).

## *Structure des fichiers clés*

L'organisation du code est modulaire pour faciliter la maintenance

* master.html : Point d'entrée de la vue. Contient la structure du DOM vide (\<div id="content"\>) qui sera peuplée par JavaScript.  
* scripts :  
  * main.js : Chef d'orchestre. Il initialise l'application, récupère l'ID du master dans l'URL, appelle l'API et lance la création des composants.  
  * viz.js : Contient toutes les fonctions de visualisation graphique (cartes Leaflet, graphiques ECharts pour les salaires, taux d'accès, etc.).  
  * cache.js : Gère la mise en cache des données lourdes comme la liste complète des établissements ou des disciplines pour limiter les appels API.  
  * persona.js : Logique de génération du profil étudiant fictif (Persona) basé sur la discipline du master.  
  * fetchMaster.js : Utilitaire simple pour parser les paramètres d'URL.  
* styles/ : Contient les feuilles de style CSS.  
* images/ : Actifs graphiques (avatars des personas, fonds, icônes SVG).

## *Gestion des Données et API*

* endpoint API : https://monmaster-api-uni.up.railway.app/api  
* flux de données :  
  1. récupération de l'ID formation via l'URL (?id=...).  
  2. appel GET /formations/{id}.  
  3. affichage conditionnel des sections (si les données d'insertion sont disponibles, elles s'affichent, sinon elles sont masquées).

# **Guide de Déploiement**

## *Prérequis*

Un serveur web standard (Apache, Nginx, ou simple serveur Python/Node pour le local).  
L'ouverture directe du fichier index.html ou master.html dans le navigateur via le protocole file:// ne fonctionnera pas en raison des politiques de sécurité CORS liées aux Modules ES6.

## *Installation*

1. Cloner ou extraire les sources du projet sur le serveur et s'assurer que la structure de dossiers est préservée :  
   Plaintext  
   / (racine)

├── master.html  
├── styles/  
├── scripts/  
└── images/

2. Vérifier que le serveur possède les droits de lecture sur l'ensemble des fichiers.

## *Lancement et Utilisation*

1. Démarrez le serveur web pointant sur le dossier racine.  
2. Accédez à la page via l'URL en fournissant un paramètre id de master valide (correspondant à un identifiant de formation dans la base de données MonMaster).   
   Exemple d'URL : http://votre-serveur/master.html?id=1402546G42EK

## *Configuration et Maintenance*

* Mise à jour de l'API : Si l'URL de l'API change, elle doit être modifiée manuellement dans les fichiers suivants :  
  * scripts/main.js  
  * scripts/cache.js (variable API\_BASE)  
  * scripts/suggestion.js (si applicable).  
* Cache : Le script cache.js stocke les données dans le localStorage du navigateur. En cas de mise à jour majeure des données "statiques" (liste des établissements), il peut être nécessaire de demander aux utilisateurs de vider leur cache.