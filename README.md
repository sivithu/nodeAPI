# nodeAPI
Bienvenue dans ce tuto nodeJS. <br/>
Le but de ce git est de vous montrer comment requeter une API à partir d'une autre API.<br/>
Et aussi de vous montrer comment générer une application web avec le module ```express-generator```.<br/>
Application : https://mysterious-waters-98517.herokuapp.com/

## Installation
* Générer une application Web dans ce répertoire à l’aide express-generator, puis pousser les changement dans le dépôt distant:
```
 $ npx express-generator --hogan --git
 $ git add .
 $ git commit -m "initial commit: express-generator"
 $ git push
```
* Puis, installer les dépendances :
```
  $ npm install
```
* Puis, pour lancer le serveur en local :
```
  $ npm start
```
Ou sinon le déployer sur Heroku.

## Tests de vérification
* Pour lancer les tests :
```
 $ npm test
```
- 1ère test : La page d'index du site comprend bien un formulaire HTML
- 2ème test : la page “ville” contient bien le nom de la ville qui lui a été passé en paramètre POST
- 3ème test : la ville est inexistante

##Versions
* Vérifier les versions disponibles. [cliquez ici](https://github.com/sivithu/nodeAPI/tags).
