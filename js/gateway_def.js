var debug = '';
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

var server = 'ws://'+location.host+'/ircsocket';

var booleanSettings = [ 'showPartQuit', 'showNoticeInStatus', 'tabsListBottom', 'showUserHostnames', 'autoReconnect' ];
	

var messagePatterns = {
	'nickChange': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s zmieni\u0142 nick na %s</span><br />',
	'nickInUse': '<span class="time">%s</span> &nbsp; <span class="kick">*** %s: Nick jest juz uzywany przez kogos innego.</span><br />',
	'badNick': '<span class="time">%s</span> &nbsp; <span class="kick">*** %s: Nick nie jest dostępny.</span><br />',
	'nickChangeOwn': '<span class="time">%s</span> &nbsp; <span class="mode">*** Jeste\u015b teraz znany jako %s</span><br />',
	'joinOwn': '<span class="time">%s</span> &nbsp; <span class="join">&rarr; Do\u0142\u0105czy\u0142e\u015b do kana\u0142u %s.</span><br />',
	'join': '<span class="time">%s</span> &nbsp; <span class="join">&rarr; <b>%s</b> <i class="userhost">[%s@%s]</i> do\u0142\u0105czy\u0142 do %s.</span><br />',
	'part': '<span class="time">%s</span> &nbsp; <span class="part">&larr; <b>%s</b> <i class="userhost">[%s@%s]</i> opu\u015bci\u0142 %s [%s]</span><br />',
	'quit': '<span class="time">%s</span> &nbsp; <span class="part">&larr; <b>%s</b> <i class="userhost">[%s@%s]</i> opu\u015bci\u0142 IRC [%s]</span><br />',
	'partOwn': '<span class="time">%s</span> &nbsp; <span class="part">&larr; Opu\u015bci\u0142e\u015b kana\u0142 %s. <a href="#" onclick="gateway.send(\'JOIN %s\')">Dołącz ponownie</a></span><br />',
	'channelMsg': '<span class="time">%s</span> &nbsp; <span class="nick">&lt;%s&gt;</span> %s<br />',
	'yourMsg': '<span class="time">%s</span> &nbsp; <span class="yournick">&lt;%s&gt;</span> %s<br />',
	'channelMsgHilight': '<span class="time">%s</span> &nbsp; <span class="hilight"><span class="nick">&lt;%s&gt;</span> %s</span><br />',
	'channelAction': '<span class="time">%s</span> &nbsp; * <span class="nick">%s</span> %s<br />',
	'yourAction': '<span class="time">%s</span> &nbsp; * <span class="yournick">%s</span> %s<br />',
	'channelActionHilight': '<span class="time">%s</span> &nbsp; * <span class="hilight"><span class="nick">%s</span> %s</span><br />',
	'changeTopic': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s zmieni\u0142 temat na: %s</span><br />',
	'deleteTopic': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s usun\u0105\u0142 temat %s</span><br />',
	'topic': '<span class="time">%s</span> &nbsp; <span class="mode">*** Temat kana\u0142u %s: %s</span><br />',
	'topicNotSet': '<span class="time">%s</span> &nbsp; <span class="mode">*** Temat %s nie jest ustawiony</span><br />',
	'topicTime': '<span class="time">%s</span> &nbsp; <span class="mode">*** Temat ustawiony przez %s [%s]</span><br />',
	'kick': '<span class="time">%s</span> &nbsp; <span class="kick">*** %s wyrzuci\u0142 %s z %s [Powód: %s]</span><br />',
	'kickOwn': '<span class="time">%s</span> &nbsp; <span class="kick">*** %s wyrzuci\u0142 ci\u0119 z %s [Powód: %s]</span><br />',
	'modeChange': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s ustawi\u0142 tryb [%s] dla kana\u0142u %s</span><br />',
	'startedQuery': '<span class="time">%s</span> &nbsp; <span class="join">&rarr; Rozpocz\u0119to rozmow\u0119 z %s.</span><br />',
	'noSuchCommand': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s: nieznana komenda.</span><br />',
	'noSuchNick': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s: nie ma takiego nicku ani kanału</span><br />',
	'youQuit': '<span class="time">%s</span> &nbsp; <span class="part">*** Wyszed\u0142eś z IRC</span><br />',
	'notConnected': '<span class="time">%s</span> &nbsp; <span class="mode">*** Nie jeste\u015b po\u0142ączony z IRC!</span><br />',
	'notEnoughParameters': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s: Za ma\u0142o argumentów.</span><br />',
	'cannotSendToChan': '<span class="time">%s</span> &nbsp; <span class="kick">*** Nie mo\u017cna wys\u0142a\u0107 wiadomo\u015bci na kana\u0142 %s: %s</span><br />',
	'cannotJoin': '<span class="time">%s</span> &nbsp; <span class="kick">*** Nie mo\u017cna dołączyć do kana\u0142u %s: %s</span><br />',
	'noPerms': '<span class="time">%s</span> &nbsp; <span class="kick">*** Brak uprawnien.</span><br />',
	'notice': '<span class="time">%s</span> &nbsp; <span class="notice-nick"><b>%s</b></span><span class="userhost">(<span class="notice-nick">%s</span>@<span class="notice-nick">%s</span>)</span> <span class="notice">%s</span><br />',
	'yourNotice': '<span class="time">%s</span> &nbsp; <span class="notice"><b>-NOTICE/%s-</b> %s</span><br />',
	'notEnoughParams': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s: za mało argumentów: %s</span><br />',
	'motd': '<span class="time">%s</span> &nbsp; <span class="motd">*** %s</span><br />',
	'ctcpRequest': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s wysyla CTCP REQUEST: %s</span><br />',
	'ctcpReply': '<span class="time">%s</span> &nbsp; <span class="notice">*** <b>CTCP REPLY od %s:</b> %s</span><br />',
	'chanListElement': '<span class="time">%s</span> &nbsp; <span class="notice">*** <b><a href="#" onClick="gateway.send(\'JOIN %s\')">%s</a></b> (%s) - %s </span> <br />',
	'banListElement': '<span class="time">%s</span> &nbsp; <span class="mode">*** Ban: <b>%s</b> <i>założony przez:</i> <b>%s</b> (%s) </span><br />',
	'banListEnd': '<span class="time">%s</span> &nbsp; <span class="mode">*** Koniec listy banów.</span><br />',
	'invexListElement': '<span class="time">%s</span> &nbsp; <span class="mode">*** Invex: <b>%s</b> <i>założony przez:</i> <b>%s</b> (%s) </span><br />',
	'invexListEnd': '<span class="time">%s</span> &nbsp; <span class="mode">*** Koniec listy invex.</span><br />',
	'exceptListElement': '<span class="time">%s</span> &nbsp; <span class="mode">*** Except: <b>%s</b> <i>założony przez:</i> <b>%s</b> (%s) </span><br />',
	'exceptListEnd': '<span class="time">%s</span> &nbsp; <span class="mode">*** Koniec listy except.</span><br />',
	'mode': '<span class="time">%s</span> &nbsp; <span class="mode">*** Ustawienia kana\u0142u %s: [%s]</span><br />',
	'error': '<span class="time">%s</span> &nbsp; <span class="mode"> !!! Roz\u0142\u0105czono z serwerem: %s</span><br />',
	'existingConnection': '<span class="time">%s</span> &nbsp; <span class="mode">*** Połączenie już istnieje, dołączam się do niego.</span><br />',
	'away': '<span class="time">%s</span> &nbsp; <span class="mode">*** %s otrzymał twoją wiadomość, ale jest teraz nieobecny: %s</span><br />'
};

var modes = {
	'single': ['p', 's', 'm', 'n', 't', 'i', 'r', 'R', 'c', 'O', 'A', 'Q', 'K', 'V', 'C', 'u', 'z', 'N', 'S', 'M', 'T', 'G'],
	'argBoth': ['b', 'e', 'I'],
	'argAdd': ['k', 'f', 'L', 'l', 'j'],
	'user': ['q','a','o','h','v']
};
var modemap2 = ['owner', 'admin', 'op', 'halfop', 'voice'];

function str2bool(b){
	return (b === 'true');
}

guser.changeNick = function(newnick, silent) {
	guser.nick = newnick;
	$('#usernick').html($('<div/>').text(guser.nick).html());
	$(document).attr('title', $('<div/>').text(guser.nick).html()+ ' @ PIRC.pl');
	if(!silent) {
		for (i in gateway.channels) {
			gateway.channels[i].appendMessage(messagePatterns.nickChangeOwn, [gateway.niceTime(), $('<div/>').text(guser.nick).html()]);
		}
	}
	return true;
}
function Nicklist(chan, id) {
	this.channel = chan;
	this.id = id+'-nicklist';
	this.list = [];

	this.sortFunc = function(a, b) {
		if(a.level < b.level) {
			return 1;
		} else if(a.level > b.level) {
			return -1;
		} else {
			if(a.nick.toLowerCase() < b.nick.toLowerCase()) {
				return -1;
			} else if(a.nick.toLowerCase() > b.nick.toLowerCase()) {
				return 1;
			} else {
				return 0; //nigdy nie powinno nastapic ;p
			}
		}
	}

	this.sort = function() {
		this.list.sort(this.sortFunc);
	}
	this.redraw = function() {
		this.sort();
		$('#'+this.id).html('');
		var str = '';
		for (i in this.list) {
			str += this.list[i].makeHTML();
		}
		$('<ul/>').addClass('nicklist').appendTo('#'+this.id).html(str);
		$('.chrank').css('height', 16*disp.size).css('width', 16*disp.size);
	}
	this.remove = function() {
		$('#'+this.id).remove();
		this.list = [];
	}
	this.findNick = function(nick) {
		for (i in this.list) {
			if(this.list[i].nick.toLowerCase() == nick.toLowerCase()) {
				return this.list[i];
			}
		}
		return false;
	}
	this.changeNick = function(nick, newnick) {
		if(this.findNick(nick)) {
			this.findNick(nick).nick = newnick;
			this.redraw();
			return true;
		} else {
			return false;
		}
	}
	this.addNick = function(nick, initMode, noredraw) {
		if(!this.findNick(nick)) {
			this.list.push(new NicklistUser(nick, initMode, this.channel));
			if(!noredraw) {
				this.redraw();
			}
		} else {
			if(initMode) {
				this.findNick(nick).setMode(initMode, true);
				if(!noredraw) {
					this.redraw();
				}
			}
		}
	}
	this.removeNick = function(nick) {
		for (i in this.list) {
			if(this.list[i].nick == nick) {
				this.list[i].remove();
				this.list.splice(i, 1);
				return true;
			}
		}
		return false;
	}
	try {
		$('<span id="'+this.id+'"></span>').hide().appendTo('#nicklist-main');
	} catch(e) {
		gateway.send('QUIT :Za stara przeglądarka!');
		$('.not-connected-text > h3').html('Przestarzała przeglądarka');
		$('.not-connected-text > p').html('Twoja przeglądarka jest przestarzała i nie jest obsługiwana. Należy zainstalować przeglądarkę (Mozilla Firefox, Internet Explorer, Opera, Safari, Chrome lub inną) w aktualnej wersji.');
	}
}

function NicklistUser(usernick, initMode, chan) {
	this.modes = {
		owner: false, // lvl = 5;
		admin: false,
		op: false,
		halfop: false,
		voice: false
	}
	this.channel = chan;

	this.makeHTML = function() {
		return '<li id="'+this.id+'" class="'+$('<div/>').text(this.nick).html()+'">'+
			'<table><tr onclick="gateway.toggleNickOpt(\''+this.id+'\')">'+
				'<td valign="top"><img class="chrank" alt="'+alt[this.level]+'" src="'+icons[this.level]+'" /></td>'+
				'<td valign="top" style="text-align:left;width:100%;"'+((this.nick.toLowerCase()==guser.nick.toLowerCase())?' class="ownNick";':'')+'>&nbsp;&nbsp;'+this.nick+'</td>'+
			'</tr></table>'+
			'<ul class="options" id="'+this.id+'-opt">'+
				'<li onClick="gateway.queries.push(new Query(\''+this.nick+'\')); gateway.switchTab(\''+this.nick+'\');gateway.toggleNickOpt(\''+this.id+'\');" class="switchTab">Rozmowa Prywatna (QUERY)</li>'+
				'<li><div style="width:100%;" onClick="gateway.toggleNickOptInfo(\''+this.id+'\')">Informacje</div>'+
					'<ul class="suboptions" id="'+this.id+'-opt-info'+'">'+
						'<li onClick="' + ((this.nick.toLowerCase() == guser.nick.toLowerCase())?'gateway.displayOwnWhois = true; ':'') + 'gateway.send(\'WHOIS '+gateway.sescape(this.nick)+'\');gateway.toggleNickOpt(\''+this.id+'\');">WHOIS</li>'+
						'<li onClick="services.nickInfo(\''+this.nick+'\');gateway.toggleNickOpt(\''+this.id+'\');">NickServ</li>'+
						((this.nick.toLowerCase() == guser.nick.toLowerCase())?'':'<li onClick="gateway.ctcp(\''+this.nick+'\', \'VERSION\');gateway.toggleNickOpt(\''+this.id+'\');">Wersja oprogramowania</li>')+
					'</ul>'+
				'</li>'+
				(gateway.findChannel(chan).haveOper?
				'<li><div style="width:100%;" onClick="gateway.toggleNickOptAdmin(\''+this.id+'\')">Administracja</div>'+
					'<ul class="suboptions" id="'+this.id+'-opt-admin'+'">'+
						'<li onClick="gateway.showKick(\''+this.channel+'\', \''+this.nick+'\')">Wyrzu\u0107 z kana\u0142u</li>'+
						'<li onClick="gateway.showStatus(\''+this.channel+'\', \''+this.nick+'\')">Daj uprawnienia</li>'+
						'<li onClick="gateway.showStatusAnti(\''+this.channel+'\', \''+this.nick+'\')">Odbierz uprawnienia</li>'+
					'</ul>'+
				'</li>':'')+
			'</ul>';
		//}
	}
	this.setMode = function(mode, setting) {
		if(mode in this.modes) {
			this.modes[mode] = setting;
			if(this.modes.owner) {
				this.level = 5;
			} else if (this.modes.admin) {
				this.level = 4;
			} else if (this.modes.op) {
				this.level = 3;
			} else if (this.modes.halfop) {
				this.level = 2;
			} else if (this.modes.voice) {
				this.level = 1;
			} else {
				this.level = 0;
			}
		}
		if(this.nick.toLowerCase() == guser.nick.toLowerCase() && this.level >= 2){
			gateway.findChannel(chan).haveOper = true;
		}
	}
	this.remove = function() {
		$('#'+this.id).remove();
	}
	this.level = 0;
	this.nick = usernick;
	this.id = usernick.replace(/[^a-z0-9A-Z]+/ig, '-').toLowerCase()+Math.round(Math.random()*10000);
	if(initMode) {
		this.setMode(initMode, true);
	}
}

function Query(nick) {
	this.name = nick;
	this.id = "query-"+this.name.replace(/[^a-z0-9A-Z]+/g, '-').toLowerCase()+Math.round(Math.random()*100);
	this.hilight = false;
	this.newmsg = false;
	this.classAdded = false;
	this.scrollPos = 0;
	this.scrollSaved = false;
	this.toggleClass = function() {
		if(this.ClassAdded) {
			$('#'+this.id+'-tab').removeClass('newmsg');
			this.ClassAdded = false;
		} else if(this.hilight) {
			$('#'+this.id+'-tab').addClass('newmsg');
			this.ClassAdded = true;
		}
	}
	this.markNew = function() {
		if(!this.hilight) {
			this.hilight = window.setInterval('gateway.findQuery(\''+this.name+'\').toggleClass();', 500);
		}
	}
	this.markBold = function() {
		$('#'+this.id+'-tab > a').css('font-weight', 'bold');
		$('#'+this.id+'-tab > a').css('color', '#fff');
	}
	this.markRead = function() {
		if(this.hilight) {
			window.clearInterval(this.hilight);
			this.hilight = false;
		}
		if(this.classAdded) {
			this.toggleClass();
		}
		$('#'+this.id+'-tab > a').css('font-weight', 'normal');
		$('#'+this.id+'-tab > a').css('color', '#CECECE');
		setTimeout("$('#"+this.id+"-tab').removeClass('newmsg')", 100);
		setTimeout("$('#"+this.id+"-tab').removeClass('newmsg')", 300);
		setTimeout("$('#"+this.id+"-tab').removeClass('newmsg')", 600);
	}
	this.close = function() {
		$('#'+this.id+'-tab').remove();
		$('#'+this.id+'-window').remove();
		$('#'+this.id+'-topic').remove();
		if(this.name == gateway.active) {
			gateway.switchTab(gateway.tabHistoryLast(this.name));
		}
	}
	this.appendMessage = function(type, args) {
		var rescroll = false;
		if(this.name == gateway.active && document.getElementById('chat-wrapper').scrollHeight >= $('#chat-wrapper').scrollTop() + $('#chat-wrapper').innerHeight()) {
			this.saveScroll();
			var rescroll = true;
		}
		$('#'+this.id+'-window').vprintf(type, args);
		if(rescroll && this.name == gateway.active) {
			this.restoreScroll();
		}
	}

	this.changeNick = function(newnick) {
		$('#'+this.id+'-window').vprintf(messagePatterns.nickChange, [gateway.niceTime(), $('<div/>').text(this.name).html(), $('<div/>').text(newnick).html()]);
		$('#'+this.id+'-topic').html('<h1>'+$('<div/>').text(newnick).html()+'</h1><h2></h2>');
		$("#"+this.id+'-tab').html('<a href="javascript:void(0);" class="switchTab" onclick="gateway.switchTab(\''+newnick+'\')">'+$('<div/>').text(newnick).html()+'</a><a href="javascript:void(0);" onclick="gateway.removeQuery(\''+newnick+'\')"><div class="close"></div></a>');
		this.name = newnick;
	}
	this.restoreScroll = function() {
		if(this.scrollSaved) {
			$('#chat-wrapper').scrollTop(this.scrollPos);
		} else {
			$('#chat-wrapper').scrollTop(document.getElementById('chat-wrapper').scrollHeight);
		}
	}
	this.saveScroll = function() {
		if($('#chat-wrapper').scrollTop()+document.getElementById('chat-wrapper').clientHeight > document.getElementById('chat-wrapper').scrollHeight-150 && $('#chat-wrapper').scrollTop()+document.getElementById('chat-wrapper').clientHeight > document.getElementById('chat-wrapper').scrollHeight*0.97)   {
			this.scrollSaved = false;
			this.scrollPos = 0;
		} else {
			this.scrollSaved = true;
			this.scrollPos = $('#chat-wrapper').scrollTop();
		}
	}
	$('<span/>').attr('id', this.id+'-window').hide().appendTo('#main-window');
	$('<span/>').attr('id', this.id+'-topic').hide().appendTo('#topic');
	$('#'+this.id+'-topic').html('<h1>'+this.name+'</h1><h2></h2>');
	$('<li/>').attr('id', this.id+'-tab').html('<a href="javascript:void(0);" class="switchTab" onclick="gateway.switchTab(\''+this.name+'\')">'+$('<div/>').text(this.name).html()+'</a><a href="javascript:void(0);" onclick="gateway.removeQuery(\''+this.name+'\')"><div class="close"></div></a>').appendTo('#tabs');
	$('#'+this.id+'-window').vprintf(messagePatterns.startedQuery, [gateway.niceTime(), $('<div/>').text(this.name).html()]);
}

function Channel(chan) {
	this.name = chan;
	this.id = this.name.replace(/^#/g,'').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()+Math.round(Math.random()*100);
	this.nicklist = new Nicklist(this.name, this.id);
	this.left = false;
	this.hilight = false;
	this.classAdded = false;
	this.scrollPos = 0;
	this.scrollSaved = false;
	this.haveOper = false;

	this.part = function() {
		this.left = true;
		this.nicklist.remove();
		this.nicklist = new Nicklist(this.name, this.id);
	}

	this.toggleClass = function() {
		if(this.ClassAdded) {
			$('#'+this.id+'-tab').removeClass('newmsg');
			this.ClassAdded = false;
		} else if(this.hilight) {
			$('#'+this.id+'-tab').addClass('newmsg');
			this.ClassAdded = true;
		}
	}
	this.restoreScroll = function() {
		if(this.scrollSaved) {
			$('#chat-wrapper').scrollTop(this.scrollPos);
		} else {
			$('#chat-wrapper').scrollTop(document.getElementById('chat-wrapper').scrollHeight);
		}
	}
	this.saveScroll = function() {
		if($('#chat-wrapper').scrollTop()+document.getElementById('chat-wrapper').clientHeight > document.getElementById('chat-wrapper').scrollHeight-150 && $('#chat-wrapper').scrollTop()+document.getElementById('chat-wrapper').clientHeight > document.getElementById('chat-wrapper').scrollHeight*0.97)   {
			this.scrollSaved = false;
			this.scrollPos = 0;
		} else {
			this.scrollSaved =  true;
			this.scrollPos = $('#chat-wrapper').scrollTop();
		}
	}
	this.toggleClassMsg = function() {
		if(this.ClassAddedMsg) {
			$('#'+this.id+'-tab').removeClass('newmsg2');
			this.ClassAddedMsg = false;
		} else {
			$('#'+this.id+'-tab').addClass('newmsg2');
			this.ClassAddedMsg = true;
		}
	}
	this.markNew = function() {
		if(!this.hilight) {
			this.hilight = window.setInterval('gateway.findChannel(\''+this.name+'\').toggleClass();', 500);
		}
		
		if (this.hilight2) {
			window.clearInterval(this.hilight2);
			this.hilight2 = false;
			if(this.classAddedMsg) {
				this.toggleClassMsg();
			}
			setTimeout("$('#"+this.id+"-tab').removeClass('newmsg2')", 100);
			setTimeout("$('#"+this.id+"-tab').removeClass('newmsg2')", 300);
			setTimeout("$('#"+this.id+"-tab').removeClass('newmsg2')", 500);
		}
	}
	this.markBold = function() {
		if(!this.hilight2 && !this.hilight) {
			this.hilight2 = window.setInterval('gateway.findChannel(\''+this.name+'\').toggleClassMsg();', 500);
		}
	}
	this.markRead = function() {
		if(this.hilight) {
			window.clearInterval(this.hilight);
			this.hilight = false;
		}
		
		if(this.hilight2) {
			window.clearInterval(this.hilight2);
			this.hilight2 = false;
		}
		
		if(this.classAdded) {
			this.toggleClass();
		}
		if(this.classAddedMsg) {
			this.toggleClassMsg();
		}
		$('#'+this.id+'-tab > a').css('font-weight', 'normal');
		setTimeout("$('#"+this.id+"-tab').removeClass('newmsg')", 100);
		setTimeout("$('#"+this.id+"-tab').removeClass('newmsg')", 300);
		setTimeout("$('#"+this.id+"-tab').removeClass('newmsg')", 600);
		
		setTimeout("$('#"+this.id+"-tab').removeClass('newmsg2')", 100);
		setTimeout("$('#"+this.id+"-tab').removeClass('newmsg2')", 300);
		setTimeout("$('#"+this.id+"-tab').removeClass('newmsg2')", 600);
	}
	this.close = function() {
		if(!this.left) {
			this.part();
			gateway.send("PART "+this.name+" :Opuścił kanał");
			gateway.statusWindow.appendMessage(messagePatterns.partOwn, [gateway.niceTime(), this.name, this.name]);
		}
		this.nicklist.remove();
		$('#'+this.id+'-tab').remove();
		$('#'+this.id+'-window').remove();
		$('#'+this.id+'-topic').remove();
		if(this.name == gateway.active) {
			gateway.switchTab(gateway.tabHistoryLast(this.name));
		}
	}
	this.rejoin = function() {
		this.left = false;
		$('#'+this.id+'-window').vprintf(messagePatterns.joinOwn, [gateway.niceTime(), this.name]);
		if(this.name == gateway.active) {
			this.restoreScroll();
		}
	}

	this.appendMessage = function(type, args) {
		var rescroll = false;
		if(this.name == gateway.active && document.getElementById('chat-wrapper').scrollHeight >= $('#chat-wrapper').scrollTop() + $('#chat-wrapper').innerHeight()) {
			this.saveScroll();
			var rescroll = true;
		}
		$('#'+this.id+'-window').vprintf(type, args);
		if(rescroll && this.name == gateway.active) {
			this.restoreScroll();
		}
	}
	this.setTopic = function(topic) {
		$('#'+this.id+'-topic > h2').html(topic);
		$('#'+this.id+'-topic > h2').click(disp.topicClick);
	}

	$('<span/>').attr('id', this.id+'-window').hide().appendTo('#main-window');
	$('<span/>').attr('id', this.id+'-topic').hide().appendTo('#topic');
	$('#'+this.id+'-topic').html('<h1>'+$('<div/>').text(this.name).html()+'</h1><h2></h2>');
	$('<li/>').attr('id', this.id+'-tab').html('<a href="javascript:void(0);" onclick="gateway.switchTab(\''+this.name+'\')" class="switchTab">'+$('<div/>').text(this.name).html()+'</a>'+
		'<a href="javascript:void(0);" onclick="gateway.removeChannel(\''+this.name+'\')"><div class="close"></div></a>').appendTo('#tabs');
//	$('#'+this.id+'-window').vprintf(messagePatterns.joinOwn, [gateway.niceTime(), this.name]);
}

function Status() {
	this.name = "--status";
	this.id = "--status";
	this.hilight = false;
	this.classAdded = false;
	this.scrollPos = 0;
	this.scrollSaved = false;

	this.toggleClass = function() {
		if(this.ClassAdded) {
			$('#'+this.id+'-tab').removeClass('newmsg');
			this.ClassAdded = false;
		} else if(this.hilight) {
			$('#'+this.id+'-tab').addClass('newmsg');
			this.ClassAdded = true;
		}
	}
	this.restoreScroll = function() {
		if(this.scrollSaved) {
			$('#chat-wrapper').scrollTop(this.scrollPos);
		} else {
			$('#chat-wrapper').scrollTop(document.getElementById('chat-wrapper').scrollHeight);
		}
	}
	this.saveScroll = function() {
		if($('#chat-wrapper').scrollTop()+document.getElementById('chat-wrapper').clientHeight > document.getElementById('chat-wrapper').scrollHeight-150 && $('#chat-wrapper').scrollTop()+document.getElementById('chat-wrapper').clientHeight > document.getElementById('chat-wrapper').scrollHeight*0.97)   {
			this.scrollSaved = false;
			this.scrollPos = 0;
		} else {
			this.scrollSaved =  true;
			this.scrollPos = $('#chat-wrapper').scrollTop();
		}
	}
	this.toggleClassMsg = function() {
		if(this.ClassAddedMsg) {
			$('#'+this.id+'-tab').removeClass('newmsg2');
			this.ClassAddedMsg = false;
		} else {
			$('#'+this.id+'-tab').addClass('newmsg2');
			this.ClassAddedMsg = true;
		}
	}
	this.markNew = function() {
		if(!this.hilight) {
			this.hilight = window.setInterval('gateway.statusWindow.toggleClass();', 500);
		}
		
		if (this.hilight2) {
			window.clearInterval(this.hilight2);
			this.hilight2 = false;
			if(this.classAddedMsg) {
				this.toggleClassMsg();
			}
			setTimeout("$('#"+this.id+"-tab').removeClass('newmsg2')", 100);
			setTimeout("$('#"+this.id+"-tab').removeClass('newmsg2')", 300);
			setTimeout("$('#"+this.id+"-tab').removeClass('newmsg2')", 500);
		}
	}
	this.markBold = function() {
		if(!this.hilight2 && !this.hilight) {
			this.hilight2 = window.setInterval('gateway.statusWindow.toggleClassMsg();', 500);
		}
	}
	this.markRead = function() {
		if(this.hilight) {
			window.clearInterval(this.hilight);
			this.hilight = false;
		}
		
		if(this.hilight2) {
			window.clearInterval(this.hilight2);
			this.hilight2 = false;
		}
		
		if(this.classAdded) {
			this.toggleClass();
		}
		if(this.classAddedMsg) {
			this.toggleClassMsg();
		}
		$('#'+this.id+'-tab > a').css('font-weight', 'normal');
		setTimeout("$('#"+this.id+"-tab').removeClass('newmsg')", 100);
		setTimeout("$('#"+this.id+"-tab').removeClass('newmsg')", 300);
		setTimeout("$('#"+this.id+"-tab').removeClass('newmsg')", 600);
		
		setTimeout("$('#"+this.id+"-tab').removeClass('newmsg2')", 100);
		setTimeout("$('#"+this.id+"-tab').removeClass('newmsg2')", 300);
		setTimeout("$('#"+this.id+"-tab').removeClass('newmsg2')", 600);
	}
	this.appendMessage = function(type, args) {
		var rescroll = false;
		if(this.name == gateway.active && document.getElementById('chat-wrapper').scrollHeight >= $('#chat-wrapper').scrollTop() + $('#chat-wrapper').innerHeight()) {
			this.saveScroll();
			var rescroll = true;
		}
		$('#'+this.id+'-window').vprintf(type, args);
		if(rescroll && this.name == gateway.active) {
			this.restoreScroll();
		}
	}
}

var settings = {
	'saveCookie': function(cname, cvalue){
		var now = new Date();
		var expireTime = now.getTime() + 60*60*24*720; // 720 dni
		now.setTime(expireTime);
		document.cookie = cname+'='+cvalue+'; expires='+now.toGMTString();
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
	}
}

var statusDisconnected = 0;
var status001 = 1;
var statusGhostSent = 2;
var statusIdentified = 3;
var statusConnected = 4;
var statusGhostAndNickSent = 5;
var statusError = 6;

var disp = {
	'size': 1,
	'setSize': function(s) {
		if(!s) return;
		$('body').css('font-size', s+'em');
		$('input[type="checkbox"]').css('transform', 'scale('+s+')');
//		$('.chrank').css('height', 16*s).css('width', 16*s);
//		$('#options-box > a').css('height', 18*s).css('width', 18*s).css('background-size', 18*s+'px '+18*2*s+'px');
		disp.size = s;
		settings.saveCookie('tsize', s);
	},
	'colorWindowShow': function() {
		$('.colorwindow').fadeIn(200);
		$('.symbolwindow').fadeOut(200)
	},
	'symbolWindowShow': function() {
		$('.symbolwindow').fadeIn(200);
		$('.colorwindow').fadeOut(200)
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
		if ($('#tabsListBottom').is(':checked')) {
			$('#top_menu').detach().insertAfter('#inputbox');
			$('#top_menu').css('top', 'auto').css('bottom', '0');
			$('#options-box').css('top', '.8em');
			$('#info').css('top', '0');
			$('#chatbox').css('top', '2.2em').css('bottom', '7em');
			$('#nicklist').css('top', '2.2em').css('bottom', '7em');
			$('#inputbox').css('bottom', '3.2em');
		} else {
			$('#top_menu').detach().insertAfter('#options-box');
			$('#top_menu').css('bottom', 'auto').css('top', '0');
			$('#options-box').css('top', '');
			$('#info').css('top', '');
			$('#chatbox').css('top', '').css('bottom', '');
			$('#nicklist').css('top', '').css('bottom', '');
			$('#inputbox').css('bottom', '');
		}
		if ($('#showUserHostnames').is(':checked')) {
			$('#userhost_hidden').remove();
		} else {
			var style = $('<style id="userhost_hidden">.userhost { display:none; }</style>');
			$('html > head').append(style);
		}
	},
    'showSizes': function() {
		$('.tsizewindow').fadeIn(200);
	},
	'topicClick': function() {
		var channel = gateway.findChannel(gateway.active);
		if(!channel){
			return;
		}
		$(".notify-text").html('<h2>Temat kanału '+channel.name+'</h2><p>'+$('#'+channel.id+'-topic > h2').html()+'</p>');
		$(".notifywindow").fadeIn(250);
		$(".notifywindow").css('z-index', 10);
	}
};

var stateStart = 0;
var stateSenderNick = 1;
var stateArgs = 2;
var stateMessage = 3;
var stateCommand = 4;
var stateSenderUser = 5;
var stateSenderHost = 6;

var irc = {
	'messagedata': function() {
		this.text = '';
		this.args = [];
		this.command = '';
		this.sender = {
			'nick': '',
			'ident': '',
			'host': '',
			'server': false,
			'user': false
		};
	},
	'parseMessage': function(msg){
		lines = msg.split("\n");
		packets = [];
		packetcnt = 0;
		lines.forEach(function(line){
			var ircmsg = new irc.messagedata();

			while(line.charAt(0) == "\r" || line.charAt(0) == "\n"){
				line = line.substr(1);
				if(line == ''){
					return;
				}
			}
			while(line.slice(-1) == "\r" || line.slice(-1) == " "){
				line = line.slice(0, -1);
				if(line == ''){
					return;
				}
			}
			
			line.replace(/^\s+|\s+$/gm,'');
			
			if(line == ''){
				return;
			}
			
			var msglen = line.length;
		
			var pstate = stateStart;
			var currArg = '';

			for(var i = 0; i < msglen; i++){
				var cchar = line.charAt(i);
				switch(pstate){
					case stateStart:
						switch(cchar){
							case ':': pstate = stateSenderNick; break;
							default:
								pstate = stateCommand; 
								ircmsg.command += cchar;
								break;
						}
						break;
					case stateSenderNick:
						switch(cchar){
							case '!': pstate = stateSenderUser; break;
							case '@': pstate = stateSenderHost; break;
							case ' ': pstate = stateCommand; break;
							default: ircmsg.sender.nick += cchar; break;
						}
						break;
					case stateSenderUser:
						switch(cchar){
							case '@': pstate = stateSenderHost; break;
							case ' ': pstate = stateCommand; break;
							default: ircmsg.sender.ident += cchar; break;
						}
						break;
					case stateSenderHost:
						switch(cchar){
							case ' ': pstate = stateCommand; break;
							default: ircmsg.sender.host += cchar; break;
						}
						break;
					case stateCommand:
						switch(cchar){
							case ' ': pstate = stateArgs; break;
							default: ircmsg.command += cchar; break;
						}
						break;
					case stateArgs:
						switch(cchar){
							case ' ':
								if(currArg != ''){
									ircmsg.args.push(currArg);
								}
								currArg = '';
								break;
							case ':':
								if(prevChar == ' '){
									pstate = stateMessage;
								} else {
									currArg += cchar;
								}
								break;
							default: currArg += cchar; break;
						}
						break;
					case stateMessage:
						ircmsg.text += cchar;
						break;
				}
				var prevChar = cchar;
			}
			if(pstate == stateArgs){
				ircmsg.args.push(currArg);
			}
		
			if(ircmsg.sender.ident == '' && ircmsg.sender.host == '' && ircmsg.sender.nick.indexOf('.')!=-1){
				ircmsg.sender.server = true;
			} else {
				ircmsg.sender.user = true;
			}
		
			console.log(line);
			console.log(ircmsg);
		
			packets[packetcnt] = ircmsg;
			packetcnt++;
		});
		return {'status': 2, 'packets': packets };
	}
};

var services = {
	'nickStore': '',
	'badNickString': '<div class="table">'+
		'<form class="tr" onsubmit="services.logIn();" action="javascript:void(0);">'+
			'<span class="td_right">Twoje hasło:</span>'+
			'<span class="td"><input type="password" id="nspass" /></span>'+
			'<span class="td"><input type="submit" value="Zaloguj" /></span>'+
		'</form>'+
		'<form class="tr" onsubmit="services.changeNick();" action="javascript:void(0);">'+
			'<span class="td_right">Nowy nick:</span>'+
			'<span class="td"><input type="text" id="nnick" /></span>'+
			'<span class="td"><input type="submit" value="Zmień nick" /></span>'+
		'</form>'+
	'</div>',
	'nickservMessage': function(msg){
		if (msg.text.match(/^Nieprawid.owe has.o\.$/i)) { // złe hasło nickserv
			services.nickStore = guser.nickservnick;
			$(".error-text").text(" ");
			$(".error-text").append('<h3>Nieprawidłowe hasło</h3><p>Podane hasło do nicka <b>'+guser.nickservnick+'</b> jest błędne. Możesz spróbować ponownie lub zmienić nicka.</p>'+services.badNickString);
			$(".errorwindow").fadeIn(250);
			$(".errorwindow").css('z-index', 10);
		}
		if(guser.nickservpass == '' && msg.text.match(/^Ten nick jest zarejestrowany i chroniony\.$/i)){
			services.nickStore = guser.nick;
			$(".error-text").text(" ");
			$(".error-text").append('<h3>Nick jest zarejestrowany</h3><p>Wybrany nick <b>'+guser.nick+'</b> jest zarejestrowany. Musisz go zmienić lub podać hasło.</p>'+services.badNickString);
			$(".errorwindow").fadeIn(250);
			$(".errorwindow").css('z-index', 10);
		}
	},
	'logIn': function(){
		if($('#nspass').val() == ''){
			alert('Nie podałeś hasła!');
			return false;
		}
		guser.nickservnick = services.nickStore;
		guser.nickservpass = $('#nspass').val();
		gateway.connectStatus = status001;
		gateway.setConnectedWhenIdentified = 1;
		gateway.processStatus();
		gateway.send('PING :Init');
		$(".errorwindow").fadeOut(250);
		return true;
	},
	'changeNick': function(){
		if($('#nnick').val() == ''){
			alert('Nie podałeś nicka!');
			return false;
		}
		gateway.send('NICK '+$('#nnick').val());
		$(".errorwindow").fadeOut(250);
		return true;
	},
	'nickInfo': function(nick){
		var nscommand = 'INFO '+nick+' ALL';
		var query = gateway.findQuery('nickserv');
		if(!query) {
			query = new Query('NickServ');
			gateway.queries.push(query);
		}
		gateway.switchTab('nickserv');
		query.appendMessage(messagePatterns.yourMsg, [gateway.niceTime(), guser.nick, nscommand]);
		gateway.send('PRIVMSG NickServ :'+nscommand);
	}
};

var gateway = {
	'websock': 0,
	'whois': '',
	'connectStatus': statusDisconnected,
	'joined': 0,
	'setConnectedWhenIdentified': 0,
	'connectTimeoutID': 0,
	'pingIntervalID': false,
	'disconnectMessageShown': 0,
	'displayOwnWhois': false,
	'firstConnect': 1, //jeśli dostanę ERROR gdy to jest nadal 1 = błąd z poprzedniej sesji, od razu łączę ponownie
	'allowNewSend' : true,
	'statusWindow': new Status(),
	'chanPassword': function(chan) {
		if($('#chpass').val() == ''){
			alert('Nie podałeś hasła!');
			return false;
		}
		gateway.send('JOIN '+chan+' '+$('#chpass').val());
		$(".errorwindow").fadeOut(250);
		return true;
	},
	'reconnect': function() { //wywoływana po kliknięciu 'połącz ponownie'
		gateway.websock.onerror = undefined;
		gateway.websock.onclose = undefined;
		gateway.websock.close();
		gateway.websock = false;
		setTimeout(function(){
			gateway.connectStatus = statusDisconnected;
			$('#not_connected_wrapper').fadeIn(50);
			$('.not-connected-text > h3').html('Łączenie');
			$('.not-connected-text > p').html('Ponowne łączenie, czekaj...<br />Nie używaj teraz przycisku "Wstecz" ani "Odśwież".');
			$('#reconnect_wrapper').fadeOut(50);
			gateway.connect(true);
		}, 500);
//			$(this).fadeOut(50);
	},
	'iKnowIAmConnected': function() { //użytkownik może już pisać na kanale
		if(!gateway.pingIntervalID){
			gateway.pingIntervalID = setInterval(function(){
				gateway.ping();
			}, 20000);
		}
		if(gateway.connectStatus == statusIdentified){
			gateway.connectStatus = statusConnected;
			if(guser.nickservnick != '' && guser.nick != guser.nickservnick) { //ostatnia próba zmiany nicka na właściwy
				gateway.send('NICK '+guser.nickservnick);
			}
		} else {
			gateway.setConnectedWhenIdentified = 1;
		}
		$('#not_connected_wrapper').fadeOut(400); //schować szare tło!
		clearTimeout(gateway.connectTimeoutID); //już ok więc nie czekam na nieudane połączenie
		gateway.firstConnect = 0;
		if (gateway.getActive() && gateway.findChannel(gateway.active)) {
			$('#'+gateway.findChannel(gateway.active).id+'-nicklist').show(); //gwarantuje pokazanie listy nicków na bieżącym kanale po ponownym połączeniu
		}
	},
	'pingcnt': 0,
	'disconnected': function(text) { //informacja w okienkach i ich blokowanie przy rozłączeniu
		clearTimeout(gateway.connectTimeoutID);
		gateway.websock.onerror = undefined;
		gateway.websock.onclose = undefined;
		gateway.connectTimeoutID = false;
		clearInterval(gateway.pingIntervalID);
		gateway.pingIntervalID = false;
		if(guser.nickservnick != ''){
			guser.nick = guser.nickservnick;
		}
		if(gateway.disconnectMessageShown) {
			return;
		}
		gateway.disconnectMessageShown = 1;
        for(c in gateway.channels) {
            gateway.channels[c].part();
			gateway.channels[c].appendMessage(messagePatterns.error, [gateway.niceTime(), text]);
        }
		gateway.statusWindow.appendMessage(messagePatterns.error, [gateway.niceTime(), text]);
	},
	'ping': function() { //pytanie IRCD o ping i błąd kiedy brak odpowiedzi
		if(gateway.connectStatus != statusConnected) {
			gateway.pingcnt = 0;
			return;
		}
		gateway.forceSend('PING :JavaScript');
		if(gateway.pingcnt > 3) {
			gateway.connectStatus = statusError;
			if($('#autoReconnect').is(':checked')){
				gateway.reconnect();
			} else {
				$('#reconnect_wrapper').fadeIn(50);
			}
	//		gateway.send('QUIT :Błąd bramki >> zbyt długi czas odpowiedzi serwera');
			gateway.disconnected('Przekroczony czas odpowiedzi serwera');
			gateway.pingcnt = 0;
		} else {
			gateway.pingcnt++;
		}
	},
	'configureConnection': function(){
		gateway.websock.onmessage = gateway.onRecv;
		gateway.websock.onerror = gateway.sockError;
		gateway.websock.onclose = gateway.sockError;
		if(gateway.delayedSendTimer){
			clearInterval(gateway.delayedSendTimer);
			gateway.delayedSendTimer = false;
		}
		gateway.delayedSendTimer = setInterval(function(){
			if(gateway.toSend.length > 0){
				gateway.forceSend(gateway.toSend.shift());
			} else {
				if(gateway.sendDelayCnt > 0){
					gateway.sendDelayCnt--;	
				}
			}
		}, 1000);
	},
	'connect': function(force) {
		gateway.connectTimeoutID = setTimeout(gateway.connectTimeout, 20000);
		if(!gateway.websock || gateway.websock.readyState == WebSocket.CLOSING || gateway.websock.readyState == WebSocket.CLOSED){
			gateway.websock = new WebSocket(server);
			gateway.websock.onmessage = function(e){
				var regexp = /^SYNC ([^ ]+)$/i
				var rmatch = regexp.exec(e.data);
				if(rmatch[1]){
					if(rmatch[1] == '1'){
						gateway.recoverConnection();
					} else {
						gateway.connect(true);
					}
				}

			};
			gateway.websock.onopen = function(){
				gateway.forceSend('SYNC '+sessionid);
			};
			
		} else {
			if(guser.nickservpass != '' && guser.nickservnick != ''){
				gateway.websock.onmessage = function(e){
					var regexp = /^SYNC ([^ ]+)$/i
					var rmatch = regexp.exec(e.data);
					if(rmatch[1]){
						if(rmatch[1] == '1'){
							gateway.recoverConnection();
						} else {
							gateway.configureConnection();
							gateway.forceSend('NEW '+sessionid+' ' + guser.nick + ' ' + md5(guser.nickservpass));
						}
					}
				};
				gateway.forceSend('FIND '+ guser.nickservnick + ' ' + md5(guser.nickservpass) + ' '+ sessionid);
			} else {
				gateway.configureConnection();
				gateway.forceSend('NEW '+sessionid+' ' + guser.nick + ' x');
			}
		}
	},
	'recoverConnection': function() {
		gateway.connectTimeoutID = setTimeout(gateway.connectTimeout, 20000);
		// już jest połączenie
		gateway.configureConnection();
		gateway.statusWindow.appendMessage(messagePatterns.existingConnection, [gateway.niceTime()]);
		gateway.send('PRIVMSG');
			
		if(guser.nick == settings.getCookie('nick') && settings.getCookie('password')){
			guser.nickservnick = guser.nick;
			guser.nickservpass = atob(settings.getCookie('password'));
		}
			
		setTimeout(function(){
			if(reqChannel && reqChannel.match(/^#[^ ]/)){
				gateway.send('JOIN '+reqChannel);
			}
			if(guser.channels[0] && guser.channels[0] != reqChannel && guser.channels[0].match(/^#[^ ]/)){
				gateway.send('JOIN '+guser.channels[0]);
			}
		}, 500);
	},
	'processData': function(data) {
		for (i in data.packets) { //wywoływanie funkcji 'handlerów' od poleceń
			if(data.packets[i].command in cmdBinds) {
				for(func in cmdBinds[data.packets[i].command]) {
					if(typeof(cmdBinds[data.packets[i].command]) != 'undefined' && typeof(cmdBinds[data.packets[i].command][func]) == 'function') {
						cmdBinds[data.packets[i].command][func](data.packets[i]);
					}
				}
			}
		}
	},
	'sockError': function(e) {
		if(gateway.connectStatus != statusDisconnected && gateway.connectStatus != statusError){
			gateway.connectStatus = statusError;
			gateway.disconnected('Błąd serwera bramki');
			if($('#autoReconnect').is(':checked')){
				gateway.reconnect();
			} else {
				$('#reconnect_wrapper').fadeIn(50);
			}
		}
	},
	'onRecv': function(sdata) {
	/*	mdata = new FileReader();
		mdata.onload = function(e){
			ircdata = String.fromCharCode.apply(null, new Uint8Array(e.target.result));
	//		console.log(ircdata);
			
			data = irc.parseMessage(ircdata);*/
		data = irc.parseMessage(Base64.decode(sdata.data));
		
		gateway.processData(data);

	/*	if(gateway.connectStatus == statusDisconnected) { //informacja o łączeniu

		} else {
			if(gateway.connectStatus != statusError){
			}
		}*/
		gateway.processStatus();
		/*}
		mdata.readAsArrayBuffer(sdata.data);*/
	},
	'ctcp': function(dest, text) {
		gateway.send('PRIVMSG '+dest+' :\001'+text+'\001');
	},
	'processStatus': function() {
		if(guser.nickservpass != '' && guser.nickservnick != ''){
			if(gateway.connectStatus == status001) {
				if(guser.nick != guser.nickservnick) { //auto-ghost
					gateway.connectStatus = statusGhostSent;
					gateway.send("PRIVMSG NickServ :GHOST "+guser.nickservnick+" "+guser.nickservpass+"\r\nPRIVMSG NickServ :RELEASE "+guser.nickservnick+" "+guser.nickservpass);
				} else {
					gateway.send("PRIVMSG NickServ :IDENTIFY "+guser.nickservpass);
					gateway.connectStatus = statusIdentified;
				}
			}
			if(gateway.connectStatus == statusGhostSent) {
				setTimeout(function(){ //czekam trochę żeby nickserv miał czas zadziałać, TODO spróbować poczekać na komunikat
					if(gateway.connectStatus != statusGhostSent) {
						return;
					}
					gateway.send("NICK "+guser.nickservnick);
					gateway.connectStatus = statusGhostAndNickSent;
				}, 500);
			}
			if(gateway.connectStatus == statusGhostAndNickSent && guser.nick == guser.nickservnick){ //ghost się udał
				gateway.send("PRIVMSG NickServ :IDENTIFY "+guser.nickservpass);
			    $(".notify-text").append('<p>I już nie jest: usunąłem go używając twojego hasła :)</p>');
				gateway.connectStatus = statusIdentified;
			}
		} else {
			if(gateway.connectStatus == status001) { //nie ma hasła więc od razu uznajemy że ok
				gateway.connectStatus = statusIdentified;
			}
		}
		if(gateway.connectStatus == statusIdentified && gateway.setConnectedWhenIdentified == 1){ //podłączony, a szare tło schowane już wcześniej
			gateway.connectStatus = statusConnected;
		}
		if(gateway.connectStatus == statusConnected){
			gateway.setConnectedWhenIdentified = 0;
			if(!gateway.joined) {
				$('#input').focus();
			//	gateway.joinChannels();
				gateway.joined = 1;
				gateway.disconnectMessageShown = 0; //tutaj resetuję
			}
		} else {
			gateway.joined = 0;
		}
	},
	'joinChannels': function() {
		var joinstr = guser.channels[0]?('JOIN '+guser.channels[0]+'\r\n'):'';
		for(c in gateway.channels) {
			joinstr += "JOIN "+gateway.channels[c].name+"\r\n";
		}
		gateway.send(joinstr);
	},
	'connectTimeout': function() {
		if(gateway.connectStatus != statusConnected){
			$('#not_connected_wrapper').fadeIn(200);
			$('.not-connected-text > h3').html('Łączenie');
			$('.not-connected-text > p').html('Łączenie trwa zbyt długo.<br />Możesz poczekać lub spróbować jeszcze raz. <input type="button" onclick="gateway.stopAndReconnect();" value="Połącz ponownie" />');
		}
	},
	'stopAndReconnect': function () {
		gateway.disconnected('Zbyt długi czas łączenia');
		gateway.send('QUIT :Błąd bramki >> łączenie trwało zbyt długo');
		gateway.connectStatus = statusDisconnected;
		setTimeout('gateway.reconnect()', 500);
	},
	'initSys': function() {
		$('.not-connected-text > h3').html('Łączenie');
		$('.not-connected-text > p').html('Poczekaj, trwa łączenie...<br />Nie używaj teraz przycisku "Wstecz" ani "Odśwież".');
	},
	'initialize': function() {
		if(!$('#nsnick').val().match(/^[\^\|0-9a-z_`\[\]\-]+$/i)) {
			alert('Nick zawiera niedozwolone znaki!');
			return false;
		}
		if(!$('#nschan').val().match(/^[#,a-z0-9_\.\-]+$/i)) {
			alert('Kanał zawiera niedozwolone znaki!');
			return false;
		}
		if($('#nspass').val().match(/[ ]+/i)) {
			alert('Hasło nie powinno zawierać spacji!');
			return false;
		}
		if($('#nsnick').val() != guser.nick) {
			guser.changeNick($('#nsnick').val());
		}
		guser.channels = [ $('#nschan').val() ];
		if($('#nspass').val() != '') {
			guser.nickservnick = $('#nsnick').val();
			guser.nickservpass = $('#nspass').val();
		}
		if($('#save_cookie').is(":checked")){
			settings.saveCookie('channel', $('#nschan').val());
			settings.saveCookie('nick', $('#nsnick').val());
			if(guser.nickservpass){
				settings.saveCookie('password', btoa(guser.nickservpass));
			}
		}
		gateway.initSys();
		gateway.connect(false);

		return false;
	},
	'delayedSendTimer': false,
	'toSend': [],
	'sendDelayCnt': 0,
	'sendDelayed': function(data){
	    gateway.toSend.push(data);
	},
	'send': function(data) {
		if(gateway.sendDelayCnt < 3){
			gateway.forceSend(data);
			gateway.sendDelayCnt++;
		} else {
			gateway.toSend.push(data);
		}
	},
	'forceSend': function(data){
		sdata = Base64.encode(data+'\r\n');
		gateway.websock.send(sdata);
	},
	'niceTime': function() {
		dateobj = new Date();
		hours = dateobj.getHours();
		if(hours < 10) {
			hours = '0'+hours;
		}
		minutes = dateobj.getMinutes();
		if(minutes < 10) {
			minutes = '0'+minutes;
		}
		return hours+':'+minutes;
	},
	'channels': [],
	'findChannel': function(name) {
		if(typeof(name) != 'string') return false;
		for (i in gateway.channels) {
			if(gateway.channels[i] && gateway.channels[i].name.toLowerCase() == name.toLowerCase()) {
				return gateway.channels[i];
			}
		}
		return false;
	},
	'removeChannel': function(name) {
		if(typeof(name) != 'string') return false;
		var channels2 = [];
		for (i in gateway.channels) {
			if(gateway.channels[i] && gateway.channels[i].name.toLowerCase() == name.toLowerCase()) {
				gateway.findChannel(name).markRead();
				gateway.channels[i].close();
			} else if(gateway.channels[i]) {
				channels2.push(gateway.channels[i]);
			}
		}
		gateway.channels = channels2;
		$('#input').focus();
		return false;
	},
	'queries': [],
	'findQuery': function(name) {
		if(typeof(name) != 'string') return false;
		for (i in gateway.queries) {
			if(gateway.queries[i] && gateway.queries[i].name.toLowerCase() == name.toLowerCase()) {
				return gateway.queries[i];
			}
		}
		return false;
	},
	'removeQuery': function(name) {
		if(typeof(name) != 'string') return false;
		var queries2 = [];
		for (i in gateway.queries) {
			if(gateway.queries[i] && gateway.queries[i].name.toLowerCase() == name.toLowerCase()) {
				gateway.findQuery(name).markRead();
				gateway.queries[i].close();
			} else if(gateway.queries[i]) {
				queries2.push(gateway.queries[i]);
			}
		}
		gateway.queries = queries2;
		$('#input').focus();
		return false;
	},
	'tabHistory': ['--status'],
	'lasterror': '',
	'nickListVisibility': true,
	'nickListToggle': function() {
		if($("#nicklist").width() > 40) {
			$("#nicklist").animate({
				"opacity": "toggle",
				"width":    "40px"
			}, 400);
			$("#chatbox").animate({
				"width":    "97%"
			}, 401, function () {
				$("#nicklist-closed").fadeIn(200);
			});
			gateway.nickListVisibility = false;
		} else {
			$("#nicklist-closed").fadeOut(200, function () {
				$("#nicklist").animate({
					"opacity": "toggle",
					"width":    "23%"
				}, 400);
				$("#chatbox").animate({
					"width":    "77%"
				}, 400);
			});
			gateway.nickListVisibility = true;
		}
		$('#input').focus();
	},
	'insert': function(text) {
		var input = $('#input');
		var oldText = input.val();
		input.focus();
		input.val(oldText + text);
	}, 
	'insertColor': function(color) {
		gateway.insert('[!color]' + (color<10?'0':'') + color.toString());
	},
	'insertCode': function(code) {
/*		gateway.insert(String.fromCharCode(code));*/
		var text = false;
		switch(code){
			case 2: text = '[!bold]'; break;
			case 3: text = '[!color]'; break;
			case 15: text = '[!reset]'; break;
			case 22: text = '[!invert]'; break;
			case 29: text = '[!italic]'; break;
			case 31: text = '[!uline]'; break;
		}
		if(text) gateway.insert(text);
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
	'parseTime': function(timestamp) {
		var nd = new Date();
		nd.setTime(timestamp*1000);
		return $.vsprintf("%s, %s %s, %02s:%02s:%02s", [ gateway.dateWeek[nd.getDay()], nd.getDate(), gateway.dateMonth[nd.getMonth()], nd.getHours(), nd.getMinutes(), nd.getSeconds() ] );
	},
	'dateWeek': [ 'Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota' ],
	'dateMonth': [ 'sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru' ],
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
	'colorize': function(message) {
		var pageBack  = 'white';
		var pageFront = 'black';
		var currBack = pageBack;
		var currFront = pageFront;
		var length    = message.length;
		var newText   = '';
		
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
							currFront = gateway.getColor(parseInt(message.charAt(i)) * 10 + parseInt(message.charAt(++i)), "foreground");
						} else {
							currFront = gateway.getColor(parseInt(message.charAt(i)), "foreground");
						}
						if ((message.charAt(i+1) == ',') && !isNaN(parseInt(message.charAt(++i+1)))) {
							if (!isNaN(parseInt(message.charAt(++i+1)))) {
								currBack = gateway.getColor(parseInt(message.charAt(i)) * 10 + parseInt(message.charAt(++i)), "background");
							} else {
								currBack = gateway.getColor(parseInt(message.charAt(i)), "background");
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
				
				case '<': // escape
					isText = true;
					append = '&lt;';
					break;
					
				case '>':
					isText = true;
					append = '&gt;';
					break;
				
				case '&':
					isText = true;
					append = '&amp;';
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
					newText += '">';
				}
			}
			if(isText){
				newText += append;
			}
		}
			

		if(formatSet){
			newText += '</span>';
		}
		newText = newText.replace(/(http:\/\/[^ "'<>]+)/ig, "<a href=\"$1\" target=\"_blank\" onclick=\"return confirm('Link może być niebezpieczny, czy na pewno chcesz go otworzyć?')\">$1</a>");
		newText = newText.replace(/(https:\/\/[^ "'<>]+)/ig, "<a href=\"$1\" target=\"_blank\" onclick=\"return confirm('Link może być niebezpieczny, czy na pewno chcesz go otworzyć?')\">$1</a>");
		newText = newText.replace(/(ftp:\/\/[^ "'<>]+)/ig, "<a href=\"$1\" target=\"_blank\" onclick=\"return confirm('Link może być niebezpieczny, czy na pewno chcesz go otworzyć?')\">$1</a>");
		return newText;
	},
	'nextTab': function() {
		var swtab = $('li.activeWindow').next().find('a.switchTab');
		if(swtab){
			swtab.trigger('click');
		/*	var container = $('#tab-wrapper'),
				scrollTo = $('li.activeWindow');

			container.scrollLeft(container.scrollLeft() + scrollTo.width());*/
		}
	},
	'prevTab': function() {
		var swtab = $('li.activeWindow').prev().find('a.switchTab');
		if(swtab){
			swtab.trigger('click');
	/*		var container = $('#tab-wrapper'),
				scrollTo = $('li.activeWindow');

			container.scrollLeft(container.scrollLeft() - scrollTo.width());
			$('#tab-wrapper').scrollTo(swtab);*/
		}
	},
	'switchTab': function(chan) {
		var act = gateway.getActive();
		if(act){
			act.saveScroll();
		} else {
			gateway.statusWindow.saveScroll();
		}
		chan = chan.toLowerCase();
		if(chan != "--status" && gateway.findChannel(chan)) {
			$('#main-window > span').hide();
			$('#nicklist-main > span').hide();
			$('#topic > span').hide();
			$('#'+gateway.findChannel(chan).id+'-nicklist').show();
			$('#tabs > li').removeClass("activeWindow");
			$('#'+gateway.findChannel(chan).id+'-tab').addClass("activeWindow");
			$('#'+gateway.findChannel(chan).id+'-window').show();
			$('#'+gateway.findChannel(chan).id+'-topic').show();
			gateway.findChannel(chan).markRead();
			gateway.active = chan;
			gateway.tabHistory.push(chan);
			$('#input').focus();
			if($("#nicklist").width() < 41 && gateway.nickListVisibility) {
				$("#nicklist-closed").fadeOut(200, function () {
					$("#nicklist").animate({
						"opacity": "toggle",
						"width":    "23%"
					}, 400);
					$("#chatbox").animate({
						"width":    "77%"
					}, 400, function() {
						gateway.findChannel(chan).restoreScroll();
						setTimeout(function(){
							gateway.findChannel(chan).restoreScroll();
						}, 600);
					});
				});
			} else {
				gateway.findChannel(chan).restoreScroll();
				setTimeout(function(){
					gateway.findChannel(chan).restoreScroll();
				}, 600);
			}
			
		} else if(chan != "--status" && gateway.findQuery(chan)) {
			$('#main-window > span').hide();
			$('#nicklist-main > span').hide();
			$('#topic > span').hide();
			$('#--status-nicklist').show();
			$('#tabs > li').removeClass("activeWindow");
			$('#'+gateway.findQuery(chan).id+'-tab').addClass("activeWindow");
			$('#'+gateway.findQuery(chan).id+'-window').show();
			$('#'+gateway.findQuery(chan).id+'-topic').show();
			gateway.active = chan;
			gateway.tabHistory.push(chan);
			$('#input').focus();
			if($("#nicklist").width() > 40) {
				$("#nicklist").animate({
					"opacity": "toggle",
					"width":    "40px"
				}, 400);
				$("#chatbox").animate({
					"width":    "97%"
				}, 401, function () {
					$("#nicklist-closed").fadeIn(200);
					gateway.findQuery(chan).restoreScroll();
					setTimeout(function(){
						gateway.findQuery(chan).restoreScroll();
					}, 600);
				});
			} else {
				gateway.findQuery(chan).restoreScroll();
				setTimeout(function(){
					gateway.findQuery(chan).restoreScroll();
				}, 600);
			}
			gateway.findQuery(chan).markRead();
		} else if(chan == "--status") {
			$('#main-window > span').hide();
			$('#nicklist-main > span').hide();
			$('#topic > span').hide();
			$('#--status-nicklist').show();
			$('#tabs > li').removeClass("activeWindow");
			$('#--status-tab').addClass("activeWindow");
			$('#--status-window').show();
			$('#--status-topic').show();
			gateway.statusWindow.markRead();
			gateway.active = chan;
			gateway.tabHistory.push(chan);
			$('#input').focus();
			if($("#nicklist").width() > 40) {
				$("#nicklist").animate({
					"opacity": "toggle",
					"width":    "40px"
				}, 400);
				$("#chatbox").animate({
					"width":    "97%"
				}, 401, function () {
					$("#nicklist-closed").fadeIn(200);
					gateway.statusWindow.restoreScroll();
					setTimeout(function(){
						gateway.statusWindow.restoreScroll();
					}, 600);
				});
			} else {
				gateway.statusWindow.restoreScroll();
				setTimeout(function(){
					gateway.statusWindow.restoreScroll();
				}, 600);
			}
		}
	},
	'tabHistoryLast': function(ignore) {
		for(var i=gateway.tabHistory.length; i > 0; i--) {
			if(gateway.tabHistory[i] && ((gateway.findChannel(gateway.tabHistory[i]) || gateway.findChannel(gateway.tabHistory[i])) && (!ignore || ignore != gateway.tabHistory[i]))) {
				return gateway.tabHistory[i];
			}
		}
		return '--status';
	},
	'notEnoughParams': function(command, reason) {
		if(gateway.getActive()) {
			gateway.getActive().appendMessage(messagePatterns.notEnoughParams, [gateway.niceTime(), command, reason]);
		} else {
			gateway.statusWindow.appendMessage(messagePatterns.notEnoughParams, [gateway.niceTime(), command, reason]);
		}
	},
	'sescape': function(val) {
		return val.replace('\\', '\\\\');
	},
	'callCommand': function(command, input, alias) {
		if(alias && alias in commands) {
			if(typeof(commands[alias].callback) == 'string') {
				return gateway.callCommand(command, input, commands[alias].callback);
			} else if(typeof(commands[alias].callback) == 'function') {
				commands[alias].callback(command, input);
				return true;
			} else {
				return false;
			}
		} else if(command[0].toLowerCase() in commands) {
			if(typeof(commands[command[0].toLowerCase()].callback) == 'string') {
				return gateway.callCommand(command, input, commands[command[0].toLowerCase()].callback);
			} else if(typeof(commands[command[0].toLowerCase()].callback) == 'function') {
				commands[command[0].toLowerCase()].callback(command, input);
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	'parseUserInput': function(input) {
		if(!input){
			input = '';
		}
		input = input.replace(/\[!color\]/g, String.fromCharCode(3));
		input = input.replace(/\[!bold\]/g, String.fromCharCode(2));
		input = input.replace(/\[!invert\]/g, String.fromCharCode(22));
		input = input.replace(/\[!reset\]/g, String.fromCharCode(15));
		input = input.replace(/\[!italic\]/g, String.fromCharCode(29));
		input = input.replace(/\[!uline\]/g, String.fromCharCode(31));
		if (input) {
			if(gateway.connectStatus > 0) {
				if(input.charAt(0) == "/") {
					command = input.slice(1).split(" ");
					if(!gateway.callCommand(command, input)) {
						if (gateway.getActive()) {
							gateway.getActive().appendMessage(messagePatterns.noSuchCommand, [gateway.niceTime(), $('<div/>').text(command[0]).html()]);
						} else {
							gateway.statusWindow.appendMessage(messagePatterns.noSuchCommand, [gateway.niceTime(), $('<div/>').text(command[0]).html()]);
						}
					}
				} else {
					if(gateway.getActive()) {
						var textToSend = input;
						do {
							var sendNow = textToSend.substring(0, 420);
							textToSend = textToSend.substring(420);
							gateway.send("PRIVMSG " + gateway.getActive().name + " :" + sendNow);
							gateway.getActive().appendMessage(messagePatterns.yourMsg, [gateway.niceTime(), guser.nick, gateway.colorize(sendNow)]);
						} while (textToSend != "");
						gateway.getActive().appendMessage('%s', [gateway.parseImages(input)]);
					}
				}
			} else {
				if (gateway.getActive()) {
					gateway.getActive().appendMessage(messagePatterns.notConnected, [gateway.niceTime()]);
				} else {
					gateway.statusWindow.appendMessage(messagePatterns.notConnected, [gateway.niceTime()]);
				}
			}
			$("#input").val("");
		}
    },
	'commandHistory': [],
	'commandHistoryPos': -1,
	'inputFocus': function() {
		if(window.getSelection().toString() == ''){
			$("#input").focus();
		}
	},
    'closeNotify': function() {
        $(".notifywindow").fadeOut(200, function () {
            $(".notify-text").delay(300).text(" ");
			gateway.inputFocus();
        });
    },
    'closeStatus': function() {
        $(".statuswindow").fadeOut(200, function () {
            $(".status-text").delay(300).text(" ");
			gateway.inputFocus();
        });
    },
    'closeError': function() {
        $(".errorwindow").fadeOut(200, function () {
            $(".error-text").delay(300).text(" ");
			gateway.inputFocus();
        });
    },
    'showStatus': function(channel, nick) {
        $(".status-text").text(" ");
        $(".status-text").append("<h3>Daj uprawnienia</h3>");
        $(".status-text").append("<p>Daj u\u017cytkownikowi "+$('<div/>').text(nick).html()+" uprawnienia na kanale "+$('<div/>').text(channel).html()+":</p><p><br /></p>");
        $(".status-text").append("<p class='statusbutton' onClick='gateway.send(\"MODE "+channel+" +q "+gateway.sescape(nick)+"\"); gateway.closeStatus()'>FOUNDER (Właściciel kanału)</p>");
        $(".status-text").append("<p class='statusbutton' onClick='gateway.send(\"MODE "+channel+" +a "+gateway.sescape(nick)+"\"); gateway.closeStatus()'>PROTECT (Ochrona przed kopnięciem)</p>");
        $(".status-text").append("<p class='statusbutton' onClick='gateway.send(\"MODE "+channel+" +o "+gateway.sescape(nick)+"\"); gateway.closeStatus()'>OP (Operator kanału)</p>");
        $(".status-text").append("<p class='statusbutton' onClick='gateway.send(\"MODE "+channel+" +h "+gateway.sescape(nick)+"\"); gateway.closeStatus()'>HALFOP (Pół-operator kanału)</p>");
        $(".status-text").append("<p class='statusbutton' onClick='gateway.send(\"MODE "+channel+" +v "+gateway.sescape(nick)+"\"); gateway.closeStatus()'>VOICE (Uprawnienie do głosu)</p>");
        $(".statuswindow").fadeIn(200);
    },
    'showTopic': function(channel) {
        $(".status-text").text(" ");
        $(".status-text").append("<h3>Zmiana tematu</h3>");
        $(".status-text").append("<p>Zmień temat na kanale"+$('<div/>').text(channel).html()+"</p><p><br /></p>");
        $(".status-text").append("<input type=\"text\" class=\"topicinput\" />");
        $(".status-text").append("<input type=\"submit\" value=\"ustaw\" onClick='gateway.send(\"TOPIC "+channel+" :\"+$(\".topicinput\").val()); gateway.closeStatus()' />");
        $(".statuswindow").fadeIn(200);
    },
    'showStatusAnti': function(channel, nick) {
        $(".status-text").text(" ");
        $(".status-text").append("<h3>Odbierz uprawnienia</h3>");
        $(".status-text").append("<p>Odbierz u\u017cytkownikowi "+$('<div/>').text(nick).html()+" uprawnienia na kanale "+$('<div/>').text(channel).html()+":</p><p><br /></p>");
        $(".status-text").append("<p class='statusbutton' onClick='gateway.send(\"MODE "+channel+" -q "+gateway.sescape(nick)+"\"); gateway.closeStatus()'>FOUNDER (Właściciel kanału)</p>");
        $(".status-text").append("<p class='statusbutton' onClick='gateway.send(\"MODE "+channel+" -a "+gateway.sescape(nick)+"\"); gateway.closeStatus()'>PROTECT (Ochrona przed kopnięciem)</p>");
        $(".status-text").append("<p class='statusbutton' onClick='gateway.send(\"MODE "+channel+" -o "+gateway.sescape(nick)+"\"); gateway.closeStatus()'>OP (Operator kanału)</p>");
        $(".status-text").append("<p class='statusbutton' onClick='gateway.send(\"MODE "+channel+" -h "+gateway.sescape(nick)+"\"); gateway.closeStatus()'>HALFOP (Pół-operator kanału)</p>");
        $(".status-text").append("<p class='statusbutton' onClick='gateway.send(\"MODE "+channel+" -v "+gateway.sescape(nick)+"\"); gateway.closeStatus()'>VOICE (Uprawnienie do głosu)</p>");
        $(".statuswindow").fadeIn(200);
    },
    'showKick' : function(channel, nick) {
        $(".status-text").text(" ");
        $(".status-text").append("<h3>KICK</h3>");
        $(".status-text").append("<p>Wyrzuć użytkownika "+$('<div/>').text(nick).html()+" z kanału "+$('<div/>').text(channel).html()+". Możesz podać powód dla KICKa, który zostanie wyświetlony dla wszystkich użytkowników kanału.</p>");
        $(".status-text").append("<input type='text' class='kickinput' maxlenght='307' />");
        $(".status-text").append("<p class='statusbutton' onClick='if ($(\".kickinput\").val() != \"\") { gateway.send(\"KICK "+channel+" "+nick+" :\" + $(\".kickinput\").val()); } else { gateway.send(\"KICK "+channel+" "+nick+"\"); } gateway.closeStatus()'>Wyrzuć</p>");
        $(".statuswindow").fadeIn(200);
    },
    'getActive': function() {
        if(gateway.active == '--status') {
            return false;
        } else if(gateway.findChannel(gateway.active)) {
            return gateway.findChannel(gateway.active);
        } else if(gateway.findQuery(gateway.active)) {
            return gateway.findQuery(gateway.active);
        } else {
            return false;
        }
    },
    'active': '--status',
    'toggleNickOpt': function(nicklistid) {
        if($('#'+nicklistid+'-opt').is(':visible')) {
    		if($('#'+nicklistid+'-opt-info').is(':visible')){
				 $('#'+nicklistid+'-opt-info').hide('blind', {
			        direction: "vertical"
			    }, 300);
			    $('#'+nicklistid+'-opt').removeClass('activeInfo');
			 }
            $('#'+nicklistid+'-opt').hide('blind', {
                direction: "vertical"
            }, 300);
            $('#'+nicklistid).removeClass('activeNick');
        } else {
            $('#'+nicklistid+'-opt').show('blind', {
                direction: "vertical"
            }, 300);
            $('#'+nicklistid).addClass('activeNick');
        }
    },
	'toggleNickOptInfo': function(nicklistid) {
		if($('#'+nicklistid+'-opt-info').is(':visible')){
		     $('#'+nicklistid+'-opt-info').hide('blind', {
                direction: "vertical"
            }, 300);
            $('#'+nicklistid+'-opt').removeClass('activeInfo');
        } else {
            $('#'+nicklistid+'-opt-info').show('blind', {
                direction: "vertical"
            }, 300);
            $('#'+nicklistid+'-opt').addClass('activeInfo');
        }
	},
	'toggleNickOptAdmin': function(nicklistid) {
		if($('#'+nicklistid+'-opt-admin').is(':visible')){
		     $('#'+nicklistid+'-opt-admin').hide('blind', {
                direction: "vertical"
            }, 300);
            $('#'+nicklistid+'-opt').removeClass('activeAdmin');
        } else {
            $('#'+nicklistid+'-opt-admin').show('blind', {
                direction: "vertical"
            }, 300);
            $('#'+nicklistid+'-opt').addClass('activeAdmin');
        }
	},
    'showPermError': function(text) {
        $(".error-text").text(" ");
        $(".error-text").append("<h3>Brak uprawnień<br /></h3>");
        $(".error-text").append("<p>Nie masz wystarczających uprawnień aby wykonać żądaną akcję.</p><p>"+text+"</p>");
        $(".errorwindow").fadeIn(250);
        $(".errorwindow").css('z-index', 10);
    },
    'showAbout': function() {
		if($("#about_wrapper").is(":visible")) {
			$("#about_wrapper").fadeOut(400);
			$("#input").focus();
		} else {
			$("#about_wrapper").fadeIn(400);
		}
	},
    'showOptions': function() {
		if($("#options_wrapper").is(":visible")) {
			$("#options_wrapper").fadeOut(400);
			$("#input").focus();
		} else {
			$("#options_wrapper").fadeIn(400);
		}
    },
    'clickQuit': function() {
    	$('.notify-text').html('<h3>Wyjście z IRC</h3>'+
    		'<form onsubmit="gateway.quit();" action="javascript:void(0);">'+
			'Wiadomość pożegnalna: <input type="text" id="quit-msg" value="Użytkownik rozłączył się" /><br /><br />'+
    		'<input type="submit" value="Rozłącz" /> '+
			'<input type="button" onclick="$(\'.notifywindow\').fadeOut(400)" value="Anuluj" />'+
			'</form>');
    	$('.notifywindow').fadeIn(400);
    	$('.notifywindow').css('z-index', 10);
    	$('#quit-msg').focus();
    	$('#quit-msg').select();
    },
    'quit': function() {
    	commands.quit.callback(['quit'], '/quit '+$('#quit-msg').val());
		$('.notifywindow').fadeOut(100);
    },
    'completion': {
		'string': '',
		'rawStr': '',
		'repeat': 0,
		'array': [],
		'lastPos': -1,
		'find': function(string, rawStr, comPos) {
			var complarr = [];
			var ccount = 0;
			//komendy
			//complarr[0] = string;
			//ccount++;
			if(string.length > 0 && string.indexOf('/') == 0 && comPos == 0) {
				for (i in commands) {
					if(i.indexOf(string.slice(1).toLowerCase()) == 0) {
						complarr[ccount] = '/'+i;
						ccount++;
					}
				}
			//else, bo jak sa komendy to nic innego nie trzeba uzup
			} else {
				if(string.indexOf('#') == 0) {
					for (var ichannel = 0; ichannel < gateway.channels.length; ichannel++) {
						if(gateway.channels[ichannel].name.toLowerCase().replace(/^[^a-z0-9]/ig).indexOf(string.toLowerCase().replace(/^[^a-z0-9]/ig)) == 0) {
							complarr[ccount] = gateway.channels[ichannel].name;
							ccount++;
						}
					}
				} else {
					if(gateway.findChannel(gateway.active)) {
						for (var inick=0; inick < gateway.findChannel(gateway.active).nicklist.list.length; inick++) {
							if(gateway.findChannel(gateway.active).nicklist.list[inick].nick.toLowerCase().replace(/^[^a-z0-9]/ig).indexOf(string.toLowerCase().replace(/^[^a-z0-9]/ig)) == 0) {
								complarr[ccount] = gateway.findChannel(gateway.active).nicklist.list[inick].nick;
								if(comPos == 0) {
									complarr[ccount] += ':';
								}
								ccount++;
							}
						}
					}
				}
			}
			return complarr;
		}
	},
	'doComplete': function() {
		if(gateway.completion.repeat == 0 || gateway.completion.array.length == 0) {
			var rawstr = $('#input').val().replace(/^\s+/g, '').replace(/\s+$/g, '');
			var str = $('#input').val().replace(/^\s+/g, '').replace(/\s+$/g, '').split(/\s+/);
			if(str && str.length > 0 && str[str.length-1].length > 0) {
				gateway.completion.array = gateway.completion.find(str[str.length-1], rawstr, str.length-1);
				if(gateway.completion.array.length > 0) {
					str[str.length-1] = gateway.completion.array[0] + " ";
					gateway.completion.repeat = 1;
					$('#input').val(str.join(" "));
					gateway.completion.lastPos = 0;
				}
				//gateway.statusWindow.appendMessage('%s - %s<br />', [ gateway.completion.lastPos, gateway.completion.array.toString() ]);
			}
		} else if(gateway.completion.array.length > 0) {
			var str = $('#input').val().replace(/^\s+/g, '').replace(/\s+$/g, '').split(/\s+/);
			if(gateway.completion.lastPos+1 < gateway.completion.array.length) {
				str[str.length-1] = gateway.completion.array[gateway.completion.lastPos+1] + " ";
				gateway.completion.lastPos++;
				$('#input').val(str.join(" "));
			} else {
				gateway.completion.lastPos = 0;
				str[str.length-1] = gateway.completion.array[0] + " ";
				$('#input').val(str.join(" "));
			}
		}
	}
}

var cmdBinds = {
    '001': [	// RPL_WELCOME 
        function(msg) {
            if(msg.args[0] != guser.nick) {
                guser.changeNick(msg.args[0], true);
   	            $(".notify-text").append("<p>Twój bieżący nick to <b>"+guser.nick+"</b>.</p>");
            }
            gateway.statusWindow.appendMessage(messagePatterns.motd, [gateway.niceTime(), $('<div/>').text(msg.text).html()]);
			gateway.pingcnt = 0;
			gateway.connectStatus = status001;
        }
    ],
    'CONNECTED': [
    	function(msg) {
    		gateway.joinChannels();
    	}
    ],
    '411': [ //	ERR_NORECIPIENT - brzydki sposób na uzyskanie bieżącego nicka
    	function(msg) {
    		if(gateway.connectStatus != statusDisconnected){
    			return;
    		}
    		if(msg.args[0] != guser.nick) {
    			var oldNick = guser.nick;
    			setTimeout(function(){
    				gateway.send('NICK '+oldNick);
    			}, 500);
    			guser.changeNick(msg.args[0], true);
    		}
    		gateway.send('WHOIS '+guser.nick);
    		gateway.connectStatus = status001;
    	}
    ],
	'PONG': [
		function(msg) {
			if(msg.text.match(/JavaScript/i)){
				gateway.pingcnt = 0;
			}
		}
	],
    'NICK': [
        function(msg) {
            if(msg.sender.nick == guser.nick) {
                guser.changeNick(msg.text);
                document.title = $('<div/>').text(msg.text).html()+' @ PIRC.pl';
                for(c in gateway.channels) {
                    gateway.channels[c].nicklist.changeNick(msg.sender.nick, msg.text);
                }
            } else {
                for(c in gateway.channels) {
                    if(gateway.channels[c].nicklist.findNick(msg.sender.nick)) {
                        gateway.channels[c].nicklist.changeNick(msg.sender.nick, msg.text);
                        gateway.channels[c].appendMessage(messagePatterns.nickChange, [gateway.niceTime(), $('<div/>').text(msg.sender.nick).html(), $('<div/>').text(msg.text).html()]);
                    }
                }
                if(gateway.findQuery(msg.sender.nick)) {
                    gateway.findQuery(msg.sender.nick).changeNick(msg.text);
                }
            }
        }
    ],
    'QUIT': [
        function(msg) {
            if(msg.sender.nick == guser.nick) {
                for(c in gateway.channels) {
                    gateway.channels[c].part();
                    //gateway.channels[c].appendMessage(messagePatterns.nickChange, [gateway.niceTime(), msg.sender.nick, msg.text]);
                }
            } else {
                for(c in gateway.channels) {
                    if(gateway.channels[c].nicklist.findNick(msg.sender.nick)) {
                        gateway.channels[c].nicklist.removeNick(msg.sender.nick);
                        if (!$('#showPartQuit').is(':checked')) {
							gateway.channels[c].appendMessage(messagePatterns.quit, [gateway.niceTime(), $('<div/>').text(msg.sender.nick).html(), $('<div/>').text(msg.sender.ident).html(), $('<div/>').text(msg.sender.host).html(), gateway.colorize(msg.text)]);
						}
                    }
                }
                if(gateway.findQuery(msg.sender.nick)) {
					if (!$('#showPartQuit').is(':checked')) {
						gateway.findQuery(msg.sender.nick).appendMessage(messagePatterns.quit, [gateway.niceTime(), $('<div/>').text(msg.sender.nick).html(), $('<div/>').text(msg.sender.ident).html(), $('<div/>').text(msg.sender.host).html(), gateway.colorize(msg.text)]);
					}
                }
            }
        }
    ],
    'PRIVMSG': [
        function(msg) {
            if (msg.text == false) {
                msg.text = " ";
            }
            
			var html = gateway.parseImages(msg.text);
			
            if(msg.args[0].indexOf('#') == 0) { // wiadomość kanałowa
            	var channel = gateway.findChannel(msg.args[0]);
            	if(!channel) {
            		channel = new Channel(msg.args[0]);
            		gateway.channels.push(channel);
            		gateway.switchTab(msg.args[0]);
            	}
                if(channel) {
                    if(msg.text.match(/^\001.*\001$/i)) {
                        if(msg.text.match(/^\001ACTION.*\001$/i)) {
                            var acttext = msg.text.replace(/^\001ACTION(.*)\001$/i, '$1');
                            if(msg.text.indexOf(guser.nick) != -1) {
                                channel.appendMessage(messagePatterns.channelActionHilight, [gateway.niceTime(), msg.sender.nick, gateway.colorize(acttext)]);
                                if(gateway.active.toLowerCase() != msg.args[0].toLowerCase()) {
                                    channel.markNew();
                                }
                            } else {
                                channel.appendMessage(messagePatterns.channelAction, [gateway.niceTime(), msg.sender.nick, gateway.colorize(acttext)]);
                                if(gateway.active.toLowerCase() != msg.args[0].toLowerCase()) {
                                    channel.markBold();
                                }
                            }
                        }
                    } else {
                        if(msg.text.indexOf(guser.nick) != -1) {
                            channel.appendMessage(messagePatterns.channelMsgHilight, [gateway.niceTime(), msg.sender.nick, gateway.colorize(msg.text)]);
                            if(gateway.active != msg.args[0].toLowerCase()) {
                                channel.markNew();
                            }
                        } else {
                            channel.appendMessage(messagePatterns.channelMsg, [gateway.niceTime(), msg.sender.nick, gateway.colorize(msg.text)]);
                            if(gateway.active.toLowerCase() != msg.args[0].toLowerCase()) {
                                channel.markBold();
                            }
                        }
                    }
                    channel.appendMessage('%s', [html]);
                }
            } else if(!msg.sender.server/* && msg.sender.nick != guser.nick*/){ // wiadomość prywatna
            	if(msg.sender.nick == guser.nick){
					var qnick = msg.args[0];
				} else {
					var qnick = msg.sender.nick;
				}
	            query = gateway.findQuery(qnick);
                if(msg.text.match(/^\001.*\001$/i)) {	// ctcp
                    if(msg.text.match(/^\001ACTION.*\001$/i)) { //akcja
						if(!query) {
							query = new Query(msg.sender.nick);
							gateway.queries.push(query);
						}
                        var acttext = msg.text.replace(/^\001ACTION(.*)\001$/i, '$1');
                        query.appendMessage(messagePatterns.channelAction, [gateway.niceTime(), msg.sender.nick, gateway.colorize(acttext)]);
                        if(gateway.active.toLowerCase() != msg.sender.nick.toLowerCase()) {
                            gateway.findQuery(msg.sender.nick).markNew();
                        }
                        query.appendMessage('%s', [html]);
                    } else if(msg.text.match(/^\001(VERSION|USERINFO).*\001$/i)) {
                    	version_string = 'Bramka WWW PIRC.PL, wersja '+gatewayVersion+' na '+navigator.userAgent;
                    	gateway.sendDelayed('NOTICE '+msg.sender.nick+ ' \001VERSION '+version_string+'\x01');
                    } else if(msg.text.match(/^\001REFERER\001$/i)) {
                    	referer_string = document.referrer;
                    	if(referer_string == ''){
                    		referer_string = 'Nieznany';
                    	}
                    	gateway.sendDelayed('NOTICE '+msg.sender.nick+ ' \001REFERER '+referer_string+'\x01');
                    } else {	// inny ctcp
                        var acttext = msg.text.replace(/^\001(.*)\001$/i, '$1');
                        if(query) {
                            query.appendMessage(messagePatterns.ctcpRequest, [gateway.niceTime(), msg.sender.nick, gateway.colorize(acttext)]);
                        } else {
                            gateway.statusWindow.appendMessage(messagePatterns.ctcpRequest, [gateway.niceTime(), msg.sender.nick, gateway.colorize(acttext)]);
                            gateway.statusWindow.markBold();
                        }
                    }
                } else { // normalna wiadomość
					if(!query) {
						query = new Query(msg.sender.nick);
						gateway.queries.push(query);
					}
                    query.appendMessage(messagePatterns.channelMsg, [gateway.niceTime(), msg.sender.nick, gateway.colorize(msg.text)]);
                    if(gateway.active.toLowerCase() != msg.sender.nick.toLowerCase()) {
                        gateway.findQuery(msg.sender.nick).markNew();
                    }
                    query.appendMessage('%s', [html]);
                }
            }
        }
    ],
    'NOTICE': [
        function(msg) {
            if (msg.text == false) {
                msg.text = " ";
            }
            if(msg.text.match(/^\001.*\001$/i)) { // ctcp
                var ctcpreg = msg.text.match(/^\001(([^ ]+)( (.*))?)\001$/i);
                var acttext = ctcpreg[1];
                var ctcp = ctcpreg[2];
                var text = ctcpreg[4];
                if(gateway.findQuery(msg.sender.nick)) {
                    gateway.findQuery(msg.sender.nick).appendMessage(messagePatterns.ctcpReply, [gateway.niceTime(), $('<div/>').text(msg.sender.nick).html(), gateway.colorize(acttext)]);
                } else {
                    gateway.statusWindow.appendMessage(messagePatterns.ctcpReply, [gateway.niceTime(), $('<div/>').text(msg.sender.nick).html(), gateway.colorize(acttext)]);
                }
                if(ctcp.toLowerCase() == 'version'){
				    $(".notify-text").html('<h3>Oprogramowanie użytkownika '+msg.sender.nick+'</h3><p>'+$('<div/>').text(text).html() +'</p>');
				    $(".notifywindow").fadeIn(250);
					$(".notifywindow").css('z-index', 10);
                }
            } else { // nie-ctcp
                if(msg.args[0].indexOf('#') == 0) { //kanał
                    if(gateway.findChannel(msg.args[0])) {
                        if(msg.text.indexOf(guser.nick) != -1) {
                            gateway.findChannel(msg.args[0]).appendMessage(messagePatterns.notice, [gateway.niceTime(), $('<div/>').text(msg.sender.nick).html(), $('<div/>').text(msg.sender.ident).html(), $('<div/>').text(msg.sender.host).html(), gateway.colorize(msg.text)]);
                            if(gateway.active != msg.args[0]) {
                                gateway.findChannel(msg.args[0]).markBold();
                            }
                        } else {
                            gateway.findChannel(msg.args[0]).appendMessage(messagePatterns.notice, [gateway.niceTime(), $('<div/>').text(msg.sender.nick).html(), $('<div/>').text(msg.sender.ident).html(), $('<div/>').text(msg.sender.host).html(), gateway.colorize(msg.text)]);
                        }
                    }
                } else if(!msg.sender.server && msg.sender.nick != guser.nick) { // użytkownik
				/*	if (msg.sender.nick.toUpperCase() === 'nickserv'.toUpperCase()) {
						if (msg.text.match(/^Nieprawid.owe has.o\.$/i)) { // złe hasło nickserv
							$(".error-text").text(" ");
							$(".error-text").append("<h3>Nieprawidłowe hasło</h3><p>Podane hasło do nicka jest błędne. Wpisz <b>/msg NickServ identify poprawne_hasło</b> aby ponowić próbę.");
							$(".errorwindow").fadeIn(250);
							$(".errorwindow").css('z-index', 10);
						}
					}*/
/*					if (msg.sender.nick.match(/((nick|chan|oper|bot|memo)serv)|global/i)) { //wiadomość od serwisów
						gateway.getActive().appendMessage(messagePatterns.notice, [gateway.niceTime(), $('<div/>').text(msg.sender.nick).html(), $('<div/>').text(msg.sender.ident).html(), $('<div/>').text(msg.sender.host).html(), gateway.colorize($('<div/>').text(msg.text).html())]);
					} else {*/
					if(msg.sender.nick.toLowerCase() == 'nickserv'){
						services.nickservMessage(msg);
					}
						if ($('#showNoticeInStatus').is(':checked')) { // notice jako query
							gateway.statusWindow.appendMessage(messagePatterns.notice, [gateway.niceTime(), $('<div/>').text(msg.sender.nick).html(), $('<div/>').text(msg.sender.ident).html(), $('<div/>').text(msg.sender.host).html(), gateway.colorize(msg.text)]);
							gateway.statusWindow.markBold();
						} else { // notice w statusie
							if(!gateway.findQuery(msg.sender.nick)) {
								var query = new Query(msg.sender.nick);
								gateway.queries.push(query);
							}
							gateway.findQuery(msg.sender.nick).appendMessage(messagePatterns.notice, [gateway.niceTime(), $('<div/>').text(msg.sender.nick).html(), $('<div/>').text(msg.sender.ident).html(), $('<div/>').text(msg.sender.host).html(), gateway.colorize(msg.text)]);
							if(gateway.active.toLowerCase() != msg.sender.nick.toLowerCase()) {
								gateway.findQuery(msg.sender.nick).markNew();
							}
						}
					//}
                }
            }
        }
    ],
    'JOIN': [
        function(msg) {
            if(msg.sender.nick == guser.nick) {
		//		gateway.isconnected = 1;
                if(gateway.findChannel(msg.text)) {
                    gateway.findChannel(msg.text).rejoin();
                } else {
                    var chan = new Channel(msg.text);
                    gateway.channels.push(chan);
                    gateway.switchTab(msg.text);
                    chan.appendMessage(messagePatterns.joinOwn, [gateway.niceTime(), msg.text]);
                }
                gateway.send("MODE "+msg.text);
            }
        },
        function(msg) {
            if(gateway.findChannel(msg.text)) {
                if(msg.sender.nick != guser.nick) {
					if (!$('#showPartQuit').is(':checked')) {
						gateway.findChannel(msg.text).appendMessage(messagePatterns.join, [gateway.niceTime(), $('<div/>').text(msg.sender.nick).html(), $('<div/>').text(msg.sender.ident).html(), $('<div/>').text(msg.sender.host).html(), msg.text]);
					}
                }
                if(!gateway.findChannel(msg.text).nicklist.findNick(msg.sender.nick)) {
                    gateway.findChannel(msg.text).nicklist.addNick(msg.sender.nick);
                } else {
                    gateway.findChannel(msg.text).nicklist.findNick(msg.sender.nick).setMode('owner', false);
                    gateway.findChannel(msg.text).nicklist.findNick(msg.sender.nick).setMode('admin', false);
                    gateway.findChannel(msg.text).nicklist.findNick(msg.sender.nick).setMode('op', false);
                    gateway.findChannel(msg.text).nicklist.findNick(msg.sender.nick).setMode('halfop', false);
                    gateway.findChannel(msg.text).nicklist.findNick(msg.sender.nick).setMode('voice', false);
                }
            }
        }
    ],
    'PART': [
        function(msg) {
            if(gateway.findChannel(msg.args[0])) {
                if(msg.sender.nick != guser.nick) {
					if (!$('#showPartQuit').is(':checked')) {
						gateway.findChannel(msg.args[0]).appendMessage(messagePatterns.part, [gateway.niceTime(), $('<div/>').text(msg.sender.nick).html(), $('<div/>').text(msg.sender.ident).html(), $('<div/>').text(msg.sender.host).html(), msg.args[0], gateway.colorize(msg.text)]);
					}
                    gateway.findChannel(msg.args[0]).nicklist.removeNick(msg.sender.nick);
                } else {
                    gateway.findChannel(msg.args[0]).appendMessage(messagePatterns.partOwn, [gateway.niceTime(), msg.args[0], msg.args[0]]);
                    gateway.findChannel(msg.args[0]).part();
                }
            }
        }
    ],
    'KICK': [
        function(msg) {
            if(gateway.findChannel(msg.args[0])) {
                if(msg.args[1] != guser.nick) {
                    gateway.findChannel(msg.args[0]).appendMessage(messagePatterns.kick, [gateway.niceTime(), $('<div/>').text(msg.sender.nick).html(), msg.args[1], msg.args[0], gateway.colorize(msg.text)]);
                    gateway.findChannel(msg.args[0]).nicklist.removeNick(msg.args[1]);
                } else {
                    gateway.findChannel(msg.args[0]).appendMessage(messagePatterns.kickOwn, [gateway.niceTime(), $('<div/>').text(msg.sender.nick).html(), msg.args[0], gateway.colorize(msg.text)]);
                    gateway.findChannel(msg.args[0]).part();
                }
            }
        }
    ],
    '307': [	// RPL_USERIP
        function(msg) {
            $(".notify-text").append("<p class='whois'><span class='info'><br /></span><span class='data'>Ten nick jest zarejestrowany</span></p>");
        }
    ],
    '311': [	// RPL_WHOISUSER 
        function(msg) {
            $(".notify-text").text(" ");
            $(".notify-text").append("<h3>Informacje o użytkowniku " +$('<div/>').text(msg.args[1]).html()+ "</h3>");
            $(".notify-text").append("<p class='whois'><span class='info'>Pełna maska:</span><span class='data'> " + $('<div/>').text(msg.args[1]).html() + "!" + msg.args[2] + "@" + msg.args[3] + "</span></p>");
            $(".notify-text").append("<p class='whois'><span class='info'>Realname:</span><span class='data'> " + $('<div/>').text(msg.text).html() + "</span></p>");
        }
    ],
    '301': [	// RPL_AWAY
        function(msg) {
            $(".notify-text").append("<p class='whois'><span class='info'><br /></span><span class='data'>Ten użytkownik ma status away: " + $('<div/>').text(msg.text).html() + "</span></p>");
            var query = gateway.findQuery(msg.args[1]);
            if(query){
            	query.appendMessage(messagePatterns.away, [gateway.niceTime(), $('<div/>').text(msg.args[1]).html(), $('<div/>').text(msg.text).html()]);
            }
        }
    ],
    '312': [	// RPL_WHOISSERVER 
        function(msg) {
            $(".notify-text").append("<p class='whois'><span class='info'>serwer:</span><span class='data'>" + msg.args[2] + " "+ $('<div/>').text(msg.text).html() + "</span></p>");
        }
    ],
    '313': [	// RPL_WHOISOPERATOR
        function(msg) {
            $(".notify-text").append("<p class='whois'><span class='info'><br /></span><span class='data'><b class=admin>ADMINISTRATOR SIECI</b> (" + $('<div/>').text(msg.text.substr(5)).html() +")</span></p>");
        }
    ],
    '318': [	// RPL_ENDOFWHOIS
        function(msg) {
		    if(gateway.connectStatus != statusConnected){
			    return;
			}
			if(msg.args[1].toLowerCase() == guser.nick.toLowerCase() && !gateway.displayOwnWhois){
				return;
			}
			gateway.displayOwnWhois = false;
            //                        if ($("#optionGraphicalPopups:checked").val() != null) {
            $(".notifywindow").fadeIn(250);
			$(".notifywindow").css('z-index', 10);
            //                        }
        }
    ],
    '319': [	// RPL_WHOISCHANNELS
        function(msg) {
            if(gateway.connectStatus == statusConnected){ // normalny whois
            	$(".notify-text").append("<p class='whois'><span class='info'>Kanały:</span><span class='data'> "+ $('<div/>').text(msg.text).html() + "</span></p>");
            } else {	// sprawdzam, na jakich kanałach sam jestem
            	gateway.connectStatus = status001;
		    	if(msg.args[1] == guser.nick){
					var chans = msg.text.split(' ');
					chans.forEach( function(channame){
						var channel = channame.match(/#[^ ]+/);
						if(channel){
						    if(gateway.findChannel(channel[0])) {
						        gateway.findChannel(channel[0]).rejoin();
						    } else {
						        var chan = new Channel(channel[0]);
						        gateway.channels.push(chan);
						        gateway.switchTab(channel[0]);
						    }
						    gateway.send('NAMES '+channel[0]+'\r\nTOPIC '+channel[0]+'\r\nMODE '+channel[0]);
				        }
					});
				}
		    }
        }
    ],
    '322': [	// RPL_LIST
		function(msg) {
			if (!msg.text) {
				var outtext = "<i>(brak tematu)</i>"; // Na wypadek jakby topic nie był ustawiony.
			} else {
				var outtext = gateway.colorize(msg.text);
			}
			gateway.statusWindow.appendMessage(messagePatterns.chanListElement, [gateway.niceTime(), msg.args[1], msg.args[1], msg.args[2], outtext]);
			gateway.statusWindow.markBold();
		}
    ],
    '324': [	// RPL_CHANNELMODEIS
		function(msg) {
			if(gateway.findChannel(msg.args[1])) {
				var chan = msg.args[1];
				var mody = msg.args;
				mody.splice(0,2);
				gateway.findChannel(chan).appendMessage(messagePatterns.mode, [gateway.niceTime(), chan, mody.join(" ")]);
			}
		}
    ],
    '353': [	// RPL_NAMREPLY 
        function(msg) {
	        gateway.iKnowIAmConnected();
	        if(gateway.findChannel(msg.args[2])) {
	            var names = msg.text.split(' ');
	            for ( name in names ) {
	                if (names[name].indexOf("+") == 0) {
	                    gateway.findChannel(msg.args[2]).nicklist.addNick(names[name].slice(1), 'voice', true);
	                } else if (names[name].indexOf("%") == 0) {
	                    gateway.findChannel(msg.args[2]).nicklist.addNick(names[name].slice(1), 'halfop', true);
	                } else if (names[name].indexOf("@") == 0) {
	                    gateway.findChannel(msg.args[2]).nicklist.addNick(names[name].slice(1), 'op', true);
	                } else if (names[name].indexOf("&") == 0) {
	                    gateway.findChannel(msg.args[2]).nicklist.addNick(names[name].slice(1), 'admin', true);
	                } else if (names[name].indexOf("~") == 0) {
	                    gateway.findChannel(msg.args[2]).nicklist.addNick(names[name].slice(1), 'owner', true);
	                } else {
	                    gateway.findChannel(msg.args[2]).nicklist.addNick(names[name], false, true);
	                }
	            }
	            gateway.findChannel(msg.args[2]).nicklist.redraw();
	        }

        }
    ],
    '332': [	// RPL_TOPIC 
        function(msg) {
            if(gateway.findChannel(msg.args[1])) {
                if(msg.text) {
                    gateway.findChannel(msg.args[1]).setTopic(gateway.colorize(msg.text));
                    gateway.findChannel(msg.args[1]).appendMessage(messagePatterns.topic, [gateway.niceTime(), msg.args[1], gateway.colorize(msg.text)]);
                } else {
                    gateway.findChannel(msg.args[1]).setTopic('');
                    gateway.findChannel(msg.args[1]).appendMessage(messagePatterns.topicNotSet, [gateway.niceTime(), msg.args[1]]);
                }
            }
        }
    ],
    '333': [	// RPL_TOPICWHOTIME 
        function(msg) {
            if(gateway.findChannel(msg.args[1])) {
                gateway.findChannel(msg.args[1]).appendMessage(messagePatterns.topicTime, [gateway.niceTime(), msg.args[2], gateway.parseTime(msg.args[3])]);
            }
        }
    ],
    '346': [	// RPL_INVITELIST
		function(msg) {
			if(gateway.findChannel(msg.args[1])) {
				gateway.findChannel(msg.args[1]).appendMessage(messagePatterns.invexListElement, [gateway.niceTime(), msg.args[2], msg.args[3], gateway.parseTime(msg.args[4])]);
			}
		}
    ],
    '347': [	// RPL_INVITELIST
		function(msg) {
			if(gateway.findChannel(msg.args[1])) {
				gateway.findChannel(msg.args[1]).appendMessage(messagePatterns.invexListEnd, [gateway.niceTime()]);
			}
		}			
    ],
    '348': [	// RPL_EXCEPTLIST
		function(msg) {
			if(gateway.findChannel(msg.args[1])) {
				gateway.findChannel(msg.args[1]).appendMessage(messagePatterns.exceptListElement, [gateway.niceTime(), msg.args[2], msg.args[3], gateway.parseTime(msg.args[4])]);
			}
		}
    ],
    '349': [	// RPL_ENDOFEXCEPTLIST 
		function(msg) {
			if(gateway.findChannel(msg.args[1])) {
				gateway.findChannel(msg.args[1]).appendMessage(messagePatterns.exceptListEnd, [gateway.niceTime()]);
			}
		}			
    ],
    '367': [	// RPL_BANLIST 
		function(msg) {
			if(gateway.findChannel(msg.args[1])) {
				gateway.findChannel(msg.args[1]).appendMessage(messagePatterns.banListElement, [gateway.niceTime(), msg.args[2], msg.args[3], gateway.parseTime(msg.args[4])]);
			}
		}
    ],
    '368': [	// RPL_ENDOFBANLIST
		function(msg) {
			if(gateway.findChannel(msg.args[1])) {
				gateway.findChannel(msg.args[1]).appendMessage(messagePatterns.banListEnd, [gateway.niceTime()]);
			}
		}			
    ],
    '372': [	// RPL_MOTD
        function(msg) {
            gateway.statusWindow.appendMessage(messagePatterns.motd, [gateway.niceTime(), msg.text]);
        }
    ],
    '401': [	// ERR_NOSUCHNICK
        function(msg) {
            $(".notify-text").text(" ");
            $(".notify-text").append("<h3>Nie można wykonać żądanej akcji</h3>");
            $(".notify-text").append("<p>"+$('<div/>').text(msg.args[1]).html()+": nie ma takiego nicku ani kanału.");
            gateway.statusWindow.appendMessage(messagePatterns.noSuchNick, [gateway.niceTime(), $('<div/>').text(msg.args[1]).html()]);
            $(".notifywindow").fadeIn(250);
			$(".notifywindow").css('z-index', 10);
        }
    ],
    '404': [	// ERR_CANNOTSENDTOCHAN
        function(msg) {
            if(gateway.findChannel(msg.args[1])) {
                gateway.findChannel(msg.args[1]).appendMessage(messagePatterns.cannotSendToChan, [gateway.niceTime(), msg.args[1], msg.text])
            }
        }
    ],
    '432' : [	// ERR_ERRONEUSNICKNAME 
        function(msg) {
            $(".notify-text").text(" ");
            $(".notify-text").append("<h3>Nie można zmienić nicka </h3>");
            $(".notify-text").append("<p>Nie można użyć nicka <b>"+ msg.args[1] +"</b>. Spróbuj poczekać kilka minut.</p>");
            //                        if ($("#optionGraphicalPopups:checked").val() != null) {
            if(gateway.connectStatus != statusDisconnected){
            	$(".notify-text").append("<p>Twój bieżący nick to <b>"+guser.nick+"</b>.</p>");
            }
            $(".notifywindow").fadeIn(250);
			$(".notifywindow").css('z-index', 10);
            //                        }
            gateway.statusWindow.appendMessage(messagePatterns.badNick, [gateway.niceTime(), msg.args[1]]);
        }
    ],
    '433' : [	// ERR_NICKNAMEINUSE 
        function(msg) {
            $(".notify-text").text(" ");
            $(".notify-text").append("<h3>Nie można zmienić nicka </h3>");
            $(".notify-text").append("<p>Nick <b>"+ msg.args[1] +"</b> jest już używany przez kogoś innego.</p>");
            //                        if ($("#optionGraphicalPopups:checked").val() != null) {
            if(gateway.connectStatus != statusDisconnected){
            	$(".notify-text").append("<p>Twój bieżący nick to <b>"+guser.nick+"</b>.</p>");
            }
            $(".notifywindow").fadeIn(250);
			$(".notifywindow").css('z-index', 10);
            //                        }
            gateway.statusWindow.appendMessage(messagePatterns.nickInUse, [gateway.niceTime(), msg.args[1]]);
        }
    ],
    '474' : [	// ERR_BANNEDFROMCHAN
        function(msg) {
			gateway.iKnowIAmConnected(); // TODO inne powody, przez które nie można wejść
            $(".error-text").text(" ");
            $(".error-text").append("<h3>Nie można dołączyć do kanału<br />" + msg.args[1] + "<br /><br /></h3>");
            if (msg.text == "Cannot join channel (+b)") {
                $(".error-text").append("<p>Jesteś zbanowany.</p>");
                gateway.statusWindow.appendMessage(messagePatterns.cannotJoin, [gateway.niceTime(), msg.args[1], "Jesteś zbanowany"]);
            }
            $(".errorwindow").fadeIn(250);
			$(".errorwindow").css('z-index', 10);
        }
    ],
    '473' : [	// ERR_INVITEONLYCHAN
        function(msg) {
			gateway.iKnowIAmConnected();
            $(".error-text").text(" ");
            $(".error-text").append("<h3>Nie można dołączyć do kanału<br />" + $('<div/>').text(msg.args[1]).html() + "<br /><br /></h3>");
            $(".error-text").append('<p>Musisz dostać zaproszenie aby wejść na ten kanał. Wpisz <b>/knock '+$('<div/>').text(msg.args[1]).html()+'</b> aby poprosić operatorów o możliwość wejścia.</p>');
            gateway.statusWindow.appendMessage(messagePatterns.cannotJoin, [gateway.niceTime(), msg.args[1], "Kanał wymaga zaproszenia"]);
            $(".errorwindow").fadeIn(250);
			$(".errorwindow").css('z-index', 10);
        }
    ],
    '475' : [	// ERR_BADCHANNELKEY
        function(msg) {
			gateway.iKnowIAmConnected();
            $(".error-text").text(" ");
            $(".error-text").append("<h3>Nie można dołączyć do kanału<br />" + msg.args[1] + "<br /><br /></h3>");
            $(".error-text").append('<p>Musisz podać poprawne hasło.</p>');
            $(".error-text").append('<form onsubmit="gateway.chanPassword(\''+$('<div/>').text(msg.args[1]).html()+'\');" action="javascript:void(0);">Hasło do '+$('<div/>').text(msg.args[1]).html()+': <input type="password" id="chpass" /> <input type="submit" value="Wejdź" /></form>');
/*	'badNickString': '<div class="table">'+
		'<form class="tr" onsubmit="services.logIn();" action="javascript:void(0);">'+
			'<span class="td_right">Twoje hasło:</span>'+
			'<span class="td"><input type="password" id="nspass" /></span>'+
			'<span class="td"><input type="submit" value="Zaloguj" /></span>'+
		'</form>'+
		'<form class="tr" onsubmit="services.changeNick();" action="javascript:void(0);">'+
			'<span class="td_right">Nowy nick:</span>'+
			'<span class="td"><input type="text" id="nnick" /></span>'+
			'<span class="td"><input type="submit" value="Zmień nick" /></span>'+
		'</form>'+
	'</div>',
	'nickservMessage': function(msg){
		if (msg.text.match(/^Nieprawid.owe has.o\.$/i)) { // złe hasło nickserv
			services.nickStore = guser.nickservnick;
			$(".error-text").text(" ");
			$(".error-text").append('<h3>Nieprawidłowe hasło</h3><p>Podane hasło do nicka <b>'+guser.nickservnick+'</b> jest błędne. Możesz spróbować ponownie lub zmienić nicka.</p>'+services.badNickString);
			$(".errorwindow").fadeIn(250);
			$(".errorwindow").css('z-index', 10);
		}
		if(guser.nickservpass == '' && msg.text.match(/^Ten nick jest zarejestrowany i chroniony\.$/i)){
			services.nickStore = guser.nick;
			$(".error-text").text(" ");
			$(".error-text").append('<h3>Nick jest zarejestrowany</h3><p>Wybrany nick <b>'+guser.nick+'</b> jest zarejestrowany. Musisz go zmienić lub podać hasło.</p>'+services.badNickString);
			$(".errorwindow").fadeIn(250);
			$(".errorwindow").css('z-index', 10);
		}
	},*/
            gateway.statusWindow.appendMessage(messagePatterns.cannotJoin, [gateway.niceTime(), msg.args[1], "Wymagane hasło"]);
            $(".errorwindow").fadeIn(250);
			$(".errorwindow").css('z-index', 10);
        }
    ],
    '482' : [	// ERR_CHANOPRIVSNEEDED 
        function(msg) {
            $(".error-text").text(" ");
            $(".error-text").append("<h3>"+ msg.args[1] + ": brak uprawnień<br /></h3>");
            $(".error-text").append("<p>Nie masz wystarczających uprawnień aby wykonać żądaną akcję.</p>");
            if(gateway.findChannel(msg.args[1])) {
                gateway.findChannel(msg.args[1]).appendMessage(messagePatterns.noPerms, [gateway.niceTime(), msg.args[1]]);
            }
            $(".errorwindow").fadeIn(250);
			$(".errorwindow").css('z-index', 10);
        }
    ],
    '974' : [	// ERR_CHANOPRIVSNEEDED 
        function(msg) {
            gateway.showPermError(msg.text);
            if(gateway.getActive()) {
                gateway.getActive().appendMessage(messagePatterns.noPerms, [gateway.niceTime(), msg.args[1]]);
            }
        }
    ],
    'PING' : [
    	function(msg) {
    		gateway.forceSend('PONG :'+msg.text);
    	}
    ],
	'ERROR' : [
		function(msg) {
			gateway.lasterror = msg.text;

			gateway.disconnected(msg.text);

			if(gateway.connectStatus == statusDisconnected) {
				if(gateway.firstConnect){
					gateway.reconnect();
				}
				return;
			}
			
			gateway.connectStatus = statusDisconnected;
			
			$(".error-text").text(" ");
	        $(".error-text").append("<h3>Serwer przerwał połączenie<br /></h3>");
	        $(".error-text").append("<p>Informacje: "+msg.text+"</p>");
			$(".errorwindow").fadeIn(400);
			
			if($('#autoReconnect').is(':checked')){
				gateway.reconnect();
			} else {
				$('#reconnect_wrapper').fadeIn(50);
			}
		}
	],
    '972' : [
        function(msg) {
            gateway.showPermError(msg.text);
            if(gateway.getActive()) {
                gateway.getActive().appendMessage(messagePatterns.noPerms, [gateway.niceTime(), msg.args[1]]);
            }
        }
    ],
    'TOPIC':  [
        function(msg) {
            if(gateway.findChannel(msg.args[0])) {
                if(msg.text) {
                    gateway.findChannel(msg.args[0]).setTopic(gateway.colorize(msg.text));
                    gateway.findChannel(msg.args[0]).appendMessage(messagePatterns.changeTopic, [gateway.niceTime(), $('<div/>').text(msg.sender.nick).html(), gateway.colorize(msg.text)]);
                } else {
                    gateway.findChannel(msg.args[0]).setTopic('');
                    gateway.findChannel(msg.args[0]).appendMessage(messagePatterns.deleteTopic, [gateway.niceTime(), $('<div/>').text(msg.sender.nick).html(), msg.args[0]]);
                }

            }
        }
    ],
    'MODE': [
        function(msg) {
            if(gateway.findChannel(msg.args[0])) {
                var modestr = '';
                for (i in msg.args) {
                    if(i != 0) {
                        modestr += msg.args[i]+' ';
                    }
                }
                modestr = modestr.slice(0,-1);
                gateway.findChannel(msg.args[0]).appendMessage(messagePatterns.modeChange, [gateway.niceTime(), $('<div/>').text(msg.sender.nick).html(), $('<div/>').text(modestr).html(), $('<div/>').text(msg.args[0]).html()]);
                var plus = true;
                var nextarg = 2;
                var modearr = msg.args[1].split('');
                var log = '';
                var mode = '';
                var modechar = '';
                for (i in modearr) {
                    if(modearr[i] == '+') {
                        log += "Change +\n";
                        plus = true;
                    } else if(modearr[i] == '-') {
                        log += "Change -\n";
                        plus = false;
                    } else if($.inArray(modearr[i], modes.argBoth) > -1) {
                        log += "Mode 'both' "+plus+modearr[i]+msg.args[nextarg]+"\n";
                        nextarg++;
                    } else if($.inArray(modearr[i], modes.argAdd) > -1 && plus == true) {
                        log += "Mode 'add' "+plus+modearr[i]+msg.args[nextarg]+"\n";
                        nextarg++;
                    } else if($.inArray(modearr[i], modes.user) > -1) {
                        modechar = modearr[i];
                        log += "Mode 'user' "+plus+modearr[i]+msg.args[nextarg]+"\n";
                        if(plus) {
                            if(gateway.findChannel(msg.args[0]).nicklist.findNick(msg.args[nextarg])) {
                                mode = '';
                                switch (modechar) {
                                    case 'q':
                                        mode = 'owner'
                                        break;
                                    case 'a':
                                        mode = 'admin'
                                        break;
                                    case 'o':
                                        mode = 'op'
                                        break;
                                    case 'h':
                                        mode = 'halfop'
                                        break;
                                    case 'v':
                                        mode = 'voice'
                                        break;
                                    default:
                                        //i tak nie nastapi
                                        break;
                                }
                                gateway.findChannel(msg.args[0]).nicklist.findNick(msg.args[nextarg]).setMode(mode, true);
                            }
                        } else {
                            if(gateway.findChannel(msg.args[0]).nicklist.findNick(msg.args[nextarg])) {
                                mode = '';
                                switch (modechar) {
                                    case 'q':
                                        mode = 'owner'
                                        break;
                                    case 'a':
                                        mode = 'admin'
                                        break;
                                    case 'o':
                                        mode = 'op'
                                        break;
                                    case 'h':
                                        mode = 'halfop'
                                        break;
                                    case 'v':
                                        mode = 'voice'
                                        break;
                                    default:
                                        //i tak nie nastapi
                                        break;
                                }
                                gateway.findChannel(msg.args[0]).nicklist.findNick(msg.args[nextarg]).setMode(mode, false);
                            }
                        }
                        gateway.findChannel(msg.args[0]).nicklist.redraw();
                        nextarg++;
                    } else {
                        log += "Mode 'normal' "+plus+modearr[i]+"\n";
                    }
                }
            }
        }
    ]
};
	
var commands = {
	'quit': {
		'channels': false,
        'nicks': true,
		'custom': [],
		'callback': function(command, input) {
			gateway.connectStatus = statusDisconnected;
			$('#not_connected_wrapper').fadeIn(200);
			$('.not-connected-text > h3').html('Rozłączono');
			$('.not-connected-text > p').html('Rozłączono z IRC na życzenie. <input type="button" onclick="gateway.reconnect();" value="Połącz ponownie" />');
			if (input.slice(1).substr(command[0].length+1) != "") {
				gateway.send("QUIT :" + input.slice(1).substr(command[0].length+1));
			} else {
				gateway.send("\r\nQUIT");
			}
		//	gateway.send();
		}
	},
	'exit': {
		'callback': 'quit'
	},
	'quote': {
		'channels': true,
		'nicks': true,
		'custom': [],
		'callback': function(command, input) {
            gateway.send(input.slice(1).substr(command[0].length+1));
		}
	},
	'raw': {
		'callback': 'quote'
	},
	'nick': {
		'channels': false,
		'nicks': false,
		'custom': [],
		'callback': function(command, input) {
			if(command[1]) {
				gateway.send("NICK "+command[1]);
			} else {
				gateway.notEnoughParams("nick", "musisz podać na co chcesz zmienić swój obecny nick.");
			}
		}
	},
	'whois': {
		'channels': false,
		'nicks': true,
		'custom': [],
		'callback': function(command, input) {
			if(command[1]) {
				gateway.send("WHOIS "+command[1]);
				if(command[1].toLowerCase() == guser.nick.toLowerCase()){
					gateway.displayOwnWhois = true;
				}
			} else {
				gateway.notEnoughParams("whois", "musisz podać nick osoby o której chcesz zdobyć informację.");
			}
		}
	},
	'wii': {
		'callback': 'whois'
	},
	'query': {
		'channels': false,
		'nicks': false,
		'custom': [],
		'callback': function(command, input) {
			if (command[1] != "") {
				if(!gateway.findQuery(command[1])) {
					var query = new Query(command[1]);
					gateway.queries.push(query);
				}
				gateway.switchTab(command[1]);
			} else {
				gateway.notEnoughParams("query", "musisz podać nick osoby z którą chcesz rozpocząć prywatną rozmowę");
			}
		}
	},
	'list': {
		'channels': true,
		'nicks': false,
		'custom': [],
		'callback': function(command, input) {
			if (command[1]) {
				if (command[1] != "-YES") {
					gateway.notEnoughParams("list", "wpisywanie /list nie jest dobrym pomysłem, jako że możesz pobrać bardzo dużą ilość danych. Jeśli chcesz jednak to zrobić, dopisz -YES do polecenia.");
				} else {
					gateway.send("LIST"+input.substr(10));
				}
			} else {
				gateway.notEnoughParams("list", "wpisywanie /list nie jest dobrym pomysłem, jako że możesz pobrać bardzo dużą ilość danych. Jeśli chcesz jednak to zrobić, dopisz -YES do polecenia.");
			}
		}
	},
	'cs': {
		'channels': true,
		'nicks': false,
		'custom': [],
		'callback': function(command, input) {
			if (command[1]) {
				if(!gateway.findQuery("chanserv")) {
					var query = new Query("ChanServ");
					gateway.queries.push(query);
				}
				gateway.findQuery("chanserv").appendMessage(messagePatterns.yourMsg, [gateway.niceTime(), guser.nick, input.substr(4)]);
				gateway.send(input.substr(1));
			} else {
				gateway.notEnoughParams("cs", "musisz podać tekst który chcesz wysłać do serwisu");
			}
		}
	},
	'ns': {
		'channels': true,
		'nicks': false,
		'custom': [],
		'callback': function(command, input) {
			if (command[1]) {
				if(!gateway.findQuery("nickserv")) {
					var query = new Query("NickServ");
					gateway.queries.push(query);
				}
				gateway.findQuery("nickserv").appendMessage(messagePatterns.yourMsg, [gateway.niceTime(), guser.nick, input.substr(4)]);
				gateway.send(input.substr(1));
			} else {
				gateway.notEnoughParams("ns", "musisz podać tekst który chcesz wysłać do serwisu");
			}
		}
	},
	'topic': {
		'channels': true,
		'nicks': false,
		'custom': [],
		'callback': function(command, input) {
			if (command[1]) {
				if (command[1].indexOf('#') == 0) {
					if(!command[2]) {
						gateway.send("TOPIC "+command[1]);
					} else {
						var reason = '';
						if(command[2]) {
							for(var i = 2; i < command.length; i++) {
								if(i != 2) {
									reason += ' ';
								}
								reason += command[i];
							}
						}
						if(reason) {
							gateway.send("TOPIC "+command[1]+" :"+reason);
						} else {
							gateway.send("TOPIC "+command[1]);
						}
					}
				} else {
					if (gateway.getActive()) {
						var reason = '';
						if(command[1]) {
							for(var i = 1; i < command.length; i++) {
								if(i != 1) {
									reason += ' ';
								}
								reason += command[i];
							}
						}
						if(reason) {
							gateway.send("TOPIC "+gateway.active+" :"+reason);
						} else {
							gateway.send("TOPIC "+gateway.active);
						}
					} else {
						gateway.notEnoughParams("topic", "musisz podać kanał jako pierwszy argument.");
					}
				}
			} else {
				if (gateway.getActive()) {
					gateway.send("TOPIC "+gateway.active);
				} else {
					gateway.notEnoughParams("topic", "musisz podać kanał jako pierwszy argument.");
				}
			}
		}
	},
	't': {
		'callback': 'topic'
	},
	'join': {
		'channels': true,
		'nicks': false,
		'custom': [],
		'callback': function(command, input) {
			if (command[1] != "") {
				if (command[2] && command[2] != '') {
					gateway.send("JOIN "+command[1]+" "+command[2]);
				} else {
					gateway.send("JOIN "+command[1]);
				}
				if(gateway.findChannel(command[1].toLowerCase())) {
					gateway.switchTab(command[1].toLowerCase());
				}
			} else {
				gateway.notEnoughParams("join", "musisz poda\u0107 kana\u0142 do którego chcesz do\u0142\u0105czy\u0107.");
			}
		}
	},
	'knock': {
		'channels': true,
		'nicks': false,
		'custom': [],
		'callback': function(command, input) {
			if (command[1] != "") {
				gateway.send("KNOCK "+command[1]);
			} else {
				gateway.notEnoughParams("knock", "musisz poda\u0107 kana\u0142 do którego chcesz zapukać.");
			}
		}
	},
	'j': {
		'callback': 'join'
	},
	'notice': {
		'channels': true,
		'nicks': true,
		'custom': [],
		'callback': function(command, input) {
			if (command[1]) {
				var reason = '';
				if(command[2]) {
					for(var i = 2; i < command.length; i++) {
						if(i != 2) {
							reason += ' ';
						}
						reason += command[i];
					}
				}
				if(reason) {
					gateway.send("NOTICE "+command[1]+" :"+reason);
				} else {
					gateway.notEnoughParams("notice", "musisz poda\u0107 treść wiadomości którą chcesz wysłać.");
				}
				if(!gateway.findQuery(command[1].toLowerCase())) {
					var query = new Query(command[1].toLowerCase());
					gateway.queries.push(query);
				}
				gateway.findQuery(command[1]).appendMessage(messagePatterns.yourNotice, [gateway.niceTime(), command[1], reason]);
			} else {
				gateway.notEnoughParams("notice", "musisz poda\u0107 nick osoby do której chcesz napisać i tekst który chcesz jej wysłać.");
			}
		}
	},
	'msg': {  /// TODO /msg #kanal
		'channels': true,
		'nicks': false,
		'custom': [],
		'callback': function(command, input) {
			if (command[1]) {
				var reason = '';
				if(command[2]) {
					for(var i = 2; i < command.length; i++) {
						if(i != 2) {
							reason += ' ';
						}
						reason += command[i];
					}
				}
				if(reason) {
					gateway.send("PRIVMSG "+command[1]+" :"+reason);
				} else {
					gateway.notEnoughParams("msg", "musisz poda\u0107 treść wiadomości którą chcesz wysłać.");
				}
				var query = gateway.findQuery(command[1]);
				if(!query) {
					query = new Query(command[1]);
					gateway.queries.push(query);
				}
				query.appendMessage(messagePatterns.yourMsg, [gateway.niceTime(), guser.nick, gateway.colorize(reason)]);
				query.appendMessage('%s', [gateway.parseImages(reason)]);
			} else {
				gateway.notEnoughParams("msg", "musisz poda\u0107 nick osoby do której chcesz napisać i tekst który chcesz jej wysłać.");
			}
		}
	},
	'part': {
		'channels': true,
		'nicks': false,
		'custom': [],
		'callback': function(command, input) {
			if (command[1]) {
				if (command[1].indexOf('#') == 0) {
					if(!command[2]) {
						gateway.send("PART "+command[1]);
					} else {
						var reason = '';
						if(command[2]) {
							for(var i = 2; i < command.length; i++) {
								if(i != 2) {
									reason += ' ';
								}
								reason += command[i];
							}
						}
						if(reason) {
							gateway.send("PART "+command[1]+" :"+reason);
						} else {
							gateway.send("PART "+command[1]);
						}
						gateway.removeChannel(command[1].toLowerCase())
					}
				} else {
					if (gateway.getActive()) {
						var reason = '';
						if(command[1]) {
							for(var i = 1; i < command.length; i++) {
								if(i != 1) {
									reason += ' ';
								}
								reason += command[i];
							}
						}
						if(reason) {
							gateway.send("PART "+gateway.active+" :"+reason);
						} else {
							gateway.send("PART "+gateway.active);
						}
						gateway.removeChannel(gateway.active.toLowerCase())
					} else {
						gateway.notEnoughParams("part", "musisz poda\u0107 kana\u0142 z którego chcesz wyjść jako pierwszy argument.");
					}
				}
			} else {
				if (gateway.getActive()) {
					gateway.send("PART "+gateway.active);
				} else {
					gateway.notEnoughParams("part", "musisz poda\u0107 kana\u0142 z którego chcesz wyjść jako pierwszy argument.");
				}
			}
		}
	},
	'kick': {
		'channels': true,
		'nicks': true,
		'custom': [],
		'callback': function(command, input) {
			if (command[1]) {
				if (command[1].indexOf('#') == 0) {
					if(!command[2]) {
						gateway.notEnoughParams("kick", "musisz poda\u0107 kana\u0142 z którego chcesz wykopa\u0107 t\u0119 osob\u0119 jako pierwszy argument.");
					} else {
						var reason = '';
						if(command[3]) {
							for(var i = 3; i < command.length; i++) {
								if(i != 3) {
									reason += ' ';
								}
								reason += command[i];
							}
						}
						if(reason) {
							gateway.send("KICK "+command[1]+" "+command[2]+" :"+reason);
						} else {
							gateway.send("KICK "+command[1]+" "+command[2]);
						}
					}
				} else {
					if (gateway.getActive()) {
						var reason = '';
						if(command[2]) {
							for(var i = 2; i < command.length; i++) {
								if(i != 2) {
									reason += ' ';
								}
								reason += command[i];
							}
						}
						if(reason) {
							gateway.send("KICK "+gateway.active+" "+command[1]+" :"+reason);
						} else {
							gateway.send("KICK "+gateway.active+" "+command[1]);
						}
					} else {
						gateway.notEnoughParams("kick", "musisz poda\u0107 kana\u0142 z którego chcesz wykopa\u0107 t\u0119 osob\u0119 jako pierwszy argument.");
					}
				}
			} else {
				gateway.notEnoughParams("kick", "musisz poda\u0107 nick osoby któr\u0105 chcesz wykopa\u0107 jako pierwszy argument.");
			}
		}
	},
	'me': {
		'channels': true,
		'nicks': true,
		'custom': [],
		'callback': function(command, input) {
			if(command[1]) {
				if (gateway.getActive()) {
					var tabToSend = gateway.findChannel(gateway.active);
					if(!tabToSend){
						tabToSend = gateway.findQuery(gateway.active);
					}
					if(tabToSend){
						gateway.send("PRIVMSG "+gateway.active+" :\001ACTION "+input.slice(1).substr(3)+"\001");
						tabToSend.appendMessage(messagePatterns.yourAction, [gateway.niceTime(), guser.nick, gateway.colorize(input.slice(1).substr(3))]);
						tabToSend.appendMessage('%s', [gateway.parseImages(input.slice(1).substr(3))]);
					} else {
						console.log('błąd /me !!!');
					}
				} else {
					gateway.notEnoughParams("me", "musisz być na jakimś kanale aby użyć tej komendy.");
				}
			} else {
				gateway.notEnoughParams("me", "musisz podać tekst do wysłania.");
			}
		}
	},	
	'deprotect': {
		'channels': true,
		'nicks': false,
		'custom': [],
		'callback': function(command, input) {
			if(command[1]) {
				if(command[2]) {
					if (command[1].indexOf('#') == 0) {
						gateway.send("MODE "+command[1]+" -a "+command[2]);
					}
				} else {
					if(gateway.getActive()) {
						gateway.send("MODE "+gateway.active+" -a "+command[1]);
					} else {
						gateway.notEnoughParams("deprotect", "musisz poda\u0107 kanal na ktorym chcesz odebrać uprawnienia tej osobie.");
					}
				}
			} else {
				gateway.notEnoughParams("deprotect", "musisz poda\u0107 kanał na którym chcesz odebrać uprawnienia i nick osoby której chcesz je dać.");
			}
		}
	},	
	'protect': {
		'channels': true,
		'nicks': false,
		'custom': [],
		'callback': function(command, input) {
			if(command[1]) {
				if(command[2]) {
					if (command[1].indexOf('#') == 0) {
						gateway.send("MODE "+command[1]+" +a "+command[2]);
					}
				} else {
					if(gateway.getActive()) {
						gateway.send("MODE "+gateway.active+" +a "+command[1]);
					} else {
						gateway.notEnoughParams("protect", "musisz poda\u0107 kanal na ktorym chcesz odebrać uprawnienia tej osobie.");
					}
				}
			} else {
				gateway.notEnoughParams("protect", "musisz poda\u0107 kanał na którym chcesz odebrać uprawnienia i nick osoby której chcesz je dać.");
			}
		}
	},	
	'op': {
		'channels': true,
		'nicks': false,
		'custom': [],
		'callback': function(command, input) {
			if(command[1]) {
				if(command[2]) {
					if (command[1].indexOf('#') == 0) {
						gateway.send("MODE "+command[1]+" +o "+command[2]);
					}
				} else {
					if(gateway.getActive()) {
						gateway.send("MODE "+gateway.active+" +o "+command[1]);
					} else {
						gateway.notEnoughParams("op", "musisz poda\u0107 kanal na ktorym chcesz odebrać uprawnienia tej osobie.");
					}
				}
			} else {
				gateway.notEnoughParams("op", "musisz poda\u0107 kanał na którym chcesz odebrać uprawnienia i nick osoby której chcesz je dać.");
			}
		}
	},	
	'deop': {
		'channels': true,
		'nicks': false,
		'custom': [],
		'callback': function(command, input) {
			if(command[1]) {
				if(command[2]) {
					if (command[1].indexOf('#') == 0) {
						gateway.send("MODE "+command[1]+" -o "+command[2]);
					}
				} else {
					if(gateway.getActive()) {
						gateway.send("MODE "+gateway.active+" -o "+command[1]);
					} else {
						gateway.notEnoughParams("deop", "musisz poda\u0107 kanal na ktorym chcesz odebrać uprawnienia tej osobie.");
					}
				}
			} else {
				gateway.notEnoughParams("deop", "musisz poda\u0107 kanał na którym chcesz odebrać uprawnienia i nick osoby której chcesz je dać.");
			}
		}
	},	
	'voice': {
		'channels': true,
		'nicks': false,
		'custom': [],
		'callback': function(command, input) {
			if(command[1]) {
				if(command[2]) {
					if (command[1].indexOf('#') == 0) {
						gateway.send("MODE "+command[1]+" +v "+command[2]);
					}
				} else {
					if(gateway.getActive()) {
						gateway.send("MODE "+gateway.active+" +v "+command[1]);
					} else {
						gateway.notEnoughParams("voice", "musisz poda\u0107 kanal na ktorym chcesz odebrać uprawnienia tej osobie.");
					}
				}
			} else {
				gateway.notEnoughParams("voice", "musisz poda\u0107 kanał na którym chcesz odebrać uprawnienia i nick osoby której chcesz je dać.");
			}
		}
	},
	'devoice': {
		'channels': true,
		'nicks': false,
		'custom': [],
		'callback': function(command, input) {
			if(command[1]) {
				if(command[2]) {
					if (command[1].indexOf('#') == 0) {
						gateway.send("MODE "+command[1]+" -v "+command[2]);
					}
				} else {
					if(gateway.getActive()) {
						gateway.send("MODE "+gateway.active+" -v "+command[1]);
					} else {
						gateway.notEnoughParams("devoice", "musisz poda\u0107 kanal na ktorym chcesz odebrać uprawnienia tej osobie.");
					}
				}
			} else {
				gateway.notEnoughParams("devoice", "musisz poda\u0107 kanał na którym chcesz odebrać uprawnienia i nick osoby której chcesz je dać.");
			}
		}
	},	
	'mode': {
		'channels': true,
		'nicks': false,
		'custom': [],
		'callback': function(command, input) {
			if(command[1]) {
				if (!command[1].indexOf('-') == 0 && !command[1].indexOf('+') == 0) {
					gateway.send("MODE " + input.slice(1).substr(command[0].length+1));
				} else {
					if (gateway.findChannel(gateway.active)) {
						 gateway.send("MODE " + gateway.active + " " + input.slice(1).substr(command[0].length+1));
					} else {
						gateway.notEnoughParams("mode", "musisz podać nick/kanał jako pierwszy argument");
					}
				}
			} else {
				gateway.notEnoughParams("mode", "musisz podać nick/kanał jako pierwszy argument");
			}
		}
	}
/*		'join': {
		'channels': true,
		'nicks': false,
		'custom': [],
		'callback': function(command, input) {
		}
	}   */
}

var loaded = false;

var readyFunc = function(){
	if(loaded) return;
	$('.not-connected-text > h3').html('Ładowanie');
	$('.not-connected-text > p').html('Poczekaj chwilę, trwa ładowanie...');
	loaded = true;
	if($.browser.msie && parseInt($.browser.version, 10) < 8) {
		$('.not-connected-text > h3').html('Przestarzała przeglądarka');
		$('.not-connected-text > p').html('Twoja przeglądarka jest przestarzała i nie jest obsługiwana. Należy zaktualizować przeglądarkę Internet Explorer do wersji 8 lub wyższej albo użyć innej przeglądarki (Firefox, Opera, Chrome, Safari) w którejś z nowszych wersji.<br />Jeżeli posiadasz przeglądarkę Internet Explorer 8 lub wyższej i widzisz ten komunikat wyłącz tzw "widok zgodności" dla tej strony.');
		gateway = 0;
		guser = 0;
		cmd_binds = 0;
		$('div#wrapper').html('');
	} else {
		conn.gatewayInit();
	}
};

$('document').ready(function(){setTimeout(readyFunc, 100);});

var conn = {
	'my_nick': '',
	'my_pass': '',
	'connectTimeout': function(){
			$('.not-connected-text > p').html('Łączenie z serwerem trwa zbyt długo, serwer bramki nie działa lub twoja przeglądarka nie funkcjonuje prawidłowo.<br />Spróbuj ponownie później lub spróbuj <a href="http://starabramka.pirc.pl/bramka/'+
				oldGatewayUrl+'">starej wersji bramki</a>.');
	},
	'dispConnectDialog': function(){
		reqChannel = guser.channels[0];
		conn.my_nick = dnick;

		if(reqChannel == '#'){
			if(settings.getCookie('channel')){
				reqChannel = settings.getCookie('channel');
			}
		}
		if(conn.my_nick == ''){
			if(settings.getCookie('nick')){
				conn.my_nick = settings.getCookie('nick');
			}
		}
		if(conn.my_nick == settings.getCookie('nick')){
			if(settings.getCookie('password')){
				conn.my_pass = atob(settings.getCookie('password'));
			}
		}
	
		gateway.websock = new WebSocket(server);
		gateway.connectTimeoutID = setTimeout(conn.connectTimeout, 20000);
		gateway.websock.onmessage = conn.processReply;
	/*	gateway.websock.onerror = function(e){
			$('.not-connected-text > p').html('');
		};
		gateway.websock.onclose = gateway.websock.onerror;*/
		gateway.websock.onerror = conn.connectTimeout;
		gateway.websock.onclose = conn.connectTimeout;
		gateway.websock.onopen = function(e) {
			gateway.forceSend('SYNC '+sessionid);
		};
	},
	'processReply': function(e){
		var regexp = /^SYNC ([^ ]+)$/i
		var rmatch = regexp.exec(e.data);
		if(rmatch && rmatch[1]){
			clearTimeout(gateway.connectTimeoutID);
			gateway.websock.onerror = undefined;
			gateway.websock.onclose = undefined;
			if(rmatch[1] == '1'){
				gateway.recoverConnection();
			} else {
				var nconn_html = '<form onsubmit="gateway.initialize();" action="javascript:void(0);"><table>';
				nconn_html += '<tr><td style="text-align: right; padding-right: 10px;">Kanał:</td><td><input type="text" id="nschan" value="'+$('<div/>').text(reqChannel).html()+'" /></td></tr>';
				nconn_html += '<tr><td style="text-align: right; padding-right: 10px;">Nick:</td><td><input type="text" id="nsnick" value="'+conn.my_nick+'" /></td></tr>';
				nconn_html += '<tr><td style="text-align: right; padding-right: 10px;">Hasło (jeżeli zarejestrowany):</td><td><input type="password" id="nspass" value="'+conn.my_pass+'" /></td></tr>';
				nconn_html += '<tr><td></td><td style="text-align: left;"><input type="checkbox" id="save_cookie" /> Zapisz w ciasteczkach</td></tr>';
				nconn_html += '<tr><td colspan="2" style="text-align: center; margin-top: 15px;"><input type="submit" value="Połącz z IRC" /></td></tr>';
				nconn_html += '</table></form>';
//				nconn_html += '<br /><p>Korzystasz z najnowszej wersji bramki, po znacznych jej zmianach. Gdyby coś nie zadziałało poprawnie, możesz skorzystać ze <a href="http://starabramka.pirc.pl/bramka/'+oldGatewayUrl+
//					'">starej wersji bramki</a>. Zauważone problemy zgłoś proszę na #help lub na abuse@pirc.pl.</p>';
				$('.not-connected-text > p').html(nconn_html);
				if(conn.my_nick == ''){
					$('#nsnick').focus();
				} else {
					$('#nspass').focus();
				}
			}
		}
	},
	'gatewayInit': function(){
		$('.not-connected-text p').html('Poczekaj chwilę, trwa ładowanie...');
		booleanSettings.forEach(function(sname){
			if(!$('#'+sname).is(':checked')){
				$('#'+sname).prop('checked', str2bool(settings.getCookie(sname)));
			}
		});
		disp.setSize(settings.getCookie('tsize'));
		disp.changeSettings();
		
	/*	var ua = navigator.userAgent.toLowerCase();
		var isAndroid = ua.indexOf("android") > -1;
		if(isAndroid) {
			$('body').css('font-family', 'verdana,arial,tahoma,sans-serif');
		}*/
		
		$('#chatbox').click(function() {
			gateway.closeNotify();
			gateway.closeStatus();
			gateway.closeError();
		});
	/*	$('#nicklist').click(function() {
		gateway.closeNotify();
		gateway.closeStatus();
		gateway.closeError();
		}); */
	/*	$('#info').click(function() {
			gateway.closeNotify();
			gateway.closeStatus();
			gateway.closeError();
		});*/
		$('#input').click(function() {
			gateway.closeNotify();
			gateway.closeStatus();
			gateway.closeError();
		});
		
		$(window).resize(function () {
			$('#chat-wrapper').scrollTop(document.getElementById('chat-wrapper').scrollHeight);
		});
    
	//	gateway.send("QUIT"); //k4be
		$('#input').keydown(function(e) {
			if(e.which == 13 || e.which == 38 || e.which == 40 || e.which == 9) {
				e.preventDefault();
			}
		});
		$('#input').keyup(function(e) {
			if(e.which == 13) {
				if($('#input').val() != '') {
					if(gateway.commandHistory.length == 0 || gateway.commandHistory[gateway.commandHistory.length-1] != $('#input').val()) {
						if(gateway.commandHistoryPos != -1 && gateway.commandHistoryPos == gateway.commandHistory.length-1) {
							gateway.commandHistory[gateway.commandHistoryPos] = $('#input').val();
						} else {
							gateway.commandHistory.push($('#input').val());
						}
					}
					gateway.parseUserInput($('#input').val());
					gateway.commandHistoryPos = -1;
				}
				e.preventDefault();
			} else if(e.which == 38) { //strzalka w gore
				e.preventDefault();
				if(gateway.commandHistoryPos == gateway.commandHistory.length-1 && $('#input').val() != '') {
					gateway.commandHistory[gateway.commandHistoryPos] = $('#input').val();
				}
				if(gateway.commandHistoryPos == -1 && gateway.commandHistory.length > 0 && typeof(gateway.commandHistory[gateway.commandHistory.length-1]) == 'string') {
					gateway.commandHistoryPos = gateway.commandHistory.length-1;
					if($('#input').val() != '' && gateway.commandHistory[gateway.commandHistory.length-1] != $('#input').val()) {
						gateway.commandHistory.push($('#input').val());
					}
					$('#input').val(gateway.commandHistory[gateway.commandHistoryPos]);
				} else if(gateway.commandHistoryPos != -1 && gateway.commandHistoryPos != 0) {
					gateway.commandHistoryPos--;
					$('#input').val(gateway.commandHistory[gateway.commandHistoryPos]);
				}
			} else if(e.which == 40) { // strzalka w dol
				if(gateway.commandHistoryPos == gateway.commandHistory.length-1 && $('#input').val() != '') {
					gateway.commandHistory[gateway.commandHistoryPos] = $('#input').val();
				}
				if(gateway.commandHistoryPos == -1 && $('#input').val() != '' && gateway.commandHistory.length > 0 && gateway.commandHistory[gateway.commandHistory.length-1] != $('#input').val()) {
					gateway.commandHistory.push($('#input').val());
					$('#input').val('');
				} else if (gateway.commandHistoryPos != -1) {
					if(typeof(gateway.commandHistory[gateway.commandHistoryPos+1]) == 'string') {
						gateway.commandHistoryPos++;
						$('#input').val(gateway.commandHistory[gateway.commandHistoryPos]);
					} else {
						gateway.commandHistoryPos = -1;
						$('#input').val('');
					}
				}
				e.preventDefault();
			}
		});
		
		$('#input').keyup(function(e) {
			if(e.which == 9) { // TAB
				gateway.doComplete();
				e.preventDefault();
				return false;
			} else {
				gateway.completion.repeat = 0;
				gateway.completion.string = '';
				gateway.completion.array = [];
			}
		});

		$("h2").bind('click', function(){
		
			if (gateway.getActive()) {
				gateway.showTopic(gateway.active) 
			}
		});
		$(window).unload(function(){
	//		gateway.send("QUIT :Zamknął okno");
	//		gateway.send();
		});

		// bo chrome
		window.onunload = function() {
	//		gateway.send("QUIT :Zamknął okno");
	//		gateway.send();
		};

	/*	setTimeout("$('#not_connected_wrapper').fadeIn(200)", 250);*/
		try {
			$('#not_connected_wrapper').fadeIn(200);
		} catch(e) {
			$('.not-connected-text > h3').html('Przestarzała przeglądarka');
			$('.not-connected-text > p').html('Twoja przeglądarka jest przestarzała i nie jest obsługiwana. Należy zainstalować aktualną wersję Internet Explorer, Mozilla Firefox, Chrome, Safari bądź innej wspieranej przeglądarki.');
			return;
		}
		$('.not-connected-text > h3').html($('<div/>').text(guser.channels[0]).html() + ' @ PIRC.pl');
		dnick = $('<div/>').text(guser.nick).html();
		if(guser.nick == '1') {
		    dnick = ''
            $(document).attr('title', 'Nieznany @ PIRC.pl');
		}
		
		if(!navigator.cookieEnabled){
			$('.not-connected-text > p').html('Twoja przeglądarka ma wyłączoną obsługę ciasteczek. Niektóre funkcje bramki mogą działać nieprawidłowo.<br /><input type="button" onclick="conn.dispConnectDialog();" value="Kontynuuj" />');
			return;
		} else {
			if(window.WebSocket == null){
				$('.not-connected-text > p').html('Twoja przeglądarka nie obsługuje WebSocket. Nie można uruchomić bramki.<br />Spróbuj <a href="http://starabramka.pirc.pl/bramka/'+oldGatewayUrl+'">starej wersji bramki</a>.');
				return;
			}
			conn.dispConnectDialog();
		}
		$(window).on('beforeunload', function() {
        	if (gateway.connectStatus != statusDisconnected) {
        		gateway.clickQuit();
            	return 'Jesteś nadal połączony z IRCem. Kliknij "Zostań na stronie" a następnie "Rozłącz" w okienku poniżej aby się rozłączyć przed wyjściem.';
        	}
    	}); 
	}
}


