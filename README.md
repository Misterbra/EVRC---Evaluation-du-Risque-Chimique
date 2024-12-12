# EVRC - Évaluation du Risque Chimique

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Licence](https://img.shields.io/badge/licence-MIT-green.svg)
[![INRS](https://img.shields.io/badge/Methodologie-INRS-orange.svg)](https://www.inrs.fr/)

</div>

## 📋 Description

EVRC est un outil web qui révolutionne l'évaluation des risques chimiques en laboratoire en centralisant et automatisant le processus d'évaluation selon la méthodologie INRS.

### 🎯 Valeur Ajoutée

- **Gain de temps considérable** : 
 - Évaluation instantanée vs plusieurs heures manuellement
 - Centralisation des données de sécurité (FDS, VLEP, phrases H)
 - Plus besoin de consulter multiples sources d'information

- **Fiabilité accrue** :
 - Standardisation des évaluations
 - Élimination des erreurs de calcul manuel
 - Traçabilité des évaluations

- **Simplicité d'utilisation** :
 - Interface intuitive
 - Sélection rapide des produits et conditions
 - Export automatique des rapports

### 💾 Base de Données

Notre base de données inclut plus de 500 produits chimiques courants avec :
- Numéros CAS
- Phrases de danger (H)
- VLEP
- Propriétés physico-chimiques
- Classifications CMR

**Appel à contribution** : La base de données est en amélioration continue. Nous invitons la communauté à :
- Vérifier l'exactitude des données existantes
- Proposer l'ajout de nouveaux produits
- Signaler toute erreur ou imprécision

## ⚠️ Avertissement

Cet outil est une **aide à la décision** et ne remplace en aucun cas :
- L'expertise d'un professionnel de la sécurité
- Les évaluations réglementaires obligatoires
- Les procédures de sécurité en vigueur dans votre établissement

## 🚀 Fonctionnalités

- Base de données de produits chimiques
- Calcul automatisé des niveaux de risque (méthodologie INRS)
- Interface utilisateur moderne et responsive
- Export Excel des évaluations
- Gestion avancée des CMR
- Prise en compte complète des conditions d'utilisation

## 💻 Stack Technique

- React/Next.js
- TypeScript
- Tailwind CSS
- Shadcn/ui

## 🛠️ Installation

```bash
# Cloner le repository
git clone https://github.com/Misterbra/EVRC--Evaluation-du-Risque-Chimique.git

# Installer les dépendances
cd EVRC--Evaluation-du-Risque-Chimique
npm install

# Lancer en développement
npm run dev
```

## 📖 Méthodologie

L'application implémente la méthodologie INRS qui évalue le risque selon :

1. **Danger intrinsèque** :
  * Phrases H
  * VLEP
  * Statut CMR

2. **Protection collective** :
  * Niveau de confinement (sorbonne, etc.)
  * Durée d'exposition
  * Fréquence d'utilisation

3. **Facteurs physico-chimiques** :
  * Pression de vapeur
  * État physique
  * Conditions d'utilisation

## 🤝 Comment Contribuer

Nous accueillons toutes les contributions, particulièrement pour :

1. **Base de données** :
  * Vérification des données existantes
  * Ajout de nouveaux produits
  * Mise à jour des informations

2. **Code** :
  * Nouvelles fonctionnalités
  * Corrections de bugs
  * Améliorations UI/UX

3. **Documentation** :
  * Amélioration du guide utilisateur
  * Traduction
  * Exemples d'utilisation

Pour contribuer :

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements
4. Pushez sur la branche
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. 

## 🙏 Remerciements

* INRS pour leur méthodologie d'évaluation
* Tous les contributeurs au projet

## 📧 Contact

Pour toute question ou suggestion :
* Email : nabil.brag@cea.fr
* GitHub Issues : [Créer une issue](https://github.com/Misterbra/EVRC--Evaluation-du-Risque-Chimique/issues)

---
<div align="center">
Développé avec ❤️ par Misterbra
</div>
