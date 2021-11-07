function isMobile(){
    let info = navigator.userAgent;
    let agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod", "iPad"];
    for(let i = 0; i < agents.length; i++){
        if(info.indexOf(agents[i]) >= 0) return true;
    }
    return false;
}
DataManager.maxSavefiles = function() {
    return 1;
};
Window_SavefileList.prototype.drawFileId = function(id, x, y) {
    if(id == 1)
    this.drawText( '自动存档位 ', x, y, 180);
    else this.drawText(TextManager.file + ' ' + id, x, y, 180);
};
Game_Party.prototype.hasMaxItems = function(item) {
	if(!DataManager.isItem(item) && $gameParty.maxItems(item)==1 && $gameParty.hasItem(item,true))return true;
    return this.numItems(item) >= this.maxItems(item);
};//上限
Game_System.prototype.onAfterLoad = function() {
    Graphics.frameCount = this._framesOnSave;
  //  AudioManager.playBgm(this._bgmOnSave);
  //  AudioManager.playBgs(this._bgsOnSave);
};
/*
window.onunload = function(){
if(!$gameParty.inBattle() && !$gameSwitches.value(122) && $gameVariables.value(92) != 0) {
	$gameSystem.onBeforeSave();
	DataManager.saveGame(1);
}
}
*/
Scene_Item.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
        var goldnum = $gameParty._gold.toString().split("");
        var goldtxt = "";
        var ls = goldnum.length%3;
        for(var i=0;i<goldnum.length;i++)
		{
        goldtxt += goldnum[i];
		if ((i+1 == ls || (i+1-ls)%3==0) &&
		goldnum.length>3 && 
		i!=goldnum.length-1){
		goldtxt+=",";}
        }
        $dataItems[1].name = "金币"+goldtxt;
};
//数字修正
Window_ShopStatus.prototype.drawPossession = function(x, y) {
    var width = this.contents.width - this.textPadding() - x;
    var possessionWidth = this.textWidth('0000');
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.possession, x, y, width - possessionWidth);
    this.resetTextColor();
    this.drawText($gameParty.numItems(this._item), x, y, width, 'right');
    
   // this.drawText("可使用上下键来交易更多", x, y+150, width, 'right');
};

Window_ShopNumber.prototype.processNumberChange = function() {
	var numup = parseInt(this._max/10);
	if(numup<10)numup = 10;
    if (this.isOpenAndActive()) {
        if (Input.isRepeated('right')) {
            this.changeNumber(1);
        }
        if (Input.isRepeated('left')) {
            this.changeNumber(-1);
        }
        if (Input.isRepeated('up')) {
            this.changeNumber(numup);
        }
        if (Input.isRepeated('down')) {
            this.changeNumber(-numup);
        }
    }
};
/*
Window_ShopNumber.prototype.onButtonUp2 = function() {
    this.changeNumber(parseInt(this._max/10));
};
Window_ShopNumber.prototype.onButtonDown2 = function() {
     this.changeNumber(-(parseInt(this._max/10)));
};
*/
//道具装备修改
Scene_Item.prototype.createItemWindow = function() {
    var wy = this._categoryWindow.y + this._categoryWindow.height;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_ItemList(0, wy, Graphics.boxWidth, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItem.bind(this));
    this._itemWindow.setHandler('pageup',   this.onItemOk2.bind(this));
    this._itemWindow.setHandler('pagedown', this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
    this._categoryWindow.setItemWindow(this._itemWindow);
};
Scene_Item.prototype.onItem = function() {//道具装备修改
	var toolID = this.item().id;
	if (toolID) {
		if ($gameSystem._toolActorMode) {
			var actor = $gameParty.leader();
			if (actor) {
			    $gameActors.actor(1)._toolItemId = this.item().id;
				$gameTemp.reserveCommonEvent(17);
				};
		} else {
			$gameParty.setToolID(toolID);
		};
	};
	//SceneManager.pop();
    SceneManager.push(Scene_Map);
};
Scene_Item.prototype.onItemOk = function() {//道具装备修改
	SoundManager.playEquip();
	var toolID = this.item().id;
	if (toolID) {
		if ($gameSystem._toolActorMode) {
			var actor = $gameParty.leader();
			if (actor) {
				actor.equipToolItemID(this.item().id)
				};
		} else {
			$gameParty.setToolID(toolID);
		};
	};
	SceneManager.pop();

};
Scene_Item.prototype.onItemOk2 = function() {//道具装备修改
	SoundManager.playEquip();
	var toolID = this.item().id;
	if (toolID) {
		if ($gameSystem._toolActorMode) {
			var actor = $gameParty.leader();
			if (actor) {actor.equipToolSkillID(this.item().id)};
		} else {
			$gameParty.setToolID(toolID);
		};
	};
	SceneManager.pop();

};

//道具装备修改over

Game_Battler.prototype.gainTp = function(value) {
    this._result.tpDamage = -value;
    this.setTp(this.tp + value);
};
Window_Options.prototype.addVolumeOptions = function() {
    this.addCommand('手动绝招','sl');
    this.addCommand('战场规模','dp');
    this.addCommand(TextManager.bgmVolume, 'bgmVolume');
    this.addCommand(TextManager.bgsVolume, 'bgsVolume');
    this.addCommand(TextManager.meVolume, 'meVolume');
    this.addCommand(TextManager.seVolume, 'seVolume');
};
Scene_Base.prototype.popScene = function() {
	$gameSwitches.setValue(91,false);//粒子
    SceneManager.pop();
};
ConfigManager.readVolume = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
    	if(name=='dp')return Number(value).clamp(20, 200);
        return Number(value).clamp(0, 100);
    } else {
        return 100;
    }
};
ConfigManager.makeData = function() {
    var config = {};
    config.alwaysDash = this.alwaysDash;
    config.commandRemember = this.commandRemember;
    config.dp = this.dp;
    config.sl = this.sl;
    config.data = this.data;
    config.bgmVolume = this.bgmVolume;
    config.bgsVolume = this.bgsVolume;
    config.meVolume = this.meVolume;
    config.seVolume = this.seVolume;
    return config;
};
ConfigManager.load = function() {
    var json;
    var config = {};
    try {
        json = StorageManager.load(-1);
    } catch (e) {
        console.error(e);
    }
    if (json) {
        config = JsonEx.parse(json);
    }
    if(config.data)ConfigManager.data = config.data;
    this.applyData(config);
};
ConfigManager.save = function() {
    StorageManager.save(-1, JsonEx.stringify(this.makeData()));
};
Window_Options.prototype.isVolumeSymbol = function(symbol) {
    return symbol.contains('Volume') || symbol=='dp';
};
Window_Options.prototype.statusText = function(index) {
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        return symbol=='dp' ? value+'单位':this.volumeStatusText(value);
    } else {
        return this.booleanStatusText(value);
    }
};
Window_Options.prototype.processOk = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        value += this.volumeOffset();
        if (value > 200) {
            value = 0;
        }
        if(symbol=='dp')value = value.clamp(20,200);
        else value = value.clamp(0, 200);        
        this.changeValue(symbol, value);
    } else {
        this.changeValue(symbol, !value);
    }
};

Window_Options.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        value += this.volumeOffset();
        if(symbol=='dp') {
        value = value.clamp(40, 40);//范围
        }else value = value.clamp(0, 200);
        this.changeValue(symbol, value);
    } else {
        this.changeValue(symbol, true);
    }
};

Window_Options.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        value -= this.volumeOffset();
        if(symbol=='dp') {
        value = value.clamp(40,40);//范围
        }else value = value.clamp(0, 200);
        this.changeValue(symbol, value);
    } else {
        this.changeValue(symbol, false);
    }
};

ConfigManager.applyData = function(config) {
    ConfigManager.sl = this.readFlag(config, 'sl');
    ConfigManager.dp = this.readVolume(config, 'dp');
    this.bgmVolume = this.readVolume(config, 'bgmVolume');
    this.bgsVolume = this.readVolume(config, 'bgsVolume');
    this.meVolume = this.readVolume(config, 'meVolume');
    this.seVolume = this.readVolume(config, 'seVolume');
};
Window_Options.prototype.booleanStatusText = function(value) {
    return value ? '开启' : '关闭';
};
//文本替换效果
Game_Message.prototype.allText = function() {
if($gameVariables.value(305) > 0 )return $gameVariables.value(306);
else return this._texts.join('\n');
};
//文本窗口根据变量扩大效果
Window_Message.prototype.changeWindowDimensions = function() {
	if (this.pTarget != null) {
		// Calc max width and line height to get dimensions
		var w = 10;
		var h = 0;

		if (Imported.Galv_MessageBusts) {
			if ($gameMessage.bustPos == 1) {
				var faceoffset = 0;
			} else {
				var faceoffset = Galv.MB.w;
			};
		} else {
			var faceoffset = Window_Base._faceWidth + 25;
		};
	
		// Calc X Offset
		var xO = $gameMessage._faceName ? faceoffset : 0;
		xO += Galv.Mstyle.padding[1] + Galv.Mstyle.padding[3]; // Added padding

		// Calc text width
		this.resetFontSettings();
		for (var i = 0; i < $gameMessage._texts.length; i++) {
			var lineWidth = this.testWidthEx($gameMessage._texts[i]) + this.standardPadding() * 2 + xO;
			if (w < lineWidth) w = lineWidth;
			
		};
		this.resetFontSettings();
		this.width = Math.min(Graphics.boxWidth,w);
		
		// Calc minimum lines
		var minFaceHeight = 0;
		if ($gameMessage._faceName) {
			w += 15;
			if (Imported.Galv_MessageBusts) {
				if ($gameMessage.bustPos == 1) w += Galv.MB.w;
				minFaceHeight = 0;
			} else {
				minFaceHeight = Window_Base._faceHeight + this.standardPadding() * 2;
			};
		};
		
		// Calc text height
		var textState = { index: 0 };
		textState.text = this.convertEscapeCharacters($gameMessage.allText());
		var allLineHeight = this.calcTextHeight(textState,true);
		var height = allLineHeight + this.standardPadding() * 2;
		var minHeight = this.fittingHeight($gameMessage._texts.length);
		this.height = Math.max(height,minHeight,minFaceHeight);
		this.height += Galv.Mstyle.padding[0] + Galv.Mstyle.padding[2];
		this.yOffset = -Galv.Mstyle.yOffet - this.height;
		
	} else { 
		this.yOffset = 0;
		this.width = this.windowWidth();
                var pow = $gameVariables.value(305) > 0 ? $gameVariables.value(305):1; 
		this.height = Galv.Mstyle.Window_Message_windowHeight.call(this)*pow;
		this.x = (Graphics.boxWidth - this.width) / 2;
               // alert($gameMessage.allText())
	};
};

function Window_BC() {
    this.initialize.apply(this, arguments);
}
 
(function() {
 
Scene_Name.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Name.prototype.constructor = Scene_Name;
//初始化
Scene_Name.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//准备
Scene_Name.prototype.prepare = function(actorId, maxLength) {
    this._actorId = actorId;
    this._maxLength = maxLength;
};
//创建
Scene_Name.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this._actor = $gameActors.actor(this._actorId);
    this.createEditWindow();
    this.createBCWindow();
};
//开始
Scene_Name.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._editWindow.refresh();
};
 
//创建编辑窗口
Scene_Name.prototype.createEditWindow = function() {
    this._editWindow = new Window_NameEdit(this._actor, this._maxLength);
    this.addWindow(this._editWindow);
};
 
Scene_Name.prototype.createBCWindow = function() {
 
    var x = this._editWindow.x + this._editWindow.left() + 50;
    var y = this._editWindow.y + 80;
    var width = this._editWindow.charWidth() * this._maxLength;
    var height = this._editWindow.lineHeight();
 
    Graphics._addInput("text",x,y, width,height, this._editWindow.standardFontSize());
    Graphics._input.maxLength = this._maxLength;
    Graphics._input.value = $gameVariables.value(280)[5];
    if(!$gameSwitches.value(70))Graphics._input.disabled = true;
    else Graphics._input.disabled = false;
    Graphics._addInput2("text",x,y+60, width,height, this._editWindow.standardFontSize());
    Graphics._input2.maxLength = this._maxLength;
    Graphics._input2.value = "";
 
    this._commandWindow = new Window_NameCommand(x-30,y+180,150);
    this._commandWindow.setHandler('a', this.onInputOk.bind(this));
    
    this.addWindow(this._commandWindow);

};
 
//输入初始化
Scene_Name.prototype.oncs = function() {
    Graphics._input.value = $gameVariables.value(280)[5];
    if(!$gameSwitches.value(70))Graphics._input.disabled = true;
    else Graphics._input.disabled = false;
    Graphics._input2.value = "";
};
 //商店
Scene_Shop.prototype.prepare = function(goods, purchaseOnly) {
	//alert($gameVariables.value(443)[0][0]);
	this._goods = [];
    this._purchaseOnly = purchaseOnly;
    var arr = false;
	for (var i=0;i<$gameVariables.value(443).length;i++) {
	if ($gameVariables.value(693) == $gameVariables.value(443)[i].name)
     arr = $gameVariables.value(443)[i].arr;
   }
	if(arr == false) {
		if($gameVariables.value(692).length > 0)
			this._goods = $gameVariables.value(692).concat(goods);
		else this._goods = goods;
				var shop = {
					name: $gameVariables.value(693),
					arr: this._goods
				};
		if($gameVariables.value(443).indexOf(shop) == -1)
		$gameVariables.value(443).push(shop);
	}
	else {
		this._goods = arr;
	}
    this._item = null;
};


//=============================================================================
// Bitmap&DrawTextEx.js
//=============================================================================
(function() {
    Bitmap.prototype._drawTextBody = function(text, tx, ty, maxWidth) {
        this.gradientFillText(text, tx, ty, maxWidth, "#fff", this.textColor)
    };
    Bitmap.prototype.gradientFillText = function(text, x, y, mWidth, color1,
                                                 color2) {
        var context = this._context;
        var grad;
        grad = context.createLinearGradient(x, y-this.fontSize, x, y);
        grad.addColorStop(0, color1);
        grad.addColorStop(0.8, color2);
        context.save();
        context.fillStyle = grad;
        context.fillText(text, x, y, mWidth);
        context.restore();
        this._setDirty();
    };
    var _bitmapDrawTextEx_initialize =Bitmap.prototype.initialize;
    Bitmap.prototype.initialize = function(width,height) {
        _bitmapDrawTextEx_initialize.call(this,width,height)
        this.outlineColor = '#000';
 this.outlineWidth = 3	;   
    }
})();


//防止默认

Input._onKeyDown = function(event) {
    if (this._shouldPreventDefault(event.keyCode)) {
        if (Graphics && Graphics._input && Graphics._input._sx && Graphics._input._sx.xs){
        }else {
            event.preventDefault();
        }
        if (Graphics && Graphics._input2 && Graphics._input2._sx && Graphics._input2._sx.xs){
        }else {
            event.preventDefault();
        }
    }
    if (event.keyCode === 144) {
        this.clear();
    }
    var buttonName = this.keyMapper[event.keyCode];
    if (buttonName) {
        this._currentState[buttonName] = true;
    }
};

})();
//遗物窗口
///
//=============================================================================
// Window_RelicList
//=============================================================================

function Window_RelicList() {
    this.initialize.apply(this, arguments);
}

Window_RelicList.prototype = Object.create(Window_Selectable.prototype);
Window_RelicList.prototype.constructor = Window_RelicList;

Window_RelicList.prototype.initialize = function() {;
    var ww = 650;
    var wh = 100;
    Window_Selectable.prototype.initialize.call(this,350,350, ww, wh);
    this.refresh();
};
Window_RelicList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
Window_RelicList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};
Window_RelicList.prototype.makeItemList = function() {
    this._data = [];
    arr = $gameVariables.value(244);
    for (var i=0;i<arr.length;i++) {
    	 this._data.push($dataItems[arr[i]])
    }
};
Window_RelicList.prototype.itemHeight = function() {
    return 60;
};
Window_RelicList.prototype.itemWidth = function() {
    return 144;
};
Window_RelicList.prototype.drawAllItems = function() {
    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
            this.clearItem(index + 1);
        }
    }
};
Window_RelicList.prototype.callUpdateHelp = function() {
    this.setHelpWindowItem(this.item());
};
Window_RelicList.prototype.drawItem = function(index) {
	this.contents.fontSize = 24;
    var item = this._data[index];
    this.clearItem(index);
    if (item) {
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.drawItemName(item, rect.x, rect.y+10, rect.width);
        this.changePaintOpacity(1);
    }
    
};

Window_RelicList.prototype.maxCols = function() {;
return 4;
};//列数行数
Window_RelicList.prototype.itemSection = function() {
    var sections = 5;
    if ($dataSystem.optDisplayTp) sections += 1;
    return this.contents.width / sections;
};

Window_RelicList.prototype.listColor = function(actor) {
    if (actor.isBattleMember()) {
      return this.textColor(Yanfly.Param.ColorInParty);
    }
    return this.normalColor()
};

Window_RelicList.prototype.isCurrentItemEnabled = function() {
    return true;
};
Window_RelicList.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
};
//=============================================================================
// Scene_Relic
//=============================================================================


function Scene_Relic() {
    this.initialize.apply(this, arguments);
}

Scene_Relic.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Relic.prototype.constructor = Scene_Relic;

Scene_Relic.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
    this._formerParty = $gameParty.leader();
};

Scene_Relic.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createListWindow();
    this._listWindow.activate();
    this._listWindow.select(-1);
};

Scene_Relic.prototype.createListWindow = function() {
    this._listWindow = new Window_RelicList();
    this._listWindow.setHandler('ok',     this.onListOk.bind(this));
    this._listWindow.setHandler('cancel', this.onListCancel.bind(this));  
    this.addWindow(this._listWindow);
};


Scene_Relic.prototype.refreshWindows = function() {
    this._listWindow.refresh();
    $gameMap.requestRefresh();
};

Scene_Relic.prototype.onListCancel = function() {
	if($gameSwitches.value(459)){
	 this._listWindow.activate();
    this._listWindow.select(-1);	
	}
	else this.popScene();
};

Scene_Relic.prototype.onListOk = function() {
	$gameParty.gainItem(this._listWindow.item(),1)
    this.popScene();
   // $gameTemp.reserveCommonEvent(72);
};

///
//=============================================================================
// Window_PartyList2
//=============================================================================

function Window_PartyList2() {
    this.initialize.apply(this, arguments);
}

Window_PartyList2.prototype = Object.create(Window_Selectable.prototype);
Window_PartyList2.prototype.constructor = Window_PartyList2;

Window_PartyList2.prototype.initialize = function() {
	this._touchCount = -1;
    var wy = 300;
    this._detailedWindow = Yanfly.Param.PartyDetailWin;
    var ww = this.windowWidth();
    var wh = Graphics.boxHeight - wy;
    Window_Selectable.prototype.initialize.call(this,150,150, ww, wh);
    this.select(1);
    this.deactivate();
    this.refresh();  
};


Window_PartyList2.prototype.windowWidth = function() {
      return Yanfly.Param.PartyListWidth-170;
};

Window_PartyList2.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_PartyList2.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_PartyList2.prototype.makeItemList = function() {
    this._data = [];
   // if($gameSwitches.value(8))this._data = [0];
    this.createActorOrder();
    if(this._data.length>12 && this._data.length % 4 !=0){//补空判定
    	var len = 4 - this._data.length % 4;
    	for (var i=0;i<len;i++) {
    		//this._data.push(0);
    	}
    }
};
Window_PartyList2.prototype.itemHeight = function() {
    return 120;
};
Window_PartyList2.prototype.itemWidth = function() {
    return 120;
};

Window_PartyList2.prototype.createActorOrder = function() {
    for (var i = 0; i < $gameParty._actors.length; ++i) {
      var actorId = $gameParty._actors[i];
      if ($gameActors.actor(actorId)) this._data.push(actorId);
    }
};

Window_PartyList2.prototype.drawAllItems = function() {
    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
            this.clearItem(index + 1);
        }
    }
};


Window_PartyList2.prototype.drawItem = function(index) {
	this.contents.fontSize = 22;
    var actor = $gameActors.actor(this._data[index]);
    if (actor) {
     // var bitmap = ImageManager.loadFace(actor.faceName());
      var bitmap = ImageManager.loadCharacter(actor.characterName());
      if (bitmap.width <= 0) {
        return setTimeout(this.drawItem.bind(this, index), 5);
      }
    }
    this.clearItem(index);
    var rect = this.itemRect(index);
    //rect.height = this.itemHeight()+50;
    //alert(rect.height);
    if (this._data[index] === 0) {
      this.drawRemove(rect);
      return;
    }
    this.drawActor(actor, rect);
};


Window_PartyList2.prototype.drawRemove = function(rect) {
    var ibw = Window_Base._iconWidth + 4;
    if (Yanfly.Icon.PartyRemove <= 0) ibw = this.textPadding();
    rect.width -= this.textPadding();
    this.drawIcon(Yanfly.Icon.PartyRemove, rect.x + 2, rect.y + 2);
    this.drawText(Yanfly.Param.PartyCommand2, rect.x + ibw, rect.y,
      rect.width - ibw);
};

Window_PartyList2.prototype.drawActor = function(actor, rect) {
    this.drawBasic(actor, rect);
    if (this._detailedWindow) return;
    this.drawExtra(actor, rect);
};
Window_PartyList2.prototype.maxCols = function() {;
return 4;
};//列数行数
Window_PartyList2.prototype.drawBasic = function(actor, rect) {
    var wx = rect.x + rect.width-55;
    var wy = rect.y + rect.height + Yanfly.Param.PartySpriteBufferY-50
    if (Yanfly.Param.PartyShowListSprite) {
      this.drawActorCharacter(actor, wx, wy);
    // this.drawActorFace(actor, rect.x, rect.y, rect.width, rect.height);
     
    }
    this.changeTextColor(this.listColor(actor));
    this.changePaintOpacity(this.actorIsEnabled(actor));
    var ibw = Window_Base._iconWidth + 4;
    if (!Yanfly.Param.PartyShowListSprite) ibw = this.textPadding();
    if (actor.isBattleMember()) {
    	this.drawText("(队列中)", rect.x + ibw -30, rect.y, rect.width - ibw+50);
    }
    //this.drawText(actor.name(), rect.x + ibw-20, rect.y, rect.width - ibw +100);
    if(actor.hp < actor.mhp/4){
    	this.changeTextColor(this.deathColor());
    	this.drawText("无法战斗", rect.x + ibw-20, rect.y+80, rect.width - ibw +100);
   }else {
     if(actor.mp <= 0 && $gameVariables.value(691)[0] && $gameVariables.value(691)[0].indexOf('体力')!=-1){
    	this.changeTextColor(this.deathColor());
    	this.drawText("体力不足", rect.x + ibw-20, rect.y+80, rect.width - ibw +100);
   }  	
   }
    
    this.changePaintOpacity(true);
    this.drawRestrictions(actor, rect);
    this.resetFontSettings();
};

Window_PartyList2.prototype.drawExtra = function(actor, rect) {
    var section = this.itemSection();
    this.drawActorLevel(actor, section * 2, rect.y);
    
    this.drawActorHp(actor, section * 3, rect.y, section - 6);
    this.drawActorMp(actor, section * 4, rect.y, section - 6);
    if ($dataSystem.optDisplayTp) {
   //   this.drawActorTp(actor, section * 5, rect.y, section - 6);
    }
    this.drawRestrictions(actor, rect);
};

Window_PartyList2.prototype.drawRestrictions = function(actor, rect) {
    if (this._detailedWindow) {
      var wx = this.contents.width - Window_Base._iconWidth - 2;
    } else {
      var section = this.itemSection();
      var wx = section * 2 - Window_Base._iconWidth - 2;
    }
    if (actor._locked) {
      this.drawIcon(Yanfly.Icon.PartyLocked, wx, rect.y);
      wx -= Window_Base._iconWidth;
    }
    if (actor._required) {
      this.drawIcon(Yanfly.Icon.PartyRequired, wx, rect.y);
    }
};

Window_PartyList2.prototype.itemSection = function() {
    var sections = 5;
    if ($dataSystem.optDisplayTp) sections += 1;
    return this.contents.width / sections;
};

Window_PartyList2.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                   width, color1, color2) {
    var labelWidth = this.textWidth('HP');
    var valueWidth = this.textWidth(Yanfly.Util.toGroup(max));
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    this.changeTextColor(color1);
    this.drawText(Yanfly.Util.toGroup(current), x1, y, valueWidth, 'right');
};

Window_PartyList2.prototype.listColor = function(actor) {
    if (actor.isBattleMember()) {
      return this.textColor(Yanfly.Param.ColorInParty);
    }
    return this.normalColor()
};

Window_PartyList2.prototype.curActor = function() {
    var actorId = this._data[this._index];
    return $gameActors.actor(actorId);
};

Window_PartyList2.prototype.isCurrentItemEnabled = function() {
    if (this.curActor()) return this.curActor().isFormationChangeOk();
    return true;
};

Window_PartyList2.prototype.actorIsEnabled = function(actor) {
    return actor.isAppeared();
};

Window_PartyList2.prototype.setDetailWindow = function(win) {
    this._detailWindow = win;
    this.callUpdateHelp();
};

Window_PartyList2.prototype.callUpdateHelp = function() {
    this.setHelpWindowItem($gameActors.actor(this.item()));
    this.setDetailWindowItem($gameActors.actor(this.item()));
};

Window_PartyList2.prototype.setHelpWindowItem = function(actor) {
  //  if (this._helpWindow && actor) {
//     this._helpWindow.clear(); //  this._helpWindow.setText(actor.profile());
   if (this._helpWindow) {
        this._helpWindow.clear();
    }
};

Window_PartyList2.prototype.setDetailWindowItem = function(actor) {
    if (this._detailWindow) this._detailWindow.setActor(actor);
};

Window_PartyList2.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
};
//=============================================================================
// Window_PartyDetail2
//=============================================================================

function Window_PartyDetail2() {
    this.initialize.apply(this, arguments);
}

Window_PartyDetail2.prototype = Object.create(Window_Base.prototype);
Window_PartyDetail2.prototype.constructor = Window_PartyDetail2;

Window_PartyDetail2.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
};

Window_PartyDetail2.prototype.setActor = function(actor) {
   // if (this._actor === actor) return;
    this._actor = actor;
    this.refresh();
};

Window_PartyDetail2.prototype.clear = function() {
    this.contents.clear();
    if(this._sprite)this.removeChild(this._sprite);
    this.drawDarkRect(0, 0, this.contents.width, this.contents.height);
    this.changeTextColor(this.systemColor());
    var text = Yanfly.Param.PartyEmptyText
    this.contents.drawText(text, 0, 0, this.contents.width,
        this.contents.height, 'center');
};

Window_PartyDetail2.prototype.refresh = function() {
    if (!this._actor) return this.clear();
    this.contents.clear();
    this.drawActorBasicInfo();
    this.drawActorParams();
   //立绘
    if(this._sprite)this.removeChild(this._sprite);
   if(this._actor._faceName != ""){
    var sprite = new Sprite();
    sprite.bitmap = ImageManager.loadPicture(this._actor._faceName+this._actor._faceIndex);
    sprite.x = -350;
    sprite.y = 0;
    sprite.z = 10;
    this._sprite = sprite;
    this.addChildAt(this._sprite, 1);
    }
};

Window_PartyDetail2.prototype.drawDarkRectangles = function() {
    var ww = this.contents.width / 2;
    var wy = this.lineHeight() * 4;
    if (this._linesAvailable >= 7) wy += this.lineHeight();
    if (this._linesAvailable === 4) wy += this.lineHeight();
    var max = this._linesAvailable;
    max = Math.min(this._linesAvailable, this._actor.equipSlots().length);
    for (var i = 0; i < max; ++i) {
      if (wy + this.lineHeight() > this.contents.height) break;
      this.drawDarkRect(ww, wy, ww, this.lineHeight());
      wy += this.lineHeight();
    }
    var wy = this.lineHeight() * 4;
    if (this._linesAvailable >= 7) wy += this.lineHeight();
    if (this._linesAvailable === 4) wy += this.lineHeight();
    for (var i = 0; i < 6; ++i) {
      var rect = this.paramRect(i);
      this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
    }
};

Window_PartyDetail2.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

Window_PartyDetail2.prototype.paramRect = function(index) {
    var rect = new Rectangle();
    rect.x = 0;
    rect.y = this.lineHeight() * 4;
    rect.height = this.lineHeight();
    rect.width = this.contents.width / 2
    if (this._linesAvailable >= 7) rect.y += this.lineHeight();
    if (this._linesAvailable === 4) rect.y += this.lineHeight();
    if (this._linesAvailable >= 6) {
      rect.y += this.lineHeight() * index;
    } else {
      rect.width /= 2;
      rect.x = index % 2 === 0 ? 0 : rect.width+20;
      rect.y += this.lineHeight() * Math.floor(index / 2);
    }
    return rect;
};
Window_PartyDetail2.prototype.calculateAvailableLines = function() {
    if (this._linesAvailable) return;
    this._linesAvailable = this.contents.height - this.lineHeight() * 4;
    this._linesAvailable /= this.lineHeight();
    this._linesAvailable = Math.floor(this._linesAvailable);
};

Window_PartyDetail2.prototype.drawActorParams = function() {
    this.drawActorParamsTitle();
    for (var i = 0; i < 6; ++i) {
      var rect = this.paramRect(i);
      if (this._linesAvailable > 4) {
        rect.x += 8;
        rect.width -= 16;
      } else {
        rect.x += 4;
        rect.width -= 8;
      }
      var paramId = i + 2;
      var text = TextManager.param(paramId);
      this.changeTextColor(this.systemColor());
      this.drawText(text, rect.x, rect.y, rect.width);
      var paramValue = Yanfly.Util.toGroup(this._actor.param(paramId));
      this.changeTextColor(this.normalColor());
      this.drawText(paramValue, rect.x+10, rect.y, rect.width, 'right');
    }
};

Window_PartyDetail2.prototype.drawActorParamsTitle = function() {
    var wy = this.lineHeight() * 4;
    var ww = this.contents.width / 2;
    if (this._linesAvailable >= 7) {
      var text = Yanfly.Param.PartyDetailParam;
      this.changeTextColor(this.systemColor());
      this.drawText(text, 0, wy, ww, 'center');
    } else if (this._linesAvailable === 4) {
      var text = Yanfly.Param.PartyDetailParam;
      this.changeTextColor(this.systemColor());
      this.drawText(text, 0, wy, ww, 'center');
    }
};
Window_PartyDetail2.prototype.drawActorBasicInfo = function() {
    var w = this.width - this.padding * 2;
    var h = this.height - this.padding * 2;
    var y = 0;
    var padding = 0;
    var xpad = padding;// + Window_Base._faceWidth;
    var width = w - 162 - this.textPadding();
    h = Window_Base._faceHeight; 
   	this.drawActorHp(this._actor, xpad, y+45, width-40);
	//this.drawActorMp(this._actor, xpad, y+45*2, width-40);
	//this.drawActorTp(this._actor, xpad+215, y+45, width-50);
	this.drawActorEXP(this._actor, xpad, y+45*2, width-50);
  //  var nope = this.ActorElement2(this._actor);
    this.changeTextColor(this.normalColor());
    var m = "";if(this._actor._mage>0)m="+"+this._actor._mage;
    this.drawText(this._actor.name()+m+" 等级"+this._actor.level+"("+this._actor.maxLevel()+")",0,y, width+200, 'left');
    if($gameVariables.value(691)[0] && $gameVariables.value(691)[0].indexOf('配置') != -1) {
    	this.drawText(this._actor.currentClass().name, 5, y + 260, width + 400, 'left');
    	this.drawText(this._actor.nickname(), 5, y + 300, width + 400, 'left');
    } else {
    	if($gameVariables.value(691)[0] && $gameVariables.value(691)[0].indexOf('增益') != -1) {
    		this.drawText(this._actor.isStateAffected(242) ? "已训练" : "未训练", 5, y + 260, width + 400, 'left');
    		this.drawText($gameVariables.value(691)[1], 5, y + 300, width + 400, 'left');
    	} else {
    		if($gameVariables.value(691)[0] && $gameVariables.value(691)[0].indexOf('耐药') != -1) {
    			var atk = this._actor._paramPlus[2] > 55 ? "极限" : this._actor._param_l[2]; 
    			var def = this._actor._paramPlus[3] > 55 ? "极限" : this._actor._param_l[3];  
    			var mat = this._actor._paramPlus[4] > 55 ? "极限" : this._actor._param_l[4];  
    			var mdf = this._actor._paramPlus[5] > 55 ? "极限" : this._actor._param_l[5];  
    			var agi = this._actor._paramPlus[6] > 55 ? "极限" : this._actor._param_l[6];
    			var luk = this._actor._paramPlus[7] > 55 ? "极限" : this._actor._param_l[7];  
    			this.drawText("耐药率:"+"攻击"+atk+"防御"+def, 5, y + 260, width + 400, 'left');
    			this.drawText("魔力"+mat+"精神"+mdf+"灵巧"+agi+"魅力"+luk, 5, y + 300, width + 400, 'left');
    		} else {
    			this.drawText($gameVariables.value(691)[0], 5, y + 260, width + 400, 'left');
    			this.drawText($gameVariables.value(691)[1], 5, y + 300, width + 400, 'left');
    		}
    	}
    	
    }
};
Window_Base.prototype.drawActorEXP = function(actor, x, y, width) {
	//if (!showEXP) return;
	var rate = (actor.currentExp() - actor.currentLevelExp()) / (actor.nextLevelExp() - actor.currentLevelExp());
	if (actor.level === actor.maxLevel()) rate = 1;

	this.drawStaticGauge(x, y, width, rate, this.textColor(0), this.textColor(8), "exp");

	this.changeTextColor(this.systemColor());
	this.drawText(TextManager.expA, x, y, 100);
	this.changeTextColor(this.normalColor());
	this.drawText((Math.floor(rate * 10000) / 100) + "%", x, y, width,"right");
};
Window_PartyDetail2.prototype.drawActorEquips = function() {
    this.drawActorEquipsTitle();
    var equips = this.getActorEquips();
    this.drawActorEquipsList(equips);
};

Window_PartyDetail2.prototype.drawActorEquipsTitle = function() {
    var wy = this.lineHeight() * 4;
    var ww = this.contents.width / 2;
    if (this._linesAvailable >= 7) {
      var text = Yanfly.Param.PartyDetailEquip;
      this.changeTextColor(this.systemColor());
      this.drawText(text, ww, wy, ww, 'center');
    } else if (this._linesAvailable === 4) {
      var text = Yanfly.Param.PartyDetailEquip;
      this.changeTextColor(this.systemColor());
      this.drawText(text, ww, wy, ww, 'center');
    }
};

Window_PartyDetail2.prototype.getActorEquips = function() {
    var equips = [];
    for (var i = 0; i < this._actor.equips().length; ++i) {
      var equip = this._actor.equips()[i];
      if (equip) equips.push(equip);
    }
    return equips;
};

Window_PartyDetail2.prototype.drawActorEquipsList = function(equips) {
    this._lastSlot = false;
    var max = this._linesAvailable;
    var ww = this.contents.width / 2;
    var wh = this.lineHeight();
    var wy = this.lineHeight() * 4;
    var wx = ww + 6;
    ww -= 12;
    if (this._linesAvailable >= 7) {
      max -= 1;
      wy += this.lineHeight();
    }
    if (this._linesAvailable === 4) {
      max -= 1;
      wy += this.lineHeight();
    }
    for (var i = 0; i < equips.length; ++i) {
      var equip = equips[i];
      if (!equip) break;
      if (i >= max - 1 && i < equips.length - 1) this._lastSlot = true;
      if (this._lastSlot) {
        var iconIndex = equip.iconIndex;
        this.drawIcon(iconIndex, wx + 2, wy + 2);
        wx += Window_Base._iconWidth;
        continue;
      } else if (this._lastSlot && i === equips.length - 1) {
        var iconIndex = equip.iconIndex;
        this.drawIcon(iconIndex, wx + 2, wy + 2);
        wx += Window_Base._iconWidth;
      } else {
        this.drawItemName(equip, wx, wy, ww);
      }
      wy += this.lineHeight();
    }
};


//=============================================================================
// Scene_ActorSlect
//=============================================================================


function Scene_ActorSlect() {
    this.initialize.apply(this, arguments);
}

Scene_ActorSlect.prototype = Object.create(Scene_MenuBase.prototype);
Scene_ActorSlect.prototype.constructor = Scene_ActorSlect;

Scene_ActorSlect.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
    this._formerParty = $gameParty._battleMembers.slice(0);
};

Scene_ActorSlect.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createListWindow();
    this.createDetailWindow();
    this.createHelpWindow();
    this._helpWindow.width = 1020;
    this._helpWindow.x = 100;
    this._helpWindow.y = 40;
    //帮助窗口
   // alert($gameVariables.value(691)[0]);
    //this._helpWindow.setText("");
    this._listWindow.activate();
    this._listWindow.select($gameVariables.value(176));
};

Scene_ActorSlect.prototype.createListWindow = function() {
    this._listWindow = new Window_PartyList2();
    if (this._helpWindow) this._listWindow.setHelpWindow(this._helpWindow);
    this._listWindow.setHandler('ok',     this.onListOk.bind(this));
    this._listWindow.setHandler('cancel', this.onListCancel.bind(this));  
    this.addWindow(this._listWindow);
};
Scene_ActorSlect.prototype.createDetailWindow = function() {
    var ww = 450;
    var wh = 420;
    var wx = this._listWindow.x+550;
    var wy = this._listWindow.y;
    this._detailWindow = new Window_PartyDetail2(wx, wy, ww, wh);
    this.addWindow(this._detailWindow);
    this._listWindow.setDetailWindow(this._detailWindow);
    this._detailWindow.clear();
};

Scene_Status.prototype.popScene = function() {
	$gameTemp.reserveCommonEvent(286);
    SceneManager.pop();
};
Scene_ActorSlect.prototype.refreshWindows = function() {
    $gameParty.rearrangeActors();
    this._listWindow.refresh();
    $gamePlayer.refresh();
    $gameMap.requestRefresh();
};

Scene_ActorSlect.prototype.onListCancel = function() {
	$gameSwitches.setValue(8,true);
	//$gameTemp.reserveCommonEvent(16);
	$gameVariables.setValue(176,0);
	this.popScene();
};

Scene_ActorSlect.prototype.onListOk = function() {
	if(this._listWindow.index() !=-1){
	$gameSwitches.setValue(8,false);
    SoundManager.playEquip();
    $gameVariables.setValue(176,this._listWindow._index);
    var id = this._listWindow.item();
    var actor = $gameActors.actor(id);
    $gameVariables.setValue(684,id);
    if(actor){
    $gameVariables.setValue(685,actor._name);
    $gameVariables.setValue(686,actor.level);
    $gameVariables.setValue(687,actor.atk);
    $gameVariables.setValue(688,actor.mat);
    $gameVariables.setValue(689,actor.mp);
    $gameVariables.setValue(690,actor.hp);
    }
    this.popScene();
   }
};

Scene_ActorSlect.prototype.otherAction = function() {
    if (this._listWindow.item() === 0) {
      $gameParty._battleMembers[this._partyWindow._index] = 0;
    }
};

Scene_ActorSlect.prototype.switchActors = function() {
    var targetId = this._listWindow.item();
    var targetIndex = this._partyWindow._index;
    if ($gameParty._battleMembers.contains(targetId)) {
      var switchId = this._partyWindow.item();
      var switchIndex = $gameParty._battleMembers.indexOf(targetId);
      $gameParty._battleMembers[switchIndex] = switchId;
    };
    $gameParty._battleMembers[targetIndex] = targetId;
};


//
//=============================================================================
// Window_PartySelect2
//=============================================================================

function Window_PartySelect2() {
    this.initialize.apply(this, arguments);
}

Window_PartySelect2.prototype = Object.create(Window_Selectable.prototype);
Window_PartySelect2.prototype.constructor = Window_PartySelect2;

Window_PartySelect2.prototype.initialize = function() {
	
   // var wx = 220;//commandWindow.width;
   // var wy = 580;//commandWindow.y;
   // var ww = 840;
   // var wh = 124;
    var wx = 0;//commandWindow.width;
    var wy = 0;//commandWindow.y;
    var ww = 0;//Graphics.boxWidth;//1280;
    var wh = 0;//Graphics.boxHeight;//720;

    Window_Selectable.prototype.initialize.call(this, wx, wy, ww, wh);
    this.opacity = 0;
    this.select(-1);
    this.createContents();
    this.refresh();

    
};

Window_PartySelect2.prototype.maxCols = function() {
    return 0;//$gameParty.maxBattleMembers();
};

Window_PartySelect2.prototype.maxItems = function() {
    return 0;//$gameParty.maxBattleMembers()+1;
};

Window_PartySelect2.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    rect.width = this.contents.width / this.maxItems();
    rect.height = this.contents.height;
    rect.x = index * rect.width;
    rect.y = 0;
    return rect;
};

Window_PartySelect2.prototype.refresh = function() {
	if($gameScreen.picture(10)){
  //  this.makeItemList();
    
  //  this.drawAllItems();
    this.contents.clear();
    var context = this.contents._context;
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo($gameVariables.value(204)-16,$gameVariables.value(205)-50);
    context.lineTo($gameScreen.picture(10)._x-16,$gameScreen.picture(10)._y-20);
    context.closePath();
    context.stroke();  
   }

};

Window_PartySelect2.prototype.makeItemList = function() {
    this._data = $gameParty._battleMembers.slice(0);
   // this._data.push(0);
};

Window_PartySelect2.prototype.drawItem = function(index) {   
    var rect = this.itemRect(index);
    rect.x += this.textPadding() / 2;
    rect.y += this.textPadding() / 2;
    rect.width -= this.textPadding();
    rect.height -= this.textPadding();
    var actor = $gameActors.actor(this._data[index]);
    
    if (actor) {
      this.drawActor(rect, actor);
    } else {
     index<3 ? this.drawEmpty(rect):index > 5 ? this.drawEmpty3(rect):this.drawEmpty2(rect);
    }
   
};

Window_PartySelect2.prototype.drawEmpty = function(rect) {
	//alert()
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
    this.changePaintOpacity(true);
    this.resetFontSettings();
    var text = Yanfly.Param.PartyEmptyText;
    this.contents.drawText(text, rect.x, rect.y, rect.width,
        rect.height, 'center');
};
Window_PartySelect2.prototype.drawEmpty2 = function(rect) {
	//alert()
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
    this.changePaintOpacity(true);
    this.resetFontSettings();
    var text = "替补";
    this.contents.drawText(text, rect.x, rect.y, rect.width,
        rect.height, 'center');
};
Window_PartySelect2.prototype.drawEmpty3 = function(rect) {
	//alert()
   // var color = this.normalColor();
    this.changePaintOpacity(false);
  //  this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
    this.changePaintOpacity(true);
    this.resetFontSettings();
    var text = "清空";
    this.contents.drawText(text, rect.x, rect.y, rect.width,
        rect.height, 'center');
};
Window_PartySelect2.prototype.drawActor = function(rect, actor) {
	
    if (Yanfly.Param.PartyShowFace) {
      this.drawActorFace(actor, rect.x, rect.y, rect.width, rect.height);
    }
    if (Yanfly.Param.PartyShowCharacter) {
      var ry = rect.height * 19/20;
      this.drawActorCharacter(actor, rect.x + rect.width / 2, ry);
    }
    //this.drawActorName(actor, rect.x, rect.y, rect.width);
    this.drawLockedIcon(actor, rect);
    this.drawRequiredIcon(actor, rect);
};

Window_PartySelect2.prototype.drawLockedIcon = function(actor, rect) {
    if (!actor._locked) return;
    var ix = rect.x + rect.width - Window_Base._iconWidth - 2;
    var iy = rect.y + rect.height - Window_Base._iconHeight - 2;
    this.drawIcon(Yanfly.Icon.PartyLocked, ix, iy)
};

Window_PartySelect2.prototype.drawRequiredIcon = function(actor, rect) {
    if (!actor._required) return;
    var ix = rect.x + 2;
    var iy = rect.y + rect.height - Window_Base._iconHeight - 2;
    this.drawIcon(Yanfly.Icon.PartyRequired, ix, iy)
};

Window_PartySelect2.prototype.curActor = function() {
    if (!this._data) return null;
    var actorId = this._data[this._index];
    return $gameActors.actor(actorId);
};

Window_PartySelect2.prototype.prevActor = function() {
    var id = this._index === 0 ? this._data.length - 1 : this._index - 1;
    var actorId = this._data[id];
    return $gameActors.actor(actorId);
};

Window_PartySelect2.prototype.nextActor = function() {
    var id = this._index === this._data.length - 1 ? 0 : this._index + 1;
    var actorId = this._data[id];
    return $gameActors.actor(actorId);
};

Window_PartySelect2.prototype.processActor = function(value) {
    return true;
};

Window_PartySelect2.prototype.isCurrentItemEnabled = function() {
    if (this.curActor()) return this.curActor().isFormationChangeOk();
    return true;
};

Window_PartySelect2.prototype.processPageup = function() {
    if (this.curActor() && this.curActor()._locked) {
      this.playBuzzerSound();
    } else if (this.prevActor() && this.prevActor()._locked) {
      this.playBuzzerSound();
    } else if (this.processActor('prevActor')) {
      Window_Selectable.prototype.processPageup.call(this);
      this.activate();
      this.select(this._index === 0 ? this._data.length - 1 : this._index - 1)
    } else {
      this.playBuzzerSound();
    }
};

Window_PartySelect2.prototype.processPagedown = function() {
    if (this.curActor() && this.curActor()._locked) {
      this.playBuzzerSound();
    } else if (this.nextActor() && this.nextActor()._locked) {
      this.playBuzzerSound();
    } else if (this.processActor('nextActor')) {
      Window_Selectable.prototype.processPagedown.call(this);
      this.activate();
      this.select(this._index === this._data.length - 1 ? 0 : this._index + 1)
    } else {
      this.playBuzzerSound();
    }
};

Window_PartySelect2.prototype.setDetailWindow = function(win) {
    this._detailWindow = win;
    this.callUpdateHelp();
};

Window_PartySelect2.prototype.callUpdateHelp = function() {
    this.setHelpWindowItem(this.curActor());
    this.setDetailWindowItem(this.curActor());
};

Window_PartySelect2.prototype.setHelpWindowItem = function(actor) {
    if (this._helpWindow && actor) {
      this._helpWindow.setText(actor.profile());
    } else if (this._helpWindow) {
      this._helpWindow.clear();
    }
};

Window_PartySelect2.prototype.setDetailWindowItem = function(actor) {
    if (this._detailWindow) this._detailWindow.setActor(actor);
};

Window_PartySelect2.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
};

//角色替换窗口
Scene_Map.prototype.createListWindow = function() {
	//$gameParty.loadActorImages()
    this._listWindow = new Window_PartySelect2();
 //   this._listWindow.setHandler('ok',this.onListOk.bind(this));
    //this._listWindow.setHandler('cancel',);  
    this.addChild(this._listWindow);
};
Scene_Map.prototype.onListOk = function() {
	 if(this._listWindow.index()==6){
		$gameParty._battleMembers[0] = 0;
		$gameParty._battleMembers[1] = 0;
		$gameParty._battleMembers[2] = 0;
		$gameParty._battleMembers[3] = 0;
		$gameParty._battleMembers[4] = 0;
		$gameParty._battleMembers[5] = 0;
		$gameParty.rearrangeActors();
        $gamePlayer.refresh();
		$gameSwitches.setValue(7,true);	
	}
	else if (!$gameMessage.isBusy() && this._listWindow.index() >= 0) {
	$gameVariables.setValue(51,this._listWindow.index());
	$gameVariables.setValue(52,this._listWindow.item());
	$gameTemp.reserveCommonEvent(2);
	}
	this._listWindow.activate();
};
//物品修改
Scene_Status.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this._statusWindow = new Window_Status();
    this._statusWindow.setHandler('cancel',   this.popScene.bind(this));
    this._statusWindow.reserveFaceImages();
    this.addWindow(this._statusWindow);
};