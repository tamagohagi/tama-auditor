# 🥚 Tama Auditor - Application Mobile d'Audit 100% Hors-Ligne

Application complète pour les auditeurs terrain avec intelligence artificielle embarquée, fonctionnant 100% hors-ligne.

## ✨ Fonctionnalités Principales

### 🔐 **Authentification & Sécurité**
- **Système d'authentification complet** avec rôles (auditeur/technicien)
- **Accès technicien** avec mot de passe maître pour réinitialisation
- **Stockage sécurisé** des données locales avec IndexedDB
- **Connexion locale** sans serveur externe

### 📊 **Gestion des Audits**
- **Création d'audits** avec photos et notes audio
- **Anomalies détectées** avec classification IA
- **Statistiques en temps réel** sur le tableau de bord
- **Historique complet** avec filtres avancés

### 🤖 **Intelligence Artificielle**
- **Détection d'anomalies** via TensorFlow.js (hors-ligne)
- **Analyse d'images** pour détecter fissures, moisissures, etc.
- **Suggestions automatiques** basées sur la base de connaissances
- **Transcription audio** via Web Speech API

### 📸 **Capture Multimédia**
- **Appareil photo** avec analyse IA en temps réel
- **Enregistrement audio** avec transcription automatique
- **Stockage local** de toutes les captures
- **Téléchargement** des fichiers

### 📋 **Génération de Rapports**
- **Rapports PDF** professionnels avec photos et analyses
- **Templates personnalisables** (standard, détaillé, résumé)
- **Export Word/HTML** pour partage
- **Signatures numériques** intégrées

### 📚 **Base de Connaissances**
- **Guide complet** des anomalies et corrections
- **Catégories organisées** (structurel, électrique, plomberie, etc.)
- **Temps estimés** pour chaque intervention
- **Recherche intelligente** avec filtres

### 🌐 **Progressive Web App**
- **Installation** comme application native
- **Fonctionnement 100% hors-ligne**
- **Synchronisation** quand la connexion est disponible
- **Interface mobile-first** optimisée

## 🚀 Installation & Utilisation

### Prérequis
- Navigateur moderne avec support PWA
- Accès à la caméra et au microphone
- Chrome, Firefox, Safari ou Edge

### Installation
1. **Ouvrir l'application** dans le navigateur
2. **Installer comme PWA** via le menu du navigateur
3. **Créer un compte** ou utiliser l'accès technicien

### Accès Technicien
- **Utilisateur:** `technician`
- **Mot de passe:** `TamaAuditor2024!`

## 📱 Interface Utilisateur

### Page de Connexion
- Logo Tama Auditor (œuf avec loupe)
- Connexion/Inscription
- Accès technicien visible

### Tableau de Bord
- **Statistiques** en temps réel
- **Actions rapides** (nouvel audit, capture, rapports)
- **Activité récente** avec onglets

### Création d'Audit
- **Informations** de base
- **Capture de photos** avec analyse IA
- **Enregistrement audio** avec transcription
- **Validation** avant sauvegarde

## 🛠️ Architecture Technique

### Stack Technique
- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Base de données:** IndexedDB (hors-ligne)
- **IA:** TensorFlow.js (modèles locaux)
- **PWA:** Service Worker, Manifest

### Structure des Données
```typescript
// Audit
interface Audit {
  id: string
  title: string
  location: string
  auditor: User
  status: 'draft' | 'in_progress' | 'completed' | 'reviewed'
  anomalies: Anomaly[]
  photos: MediaFile[]
  audioNotes: MediaFile[]
}

// Anomaly
interface Anomaly {
  id: string
  type: string
  severity: 'minor' | 'major' | 'critical'
  description: string
  aiSuggestion?: AISuggestion
  photos: MediaFile[]
}
```

## 🎯 Utilisation Rapide

### Créer un Nouvel Audit
1. **Connexion** avec votre compte
2. **Nouvel Audit** depuis le tableau de bord
3. **Remplir** les informations
4. **Capturer** photos et audio
5. **Sauvegarder** l'audit

### Générer un Rapport
1. **Sélectionner** un audit complet
2. **Choisir** le format (PDF/Word)
3. **Personnaliser** les options
4. **Télécharger** le rapport

### Utiliser la Base de Connaissances
1. **Accéder** à la base de connaissances
2. **Rechercher** par mot-clé ou catégorie
3. **Consulter** les causes et solutions
4. **Appliquer** les recommandations

## 🔧 Configuration

### Variables d'Environnement
```bash
# Pas de variables requises - 100% hors-ligne
```

### Personnalisation
- **Langues:** Français, Arabe, Anglais
- **Templates:** Standard, détaillé, résumé
- **Catégories:** Personnalisables via la base de connaissances

## 📊 Statistiques

- **Audits créés:** Suivi en temps réel
- **Anomalies détectées:** Par catégorie et sévérité
- **Temps d'intervention:** Estimé vs réel
- **Taux de résolution:** Des anomalies

## 🔒 Sécurité & Confidentialité

- **Données locales** - aucune transmission externe
- **Chiffrement** des données sensibles
- **Accès contrôlé** par rôles
- **Sauvegarde** automatique locale

## 🆘 Support

### Problèmes Courants
- **Caméra non détectée:** Vérifier les permissions
- **Microphone bloqué:** Autoriser l'accès dans les paramètres
- **Stockage plein:** Nettoyer les anciens audits

### Contact
Pour les questions techniques ou suggestions, contactez l'équipe de développement.

---

**Tama Auditor** - Audit intelligent, hors-ligne, professionnel
