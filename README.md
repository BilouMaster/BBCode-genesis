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

On peut configurer le script pour avoir au choix : Les deux syntaxes, ou une seule des deux. (Par défaut, j'ai choisi la seconde)

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

Ce tableau correspond à la partie "GENERIC" du css `bbcode.css`.  

Par exemple, si on ajoute la ligne "`['big',	'span',	'bigsize'],`"  
ça va créer une balise BBCode "`[big]...[/big]`"  et/ou (au choix) "`big_..._big`"  
qui sera simplement remplacée par le html "`<span class="bigsize">...</span>`".

Il restera juste le CSS à ajouter dans la partie "GENERIC" du css :
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

Alors qu'une balise [img][/img] ne permet d'afficher qu'une seule image, la balise "gallery" permet d'afficher autant d'images que l'on souhaite, sous forme de galerie d'images. 

La galerie générée est pensée pour être plutôt originale et ergonomique, avec une visualisation des images embarquée dans la galerie même, [je vous invite à lire cet article où j'explique mes choix en détail](http://genesis.biloucorp.com/t245-une-galerie-de-dessins-c-est-tout-beau) !

Sa syntaxe est simple :

**BBCode normal**
> [gallery]  
> url de la première image  
> url de la seconde image  
> url de la troisième image  
> etc.  
> [/gallery]

**BBCode simplifié**
> gallery_  
> url de la première image  
> url de la seconde image  
> url de la troisième image  
> etc.  
> _gallery

Voici un exemple de galerie ainsi générée :

![Exemple](http://i39.servimg.com/u/f39/17/07/48/59/galeri11.jpg)

===

#Installation du script

###Première étape : Arranger à votre sauce
J'ai parlé d'un tableau dans le script `bbcode.js`, correspondant à la partie "GENERIC" du css `bbcode.css`.  
Il conviendra de supprimer les balises qui vous seront inutiles, avec le CSS correspondant, ajouter celles que vous voulez, et surtout de ré-écrire le CSS qui vous conviendra.  
(Le CSS actuel est celui utilisé dans genesis.biloucorp.com, c'est pas vraiment votre goût je pense !)

En revanche, la balise "gallery" ainsi que son CSS devrait convenir pour n'importe quelle interface !

###Configuration
Dans le script `bbcode.js` :
```JS
	/*==========================================================================
	# ** CONFIGURATION
	#-------------------------------------------------------------------------*/

	//Activer le BBCode normal :	"[balise]...[/balise]"
	switch_normal = false,

	//Activer le BBCode simplifié :	"balise_..._balise"
	switch_special = true, 
			
	//Sélecteur JQuery où interpréter du BBCode
	$selection = $('.entry-content, .blog_message'),

	/*========================================================================*/
```

Le sélecteur `$('.entry-content, .blog_message')`, correspond aux messages des forums PunBB. (toutes balises HTML ayant la classe "entry-content" ou "blog_message".)

Pour votre site ou forum, dans votre navigateur, il suffit de faire "clic droit > inspecter l'élément" sur un message pour connaître la classe de la div qui contient le message. Par exemple, pour phpBB, le sélecteur sera `$('.postbody')` car les messages des topics sont dans div ayant la classe "postbody".

###Installation sur un forum chez forumactif.com

Copier/coller le contenu de `bbcode.css` dans :  
`Panneau d'administration` > `Affichage` > `Images et Couleurs` > `Couleurs` > `Feuille de style CSS`

Copier/coller le contenu de `bbcode.js` dans le nouveau code javascript créé dans :  
`Panneau d'administration` > `Modules` > `HTML & JAVASCRIPT` > `Gestion des codes Javascript`

Et le tour est joué !  
Vous pourrez utiliser les nouvelles balises dans vos messages !

###Installation sur votre site personnel :

Je suppose que vous savez faire :

Hébergez votre bbcode.css et bbcode.js sur votre serveur.
Reliez ensuite le script et le CSS en ajoutant ce code dans votre balise HEAD :
```HTML
<link rel="stylesheet" href="bbcode.css" type="text/css">
<script src="bbcode.js" type="text/javascript"></script>
```

===

#Améliorations futures

**General**
- [ ] Fix à faire pour ne pas générer à l'intérieur des balises "CODE"

**Balise "gallery"**
- [ ] Fix à faire pour générer correctement entre les balises "SPOILER"
- [ ] Ajout de flèches "précédente" et "suivante" pour une meilleure expérience de navigation des images
- [ ] Tentative d'optimisation du chargement des images
- [ ] Limiter l'affichage à la première ligne des miniatures + bouton "afficher plus" ? (plus friendly à charger)

**Balises supplémentaires**
- [ ] Balise permettant de découper le sujet en différents onglets

===

#Références
[genesis.biloucorp.com](http://genesis.biloucorp.com)  
> [Joke's Gribs](http://genesis.biloucorp.com/t243-joke-s-gribs)  
> [En savoir plus sur la balise "gallery"](http://genesis.biloucorp.com/t245-une-galerie-de-dessins-c-est-tout-beau)
