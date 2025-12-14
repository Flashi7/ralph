# URLs des Documents Légaux - Peakly

Ces URLs doivent être configurées dans App Store Connect pour la soumission de l'application.

## URLs Principales

Une fois le site déployé sur Vercel avec le domaine `peakly.cloud`, les URLs suivantes seront accessibles :

### Politique de Confidentialité
**URL :** `https://peakly.cloud/legal/privacy-policy`

**Utilisation dans App Store Connect :**
- App Privacy → Privacy Policy URL
- App Information → Privacy Policy URL

### Conditions d'Utilisation
**URL :** `https://peakly.cloud/legal/terms-of-service`

**Utilisation dans App Store Connect :**
- App Information → Terms of Service URL (si requis)

### Contrat de Licence Utilisateur Final (EULA)
**URL :** `https://peakly.cloud/legal/eula`

**Utilisation dans App Store Connect :**
- App Information → EULA URL

### Page d'Index des Documents Légaux
**URL :** `https://peakly.cloud/legal`

Cette page liste tous les documents légaux disponibles.

## Configuration Vercel

1. **Déployer sur Vercel :**
   - Connecter le dépôt GitHub `Flashi7/ralph`
   - Configurer le domaine personnalisé `peakly.cloud`

2. **Vérifier les routes :**
   - Le fichier `vercel.json` configure automatiquement les routes
   - Les URLs fonctionneront avec ou sans `.html`

## Notes Importantes

- ✅ Tous les documents sont en français
- ✅ Design cohérent avec le thème Peakly (noir/rose/fuchsia/magenta)
- ✅ Responsive et accessible
- ✅ Dates mises à jour automatiquement via JavaScript
- ✅ Liens de contact configurés (privacy@peakly.cloud, legal@peakly.cloud)

## Prochaines Étapes

1. Déployer sur Vercel
2. Configurer le domaine `peakly.cloud`
3. Tester toutes les URLs
4. Ajouter les URLs dans App Store Connect
5. Soumettre l'application pour review




