var _jue_uexWidgetOne = uexWidgetOne.prototype.exit;
uexWidgetOne.prototype.exit = function(flag) {
if(!$gameParty.inBattle() && !$gameSwitches.value(122) && $gameVariables.value(92) != 0) {
	$gameSystem.onBeforeSave();
	DataManager.saveGame(1);}
	_jue_uexWidgetOne.call(flag);
};