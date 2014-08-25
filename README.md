BBCode-genesis
==============

Script 100% JQuery permettant d'ajouter de nouvelles balises BBCode sur n'importe quelle interface.

Ce script est écrit à l'origine pour un forum type PunBB hébergé chez forumactif.com, c'est donc une solution qui n'implique pas de PHP.

##Balises génériques

Les balises génériques sont des balises BBCode sans arguments, simples à créer, qui seront simplement remplacées par la balise HTML que l'on souhaite, ayant la classe que l'on souhaite.

Je me suis permis le luxe de proposer une syntaxe alternative :

> **BBCode normal** : [balise]...[/balise]  
> **BBCode simplifié** : balise_..._balise

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
			['button',	'div',		'posting gen-action'	],
		]; 
```

Il suffit de rajouter des lignes à ce tableau pour créer de nouvelles balises qui porteront le nom de la première colonne, seront remplacées par la balise HTML de la seconde colonne, et stylisables avec la classe donnée en troisième colonne.

Par exemple, la ligne "`['button',	'div',		'posting gen-action'	],`"  
va créer une balise BBCode "`[button]...[/button]`"  
et/ou (au choix) "`button_..._button`"  
qui sera simplement remplacée par le html "`<div class="posting gen-action">...</div>`".


##Balise "+---"

Il fallait bien faire un truc inutile, et ce truc inutile est une balise pour faire un alinéa.

> +---Ceci est un paragraphe  
> qui commencera par un sublime  
> alinéa...

Le code `+---` est simplement remplacé par un large espace vide.


##Balise "float"

[float=arg]...[/float] ou float=arg_..._float  
Permet de faire flotter un élément à gauche ou à droite.  
arguments : right, left, full-right, full-left.


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
