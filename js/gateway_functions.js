// definicje stałych globalnych
var icons = [
	'/styles/img/users.png',
	'/styles/img/voice.png',
	'/styles/img/hop.png',
	'/styles/img/op.png',
	'/styles/img/prot.png',
	'/styles/img/owner.png'
];

var alt = [
	'',
	'+',
	'%',
	'@',
	'&',
	'~'
];

var reqChannel = '';

var server = 'wss://'+location.host+'/ircsocket';

var booleanSettings = [ 'showPartQuit', 'tabsListBottom', 'showUserHostnames', 'autoReconnect', 'displayLinkWarning', 'blackTheme', 'newMsgSound', 'autoDisconnect' ];
var comboSettings = [ 'noticeDisplay' ];
var numberSettings = [ 'backlogCount' ];
var numberSettingsMinMax = {
	'backlogCount' : { 'min' : 0, 'max' : 500, 'deflt' : 15 }
};

var banData = {
	'nick' : '',
	'channel' : '',
	'noIdent' : false,
	'ident' : '',
	'hostElements' : [],
	'hostElementSeparators' : [],
   	'clear' : function(){
		banData.nick = '';
		banData.channel = '';
		banData.noIdent = false;
		banData.ident = '';
		banData.hostElements = [];
		banData.hostElementSeparators = [];
	}
}

var messagePatterns = {
	'nickChange': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s zmienił nick na %s</span><br />',
	'nickInUse': '<span class="time">%s</span> &nbsp; <span class="kick">*** %s: Nick jest juz uzywany przez kogos innego.</span><br />',
	'badNick': '<span class="time">%s</span> &nbsp; <span class="kick">*** %s: Nick nie jest dostępny.</span><br />',
	'nickChangeOwn': '<span class="time">%s</span> &nbsp; <span class="mode">*** Jesteś teraz znany jako %s</span><br />',
	'joinOwn': '<span class="time">%s</span> &nbsp; <span class="join">&rarr; Dołączyłeś do kanału %s.</span><br />',
	'join': '<span class="time">%s</span> &nbsp; <span class="join">&rarr; <b>%s</b> <i class="userhost">[%s@%s]</i> dołączył do %s.</span><br />',
	'part': '<span class="time">%s</span> &nbsp; <span class="part">&larr; <b>%s</b> <i class="userhost">[%s@%s]</i> opuścił %s [%s]</span><br />',
	'quit': '<span class="time">%s</span> &nbsp; <span class="part">&larr; <b>%s</b> <i class="userhost">[%s@%s]</i> opuścił IRC [%s]</span><br />',
	'partOwn': '<span class="time">%s</span> &nbsp; <span class="part">&larr; Opuściłeś kanał %s. <a href="#" onclick="gateway.send(\'JOIN %s\')">Dołącz ponownie</a></span><br />',
	'channelMsg': '<span class="time">%s</span> &nbsp; <span class="nick">&lt;%s&gt;</span> %s<br />',
	'yourMsg': '<span class="time">%s</span> &nbsp; <span class="yournick">&lt;%s&gt;</span> %s<br />',
	'channelMsgHilight': '<span class="time">%s</span> &nbsp; <span class="hilight"><span class="nick">&lt;%s&gt;</span> %s</span><br />',
	'channelAction': '<span class="time">%s</span> &nbsp; * <span class="nick">%s</span> %s<br />',
	'yourAction': '<span class="time">%s</span> &nbsp; * <span class="yournick">%s</span> %s<br />',
	'channelActionHilight': '<span class="time">%s</span> &nbsp; * <span class="hilight"><span class="nick">%s</span> %s</span><br />',
	'changeTopic': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s zmienił temat na: %s</span><br />',
	'deleteTopic': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s usunął temat %s</span><br />',
	'topic': '<span class="time">%s</span> &nbsp; <span class="mode">*** Temat kanału %s: %s</span><br />',
	'topicNotSet': '<span class="time">%s</span> &nbsp; <span class="mode">*** Temat %s nie jest ustawiony</span><br />',
	'topicTime': '<span class="time">%s</span> &nbsp; <span class="mode">*** Temat ustawiony przez %s [%s]</span><br />',
	'kick': '<span class="time">%s</span> &nbsp; <span class="kick">*** %s wyrzucił %s z %s [Powód: %s]</span><br />',
	'kickOwn': '<span class="time">%s</span> &nbsp; <span class="kick">*** %s wyrzucił cię z %s [Powód: %s]</span><br />',
	'modeChange': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s ustawił tryb [%s] dla kanału %s</span><br />',
	'startedQuery': '<span class="time">%s</span> &nbsp; <span class="join">&rarr; Rozpoczęto rozmowę z %s.</span><br />',
	'queryBacklog': '<span class="time">%s</span> &nbsp; <span class="join">*** Zapis poprzedniej rozmowy z %s:</span><br />',
	'channelBacklog': '<span class="time">%s</span> &nbsp; <span class="mode">*** Zapis poprzedniej wizyty na %s:</span><br />',
	'channelBacklogEnd': '<span class="time">%s</span> &nbsp; <span class="mode">*** Koniec zapisu.</span><br />',
	'noSuchCommand': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s: nieznana komenda.</span><br />',
	'noSuchNick': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s: nie ma takiego nicku ani kanału</span><br />',
	'noSuchChannel': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s: nie ma takiego kanału</span><br />',
	'notOnChannel': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s: nie jesteś na tym kanale</span><br />',
	'alreadyOnChannel': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s: %s jest już na tym kanale</span><br />',
	'youQuit': '<span class="time">%s</span> &nbsp; <span class="part">*** Wyszedłeś z IRC</span><br />',
	'notConnected': '<span class="time">%s</span> &nbsp; <span class="mode">*** Nie jesteś połączony z IRC!</span><br />',
	'notEnoughParameters': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s: Za mało argumentów.</span><br />',
	'cannotSendToChan': '<span class="time">%s</span> &nbsp; <span class="kick">*** Nie możcna wysłać na %s: %s. Wiadomość nie została dostarczona.</span><br />',
	'cannotJoin': '<span class="time">%s</span> &nbsp; <span class="kick">*** Nie można dołączyć do kanału %s: %s</span><br />',
	'noPerms': '<span class="time">%s</span> &nbsp; <span class="kick">*** Brak uprawnien.</span><br />',
	'notice': '<span class="time">%s</span> &nbsp; <span class="notice-nick"><b>-%s-</b></span><span class="userhost">(<span class="notice-nick">%s</span>@<span class="notice-nick">%s</span>)</span> <span class="notice">%s</span><br />',
	'serverNotice': '<span class="time">%s</span> &nbsp; <span class="notice-nick">Wiadomość od serwera <b>%s</b>:</span> <span class="notice">%s</span><br />',
	'yourNotice': '<span class="time">%s</span> &nbsp; <span class="notice"><b>-NOTICE/%s-</b> %s</span><br />',
	'notEnoughParams': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s: za mało argumentów: %s</span><br />',
	'motd': '<span class="time">%s</span> &nbsp; <span class="motd">*** %s</span><br />',
	'ctcpRequest': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s wysyła CTCP REQUEST: %s</span><br />',
	'ctcpReply': '<span class="time">%s</span> &nbsp; <span class="notice">*** <b>CTCP REPLY od %s:</b> %s</span><br />',
	'chanListElement': '<span class="time">%s</span> &nbsp; <span class="notice">*** <b><a href="#" onClick="gateway.send(\'JOIN %s\')">%s</a></b> (%s) - %s </span> <br />',
	'banListElement': '<span class="time">%s</span> &nbsp; <span class="mode">*** Ban: <b>%s</b> <i>założony przez:</i> <b>%s</b> (%s) </span><br />',
	'banListEnd': '<span class="time">%s</span> &nbsp; <span class="mode">*** Koniec listy banów.</span><br />',
	'invexListElement': '<span class="time">%s</span> &nbsp; <span class="mode">*** Invex: <b>%s</b> <i>założony przez:</i> <b>%s</b> (%s) </span><br />',
	'invexListEnd': '<span class="time">%s</span> &nbsp; <span class="mode">*** Koniec listy invex.</span><br />',
	'exceptListElement': '<span class="time">%s</span> &nbsp; <span class="mode">*** Except: <b>%s</b> <i>założony przez:</i> <b>%s</b> (%s) </span><br />',
	'exceptListEnd': '<span class="time">%s</span> &nbsp; <span class="mode">*** Koniec listy except.</span><br />',
	'mode': '<span class="time">%s</span> &nbsp; <span class="mode">*** Ustawienia kanału %s: [%s]</span><br />',
	'error': '<span class="time">%s</span> &nbsp; <span class="mode"> !!! Rozłączono z serwerem: %s</span><br />',
	'existingConnection': '<span class="time">%s</span> &nbsp; <span class="mode">*** Połączenie już istnieje, dołączam się do niego.</span><br />',
	'away': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s otrzymał twoją wiadomość, ale jest teraz nieobecny: %s</span><br />',
	'yourInvite': '<span class="time">%s</span> &nbsp; <span class="mode">*** Zaprosiłeś użytkownika %s na kanał %s</span><br />',
	'knocked': '<span class="time">%s</span> &nbsp; <span class="mode">*** Poprosiłeś o dostęp ("zapukałeś") na %s, czekaj na zaproszenie od operatora</span><br />'
};

var modes = {
	'single': ['p', 's', 'm', 'n', 't', 'i', 'r', 'R', 'c', 'O', 'A', 'Q', 'K', 'V', 'C', 'u', 'z', 'N', 'S', 'M', 'T', 'G'],
	'argBoth': ['b', 'e', 'I'],
	'argAdd': ['k', 'f', 'L', 'l', 'j'],
	'user': ['q','a','o','h','v']
};
var modemap2 = ['owner', 'admin', 'op', 'halfop', 'voice'];
var newMessage = 'Nowa wiadomość';

// pomocnicze funkcje globalne
function str2bool(b){
	return (b === 'true');
}

function he(text) { //HTML Escape
	return $('<div/>').text(text).html();
}

// zmienna gateway.connectStatus

var statusDisconnected = 0;
var status001 = 1;
var statusGhostSent = 2;
var statusIdentified = 3;
var statusConnected = 4;
var statusGhostAndNickSent = 5;
var statusError = 6;

// stany parsera irc

var stateStart = 0;
var stateSenderNick = 1;
var stateArgs = 2;
var stateMessage = 3;
var stateCommand = 4;
var stateSenderUser = 5;
var stateSenderHost = 6;

var settings = {
	'saveCookie': function(cname, cvalue){
		var expireTime = new Date();
		expireTime.setFullYear(expireTime.getFullYear() + 3);
		document.cookie = cname+'='+cvalue+'; expires='+expireTime.toGMTString();
	},
	'getCookie': function(cname) {
		var nameEQ = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},
	'backlogLength': 15
}

var disp = {
	'size': 1,
	'focused': true,
	'titleBlinkInterval': false,
	'setSize': function(s) {
		if(!s) return;
		$('body').css('font-size', s+'em');
		$('input[type="checkbox"]').css('transform', 'scale('+s+')');
		disp.size = s;
		settings.saveCookie('tsize', s);
	},
	'displaySpecialDialog': function(name, button) {
		$('#'+name).dialog({
			resizable: false,
			draggable: true,
			close: function(){
				$(this).dialog('destroy');
			},
			width: 600
		});
		if(button) {
			$('#'+name).dialog('option', 'buttons', [ {
				text: button,
				click: function(){
					$(this).dialog('close');
				}
			} ]);
		}
	},
	'colorWindowShow': function() {
		disp.displaySpecialDialog('color-dialog');
	},
	'symbolWindowShow': function() {
		disp.displaySpecialDialog('symbol-dialog');
	},
	'toggleImageView': function(id, url) {
		$('#img-'+id).fadeToggle(200);
		setTimeout(function(){
			if($('#img-'+id).css('display') == 'none'){
				$('#show-'+id).css('display', 'inline');
				$('#hide-'+id).css('display', 'none');
			} else {
				if($('#imgc-'+id).prop('src') == ''){
					$('#imgc-'+id).prop('src', url);
				}
				$('#show-'+id).css('display', 'none');
				$('#hide-'+id).css('display', 'inline');
			}
		}, 250);
	},
	'toggleVideoView': function(id, video) {
		$('#img-'+id).fadeToggle(200);
		setTimeout(function(){
			if($('#img-'+id).css('display') == 'none'){
				$('#show-'+id).css('display', 'inline');
				$('#hide-'+id).css('display', 'none');
			} else {
				if($('#vid-'+id).prop('src') == ''){
					$('#vid-'+id).prop('src', 'https://www.youtube.com/embed/'+video);
				}
				$('#show-'+id).css('display', 'none');
				$('#hide-'+id).css('display', 'inline');
			}
		}, 250);
	},
	'changeSettings': function() {
		booleanSettings.forEach(function(sname){
			settings.saveCookie(sname, $('#'+sname).is(':checked'));
		});
		comboSettings.forEach(function(sname){
			settings.saveCookie(sname, $('#'+sname).val());
		});

		numberSettings.forEach(function(sname){
			var value = $('#'+sname).val();
			if(isNaN(parseFloat(value)) || value < numberSettingsMinMax[sname]['min'] || value > numberSettingsMinMax[sname]['max']){
				value = numberSettingsMinMax[sname]['deflt'];
				$('#'+sname).val(value);
			}
			settings.saveCookie(sname, value);
		});
		settings.backlogLength = parseInt($('#backlogCount').val());
		if ($('#tabsListBottom').is(':checked')) {
			$('#top_menu').detach().insertAfter('#inputbox');
			if($('#tabsDownCss').length == 0) {
				$('head').append('<link rel="stylesheet" type="text/css" href="/styles/gateway_tabs_down.css" id="tabsDownCss">');
			}
		} else {
			$('#top_menu').detach().insertAfter('#options-box');
			$('#tabsDownCss').remove();
		}
		if ($('#blackTheme').is(':checked')) {
			if($('#blackCss').length == 0) {
				$('head').append('<link rel="stylesheet" type="text/css" href="/styles/gateway_black.css" id="blackCss">');
			}
		} else {
			$('#blackCss').remove();
		}
		if ($('#showUserHostnames').is(':checked')) {
			$('#userhost_hidden').remove();
		} else {
			if($('#userhost_hidden').length == 0){
				var style = $('<style id="userhost_hidden">.userhost { display:none; }</style>');
				$('html > head').append(style);
			}
		}
	},
	'showAbout': function() {
		disp.displaySpecialDialog('about-dialog', 'OK');
	},
	'showOptions': function() {
		disp.displaySpecialDialog('options-dialog', 'OK');
	},
	'showSizes': function() {
		disp.displaySpecialDialog('size-dialog', 'Zamknij');
	},
	'topicClick': function() {
		var channel = gateway.findChannel(gateway.active);
		if(!channel){
			return;
		}
		var html = $('#'+channel.id+'-topic > h2').html() +
			'<p class="' + channel.id + '-operActions" style="display:none;">' +
				'<b>Zmodyfikuj temat kanału:</b><textarea name="topicEdit" id="topicEdit">'+$$.colorsToTags(channel.topic)+'</textarea>' +
				'<button onclick="gateway.changeTopic(\''+channel.name+'\');">Zmień temat</button>' +
			'</p>';
		$$.displayDialog('confirm', 'topic', 'Temat kanału '+channel.name, html);
	},
	'playSound': function() {
		if ( ! $('#newMsgSound').is(':checked')) {
			return;
		}
		var filename = '/styles/audio/served';
		$('#sound').html('<audio autoplay="autoplay"><source src="' + filename + '.mp3" type="audio/mpeg" /><source src="' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3" /></audio>');
	}
};

//funkcje do obrabiania tekstów i podobne
var $$ = {
	'parseTime': function(timestamp) {
		var nd = new Date();
		nd.setTime(timestamp*1000);
		return $.vsprintf("%s, %s %s, %02s:%02s:%02s", [ $$.dateWeek[nd.getDay()], nd.getDate(), $$.dateMonth[nd.getMonth()], nd.getHours(), nd.getMinutes(), nd.getSeconds() ] );
	},
	'dateWeek': [ 'Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota' ],
	'dateMonth': [ 'sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru' ],
	'colorize': function(message) {
		var pageBack  = 'white';
		var pageFront = 'black';
		var currBack = pageBack;
		var currFront = pageFront;
		var newText = '';
		message = he(message); 
		message = $$.parseLinks(message);
		var length	= message.length;
		
		var bold = false;
		var italic = false;
		var underline = false;
		var invert = false;
		
		var formatSet = false;
		var formatWaiting = false;
		
		for (var i = 0 ; i < length ; i++) {
		
			var isText = false;
			var append = '';
			
			switch (message.charAt(i)) {		
				case String.fromCharCode(3):
					if (!isNaN(parseInt(message.charAt(i+1)))) {
						if (!isNaN(parseInt(message.charAt(++i+1)))) {
							currFront = $$.getColor(parseInt(message.charAt(i)) * 10 + parseInt(message.charAt(++i)), "foreground");
						} else {
							currFront = $$.getColor(parseInt(message.charAt(i)), "foreground");
						}
						if ((message.charAt(i+1) == ',') && !isNaN(parseInt(message.charAt(++i+1)))) {
							if (!isNaN(parseInt(message.charAt(++i+1)))) {
								currBack = $$.getColor(parseInt(message.charAt(i)) * 10 + parseInt(message.charAt(++i)), "background");
							} else {
								currBack = $$.getColor(parseInt(message.charAt(i)), "background");
							}
						}
					} else {
						currFront = pageFront;
						currBack = pageBack;
					}
					formatWaiting = true;
					break;


				case String.fromCharCode(15): // wyczyszczenie
					currFront = pageFront;
					currBack = pageBack;
					bold = false;
					italic = false;
					underline = false;
					invert = false;
					formatWaiting = true;
					break;
					
				case String.fromCharCode(2):
					bold = !bold;
					formatWaiting = true;
					break;

				case String.fromCharCode(22): // inwersja
					invert = !invert;
					formatWaiting = true;
					break;
				
				case String.fromCharCode(29): // pochylenie - tylko kto je obsługuje?
					italic = !italic;
					formatWaiting = true;
					break;

				case String.fromCharCode(31): // podkreślenie
					underline = !underline;
					formatWaiting = true;
					break;				
				default:
					isText = true;
					append = message.charAt(i);
					break;
			}
			
			if(isText && formatWaiting){
				formatWaiting = false;
				if(formatSet){
					newText += '</span>';
					formatSet = false;
				}
				if(invert || italic || underline || bold || currFront != pageFront || currBack != pageBack){
					formatSet = true;
					newText += '<span style="';
					newText += italic?'font-style:italic;':'';
					newText += underline?'text-decoration:underline;':'';
					newText += bold?'font-weight:bold;':'';
					if(invert){
						newText += 'color:'+currBack+';background-color:'+currFront+';';
					} else {
						if(currFront != pageFront){
							newText += 'color:'+currFront+';';
						}
						if(currBack != pageBack){
							newText += 'background-color:'+currBack+';';
						}
					}
					newText += '"><wbr>';
				}
			}
			if(isText){
				newText += append;
			}
		}
			

		if(formatSet){
			newText += '</span><wbr>';
		}
		return newText;
	},
	'colorsToTags': function(input){
		input = input.replace(/\003/g, '[!color]');
		input = input.replace(/\002/g, '[!bold]');
		input = input.replace(/\026/g, '[!invert]');
		input = input.replace(/\017/g, '[!reset]');
		input = input.replace(/\035/g, '[!italic]');
		input = input.replace(/\037/g, '[!uline]');
		return input;
	},
	'tagsToColors': function(input){
		input = input.replace(/\[!color\]/g, String.fromCharCode(3));
		input = input.replace(/\[!bold\]/g, String.fromCharCode(2));
		input = input.replace(/\[!invert\]/g, String.fromCharCode(22));
		input = input.replace(/\[!reset\]/g, String.fromCharCode(15));
		input = input.replace(/\[!italic\]/g, String.fromCharCode(29));
		input = input.replace(/\[!uline\]/g, String.fromCharCode(31));
		return input;
	},
	'getColor': function(numeric, what) {
		var num = parseInt(numeric);
		/*if (what == "foreground") {	
			switch (num) {
				case 0:  return 'white';
				case 1:  return 'black';
				case 2:  return '#002AA8';
				case 3:  return '#1B7800';
				case 4:  return '#C30003';
				case 5:  return '#5F0002';
				case 6:  return '#950093';
				case 7:  return '#838900';
				case 8:  return '#CED800';
				case 9:  return '#07D800';
				case 10: return '#00837E';
				case 11: return '#00D5CD';
				case 12: return '#0010D5';
				case 13: return '#D500BF';
				case 14: return '#8B8B8B';
				default: return '#B9B9B9';
			}
		} else {*/
			switch (num) {
				case 0:  return 'white';
				case 1:  return 'black';
				case 2:  return '#1B54FF';
				case 3:  return '#4BC128';
				case 4:  return '#F15254';
				case 5:  return '#9B4244';
				case 6:  return '#D749D6';
				case 7:  return '#AEB32F';
				case 8:  return '#E7EF3B';
				case 9:  return '#59FF54';
				case 10: return '#00DFD6';
				case 11: return '#60FFF8';
				case 12: return '#5F6BFF';
				case 13: return '#FF83F2';
				case 14: return '#B5B5B5';
				default: return '#E0E0E0';
			}
		//}
	},
	'parseImages': function(text) {
		var rmatch = text.match(/(https?:\/\/[^ ]+\.(png|jpeg|jpg|gif))/gi);
		var html = '';
		if(rmatch){
			rmatch.forEach(function(arg){
				var rand = Math.floor(Math.random() * 10000).toString();
				var imgurl = encodeURI(arg);
				html += '<a onclick="disp.toggleImageView(\''+rand+'\', \''+imgurl+'\')"'+
					' class="image_link"><span id="show-'+rand+'" style="display:inline;">Pokaż</span><span id="hide-'+rand+'" style="display:none;">Ukryj</span> obrazek</a>'+
					'<div style="display:none;" id="img-'+rand+'"><img id="imgc-'+rand+'" style="max-width:100%;" /></div>';
			});
		}
		
		var rexpr = /https?:\/\/www.youtube.com\/watch\?[^ ]*v=([^ ]+)/i;
		
		var fmatch = text.match(/(https?:\/\/www.youtube.com\/watch\?[^ ]*v=[^ ?&]+)/gi);
		if(fmatch){
			fmatch.forEach(function(arg){
				var rmatch = rexpr.exec(arg);
				if(rmatch[1]){
					var rand = Math.floor(Math.random() * 10000).toString();
					var imgurl = encodeURI(rmatch[1]);
					html += '<a onclick="disp.toggleVideoView(\''+rand+'\', \''+imgurl+'\')"'+
						' class="image_link"><span id="show-'+rand+'" style="display:inline;">Pokaż</span><span id="hide-'+rand+'" style="display:none;">Ukryj</span> film</a>'+
						'<div style="display:none;" id="img-'+rand+'"><iframe width="560" height="315" id="vid-'+rand+'" frameborder="0" allowfullscreen></iframe></div>';
				}
			});
		}
		return html;
	},
	'parseLinks': function(text){
		var newText = text;
		var confirm= '';
		var confirmChan = '';
		if ($('#displayLinkWarning').is(':checked')) {
			confirm = " onclick=\"return confirm('Link może być niebezpieczny, czy na pewno chcesz go otworzyć?')\"";
			confirmChan = " onclick=\"return confirm('Czy chcesz dołączyć do wybranego kanału?')\"";
		}
		newText = newText.replace(/(http:\/\/[^ "'<>]+)/ig, "<a href=\"$1\" target=\"_blank\"" + confirm +">$1</a>");
		newText = newText.replace(/(https:\/\/[^ "'<>]+)/ig, "<a href=\"$1\" target=\"_blank\"" + confirm +">$1</a>");
		newText = newText.replace(/(ftp:\/\/[^ "'<>]+)/ig, "<a href=\"$1\" target=\"_blank\"" + confirm +">$1</a>");
		newText = newText.replace(/([^[])(#[^, ]+)/g, "$1<a href=\"javascript:gateway.send('JOIN $2')\"" + confirmChan + ">$2</a>");
		newText = newText.replace(/^(#[^, ]+)/g, "<a href=\"javascript:gateway.send('JOIN $1')\"" + confirmChan + ">$1</a>");
		return newText;
	},
	'displayReconnect': function(){
		var button = [ {
			text: 'Połącz ponownie',
			click: function(){
				gateway.reconnect();
			}
		} ];
		$$.displayDialog('connect', 'reconnect', 'Utracono połączenie.', 'Utracono połączenie z siecią.', button);
	},
	'displayDialog': function(type, sender, title, message, button){
		switch(type){ //specyficzne dla typu okna
			case 'whois':
				if(gateway.connectStatus != statusConnected){
					return;
				}
				if(sender.toLowerCase() == guser.nick.toLowerCase() && !gateway.displayOwnWhois){
					return;
				}
			case 'warning': case 'error': case 'confirm': case 'connect':
				var html = message;
				break;
			default:
				var html = "<p><span class=\"time\">"+gateway.niceTime()+"</span> "+message+"</p>";
				break;
		}	
	
		var id = type+'Dialog-'+md5(sender.toLowerCase());
		var $dialog = $('#'+id);
		if($dialog.length == 0){
			if(!title){
				title = type;
			}
			$dialog = $('<div id="'+id+'" class="dialog '+type+'-dialog" title="'+title+'" />');
			$dialog.appendTo('html');
		}

		$dialog.append(html);
		$dialog.scrollTop($dialog.prop("scrollHeight"));
		if(type == 'connect'){
			$dialog.dialog({ modal: true, dialogClass: 'no-close' });
		}
		if(type == 'error'){
			$dialog.dialog({ dialogClass: 'error-dialog-spec' });
		}
		$dialog.dialog({
			resizable: false,
			draggable: true,
			close: function(){
				$('#'+id).dialog('destroy');
				$('#'+id).remove();
			},
			width: 600
		});
		if(button){
			$dialog.dialog('option', 'buttons', button);
		}
		if($dialog.find('input').length == 0){
			gateway.inputFocus();
		}
		if(type != 'error'){
			$('.connect-dialog').dialog('moveToTop');
		}
	},
	'closeDialog': function(type, nick){
		var id = type+'Dialog-'+md5(nick.toLowerCase());
		var $dialog = $('#'+id);
		$dialog.dialog('close');
	},
	'sescape': function(val) {
		return val.replace('\\', '\\\\');
	}
}

