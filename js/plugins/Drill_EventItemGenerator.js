//=============================================================================
// Drill_EventItemGenerator.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        物体 - 可拾取物生成器
 * @author Drill_up
 * 
 * @param 资源-可拾取物图像
 * @desc 默认可拾取物的图片资源集合。
 * @default ["$金币"]
 * @require 1
 * @dir img/characters/
 * @type file[]
 * 
 * @param 资源-拾取音效
 * @desc 默认可拾取物的拾取的音效。
 * @default ["item3"]
 * @require 1
 * @dir audio/se/
 * @type file[]
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventItemGenerator +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以通过插件指令快速生成可拾取的道具。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用，但是如果与其他插件一起使用，效果会更好。
 * 被扩展：
 *   - Drill_JumpSpeed 物体-跳跃速度
 *     如果使用了该插件，生成的所有道具弹跳的高度速度可以控制。
 *     你可以使用插件指令控制该扩展：
 *       插件指令：>可拾取物生成器 : 弹跳开启 : 5 : 1.00
 *     前一个参数为高度（可为负数），后一个为速度（1.00为标准速度）。
 *     使用插件后，默认 高度+5 ，速度0.80。
 *
 *   - Drill_EventIcon 行走图-图标行走图
 *     如果使用了该插件，生成的所有道具会自动换成图标行走图，默认开启。
 *     金币仍然使用默认图像。
 *     你可以使用插件指令控制该扩展：
 *       插件指令：>可拾取物生成器 : 自动图标行走图开启
 *       插件指令：>可拾取物生成器 : 自动图标行走图关闭
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 2.可拾取道具用纯事件也可以做，只是比较复杂。
 * 3.这里生成的道具，不包括武器、防具。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 生成设置
 * 你可以通过插件指令手动修改生成的一些基本设置。
 *
 * 插件指令：>可拾取物生成器 : 弹跳开启
 * 插件指令：>可拾取物生成器 : 弹跳关闭
 * 插件指令：>可拾取物生成器 : 使用图像 : 1
 * 插件指令：>可拾取物生成器 : 使用音效 : 1
 * 插件指令：>可拾取物生成器 : 使用随机图像 : 1,2,3,4
 * 插件指令：>可拾取物生成器 : 使用随机音效 : 1,2,3,4
 *
 * 说明：
 * 1.如果关闭弹跳，则物品直接出现在目标位置，没有弹跳效果。
 * 2.所有道具默认使用图像1，插件指令可以修改默认使用的图像，对应配置的编号。
 *   拾取音效设置与图像一样。
 * 3.设置随机后，会随机选取其中的一个声音或者图像生成道具。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 生成道具
 * 你可以通过插件指令快速设置生成一个道具拾取事件。
 * 
 * 插件指令：>可拾取物生成器 : 生成道具 : 36 : 1 : 随机方形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成道具 : 36 : 1 : 随机菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成道具 : 36 : 1 : 随机圆形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成道具 : 南瓜 : 1 : 随机方形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成道具 : 南瓜 : 1 : 随机菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成道具 : 南瓜 : 1 : 随机圆形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成道具 : 南瓜 : 1 : 指定位置 : -1 : 3
 *
 * 说明：
 * 1.生成器生成的事件是临时的，离开地图就会消失。
 * 2.生成道具为随机区域时（区域为正数），会在指定的形状内可通行区域随机跳跃。
 * 3.指定位置则表示，根据出生位置开始，按单位图块进行偏移。
 * 4.生成的道具行走图方向全随机，动作全随机。
 * 5.这里生成的道具，不包括武器、防具。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 生成金钱
 * 你可以通过插件指令快速设置生成一个金钱拾取事件。
 *
 * 插件指令：>可拾取物生成器 : 生成金钱 : 23 : 21 : 随机方形区域 : 2
 *
 * 说明：
 * 1.生成器生成的事件是临时的，离开地图就会消失。
 * 2.生成金钱后的两个数字，为随机金钱数的上限与下限。
 * 比如 生成金钱 : 2 : 10 表示拾取金钱事件后，获得2至10的金钱。
 * 
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 测试仪器：   4G 内存，Intel Core i5-2520M CPU 2.5GHz 处理器
 *              Intel(R) HD Graphics 3000 集显 的垃圾笔记本
 *              (笔记本的3dmark综合分：571，鲁大师综合分：48456)
 * 总时段：     20000.00ms左右
 * 对照表：     0.00ms  - 40.00ms （几乎无消耗）
 *              40.00ms - 80.00ms （低消耗）
 *              80.00ms - 120.00ms（中消耗）
 *              120.00ms以上      （高消耗）
 * 工作类型：   单次执行
 * 时间复杂度： o(n)
 * 测试方法：   在物体管理层、地理管理层、镜像管理层放置了宝物弹出箱。
 *              弹出大量道具测试性能。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.由于该插件为单次执行，且不负责控制生成的道具，所以生成的事件的性能
 *   无法追踪，这里可以看做只是生成了一个普通的事件。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了随机图像、音效的功能。
 * [v1.2]
 * 修复了事件过多时切换地图出错的bug。添加了圆形区域设置。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EIG（Event_Item_Generator）
//		临时全局变量	DrillUp.g_EIG_xxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_EIG_xxxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		单次执行
//		时间复杂度		o(n)
//		性能测试因素	125个事件的地图，弹出30个道具
//		性能测试消耗	1.22ms（低于5ms的都是小到无法估计的值）
//		最坏情况		无
//		备注			由于插件都是通过事件复制器生成，而且生成的事件也和事件复制器无关。
//						能感觉到性能有消耗，但是无法定位确定值。
//
//插件记录：
//		★大体框架与功能如下：
//			可拾取物生成器：
//				->随机形状
//				->随机可通行位置
//				->弹跳效果
//				->图标行走图
//				->拾取声音
//				->生成新事件
//
//		★必要注意事项：
//			1.该插件有两个分离的操作，一个是在map里面添加event，另一个是在sprite里面添加贴图。
//			  先有event然后sprite绑定event。
//
//		★其它说明细节：
//			1.先有事件数据，再通过事件数据new事件。
//			2.另外……操作事件内容并不难，难的是事件数据太多了……
//			  可拾取物定义：
//				随机行走图 + 下方触发 + 拾取声音 + 获得道具情况 + 获得金钱情况 + 拾取后消失
//				跳跃速度 + 图标行走图 + mata标签（如果没有，镜面反射会不兼容）
//				道具不能落入不可行走区域
//
//		★存在的问题：
//			1.每多一条可选注释，插件就要多一个额外扩展。需要想办法优化。
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventItemGenerator = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventItemGenerator');
	
	DrillUp.g_EIG_pic = JSON.parse(DrillUp.parameters['资源-可拾取物图像']);
	DrillUp.g_EIG_se = JSON.parse(DrillUp.parameters['资源-拾取音效']);
	

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_EIG_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EIG_pluginCommand.call(this,command, args);
	this.drill_EIG_command(command, args);
};
Game_Interpreter.prototype.drill_EIG_command = function(command, args) {

	if (command === ">可拾取物生成器")  {
		var temp_type = String(args[1]);
		var temp_need_generate = false;
		var temp_event_data = {};
		temp_event_data['tar_x'] = 0;
		temp_event_data['tar_y'] = 0;
		
		if(temp_type == "弹跳开启" ){
			$gameSystem._drill_EIG_need_jump = true;
			if( args[3] != undefined ){
				$gameSystem._drill_EIG_jump_height = Number(args[3]);
				$gameSystem._drill_EIG_jump_speed = Number(args[5]);
			}
		}
		if(temp_type == "弹跳关闭" ){
			$gameSystem._drill_EIG_need_jump = false;
		}
		if(temp_type == "自动图标行走图开启" ){
			$gameSystem._drill_EIG_need_useIcon = true;
		}
		if(temp_type == "自动图标行走图关闭" ){
			$gameSystem._drill_EIG_need_useIcon = false;
		}
		if(temp_type == "使用图像" ){
			var index = Number(args[3]) - 1;
			$gameSystem._drill_EIG_default_img_random = [index];
		}
		if(temp_type == "使用音效" ){
			var index = Number(args[3]) - 1;
			$gameSystem._drill_EIG_default_se_random = [index];
		}
		if(temp_type == "使用随机图像" ){
			var arr = String(args[3]).split(",");
			$gameSystem._drill_EIG_default_img_random = arr;
		}
		if(temp_type == "使用随机音效" ){
			var arr = String(args[3]).split(",");
			$gameSystem._drill_EIG_default_se_random = arr;
		}
		if(temp_type == "生成道具" ){	//$gameSystem.中变量作为长期控制数据确定，而临时数据通过函数传输。
			temp_need_generate = true;
			
			var item_name = String(args[3]);		//道具设置
			var item_num = Number(args[5]);
			var item_id = "";
			var item_icon = "";
			var re = /^\d+$/;
			if( re.test(item_name) ){	//数字
				var item_id = Number(item_name) ;
				if( $dataItems[item_id] != null ){
					//alert(JSON.stringify($dataItems[item_id]));
					item_icon = String( $dataItems[item_id].iconIndex );
					item_name = String( $dataItems[item_id].name );
				}
			}else{		//物品名称
				for( var i = 0; i < $dataItems.length; i++ ){
					if( $dataItems[i] == null ){continue;}
					if( $dataItems[i].name == item_name ){			//根据物品名搜索
						item_icon = String( $dataItems[i].iconIndex );
						item_id = i;
						break;
					}
				}
			}
			temp_event_data['item_id'] = Number(item_id);/*判断物品id与名字情况*/
			temp_event_data['item_name'] = item_name;
			temp_event_data['item_icon'] = item_icon;
			temp_event_data['item_num'] = item_num;
		}
		if(temp_type == "生成金钱" ){
			temp_need_generate = true;
			var a = Number(args[3]);		//金钱设置
			var b = Number(args[5]);
			if(a > b){
				var t = a;
				a = b;
				b = t
			}
			var gold = Math.floor(Math.random()*(b-a+1)) + a ;
			temp_event_data['gold'] = gold;
			
		}
		if( args[7] != undefined ){
			var area_type = String(args[7]);		//区域设置
			if(area_type == "随机方形区域"){
				temp_event_data['tar_type'] = "方形";
				temp_event_data['range'] = Number(args[9]);
			}
			if(area_type == "随机菱形区域"){
				temp_event_data['tar_type'] = "菱形";
				temp_event_data['range'] = Number(args[9]);
			}
			if(area_type == "随机圆形区域"){
				temp_event_data['tar_type'] = "圆形";
				temp_event_data['range'] = Number(args[9]);
			}
			if(area_type == "指定位置"){
				temp_event_data['tar_type'] = "指定位置";
				temp_event_data['tar_x'] = Number(args[9]);
				temp_event_data['tar_y'] = Number(args[11]);
			}
			if(temp_event_data['tar_type'] == undefined){
				temp_event_data['tar_type'] = "指定位置";
				temp_event_data['tar_x'] = 0;
				temp_event_data['tar_y'] = 0;
			}
			
		}
		if( temp_need_generate ){	//生成新事件
			$gameMap.events().forEach(function(event) {
				if (event.eventId() === this._eventId) {	//当前执行插件指令的 事件id
					temp_event_data['org_x'] = event._x;
					temp_event_data['org_y'] = event._y;
					if( temp_event_data['tar_type'] != "指定位置"){
						var av_list = $gameMap.drill_EIG_getAvailablePosList(event._x,event._y,temp_event_data['range'],temp_event_data['tar_type']);
						var ran = av_list[ Math.floor( Math.random()*av_list.length ) ];
						temp_event_data['tar_x'] = ran['x']-event._x;
						temp_event_data['tar_y'] = ran['y']-event._y;
					}
					
					var new_event = $gameMap.drill_EIG_addNewItem( temp_event_data );
					if($gameSystem._drill_EIG_need_jump){
						new_event.jump(temp_event_data['tar_x'],temp_event_data['tar_y']);
					}else{
						new_event.locate(temp_event_data['tar_x'],temp_event_data['tar_y']);
					}
					//new_event.start();
					//alert($gameMap._events.length);
				};
			}, this);	
		}
	};
}
//=============================================================================
// * 变量设置初始化
//=============================================================================
var _drill_EIG_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_drill_EIG_sys_initialize.call(this);
	this._drill_EIG_need_jump = true;
	this._drill_EIG_need_useIcon = true;
	this._drill_EIG_jump_height = 5;
	this._drill_EIG_jump_speed = 0.80;
	this._drill_EIG_default_img_random = [0];
	this._drill_EIG_default_se_random = [0];
}

//=============================================================================
// * 获取指定区域内所有可通行图块
//=============================================================================
Game_Map.prototype.drill_EIG_getAvailablePosList = function( x, y, range, type ) {
	var available_list = [];
	for(var i = x-range ; i <= x+range ; i++){
		for(var j = y-range ; j <= y+range ; j++){
			var events = this.eventsXyNt(i,j);	//获取指定位置的不可通行的事件
			if( type == "方形" ){
available_list.push( {'x':i ,'y':j } );
				//if( this.isValid(i,j) && this.drill_isAnyPassable(i,j) && events.length == 0  ){
					available_list.push( {'x':i ,'y':j } );
		//		}
			}
			if( type == "菱形" && this.distance(x,y,i,j) <= range ){
				if( this.isValid(i,j) && this.drill_isAnyPassable(i,j) && events.length == 0  ){
					available_list.push( {'x':i ,'y':j } );
				}
			}
			if( type == "圆形" && Math.pow( this.deltaX( x, i) ,2) + Math.pow( this.deltaX( y, j) ,2) <= Math.pow(range,2) ){
				if( this.isValid(i,j) && this.drill_isAnyPassable(i,j) && events.length == 0  ){
					available_list.push( {'x':i ,'y':j } );
				}
			}
		}
	}
	if( available_list.length == 0){
		available_list.push( {'x':x ,'y':y } );
	}
	return available_list;
}
//=============================================================================
// * 查看图块可通行情况（isPassable需要指定方向是否可通行，这里任意一个方向可通行则返回true）
//=============================================================================
Game_Map.prototype.drill_isAnyPassable = function( x, y ) {
	return true;
//this.isPassable(x, y, 2)||this.isPassable(x, y, 4)||this.isPassable(x, y, 6)||this.isPassable(x, y, 8);
}

//=============================================================================
// * 添加事件
//=============================================================================
Game_Map.prototype.drill_EIG_addNewItem = function( event_data ) {
	
	//随机数据
	var index_img =  Number($gameSystem._drill_EIG_default_img_random[Math.floor(Math.random()*$gameSystem._drill_EIG_default_img_random.length)]);
	index_img = Math.min( index_img ,DrillUp.g_EIG_pic.length-1 );
	var random_img = DrillUp.g_EIG_pic[index_img];
	
	var index_se = Number($gameSystem._drill_EIG_default_se_random[Math.floor(Math.random()*$gameSystem._drill_EIG_default_se_random.length)]);
	index_se = Math.min( index_se ,DrillUp.g_EIG_se.length-1 );
	var random_se = DrillUp.g_EIG_se[index_se];
	
	//新建数据
	var new_event_data = {
		"name":"可拾取物",
		"note":"",
		"meta":{},	//镜像反射的查找meta的bug修复（其实一直不知道meta的作用）
		"pages":[{
			"conditions":{
				"actorId":1,"actorValid":false,"itemId":1,"itemValid":false,"selfSwitchCh":"A","selfSwitchValid":false,"switch1Id":1,"switch1Valid":false,"switch2Id":1,"switch2Valid":false,"variableId":1,"variableValid":false,"variableValue":0
			},
			"directionFix":false,
			"image":{
				"tileId":0,
				"characterName":random_img,
				"direction": Math.floor(Math.random()*4)*2 +2 ,
				"pattern": Math.floor(Math.random()*3),
				"characterIndex":0
			},
			"list":[
                                {"code":230,"indent":0,"parameters":[60]},
				{"code":250,"indent":0,"parameters":[{"name":random_se,"volume":74,"pitch":100,"pan":0}]},	//音效
				{"code":108,"indent":0,"parameters":[
					"=>跳跃设置 : 高度速度 : "+ String($gameSystem._drill_EIG_jump_height) +
					" : " + String($gameSystem._drill_EIG_jump_speed) 
				]}
				//{"code":126,"indent":0,"parameters":[1,0,0,1]},	//道具
				//{"code":125,"indent":0,"parameters":[0,0,10]},	//金钱
				//{"code":214,"indent":0,"parameters":[]},
				//{"code":0,"indent":0,"parameters":[]}
			],
			"moveFrequency":5,
			"moveRoute":{
				"list":[{"code":0,"parameters":[]}],"repeat":true,"skippable":false,"wait":false
			},
			"moveSpeed":3,
			"moveType":0,
			"priorityType":0,
			"stepAnime":true,
			"through":true,
			"trigger":4,
			"walkAnime":false
		}],
		"x":event_data['org_x'],
		"y":event_data['org_y']
	};
	//填入事件脚本
	var new_list = new_event_data['pages'][0]['list'];
	if( event_data['item_icon'] != undefined && $gameSystem._drill_EIG_need_useIcon && Imported.Drill_EventIcon ){
		var com1 = {"code":108,"indent":0,"parameters":["=>图标行走图 : 设置图标 : "+ event_data['item_icon'] ]} ;
		new_list.push(com1);
	}
	if( event_data['gold'] != undefined ){
		var com2 = {"code":125,"indent":0,"parameters":[0,0,event_data['gold']]} ;
		new_list.push(com2);
	}
	if( event_data['item_id'] != undefined ){
		var com3 = {"code":126,"indent":0,"parameters":[event_data['item_id'],0,0,event_data['item_num']]} ;
		new_list.push(com3);
	}
	new_list.push( {"code":214,"indent":0,"parameters":[]} );
	new_list.push( {"code":0,"indent":0,"parameters":[]} );
	
	//新建事件
	var new_event = $gameMap.drill_newEvent_createEvent( new_event_data );
	
	return new_event;
};

//=============================================================================
// * 	事件容器
//
//		功能：		通过调用主函数，快速新建一个事件。（rmmv的事件移除后，页面信息全部清null，不影响内存）
//		可选项：	无
//		主函数：	$gameMap.drill_newEvent_createEvent( data );
//=============================================================================
if( typeof(_drill_newEvent_event) == "undefined" ){	//防止重复定义

	//==============================
	// ** 地图 - 初始化
	//==============================
	var _drill_newEvent_initialize = Game_Map.prototype.initialize;
	Game_Map.prototype.initialize = function() {
		_drill_newEvent_initialize.call(this);
		this._drill_newEvents_data = [];
	}
	//==============================
	// ** 地图 - 初始化（刷地图时）
	//==============================
	var _drill_newEvent_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function(mapId) {
		_drill_newEvent_setup.call(this,mapId);
		this._drill_newEvents_data = [];
	}
	//==============================
	// ** 地图 - 创建事件
	//==============================
	Game_Map.prototype.drill_newEvent_createEvent = function( data ) {
		var new_id = $dataMap.events.length + this._drill_newEvents_data.length;	//注意，$dataMap 和 $gameMap._events 存在数量不一致的情况
		data['id'] = new_id;
		this._drill_newEvents_data.push(data);
		
		var new_event = new Game_Event(this._mapId, new_id);
		this._events[new_id] = new_event;
		
		SceneManager._scene._spriteset.drill_newEvent_createSprite(new_event);
		return new_event;
	}
	//==============================
	// ** 事件 - 获取数据
	//==============================
	var _drill_newEvent_event = Game_Event.prototype.event;
	Game_Event.prototype.event = function() {
		if( Number(this._eventId) >= $dataMap.events.length ){	//新建的事件id >= map.json本体的事件数量
			for(var i = 0; i< $gameMap._drill_newEvents_data.length; i++){
				if($gameMap._drill_newEvents_data[i]['id'] == this._eventId ){
					return $gameMap._drill_newEvents_data[i];
				}
			}
		}
		return _drill_newEvent_event.call(this);	//地图本体设置的事件
	};
	//==============================
	// ** 事件贴图 - 添加
	//==============================
	Spriteset_Map.prototype.drill_newEvent_createSprite = function(target) {
		this._characterSprites = this._characterSprites || [];
		var len = this._characterSprites.length;
		this._characterSprites[len] = new Sprite_Character(target);
		this._characterSprites[len].update();
		this._tilemap.addChild(this._characterSprites[len]);
	};

}

