# Programme Major de Promo

Site statique (aucun serveur, aucune dépendance) : IFSI → passerelle médecine → recherche → capital.

## Mise en ligne sur GitHub Pages
1. Crée un dépôt, puis envoie tous les fichiers à la racine (index.html, app.js, style.css, sw.js, manifest.json, icon.svg).
2. Settings → Pages → Source : branche `main`, dossier `/ (root)` → Save.
3. Ouvre l'URL indiquée, puis « Ajouter à l'écran d'accueil » pour l'installer.

## Où sont tes données
- Enregistrées à chaque modification dans le navigateur (localStorage) **et** copiées dans IndexedDB ; si l'un est vidé, l'autre restaure.
- Le stockage est demandé en mode « persistant » et sauvegardé quand tu quittes la page.
- Elles sont propres à ton navigateur et à ton appareil : **exporte un .json chaque semaine** (onglet 💾 Données, rappel automatique après 7 jours).
- Changer de navigateur, de téléphone ou vider les données du site les efface : importe ton dernier .json.

## Mettre à jour le site
Modifie les fichiers dans le dépôt : tes données ne sont pas touchées. Pour forcer la mise à jour du cache hors-ligne, change `V='mp-v1'` dans sw.js.
