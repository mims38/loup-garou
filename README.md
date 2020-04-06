# Loup Garou

Ce code reprend le jeu du loup garou pour la dernière séance de cours avec les L2 de l'UGA.

## Déroulement de la séance

- Etant donné que le serveur Discord principal n'a pas de salon pour React, je vous invite sur un [autre serveur](https://discord.gg/qk3TzeV).
- Je suis également disponible toute la journée sur skype -- mon identifiant est pl.guhur.
- Pendant la séance, nous allons travailler sur Material UI et Styled components
- Puis un TP noté va reprendre l'ensemble des notions vues en cours.
- Pensez à cloner ce repo et à répondre aux questions en modifiant directement ce README.

## Sass

Au cas où vous avez un trou de mémoire sur Sass, voici un [rappel de la syntaxe](https://devhints.io/sass).

## Material UI

Je vous invite à regarder la vidéo de [Human Talks Paris](https://www.youtube.com/watch?v=D3tB_DGgICE).


Quelques petites questions :

- Résumer en une phrase l'intérêt de Material UI
  Material UI permet d'utiliser des composants prêt à l'utilisation avec une experience utilisateur cool
- Comment importer `material-ui` dans un fichier ?
  import (ce qu'on veut importer) from '@material-ui/core/(chemin)';
- Comment une application peut utiliser un thème à travers l'ensemble d'un projet ?
  En mettant l'application dans des balises <MuiThemeProvider></MuiThemeProvider>
- A quoi sert `createMuiTheme` ?
  C'est pour personnalisé les composants de Material UI.
- A quoi correspond `palette` ?
  C'est pour modifier les couleurs en Material UI.
- Comment re-définir des propriétés ?
  Avec overrides
- A quoi vous fait penser `withStyle` ? Comment l'utiliser ?
  Pour utiliser withStyle il faut déjà l'importer depuis Material UI puis fournir un fichier style lors de l'export. Cela ressemble à un HOC.
- Reproduire les deux boutons rouge et bleu présentées dans la vidéo.


import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../services/User';
import { createGame } from '../services/MasterGame';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import {blue} from '@material-ui/core/colors'
import {red} from '@material-ui/core/colors'


const Start = (props) => {
  const { user } = useSession();
  return (
    <MuiThemeProvider theme={theme}>
    <div>
      <Button color="primary" className={props.classes.myLeftButton}><Link to="/create" onClick={() => createGame(user)}> Nouvelle partie
      </Link></Button>
      <br />
      <Button color="secondary"><Link to="/join">
        Rejoindre une partie
      </Link></Button>
    </div>
    </MuiThemeProvider>
  );
}

const styles={
  myLeftButton:{
    backgroundColor: "blue"
  }
};

const theme = createMuiTheme({
  palette:{
    primary: blue,
    secondary: red,
  },
  typography : {
    fontSize: 25,
    fontFamily:'Montserrat',
  },
  overrides:{
    MuiButton:{
      root:{
        backgroundColor: "red",
        "&:hover":{backgroundColor: "yellow"}
      }
    }
  }
});

export default withStyles(styles)(Start);



## Styled Components

De la même manière, voici une [vidéo](https://www.youtube.com/watch?v=mS0UKNBh-Ig) pour introduire le sujet.

Quelques petites questions :

- Qu'est-ce que le CSS-in-JS ?
Le CSS-in-JS c'est intégrer le CSS directement dans le code JS
- Qu'est-ce que sont les tagged templates (délimitées par des backticks) ?
Ils permettent de définir des règles d'interpolation de chaînes personnalisées pour pouvoir styliser nos composants
- Donner un exemple d'un bouton personnalisé avec et sans les tagged templates ?

sans tagged templates
fn(['je suis blablablabla'])
avec tagged templates
fn`je suis blablablablabla`

- Comment utilise-t-on les props dans cette librarie ?
  Par exemple, background-color: ${props => props.disabled ? 'red' : 'blue'};

- Reprendre l'exemple du Material UI avec styled-components; l'écrire avec la composition et avec l'héritage.
  
  import React, {Component} from 'react';
import styled from 'styled-components'


class App extends Component {
  render() {
    return(
      
        <div>
          <Button disabled={true}>Bleu</Button>
          <Button>Rouge</Button>
        </div>
      
      );
  }
}

const Button = styled.button`
  color:white;
  
  ${props => `
  background-color : ${props.disabled ? 'blue' : 'red'};
  `};
  `
  export default App;
  
- Quelles sont les fonctions du contexte de styled-components ?

Le contexte de styled components permet la gestion de thèmes. On peut d'ailleurs surcharger des thèmes avec d'autres thème au sein même de notre application
Le contexte peut également servir à combiner les compo react classiques avec styled components

## Mise en place du design

Pour mettre en pratique ces notions, je vous propose de designer une application reprenant le principe de jeu du loup garou.

Cette plateforme est entièrement numérique, ce qui permet de s'affranchir d'un maître du jeu, et donc d'avoir un joueur supplémentaire.

A l'initialisation de la partie, un joueur démarre une partie. Un court identifiant est alors communiqué aux autres joueurs, qui doivent rejoindre la partie.
Lorsque tous les joueurs ont rejoint la partie, la partie peut démarrer. Chaque joueur joue à tour de rôle depuis son téléphone.

Une contrainte importante est la synchronisation des joueurs : chaque joueur utilise son propre téléphone. Il reçoit un message lorsque c'est à son tour de jouer, ou attend autrement. Pour résoudre techniquement cette contrainte, tout en évitant d'écrire une application en backend, on utilise Firebase. Firebase permet d'utiliser des observateurs, qui réagissent lors d'un appel extérieur, ce qui donne une impression de temps réel.

Une partie du code vous est fournie, afin de faciliter la mise en place de Firebase et des context providers. Il vous est demandé d'explorer le code, d'y apporter un design responsive, et de compléter l'application pour ajouter les différentes étapes de jeu.

Copier .env dans .env.local et remplir de dernier à l'aide de ses identifiants Firebase.
Activer l'authentification anonyme dans la console de Firebase.

### Découverte du code

- Le code utilise des fonctions plutôt que des classes. Ecrire un bouton sous la forme d'une classe et d'une fonction. Retrouver les équivalences entre les méthodes des composants (telles que setState) et celles des fonctions ?

Bouton sous la forme d'une fonction : 

const Personne = props => (
  <div>
    <button>Hello, {props.name}</button>
  </div>
);


Bouton sous la forme d'une classe :

class Personne extends Component {
  constructor(props){
    super(props);
    this.state = {
      myState: true;
    }
  }
  
  render() {
    return (
      <div>
        <h1>Hello Personne</h1>
      </div>
    );
  }
}
export default Personne;



- Comment récupérer les props dans une fonction ?

const x = (props) => {


- Dans `App.js`, identifier les différents producteurs de données. Retrouver leur définition. Quelles données partagent-ils à l'ensemble de l'application ?

Les différents producteurs de données sont Game et User, les données partagées sont celles de firebase

- Identifier les différentes pages de l'application. Décrire à l'aide d'une phrase le rôle de chacune d'entre elles.
StartPage : Menu principal
EndPage : Page de fin avec l'affichage des gagnants
CreatePage : Page de création de partie
NightPage : Page de la nuit
ResultPage : Page qui affiche les morts après la nuit
CodePage : Page pour créer un code pour faire rejoindre la partie à nos amis
CastPage : Page de vote
AlivePage : Page des vivants
SpellPage : Page de la sorcière
DeadPage : Page qu'un joueur voit lorsqu'il meurt

- Pourquoi voit-on sur plusieurs pages "Chargement du master game en cours" ?

Parce qu'on l'affiche 2 fois. Une fois dans Game.js et une autre dans GameMaster.js

- Avec les classes, nous utilisions `withMyContext` pour s'inscrire aux données d'un provider. Identifier dans services/Game.js la fonction qui joue désormais ce rôle.

  const {children} = props;
  return (
    <gameContext.Provider value={{game}}>
      {children}
    </gameContext.Provider>
  );
};


- Dans `CodePage`, rappeler comment un formulaire gère les champs de remplissage des données.o


onChange={e => setName(e.target.value)}

### Reprise du design

- En utilisant styled-components, reprendre le design du composant Button.
- Votre nouveau bouton peut alors être utilisé pour améliorer l'affichage de la page `StartPage`.
- Ajouter un header et un footer sur toutes les pages de l'application. 
- Réaliser le design du formulaire de de `CodePage`, utilisé pour rejoindre l'application.
- Faire de même avec `CreatePage`.


### Utilisation de Firebase

- Dans 'User.js', comment fait-on pour garder une trace persistente de l'application, même lorsqu'on rafraichit la page ? Comment reconnait-on l'utilisateur lorsqu'il revient dans l'application ?
- Dans Firebase, nous ne pouvons pas ajouter des champs à un utilisateur. Par conséquent, nous devons créer une collection d'utilisateurs et synchroniser les utilisateurs avec cette table. Expliquer où est-ce que cette synchronisation a lieu.
- A votre avis, à quoi sert useEffect ?
- A quoi sert la fonction `unsubscribe` utilisée dans les `useEffect` de `User.js` ?
- Décrire les trois valeurs de retour de `UseUser`.
- Combien de collections dans Firebase pouvez-vous identifier ? A quoi correspondent les `doc` ?

### Contribuer à l'application

- Lors du lancement du jeu, ajouter l'attribution des rôles à chaque joueur : loup-garou, villageois, petite fille ou sorcier. Le nombre de loup-garou est calculé en fonction du nombre de joueurs.
- Chaque joueur reçoit alors une image de son rôle. Partager cette information depuis /wait.
- Lorsque la nuit tombe, la liste des joueurs encore vivants est proposée aux  loups garous, qui doivent se mettre d'accord. Réaliser cette fonction.
- Lorsque le jour arrive, tous les joueurs reçoivent une notification indiquant la cible des loups garous. Cette dernière est redirigée vers DeadPage.
- Les joueurs vivant votent pour éliminer un joueur, suspecté d'être un loup garou. Réaliser cette fonction.

### Rapport

Rédiger un court rapport -- inférieur à une page, expliquant les modifications apportées au projet. Motiver ses choix. Expliquer les difficultés rencontrées.

