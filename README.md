BBCode-genesis
==============

Script 100% JQuery permettant d'ajouter de nouvelles balises BBCode sur n'importe quelle interface.

Ce script est écrit à l'origine pour un forum type PunBB hébergé chez forumactif.com, c'est donc une solution qui n'implique pas de PHP.

Ce script est l'un des premier que j'écris, étant vraiment débutant en JS/JQuery et dans la programmation en général !  
Je libère donc le code pour deux raisons : Partager en espérant qu'il soit utile à d'autres, et apprendre plus de vous, pour optimiser encore !  

===

##Balises génériques

Les balises génériques sont des balises BBCode sans arguments, simples à créer, qui seront simplement remplacées par la balise HTML que l'on souhaite, ayant la classe que l'on souhaite.

Je me suis permis le luxe de proposer une syntaxe alternative :

**BBCode normal**  
> [balise]...[/balise]  
**BBCode simplifié**  
> balise_..._balise


####Ajout des balises

Vous trouverez dans le script `bbcode.js` le tableau ci-dessous:

```js
		var table =
		[//	 BBCode,	HTML,		Class		 
			['full',	'div',		'full'		],
			['caption',	'div',		'caption'	],
			['h1',		'h1',		'title1'	],
			['h2',		'h2',		'title2'	],
			['h3',		'h3',		'title3'	],
			['h4',		'h4',		'title4'	],
			['h5',		'h5',		'title5'	],
			['h6',		'h6',		'title6'	],
			['gallery',	'div',		'gallery'	],
			['button',	'div',		'button'	],
		]; 
```

Il suffit de rajouter des lignes à ce tableau pour créer de nouvelles balises qui porteront le nom de la première colonne, seront remplacées par la balise HTML de la seconde colonne, et stylisables avec la classe donnée en troisième colonne.

Par exemple, si on ajoute la ligne "`['big',	'span',	'bigsize'],`"  
ça va créer une balise BBCode "`[big]...[/big]`"  et/ou (au choix) "`big_..._big`"  
qui sera simplement remplacée par le html "`<span class="bigsize">...</span>`".

Il restera juste le CSS à faire :
```css
span.bigsize{
  font-size: larger;
}
```
===

##Balise "+---"

Il fallait bien faire un truc inutile, et ce truc inutile est une balise pour faire un alinéa.

> +---Ceci est un paragraphe  
> qui commencera par un sublime  
> alinéa...

Le code `+---` est simplement remplacé par un large espace vide.

===

##Balise "float"

[float=arg]...[/float] ou float=arg_..._float  
Permet de faire flotter un élément à gauche ou à droite.  
arguments : right, left, full-right, full-left.

===

##Balise "gallery"

La balise "gallery" est une alternative à l'habituelle balise [img][/img] des forums.

Alors qu'une balise [img][/img] ne permet d'afficher qu'une seule image, la balise "gallery" permet d'afficher autant d'images que l'on souhaite, sous forme de miniatures.

Sa syntaxe est simple :

**BBCode normal**
> [galery]  
> url de la première image  
> url de la seconde image  
> url de la troisième image  
> etc.  
> [/galery]

**BBCode simplifié**
> galery_  
> url de la première image  
> url de la seconde image  
> url de la troisième image  
> etc.  
> _galery

Ce qui affichera les images sous forme de galerie :

![Exemple](http://i39.servimg.com/u/f39/17/07/48/59/galeri11.jpg)

===

#Inconvénients

###RegExp en JQuery
Le script est 100% JQuery, mais dans la mesure du possible, il est préférable de faire toute la partie "RegExp" en PHP (et donc supprimer la fonction "applyBBCode" pour la remplacer par une méthode de votre choix.)

La raison est simple :  
Les bots (google, facebook, etc.) voient les pages sans l'execution des scripts javascript. Ils vont donc enregistrer le texte avec les balises BBCode encore visibles.

###Balise "gallery"
La balise "gallery" est pensée pour accueillir n'importe quel lien d'image (des serveurs ou hébergeurs favoris des utilisateurs), tout comme le permet la balise [img][/img] qu'on connaît si bien.  

Cependant, et forcément, ça ne va pas générer et stocker sur votre serveur des miniatures réduites en poids, mais afficher les images brutes avec une taille réduite par le "style" HTML.  
Ce qui fait que si l'utilisateur décide d'afficher une tonne d'images avec, ce sera une tonne d'images chargées sur la page, et donc une petite crise pour les petits débits.



Mais tout cela n'est pas si dramatique que ça ! <3

===

#Améliorations futures

**Balise "gallery"**
> * Fix à faire pour gérer les liens morts et "non-liens" (ignorer + générer une liste d'erreurs)  
> * Ajout de flèches "précédente" et "suivante" pour une meilleure expérience de navigation des images
> * Tentative d'optimisation du chargement des images

**Balises supplémentaires ?**

===

#Références
[genesis.biloucorp.com](http://genesis.biloucorp.com)  
> [Joke's Gribs](http://genesis.biloucorp.com/t243-joke-s-gribs)  
> [En savoir plus sur la balise "gallery"](http://genesis.biloucorp.com/t245-une-galerie-de-dessins-c-est-tout-beau)
