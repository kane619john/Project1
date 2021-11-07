Game_Event.prototype.initialize = function(mapId, eventId) {
    Game_Character.prototype.initialize.call(this);
    this._mapId = mapId;
    this._eventId = eventId;
    this._flag = 0;
    this._Turn = [0,0,0,0,0];
    this._boss = 0;
    this._enemy = [];
    this._frends= [];
    this.locate(this.event().x, this.event().y);
    this.refresh();
};
//百分比扣血
Game_Interpreter.prototype.changeHp = function(target, value, allowDeath) {
	if($gameSwitches.value(78)){//百分比
		value = parseInt(target.mhp*(value/100));
	}
    if (target.isAlive()) {
        if (!allowDeath && target.hp <= -value) {
            value = 1 - target.hp;
        }
        target.gainHp(value);
        if (target.isDead()) {
            target.performCollapse();
        }
    }
};
Game_BattlerBase.prototype.paramRate = function(paramId) {
    return this.traitsPi3(Game_BattlerBase.TRAIT_PARAM, paramId);
};
Game_BattlerBase.prototype.traitsPi3 = function(code, id) {
    return this.traitsWithId(code, id).reduce(function(r, trait) {
        return r + (trait.value-1);
    }, 1);
};
Game_Actor.prototype.equipSlots = function() {
	//装备修改装备槽位修改
    var slots = [1,2,3,3,5,5,6,7,8];
   // for (var i = 1; i < $dataSystem.equipTypes.length; i++) {
   //     slots.push(i);
   // }
    if (slots.length >= 2 && this.isDualWield()) {
        slots[1] = 1;
    }
    return slots;
};
//进阶和特殊物品判定
Game_Actor.prototype.LevelUp = function(id,exp) {
	if(this._actorId==id || id==-1){
		this._param_g[0][0]=this._param_g[0][0]+5;
		if(this._param_g[0][0]>99)this._param_g[0][0]=99;
	}
	//alert(1);
	this.gainExp(exp);
};
Game_Actor.prototype.ParamLose = function() {
        if(this.hasSkill(168))this.addParam(2,-1);
        if(this.hasSkill(169))this.addParam(2,-2);
        if(this.hasSkill(170))this.addParam(2,-3);
        if(this.hasSkill(171))this.addParam(2,-4);
        if(this.hasSkill(172))this.addParam(2,-5);
        //
        if(this.hasSkill(178))this.addParam(4,-1);	
        if(this.hasSkill(179))this.addParam(4,-2);
        if(this.hasSkill(180))this.addParam(4,-3);
        if(this.hasSkill(181))this.addParam(4,-4);
        if(this.hasSkill(182))this.addParam(4,-5);
        //
        if(this.hasSkill(193))this.addParam(7,-1);	
        if(this.hasSkill(194))this.addParam(7,-2);
        if(this.hasSkill(195))this.addParam(7,-3);
        if(this.hasSkill(196))this.addParam(7,-4);
        if(this.hasSkill(197))this.addParam(7,-5);
        //
        if(this.hasSkill(173)){this.addParam(3,-1);}
        if(this.hasSkill(174)){this.addParam(3,-1);this.addParam(0,-50);}
        if(this.hasSkill(175)){this.addParam(3,-2);this.addParam(0,-50);}
        if(this.hasSkill(176)){this.addParam(3,-2);this.addParam(0,-50);}
        if(this.hasSkill(177)){this.addParam(3,-2);this.addParam(0,-100);}
        //
        if(this.hasSkill(183))this.addParam(5,-1);	
        if(this.hasSkill(184))this.addParam(5,-2);
        if(this.hasSkill(185))this.addParam(5,-1);
        if(this.hasSkill(186))this.addParam(5,-2);
        if(this.hasSkill(187))this.addParam(5,-2);
        //
        if(this.hasSkill(188))this.addParam(6,-1);	
        if(this.hasSkill(189))this.addParam(6,-2);
        if(this.hasSkill(190))this.addParam(6,-3);
        if(this.hasSkill(191))this.addParam(6,-4);
        if(this.hasSkill(192))this.addParam(6,-5);
 }
Game_Actor.prototype.ParamUp = function(id, exp) {
	if(id == -1) {
		this._param_l = [
			0, //mhp
			0, //mmp
			0, //atk
			0, //def
			0, //mat
			0, //mdf
			0, //agi
			0, //luk
		];
	} //洗髓
	else {
		if(Math.randomInt(100) + 1 >= this._param_l[id] && this._paramPlus[id] <=55) {
			this._param_l[id] += 10;
			this.addParam(id, exp);
		}
	}
};
Game_Actor.prototype.maxLevel = function() {
	if(this.actor().maxLevel+this._param_g[0][0] > 99)return 99;
    return this.actor().maxLevel+this._param_g[0][0];
};
Game_BattlerBase.prototype.initMembers = function() {
	this._hp = 1;
    this._mp = 0;
    this._tp = 0;
    this._food = [0,100];
    this._sleep = 48;
    this._mage = 0;
   // this._reward = 1;
    //
    this._param_g = [
    [0,100],//maxlv
    [0,100],//承伤、承伤百分比
    [0,100],//输出、输出百分比
    [0,100],//格挡次数、百分比
    [0,100],//mat
    [0,100],//治疗量、治疗百分比
    [0,100],//agi
    [0,100],//luk
    ];
    this._param_l = [
    0,//mhp
    0,//mmp
    0,//atk
    0,//def
    0,//mat
    0,//mdf
    0,//agi
    0,//luk
    ];
    //
    this._hidden = false;
    this.clearParamPlus();
    this.clearStates();
    this.clearBuffs();
    

};
Game_BattlerBase.prototype.paramMax = function(paramId) {
    if (paramId === 0) {
        return 999999;  // MHP
    } else if (paramId === 1) {
        return 9999;    // MMP
    } else {
        return 999;
    }
};
//属性设置 G经验值 L潜力值
/*
Game_BattlerBase.prototype.param = function(paramId) {
    var value = this.paramBase(paramId) + this.paramPlus(paramId);
    value *= this.paramRate(paramId) * this.paramBuffRate(paramId);
    var maxValue = this.paramMax(paramId);
    var minValue = this.paramMin(paramId);
    return Math.round(value.clamp(minValue, maxValue));
};
*/
Game_BattlerBase.prototype.sparam = function(sparamId) {
    return this.traitsPi3(Game_BattlerBase.TRAIT_SPARAM, sparamId);
};
Game_BattlerBase.prototype.traitsPi2 = function(code, id) {
    return this.traitsWithId(code, id).reduce(function(r, trait) {
    	//alert(r);
        return trait.value;
    }, 1);
};
Game_BattlerBase.prototype.tparam = function(paramId) {
    var value = this.paramBase(paramId) + this.paramPlus(paramId);
    var maxValue = this.paramMax(paramId);
    var minValue = this.paramMin(paramId);
    return Math.round(value.clamp(minValue, maxValue));
};
Object.defineProperties(Game_BattlerBase.prototype, {
	reward: { get: function() { return (0.9+this.param(7)*0.01).toFixed(3); }, configurable: true },
    // Hit Points
    hp: { get: function() { return this._hp; }, configurable: true },
    // Magic Points
    mp: { get: function() { return this._mp; }, configurable: true },
    // Tactical Points
    tp: { get: function() { return this._tp; }, configurable: true },
    // Maximum Hit Points
    mhp: { get: function() { return this.param(0); }, configurable: true },
    // Maximum Magic Points
    mmp: { get: function() { return this.param(1); }, configurable: true },
    // ATtacK power
    atk: { get: function() { return this.param(2); }, configurable: true },
    atk_g: { get: function() { return this._param_g[2]; }, configurable: true },
    atk_l: { get: function() { return this._param_l[2]; }, configurable: true },
    // DEFense power
    def: { get: function() { return this.param(3); }, configurable: true },
    // Magic ATtack power
    mat: { get: function() { return this.param(4); }, configurable: true },
    // Magic DeFense power
   
    mdf: { get: function() { return this.param(5); }, configurable: true },
    // AGIlity
    agi: { get: function() { return this.param(6); }, configurable: true },
    // LUcK
    luk: { get: function() { return this.param(7); }, configurable: true },
    // HIT rate
    hit: { get: function() { return (this.xparam(0)+(this.param(6)*0.002)).toFixed(3); }, configurable: true },
    // EVAsion rate
    eva: { get: function() { return (this.xparam(1)+(this.param(6)*0.001)).toFixed(3); }, configurable: true },
    // CRItical rate
    cri: { get: function() { return (this.xparam(2)+(this.param(6)*0.001)).toFixed(3); }, configurable: true },
    // Critical EVasion rate
    cev: { get: function() { return this.xparam(3); }, configurable: true },
    // Magic EVasion rate
    mev: { get: function() { return this.xparam(4); }, configurable: true },
    // Magic ReFlection rate
    mrf: { get: function() { return this.xparam(5); }, configurable: true },
    // CouNTer attack rate
    cnt: { get: function() { return this.xparam(6); }, configurable: true },
    // Hp ReGeneration rate生命恢复
    hrg: { get: function() { return this.xparam(7) ; }, configurable: true },
    // Mp ReGeneration rateMP恢复
    mrg: { get: function() { return this.xparam(8) ; }, configurable: true },
    // Tp ReGeneration rateTP回复
    trg: { get: function() { return this.xparam(9); }, configurable: true },
    // TarGet Rate
    tgr: { get: function() { return this.sparam(0); }, configurable: true },
    // GuaRD effect rate
    grd: { get: function() { return this.sparam(1); }, configurable: true },
    // RECovery effect rate
    rec: { get: function() { return this.sparam(2); }, configurable: true },
    // PHArmacology
    pha: { get: function() { return this.sparam(3); }, configurable: true },
    // Mp Cost Rate
    mcr: { get: function() { return this.sparam(4); }, configurable: true },
    // Tp Charge Rate
    tcr: { get: function() { return this.sparam(5); }, configurable: true },
    // Physical Damage Rate物理伤害
    pdr: { get: function() { return this.sparam(6); }, configurable: true },
    // Magical Damage Rate魔法伤害
    mdr: { get: function() { return this.sparam(7); }, configurable: true },
    // Floor Damage Rate初始TP
    fdr: { get: function() { return this.sparam(8); }, configurable: true },
    // EXperience Rate经验倍率、统率强化
    exr: { get: function() { return $gameVariables.value(706) }, configurable: true },
    // 物理攻击-全部
    tatk: { get: function() { return (this.sparam(6)*10)*(this.param(2)/10); }, configurable: true },
    // 魔法攻击-全部
    tmat: { get: function() { return (this.sparam(7)*10)*(this.param(4)/10); }, configurable: true },
    // 物理防御-全部
    tdef: { get: function() { return (this.sparam(8)*10)+(this.param(3)/10); }, configurable: true },
    // 物理防御-全部
    tmdf: { get: function() { return (this.sparam(9)*10)+(this.param(5)/10); }, configurable: true }
});

//
Game_Action.prototype.DpsData = function(target,value) {
 if(target._ras.friend) {
 	if(value >= 0){
 	$gameVariables.setValue(533,$gameVariables.value(533)+value);//承伤
 	if(target.isEnemy() && target.enemy().note.contains('actor'))
 	$gameActors.actor(target.mp)._param_g[1][0]+=value;//承伤
 	}
 	else {$gameVariables.setValue(535,$gameVariables.value(535)-value);//治疗量
 	if(this.subject().isEnemy() && this.subject().enemy().note.contains('actor'))
 	$gameActors.actor(this.subject().mp)._param_g[5][0]-=value;//治疗
 	}
 	
 } else {
 	if(value > 0){ $gameVariables.setValue(534,$gameVariables.value(534)+value);//输出
 		if(this.subject().isEnemy() && this.subject().enemy().note.contains('actor')){
 			$gameActors.actor(this.subject().mp)._param_g[2][0]+=value;//输出
 		}else $gameVariables.setValue(507,$gameVariables.value(507)+value);//非英雄输出
 	}
 }

};
Game_Action.prototype.makeDamageValue = function(target, critical) {
    var item = this.item();
    var baseValue = this.evalDamageFormula(target);
    var value = baseValue * this.calcElementRate(target);
    if (this.isPhysical()) {
   //     value *= target.pdr;
    }
    if (this.isMagical()) {
     //   value *= target.mdr;
    }
    if (baseValue < 0) {
        value *= target.rec;
    }
    if (critical) {
        value = this.applyCritical(value);
    }
   // alert(this.subject()._name);
   // alert(target.enemy().note);
   // alert(target._ras.friend);
    value = this.applyVariance(value, item.damage.variance);
    value = this.applyGuard(value, target);
    value = Math.round(value);
    this.DpsData(target,value);
    return value;
};
Game_Actor.prototype.executeFloorDamage = function() {
    var damage = Math.floor(this.basicFloorDamage());
    damage = Math.min(damage, this.maxFloorDamage());
    this.gainHp(-damage);
    if (damage > 0) {
        this.performMapDamage();
    }
};
//装备修改
Game_Actor.prototype.paramPlus = function(paramId) {
    var value = Game_Battler.prototype.paramPlus.call(this, paramId);
    if(paramId !== 1){
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if(item)value += item.params[paramId];
    }
    }
    return value;
};
Game_Battler.prototype.gainTp = function(value) {
	if(this.isStateAffected(53) && value > 0)value = 0;
    this._result.tpDamage = -value;
    this.setTp(this.tp + value);
};
//吸血修改
Game_Action.prototype.gainDrainedHp = function(value) {
	var gainTarget = this.subject();
    if (gainTarget.stateRate(144) > 1 ) {     
       if (this._reflectionTarget !== undefined) {
            gainTarget = this._reflectionTarget;
        }
       value = parseInt(value*(gainTarget.stateRate(144)-1) );
       if(value > 0)gainTarget.gainHp(value);
    }
};
Game_Actor.prototype.finalExpRate = function() {
    return  (this.isBattleMember() ? 1 : this.benchMembersExpRate());
};
//

Window_Status.prototype.drawParameters = function(x, y) {
    var lineHeight = this.lineHeight()-5;
    for (var i = 0; i < 6; i++) {
        var paramId = i + 2;
        var y2 = y + lineHeight * i;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(paramId), x, y2, 160);
        this.resetTextColor(); 
        this.drawText(this._actor.param(paramId), x + 60, y2, 120, 'left');
     //this.drawText(parseInt(this._actor._param_g[paramId][0])+"/"+this._actor._param_g[paramId][1], x +150, y2, 120, 'left');
    }
};
Window_Status.prototype.drawParameters2 = function(x, y) {
    var lineHeight = this.lineHeight()-5;
        //this.changeTextColor(this.systemColor());
        var actor = this._actor;
        this.drawText("物理强度:"+actor.pdr*100+"%", x, y + lineHeight * 0);
        this.drawText("魔法强度:"+actor.mdr*100+"%", x, y + lineHeight * 1);
        this.drawText("初始能量:"+Math.round(actor.fdr*100)+"%", x, y + lineHeight * 2);
        this.drawText("暴击回避:"+actor.cev*100+"%", x, y + lineHeight * 3);       
        var maxitem = actor.def+$gameParty.numItems($dataItems[201])*5+$gameParty.numItems($dataItems[202])*20;
        this.drawText("统率加成:"+actor.exr+"%", x, y + lineHeight * 4);    
        this.drawText("部队上限:"+$gameParty.MaxPop(), x, y + lineHeight * 5);
        //this.drawText("援军上限:"+"∞"	, x, y + this.lineHeight() * 5);
        
        //this.resetTextColor();

};
//新的属性增加
/*
Game_BattlerBase.prototype.addParam = function(paramId, value) {
	if(!$gameSwitches.value(9)) {
		if(!$gameSwitches.value(121)) {
			if(this._param_l[paramId] >= 10) {
			var exp = this._param_g[paramId][0] + value*$gameVariables.value(4);
			//防止溢出
			if(exp>this._param_g[paramId][1]){
			this.gainExp(this._param_g[paramId][1]-this._param_g[paramId][0]);
			this._param_g[paramId][0] = this._param_g[paramId][1];
			}else {
				this._param_g[paramId][0] += value*$gameVariables.value(4);
				this.gainExp(value*$gameVariables.value(4));
			}
			//经验获取
			if(this._param_g[paramId][0] >= this._param_g[paramId][1]) {			
					this._paramPlus[paramId] += 1;
					this._param_l[paramId] -= 10;
					this._param_g[paramId][0] = 0;
					this._param_g[paramId][1] += 20;
					$gameVariables.setValue(190,paramId);
					$gameTemp.reserveCommonEvent(114);
					
			}
		}else {
			$gameVariables.setValue(190,paramId);
			$gameTemp.reserveCommonEvent(285);
		}
		
		} else {
			if(this._param_l[paramId] <= 200) this._param_l[paramId] += value*$gameVariables.value(4);
		}
	}
	else 
	{
		this._paramPlus[paramId] += value;
		$gameVariables.setValue(190,paramId);
		$gameTemp.reserveCommonEvent(114);
	}
    this.refresh();
};
*/
//
Game_Actor.prototype.displayLevelUp = function(newSkills) {
$gameSwitches.setValue(233,true);
};
//
Window_Base.prototype.drawActorName = function(actor, x, y, width) {
    width = width || 168;
    this.changeTextColor(this.hpColor(actor));
    var txt = actor.name();
   // if($gameSwitches.value(74))txt+="(受伤)";
  //  if($gameSwitches.value(50))txt+="(幸运日)";
   // if(actor._food[0] <= 40)txt+="(饥饿)";
    this.drawText(txt, x, y, 816);
   // this.drawText("名声："+$gameVariables.value(106)+"  善名/恶名："+$gameVariables.value(107);, x, y+30, 816);
};

Window_Base.prototype.drawActorNickname = function(actor, x, y, width) {
//    width = width || 270;
 //   this.changeTextColor(this.systemColor());
 //   this.drawText("神气", x, y, width);
 //   this.resetTextColor();
  //  this.drawText(actor._tp+"/ "+100, x+80, y, width);
};
Window_Base.prototype.drawActorSP = function(actor, x, y, width) {
};
//
Window_Status.prototype.drawBlock1 = function(y) {
    this.drawActorName(this._actor, 6, y);
    this.drawActorClass(this._actor, 192, y);
    
};
Window_Status.prototype.drawBlock2 = function(y) {
    this.drawActorFace(this._actor, 12, y);
    this.drawBasicInfo(204, y);
   // this.drawExpInfo(456, y);
    if(this._sprite)this.removeChild(this._sprite);
   if(this._actor._faceName+this._actor._faceIndex != "0"){
    var sprite = new Sprite();
    sprite.bitmap = ImageManager.loadPicture(this._actor._faceName+this._actor._faceIndex);
    sprite.x = 200;
    sprite.y = 100;
    sprite.z = 10;
    this._sprite = sprite;
    this.addChildAt(this._sprite, 1);
    }
};
//
Window_Status.prototype.drawBasicInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    this.drawActorLevel(this._actor, x, y + lineHeight * 0);
    this.drawActorHp(this._actor, x, y + lineHeight * 1);
    this.drawActorEXP(this._actor, x+5, y + lineHeight * 2,180);
    this.drawActorNickname(this._actor,x , y + lineHeight * 3);
    //this.drawActorIcons(this._actor, x, y + lineHeight * 1);
    //this.drawActorTp(this._actor, x, y + lineHeight * 4);
};
//潜力完
Window_Status.prototype.drawEquipments = function(x, y) {
	var lineHeight = this.lineHeight()-5;
    var actor = this._actor;
    var hrg = actor.hrg;//Math.floor(this.mhp * this.hrg);
    hrg = parseInt(Math.max(hrg, - actor.maxSlipDamage()) * 20);
        this.drawText("命中率:"+(actor.hit*100).toFixed(2)+"%", x, y + lineHeight * 0);
        this.drawText("闪避率:"+(actor.eva*100).toFixed(2)+"%", x, y + lineHeight * 1);
        this.drawText("暴击率:"+(actor.cri*100).toFixed(2)+"%", x, y + lineHeight * 2);
        var bao = 140+actor.agi;
        this.drawText("暴击伤害:"+bao+"%", x, y + lineHeight * 3);
        this.drawText("生命恢复:"+hrg, x, y + lineHeight * 4);
        this.drawText("充能速度:"+parseInt(actor.trg*100), x, y + lineHeight * 5);
    //}
};
Window_Status.prototype.drawBlock3 = function(y) {
	this.contents.fontSize = 22;
  //  this.drawText("属性", 10, y-15, 160, 'left');
 //   this.drawText("经验/提升所需", 140, y-15, 160, 'left');
    this.drawParameters(0, y+20);
    this.drawEquipments(180, y+20);
    this.drawParameters2(365, y+20);
    this.drawEquipments2(530, y+20);
    
};
Window_Status.prototype.ERate = function(value) {
	var rate = this._actor.elementRate(value);
	return parseInt((1-rate)*100);
}
Window_Status.prototype.drawEquipments2 = function(x, y) {
	var lineHeight = this.lineHeight()-5;
    var actor = this._actor;
    this.drawText("物理抗性:"+this.ERate(10)+"%", x, y + lineHeight * 0);
    this.drawText("火焰抗性:"+this.ERate(2)+"%", x, y + lineHeight * 1);
    this.drawText("寒冰抗性:"+this.ERate(3)+"%", x, y + lineHeight * 2);
    this.drawText("雷电抗性:"+this.ERate(4)+"%", x, y + lineHeight * 3);
    this.drawText("光明抗性:"+this.ERate(8)+"%", x, y + lineHeight * 4);
    this.drawText("黑暗抗性:"+this.ERate(9)+"%", x, y + lineHeight * 5);
    //}

};
//队友装备
Scene_Equip.prototype.refreshActor = function() {
	if($gameVariables.value(178)!=0)
	this._actor = $gameActors.actor($gameVariables.value(178));
    var actor =  this.actor();
    this._statusWindow.setActor(actor);
    this._slotWindow.setActor(actor);
    this._itemWindow.setActor(actor);
};

//冷却判定
Game_Player.prototype.skillwait = function() {

};
//技能冷却
Game_Player.prototype.onskillwait = function(skillid) {
};
//状态判断
Game_Battler.prototype.removeStatesByDamage2 = function() {
    this.states().forEach(function(state) {
        if (state.stepsToRemove && state.priority!= 50 && Math.randomInt(100) < state.priority) {
            this.removeState(state.id);
        }
    }, this);
};
//新的队友系统
Game_Party.prototype.maxBattleMembers = function() {
    return 4;
};
Game_Interpreter.prototype.ExrArmy = function() {
var num = ($gameActors.actor(1).luk-10)/4;
if($gameParty._battleMembers[1])num+=($gameActors.actor($gameParty._battleMembers[1]).luk-10)/8;
if($gameParty._battleMembers[2])num+=($gameActors.actor($gameParty._battleMembers[2]).luk-10)/8;
if($gameParty._battleMembers[3])num+=($gameActors.actor($gameParty._battleMembers[3]).luk-10)/8;
if($gameParty._battleMembers[4])num+=($gameActors.actor($gameParty._battleMembers[4]).luk-10)/8;
if($gameParty._battleMembers[5])num+=($gameActors.actor($gameParty._battleMembers[5]).luk-10)/8;
	return num;
}
//食物腐烂
Game_Party.prototype.footde = function() {
	this.items().forEach(function(item) {
		if(item.note.indexOf("食物") != -1 && item.note.indexOf("不会腐坏") == -1) {
			if(item.id == 15) { //面包变成硬面包
				var num = this.numItems(item);
				this.gainItem($dataItems[14], num);
				this.loseItem(item, num);
			} else {//食物变成腐坏食物
				var num = this.numItems(item);
				this.gainItem($dataItems[16], num);
				this.loseItem(item, num);
			}
		}
	}, this);
};

Game_Interpreter.prototype.deleteArr = function(arr, arr2) {
	if (arr.length>0 && arr2.length>0){
	for(var j = 0; j < arr2.length; j++) {
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] == arr2[j]) {
				arr[i] = 0;
				break;
			}
		};
	};

	for(var y = 0; y < arr.length;) {
		if(arr[y] == 0)arr.splice(y, 1);
		else y++
	};
}
	return arr;
}
//整理数组
Game_Interpreter.prototype.ArrNum = function(arr,obj) {
	var num = 0;
	for (var i = 0;i<arr.length;i++) {
		if(arr[i]==obj)num++;
	}
	return num
}
//商店特殊判定



Game_Interpreter.prototype.alertobj = function(obj) {
	var description = "";
	for(var i in obj) {
		var property = obj[i];
		description += i + " = " + property + "\n";
	}
	alert(description);
}



//商店-完
Game_Interpreter.prototype.ItemPrice = function() {
	//alert(1);
    var rand = 0;
    	for (var i=220;i<240;i++) {
    	rand = (Math.randomInt(21)-10)/100;
    	if($dataItems[i].price < $dataItems[i].speed*0.8)rand = (Math.randomInt(21)-6)/100;
    	if($dataItems[i].price < $dataItems[i].speed*0.6)rand = (Math.randomInt(21)-4)/100;
    	if($dataItems[i].price < $dataItems[i].speed*0.4)rand = (Math.randomInt(21)+2)/100;
    	if($dataItems[i].price < $dataItems[i].speed*0.3)rand = (Math.randomInt(21)+8)/100;
    	//反弹
    	if($dataItems[i].price > $dataItems[i].speed*1.3)rand = (Math.randomInt(21)-12)/100;
    	if($dataItems[i].price > $dataItems[i].speed*1.4)rand = (Math.randomInt(21)-14)/100;
    	if($dataItems[i].price > $dataItems[i].speed*1.6)rand = (Math.randomInt(21)-16)/100;
    	if($dataItems[i].price > $dataItems[i].speed*2.0)rand = (Math.randomInt(21)-17)/100;
    	//回调
    	//if($dataItems[i].price>=100)
    //	{
    	//	if(rand > 0)rand -= $dataItems[i].tpGain/100;
    		//if(rand < 0)rand += $dataItems[i].tpGain/100;
    	
    	//}
    	rand /= $dataItems[i].tpGain;
    	rand += 1+($gameVariables.value(22)/100) / $dataItems[i].tpGain;
    	if($gameVariables.value(23)[0] == i)rand += Math.randomInt(6)/100;
    	if($gameVariables.value(23)[1] == i)rand -= Math.randomInt(6)/100;
    	//利好消息
    	$dataItems[i].successRate = Math.max(0.9,Math.min(1.1,(rand).toFixed(4)));
    	//涨停和跌停
    	if($dataItems[i].price < 20 && $dataItems[i].successRate >= 1)$dataItems[i].price = $dataItems[i].price+2;
    	else $dataItems[i].price = parseInt($dataItems[i].successRate*$dataItems[i].price);
    	
    //	$dataItems[i].description = "今日涨跌："+$dataItems[i].successRate+"\n"+"(货物请找特产商人进行交易)";
    	//if(i==225)alert($dataItems[i].successRate);
    	}
    	DataManager.processHENote($dataItems, 0);
}

//屯兵地
Game_Interpreter.prototype.isShopHash2 = function() {
	var bool = false;
	if($gameParty._itemStorage && $gameParty._itemStorage['S2']) {
		var mapv = $gameVariables.value(445);
		var typev = $gameMap.event(this.eventId()).event().note;
		var obj = {
			map: mapv,
			type: typev
		};
		for(var i = 0; i < $gameVariables.value(446).length; i++) {
			var hash = $gameVariables.value(446)[i];
			if(hash.map == obj.map && hash.type == obj.type) {
				$gameParty._itemStorage['S2'].name = hash.data.name;	
				$gameParty._itemStorage['S2'].money = hash.data.money;	
			    $gameParty._itemStorage['S2'].cap = hash.data.cap;	
				$gameParty._itemStorage['S2'].buyRate = hash.data.buyRate;
				$gameParty._itemStorage['S2'].sellRate = hash.data.sellRate;	
				$gameParty._itemStorage['S2'].storage = hash.item;	
				
				bool = true;
				break;
			}
		}
	}
	return bool;
}
Game_Interpreter.prototype.setShopHash2 = function() {
	var bool = false;
	if($gameParty._itemStorage && $gameParty._itemStorage['S2']) {
		var mapv = $gameVariables.value(445);
		var typev = $gameMap.event(this.eventId()).event().note;
		var obj = {
			map: mapv,
			type: typev
		};
		for(var i = 0; i < $gameVariables.value(446).length; i++) {
			var hash = $gameVariables.value(446)[i];
			if(hash.map == obj.map && hash.type == obj.type) {
				var dataobj = {
					name: $gameParty._itemStorage['S2'].name,
					money: $gameParty._itemStorage['S2'].money,
					cap: $gameParty._itemStorage['S2'].cap,
					buyRate: $gameParty._itemStorage['S2'].buyRate,
					sellRate: $gameParty._itemStorage['S2'].sellRate
				}
				$gameVariables.value(446)[i].data = dataobj;
				$gameVariables.value(446)[i].item = $gameParty._itemStorage['S2'].storage;
				bool = true;
				break;
			}
		}
	}
	return bool;
}
//屯兵-完

//队伍血量
Game_Interpreter.prototype.HpIsBad = function(value) {
	var max = 0;
	var bad = 0;
	for(var i = 0; i < $gameParty.maxBattleMembers(); i++) {
		if($gameParty._battleMembers[i])
               max += 1;
               if($gameActors.actor($gameParty._battleMembers[i]).hp < $gameActors.actor($gameParty._battleMembers[i]).mhp/2)
               bad+=1;
	}
	return bad >= max/value;
}

//增减关系值
Game_Interpreter.prototype.DpsData = function(id) {
var str = "  ";
//for(var i=0;i<$gameParty.maxBattleMembers();i++){
if($gameParty._battleMembers[id]){
var n = $gameActors.actor($gameParty._battleMembers[id])._name;
var a = $gameActors.actor($gameParty._battleMembers[id])._param_g[1][0];//承伤
var b = $gameActors.actor($gameParty._battleMembers[id])._param_g[2][0];//伤害
var c = $gameActors.actor($gameParty._battleMembers[id])._param_g[3][0];//规避
var d = parseInt($gameActors.actor($gameParty._battleMembers[id])._param_g[5][0]);//治疗
str+=n+"："+b+"/";
if(c>0)str+=""+a+"/";else str+=""+a+"/";
str+=""+d+" ";
}
//}
if(str=="0" || str==0)str = "";
return str;
}
Game_Interpreter.prototype.GetShip = function(id) {
	var vid = id+580;
	return $gameVariables.value(vid);
}
Game_Interpreter.prototype.GainShip = function(id,value) {
	var vid = id+580;
	var oldValue = $gameVariables.value(vid);
	$gameVariables.setValue(vid,oldValue+value);
}
Game_Interpreter.prototype.loseShip = function(id,value) {
	var vid = id+580;
	var oldValue = $gameVariables.value(vid);
	$gameVariables.setValue(vid,oldValue-value);
}
Game_Interpreter.prototype.BigloseShip = function(id,value) {
	var vid = id+580;
	var oldValue = $gameVariables.value(vid);
	$gameVariables.setValue(vid,oldValue-value);
	if($gameVariables.value(vid)>=0){
		$gameVariables.setValue(vid,-1);
	}
	$gameTemp.reserveCommonEvent(161);
}
//货物价格变动
Game_Interpreter.prototype.ShopChangeSave = function() {
	var arr = $gameVariables.value(61);
	var price = [];
	for(var i = 220; i <= 240; i++) {	
		if(arr.indexOf(i) == -1) {
			var obj = {
				id: i,
				gold: $dataItems[i].price
			};
			price.push(obj);
			var rate = 2.45;
	//	if ($gameParty.numItems($dataArmors[94])>0 || $gameActors.actor(1).hasArmor($dataArmors[94]))rate+=0.1;
	    $dataItems[i].price *= rate+$gameVariables.value(22)/100;
		if($gameVariables.value(23)[0] == i)$dataItems[i].price*=1.2;
		if($gameVariables.value(23)[1] == i)$dataItems[i].price*=0.7;
		$dataItems[i].price = parseInt($dataItems[i].price);
		}else {
		}
	}
	//for(var i = 0; i < arr.length; i++) {
	//	$dataItems[arr[i]].price *= 0.5;
//	}
	$gameVariables.setValue(61, price);

}
Game_Interpreter.prototype.ShopChangeLoad = function() {
	var arr = $gameVariables.value(61);
	for (var i = 0;i<arr.length;i++) {
		$dataItems[arr[i].id].price=arr[i].gold;
	}
}
//算出当前的任务目标
Game_Interpreter.prototype.NowJobId = function() {
	if($gameVariables.value(171) == 0) $gameVariables.setValue(171, []);
	var jobid = 1;
	if($gameVariables.value(171).length > 0) {
		var arr = $gameVariables.value(171);
         
		for(var i = 0; i < arr.length; i++) {
			if(arr[i]==jobid){
				jobid+=1;
				i=0;
				continue;
			}
		}
	}

	return jobid;
}


//地图名修改
Game_Map.prototype.displayName = function() {
	if($dataMap.displayName!=null && $dataMap.displayName.indexOf('V')!=-1){
		var id = $dataMap.displayName.substr(1,3);
		return $gameVariables.value(id).substring(0,$gameVariables.value(id).length-3);
	}
	return $dataMap.displayName;
};
//数组是否存在
Game_Interpreter.prototype.ARRinid = function(id) {
	var arr = $gameVariables.value(597);
	for (var i = 0;i<arr.length;i++) {
		if(arr[i][0]==id){
			return i;
			break;
		}
	}
	return -1;
}
Game_Interpreter.prototype.ARRdelteid = function(id) {
	var arr = $gameVariables.value(597);
	for (var i = 0;i<arr.length;i++) {
		if(arr[i][0]==id){
			arr.splice(i, 1);
			$gameVariables.setValue(597,arr);
			break;
		}
	}
}
Game_Interpreter.prototype.PlayerIMGArr = function(enemy) {
	var arr = [];
	if(enemy==true)arr = [145,146,147,148,149,150,151,152,80,60,61,62];
	if(enemy==false)arr = [153,154,155,156,157,158,159,160,69,77,81,89];
	if(enemy==null)arr = [165,166,167,168,169,170,171,172,161,162,163,164];
	var id = $gameVariables.value(92);
	if(id==0)arr.splice(0, 1);
	if(id==1)arr.splice(6, 1);
	if(id==2)arr.splice(2, 1);
	if(id==3)arr.splice(1, 1);
	if(id==6)arr.splice(3, 1);
	if(id==7)arr.splice(4, 1);
	if(id==8)arr.splice(5, 1);
	if(id==9)arr.splice(7, 1);
	
	return arr;
}
Game_Interpreter.prototype.PlayerEquip = function() {
var txt = "";
for (var i = 0;i<$gameActors.actor(1).armors().length;i++) {
	if($gameActors.actor(1).armors()[i] != null)
	txt += $dataArmors[$gameActors.actor(1).armors()[i].id].description;
}
if($gameActors.actor(1).weapons()[0] != null)
txt += $dataWeapons[$gameActors.actor(1).weapons()[0].id].description;
return txt;
}