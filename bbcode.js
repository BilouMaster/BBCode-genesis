/*==============================================================================
# ** EXTENSION DU BBCODE V1.0.0
#-------------------------------------------------------------------------------
#  Avec : 
# Joke (genesis.biloucorp.com)
# 
#=============================================================================*/

function applyBBCode() {
	var 
	
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
	
	patternstr, pattern, replacement, content, save_content, bbcode,
	htmltag, classname;
	
	$selection.each(function(){
		content = $(this).html();
		save_content = content;
		
		/*======================================================================
		# ** BBCODE REMPLACEMENTS SIMPLES
		#-----------------------------------------------------------------------
		#  Balises génériques remplacées par une balise html et une classe
		#=====================================================================*/
		
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
		
		for (var a in table) {
			bbcode		= table[a][0];
			htmltag		= table[a][1];
			classname	= table[a][2];
			replacement = '<' +htmltag+ ' class="' +classname+ '">$1</' +htmltag+ '>';
			if (switch_normal) {
				patternstr = "\\[" +bbcode+ "\\]([\\s\\S]*?)\\[\\/" +bbcode+ "\\]";
				pattern = new RegExp(patternstr, 'g');
				pattern.test(content) && (content = content.replace(pattern, replacement));
			}
			if (switch_special) {
				patternstr = bbcode+ "_([\\s\\S]*?)_" +bbcode;
				pattern = new RegExp(patternstr, 'g');
				pattern.test(content) && (content = content.replace(pattern, replacement));
			}
		};
		
		/*======================================================================
		# ** BBCODE ALINEA
		#-----------------------------------------------------------------------
		#  Ecrire "+---" pour générer un alinéa. (pour les débuts de paragraphes)
		#=====================================================================*/
		
		pattern = /\+---/g;
		pattern.test(content) && (content = content.replace(pattern, '<span style="margin-left:50px"\/>'));

		/*======================================================================
		# ** BBCODE FLOAT
		#-----------------------------------------------------------------------
		#  Balise pour éléments flottants
		#  "[float=arg]...[/float]" ou "float=arg_..._float"
		#  arguments:	left, right, full-left, full-right
		#=====================================================================*/
		
		replacement = '<div class="float $1">$2</div>';
		if (switch_normal) {
			pattern = /\[float="*(left|right|full-left|full-right)"*\]([\s\S]*?)\[\/float\]/g;
			pattern.test(content) && (content = content.replace(pattern, replacement));
		}
		if (switch_special) {
			pattern = /float="*(left|right|full-left|full-right)"*_([\s\S]*?)_float/g;
			pattern.test(content) && (content = content.replace(pattern, replacement));
		}
		
		// Remplacement du HTML
		if (content != save_content) $(this).html(content);	
		
	});
	// Génération de la galerie
	galGenerate();
};

/*==============================================================================
# ** BBCODE GALLERY
#-------------------------------------------------------------------------------
#  Génération d'une galerie d'images à partir du code HTML :
#
#  <div class="gallery">
#	url de la première image
#	url de la seconde image
#	url de la troisième image
#	etc.
#  </div>
#
#  Code HTML résultant du BBCode "[gallery][/gallery]" ou "gallery_ _gallery"
#  grâce à "APPLICATION DU BBCODE > CODE REMPLACEMENTS SIMPLES"
#=============================================================================*/

var img=[], ttw=[], H_MAX = 150;

function galGenerate(){
	$('.gallery br').replaceWith('&nbsp;');
	$('.gallery').each(function(i){
		img[i] = $.trim($(this).text()).split(/\s+/);
		$(this).empty().append('<div class="gal_line" style="height:'+H_MAX+'px" />');
		$.each(img[i], function(j,url){
			img[i][j] = new Image();
			img[i][j].id = i;
			img[i][j].name = j;
			img[i][j].src = url;
		});
		ttw[i] = 0;
		img[i][0].onload = galLoad;
	});
};

function galLoad(){
	i = parseInt(this.id);
	j = parseInt(this.name);
	galInsertImg(i,j);
}

function galInsertImg(i,j){
	var $gal = $('.gallery:eq('+i+')');
	$gal.find('.gal_line:last').append(img[i][j]);
	$(img[i][j]).on('click', galVisualize);
	ttw[i] += $gal.find('img:last').width() + 5;
	if (ttw[i] > $gal.width()) {
		newheight = parseInt(H_MAX * $gal.width() / (ttw[i]-5) - 1) + "px";
		$gal.find('.gal_line:last img').height(newheight);
		$gal.find('.gal_line:last').removeAttr('style');
		if (j+1 < img[i].length) {$gal.append('<div class="gal_line" style="height:'+H_MAX+'px" />')}
		ttw[i] = 0;
	}
	j++;
	if (j < img[i].length) {
		if (img[i][j].complete) {
			galInsertImg(i,j);
		} else {
			img[i][j].onload = galLoad;
		}
	}
}

function galVisualize(){
	var scroll, upper;

	if ($(this).hasClass('gal_picked')){
		$('.gal_viewer, .gal_viewer div').slideUp('normal', function(){$(this).remove()});
		$('.gal_picked').removeClass();			
	} else if ($(this).parent().next().hasClass('gal_viewer')){
		$('.gal_viewer, .gal_viewer div').show();
		$('.gal_picked').removeClass();
		$(this).addClass('gal_picked');
		$('.gal_viewer img').attr('src', this.src);
		$('.gal_viewer').height($('.gal_viewer img').height()+5);
		$('.gal_viewer div').css('margin-left', ($('.gal_viewer').width() - $('.gal_viewer img').width())/2);
	} else {
		if ($('.gal_picked').length) {
			upper =  $('.gal_picked').offset().top < $(this).offset().top;
			if (upper) {
				scroll = $(document).height() - $(window).scrollTop();
			} else {
				scroll = $(this).offset().top;
			}
			$('.gal_picked').removeClass();
			$('.gal_viewer').remove();
			if (upper) {
				scroll -= $(document).height() - $(window).scrollTop();
			} else {
				scroll -= $(this).offset().top;
			}
			$(window).scrollTop($(window).scrollTop() - scroll);
		}
		$(this).parent().after('<div class="gal_viewer"><div /></div>');
		$(this).clone().removeAttr('style').appendTo('.gal_viewer div');
		$(this).addClass('gal_picked');
	  $('.gal_viewer').height($('.gal_viewer img').height()+5).on('click', function(){
			$('.gal_viewer, .gal_viewer div').slideUp('normal', function(){$(this).remove()});
			$('.gal_picked').removeClass();
		});
		$('.gal_viewer div').css('margin-left', ($('.gal_viewer').width() - $('.gal_viewer img').width())/2);
		$('.gal_viewer, .gal_viewer div').hide().slideDown();
	}
};

$(function() {
	applyBBCode();
});
