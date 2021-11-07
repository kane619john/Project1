//JueW

Game_Interpreter.prototype.jobarr = function(id,war){
//公告任务-苍境
var jobarr1 = [
{
		id: 1,
		type: '歼灭',
		name: '消灭贼匪',
		dif: '7',
		job: "最近的贼匪越来越猖狂了,\n人们联名上报请求解决。\n贼匪大概率会出现在小城周边,\n根据地域可能是白天或晚上出没。",
		locat: Math.randomInt(2)+2,//目标要求
		locatname: '消灭贼匪的部队 剩余',
		locatid: 6,//敌对对象ID
		gold: (Math.randomInt(7)+7)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 2,
		type: '歼灭',
		name: '消灭偷猎者',
		dif: '7',
		job: "偷猎在苍境是一种严重犯法行为,\n请处置一下最近的偷猎者吧。\n偷猎者大多于晚上出现在森林、平原。",
		locat: Math.randomInt(2)+2,//目标要求
		locatname: '消灭偷猎者部队 剩余',
		locatid: 7,//敌对对象ID
		gold: (Math.randomInt(7)+5)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 3,
		type: '歼灭',
		name: '讨伐伏击者',
		dif: '7',
		job: "伏击者是一种会伪装自己形体的可怕魔物,\n最近又传出一些相关的遇袭消息了,\n还请讨伐这些名为伏击者的魔物吧。\n伏击者在晚上出现于纳米蒂兰东侧。",
		locat: 1,//目标要求
		locatname: '讨伐伏击者部队 剩余',
		locatid: 7,//敌对对象ID
		gold: (Math.randomInt(7)+9)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 4,
		type: '歼灭',
		name: '消灭蝙蝠',
		dif: '7',
		job: "蝙蝠是一种令人讨厌的动物,即使如此,\n在苍境王国,偷猎虽然属于犯法,但蝙蝠是例外。\n那么,请帮忙消灭蝙蝠吧。\n蝙蝠一般会在晚上出现。",
		locat: Math.randomInt(2)+2,//目标要求
		locatname: '消灭蝙蝠部队 剩余',
		locatid: 7,//敌对对象ID
		gold: (Math.randomInt(7)+3)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 5,
		type: '歼灭',
		name: '消灭不死者',
		dif: '7',
		job: "战乱不断……一直有不死者诞生也是正常的,\n不死者会在晚上出现于战场附近,\n然后就是清理战场的工作了",
		locat: Math.randomInt(2)+2,//目标要求
		locatname: '消灭不死者部队 剩余',
		locatid: 7,//敌对对象ID
		gold: (Math.randomInt(7)+6)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},

{
		id: 6,
		type: '护送',
		name: '护送信物',
		dif: '3',
		job: "",
		locat: 1,//目标要求
		locatname: '将信物送达目的地',
		locatid: 8,//敌对对象ID
		gold: (Math.randomInt(7)+5)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 7,
		type: '护送',
		name: '护送商人',
		dif: '5',
		job: "",
		locat: 1,//目标要求
		locatname: '将信物送达目的地',
		locatid: 8,//敌对对象ID
		gold: (Math.randomInt(7)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},

] //结束

//公告任务-帝国
var jobarr2 = [
{
		id: 1,
		type: '歼灭',
		name: '消灭贼匪',
		dif: '7',
		job: "最近的贼匪越来越猖狂了,\n人们联名上报请求解决。\n贼匪大概率会出现在小城周边,\n根据地域可能是白天或晚上出没。",
		locat: Math.randomInt(2)+2,//目标要求
		locatname: '消灭贼匪的部队 剩余',
		locatid: 6,//敌对对象ID
		gold: (Math.randomInt(7)+7)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 2,
		type: '歼灭',
		name: '猎捕胖胖',
		dif: '7',
		job: "胖胖的肉总是那么美味,但胖胖也很危险,\n来一场猎捕凸显力量吧。",
		locat: Math.randomInt(2)+1,//目标要求
		locatname: '消灭胖胖部队 剩余',
		locatid: 7,//敌对对象ID
		gold: (Math.randomInt(7)+5)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 3,
		type: '歼灭',
		name: '讨伐伏击者',
		dif: '7',
		job: "伏击者是一种会伪装自己形体的可怕魔物,\n最近又传出一些相关的遇袭消息了,\n还请讨伐这些名为伏击者的魔物吧。\n伏击者在晚上出现于萨洛纳斯附近。",
		locat: 1,//目标要求
		locatname: '讨伐伏击者部队 剩余',
		locatid: 7,//敌对对象ID
		gold: (Math.randomInt(7)+9)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 4,
		type: '歼灭',
		name: '消灭贼匪',
		dif: '7',
		job: "最近的贼匪越来越猖狂了,\n人们联名上报请求解决。\n贼匪大概率会出现在小城周边,\n根据地域可能是白天或晚上出没。",
		locat: Math.randomInt(2)+2,//目标要求
		locatname: '消灭贼匪的部队 剩余',
		locatid: 6,//敌对对象ID
		gold: (Math.randomInt(7)+7)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 5,
		type: '歼灭',
		name: '消灭不死者',
		dif: '7',
		job: "战乱不断……一直有不死者诞生也是正常的,\n不死者会在晚上出现于战场附近,\n然后就是清理战场的工作了",
		locat: Math.randomInt(2)+2,//目标要求
		locatname: '消灭不死者部队 剩余',
		locatid: 7,//敌对对象ID
		gold: (Math.randomInt(7)+6)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 6,
		type: '护送',
		name: '护送信物',
		dif: '3',
		job: "",
		locat: 1,//目标要求
		locatname: '将信物送达目的地',
		locatid: 8,//敌对对象ID
		gold: (Math.randomInt(7)+5)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 7,
		type: '护送',
		name: '护送商人',
		dif: '5',
		job: "",
		locat: 1,//目标要求
		locatname: '将信物送达目的地',
		locatid: 8,//敌对对象ID
		gold: (Math.randomInt(7)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 8,
		type: '歼灭',
		name: '消灭乱军',
		dif: '7',
		job: "有时会出现沦为强盗的叛逃乱军,\n是时候让他们后悔离开军队了。\n小心，他们的实力并不弱。",
		locat: Math.randomInt(2)+1,//目标要求
		locatname: '消灭乱军部队 剩余',
		locatid: 7,//敌对对象ID
		gold: (Math.randomInt(7)+12)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
] //结束

//公告任务-教国
var jobarr3 = [
{
		id: 1,
		type: '歼灭',
		name: '消灭贼匪',
		dif: '7',
		job: "最近的贼匪越来越猖狂了,\n人们联名上报请求解决。\n贼匪大概率会出现在小城周边,\n根据地域可能是白天或晚上出没。",
		locat: Math.randomInt(2)+2,//目标要求
		locatname: '消灭贼匪的部队 剩余',
		locatid: 6,//敌对对象ID
		gold: (Math.randomInt(7)+7)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 2,
		type: '歼灭',
		name: '讨伐眼魔',
		dif: '7',
		job: "眼魔是一种相当危险的怪物……\n放着不管绝对不是明智的选择,\n那么,请将其讨伐吧。\n眼魔会于晚上出现在大坑洞附近。",
		locat: 1,//目标要求
		locatname: '讨伐伏击者部队 剩余',
		locatid: 7,//敌对对象ID
		gold: (Math.randomInt(7)+9)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 3,
		type: '歼灭',
		name: '消灭不死者',
		dif: '7',
		job: "战乱不断……一直有不死者诞生也是正常的,\n不死者会在晚上出现于战场附近,\n然后就是清理战场的工作了",
		locat: Math.randomInt(2)+2,//目标要求
		locatname: '消灭不死者部队 剩余',
		locatid: 7,//敌对对象ID
		gold: (Math.randomInt(7)+6)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 4,
		type: '歼灭',
		name: '消灭腐败者',
		dif: '7',
		job: "腐败者……类似不死者的生物,\n不要抱有任何期待,当做垃圾清扫掉吧。\n它们会于晚上出现在乌伦到达索的平原附近。",
		locat: Math.randomInt(2)+2,//目标要求
		locatname: '消灭腐败者部队 剩余',
		locatid: 7,//敌对对象ID
		gold: (Math.randomInt(7)+5)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 5,
		type: '护送',
		name: '护送信物',
		dif: '3',
		job: "",
		locat: 1,//目标要求
		locatname: '将信物送达目的地',
		locatid: 8,//敌对对象ID
		gold: (Math.randomInt(7)+5)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 6,
		type: '护送',
		name: '护送商人',
		dif: '5',
		job: "",
		locat: 1,//目标要求
		locatname: '将信物送达目的地',
		locatid: 8,//敌对对象ID
		gold: (Math.randomInt(7)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 7,
		type: '歼灭',
		name: '消灭乱军',
		dif: '7',
		job: "有时会出现沦为强盗的叛逃乱军,\n是时候让他们后悔离开军队了。\n小心，他们的实力并不弱。",
		locat: Math.randomInt(2)+1,//目标要求
		locatname: '消灭乱军部队 剩余',
		locatid: 7,//敌对对象ID
		gold: (Math.randomInt(7)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
] //结束

//公告任务-自由同盟
var jobarr4 = [
{
		id: 1,
		type: '歼灭',
		name: '消灭贼匪',
		dif: '7',
		job: "最近的贼匪越来越猖狂了,\n人们联名上报请求解决。\n贼匪大概率会出现在城市周边,\n根据地域可能是白天或晚上出没。",
		locat: Math.randomInt(2)+2,//目标要求
		locatname: '消灭贼匪的部队 剩余',
		locatid: 6,//敌对对象ID
		gold: (Math.randomInt(7)+6)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 2,
		type: '歼灭',
		name: '讨伐眼魔',
		dif: '7',
		job: "眼魔是一种相当危险的怪物……\n放着不管绝对不是明智的选择,\n那么,请将其讨伐吧。\n眼魔会于晚上出现在大坑洞、达索一路往下的地方。",
		locat: 1,//目标要求
		locatname: '讨伐伏击者部队 剩余',
		locatid: 7,//敌对对象ID
		gold: (Math.randomInt(7)+8)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 3,
		type: '歼灭',
		name: '消灭不死者',
		dif: '7',
		job: "战乱不断……一直有不死者诞生也是正常的,\n不死者会在晚上出现于战场附近,\n然后就是清理战场的工作了",
		locat: Math.randomInt(2)+2,//目标要求
		locatname: '消灭不死者部队 剩余',
		locatid: 7,//敌对对象ID
		gold: (Math.randomInt(7)+5)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 4,
		type: '护送',
		name: '护送信物',
		dif: '3',
		job: "",
		locat: 1,//目标要求
		locatname: '将信物送达目的地',
		locatid: 8,//敌对对象ID
		gold: (Math.randomInt(7)+4)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 5,
		type: '护送',
		name: '护送商人',
		dif: '5',
		job: "",
		locat: 1,//目标要求
		locatname: '将信物送达目的地',
		locatid: 8,//敌对对象ID
		gold: (Math.randomInt(7)+9)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 6,
		type: '歼灭',
		name: '打击惩戒军',
		dif: '7',
		job: "为了自由和未来而奋斗！\n想办法消灭一些教国的部队。",
		locat: Math.randomInt(2)+1,//目标要求
		locatname: '消灭惩戒军的部队 剩余',
		locatid: 3,//敌对对象ID
		gold: (Math.randomInt(15)+8)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 7,
		type: '歼灭',
		name: '打击苍天军',
		dif: '7',
		job: "为了自由和未来而奋斗！\n想办法消灭一些王国的部队。",
		locat: Math.randomInt(2)+1,//目标要求
		locatname: '消灭苍天军的部队 剩余',
		locatid: 1,//敌对对象ID
		gold: (Math.randomInt(15)+8)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 8,
		type: '歼灭',
		name: '消灭乱军',
		dif: '7',
		job: "有时会出现沦为强盗的叛逃乱军,\n是时候让他们后悔离开军队了。\n小心，他们的实力并不弱。",
		locat: Math.randomInt(2)+1,//目标要求
		locatname: '消灭乱军部队 剩余',
		locatid: 7,//敌对对象ID
		gold: (Math.randomInt(7)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},

] //结束

//公告任务-玩家势力
var jobarr9 = [
{
		id: 1,
		type: '歼灭',
		name: '消灭贼匪',
		dif: '7',
		job: "最近的贼匪越来越猖狂了,\n人们联名上报请求解决。\n贼匪大概率会出现在城市周边,\n根据地域可能是白天或晚上出没。",
		locat: Math.randomInt(2)+2,//目标要求
		locatname: '消灭贼匪的部队 剩余',
		locatid: 6,//敌对对象ID
		gold: (Math.randomInt(7)+6)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 2,
		type: '歼灭',
		name: '讨伐眼魔',
		dif: '7',
		job: "眼魔是一种相当危险的怪物……\n放着不管绝对不是明智的选择,\n那么,请将其讨伐吧。\n眼魔会于晚上出现在大坑洞、达索一路往下的地方。",
		locat: 1,//目标要求
		locatname: '讨伐伏击者部队 剩余',
		locatid: 7,//敌对对象ID
		gold: (Math.randomInt(7)+8)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 3,
		type: '歼灭',
		name: '消灭不死者',
		dif: '7',
		job: "战乱不断……一直有不死者诞生也是正常的,\n不死者会在晚上出现于战场附近,\n然后就是清理战场的工作了",
		locat: Math.randomInt(2)+2,//目标要求
		locatname: '消灭不死者部队 剩余',
		locatid: 7,//敌对对象ID
		gold: (Math.randomInt(7)+5)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 4,
		type: '护送',
		name: '护送信物',
		dif: '3',
		job: "",
		locat: 1,//目标要求
		locatname: '将信物送达目的地',
		locatid: 8,//敌对对象ID
		gold: (Math.randomInt(7)+4)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 5,
		type: '护送',
		name: '护送商人',
		dif: '5',
		job: "",
		locat: 1,//目标要求
		locatname: '将信物送达目的地',
		locatid: 8,//敌对对象ID
		gold: (Math.randomInt(7)+9)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 6,
		type: '歼灭',
		name: '消灭乱军',
		dif: '7',
		job: "有时会出现沦为强盗的叛逃乱军,\n是时候让他们后悔离开军队了。\n小心，他们的实力并不弱。",
		locat: Math.randomInt(2)+1,//目标要求
		locatname: '消灭乱军部队 剩余',
		locatid: 7,//敌对对象ID
		gold: (Math.randomInt(7)+12)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},

] //结束

//战争任务-苍境
var wararr1 = [
{
		id: 1,
		type: '歼灭',
		name: '打击帝国军',
		dif: '7',
		job: "已经无需多说了吧……总之,\n想办法消灭一些帝国的部队,少不了奖赏。",
		locat: Math.randomInt(2)+1,//目标要求
		locatname: '消灭帝国军的部队 剩余',
		locatid: 2,//敌对对象ID
		gold: (Math.randomInt(15)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 2,
		type: '歼灭',
		name: '打击惩戒军',
		dif: '7',
		job: "已经无需多说了吧……总之,\n想办法消灭一些教国的部队,少不了奖赏。",
		locat: Math.randomInt(2)+1,//目标要求
		locatname: '消灭惩戒军的部队 剩余',
		locatid: 3,//敌对对象ID
		gold: (Math.randomInt(15)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 3,
		type: '袭击',
		name: '袭击帝国村庄',
		dif: '7',
		job: "已经无需多说了吧……总之,\n想办法袭击一个帝国的村庄,少不了奖赏。",
		locat: 1,//目标要求
		locatname: '袭击帝国的村庄 剩余',
		locatid: 2,//敌对对象ID
		gold: (Math.randomInt(15)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 4,
		type: '袭击',
		name: '袭击教国村庄',
		dif: '7',
		job: "已经无需多说了吧……总之,\n想办法袭击一个教国的村庄,少不了奖赏。",
		locat: 1,//目标要求
		locatname: '袭击教国的村庄 剩余',
		locatid: 3,//敌对对象ID
		gold: (Math.randomInt(15)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 5,
		type: '歼灭',
		name: '打击义勇军',
		dif: '7',
		job: "已经无需多说了吧……总之,\n想办法消灭一些自由同盟的部队,少不了奖赏。",
		locat: 1,//目标要求
		locatname: '消灭义勇军的部队 剩余',
		locatid: 4,//敌对对象ID
		gold: (Math.randomInt(15)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 6,
		type: '护送',
		name: '护送宝物',
		dif: '5',
		job: "",
		locat: 1,//目标要求
		locatname: '护送宝物到目标地点',
		locatid: 5,//敌对对象ID
		gold: (Math.randomInt(13)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},


] //结束

//战争任务-帝国
var wararr2 = [
{
		id: 1,
		type: '歼灭',
		name: '打击苍天军',
		dif: '7',
		job: "已经无需多说了吧……总之,\n想办法消灭一些王国的部队,少不了奖赏。",
		locat: Math.randomInt(2)+1,//目标要求
		locatname: '消灭苍天军的部队 剩余',
		locatid: 1,//敌对对象ID
		gold: (Math.randomInt(15)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 2,
		type: '歼灭',
		name: '打击惩戒军',
		dif: '7',
		job: "已经无需多说了吧……总之,\n想办法消灭一些教国的部队,少不了奖赏。",
		locat: Math.randomInt(2)+1,//目标要求
		locatname: '消灭惩戒军的部队 剩余',
		locatid: 3,//敌对对象ID
		gold: (Math.randomInt(15)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 3,
		type: '袭击',
		name: '袭击王国村庄',
		dif: '7',
		job: "已经无需多说了吧……总之,\n想办法袭击一个苍境王国的村庄,少不了奖赏。",
		locat: 1,//目标要求
		locatname: '袭击苍境王国的村庄 剩余',
		locatid: 1,//敌对对象ID
		gold: (Math.randomInt(15)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 4,
		type: '袭击',
		name: '袭击教国村庄',
		dif: '7',
		job: "已经无需多说了吧……总之,\n想办法袭击一个教国的村庄,少不了奖赏。",
		locat: 1,//目标要求
		locatname: '袭击教国的村庄 剩余',
		locatid: 3,//敌对对象ID
		gold: (Math.randomInt(15)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 5,
		type: '歼灭',
		name: '打击调和军',
		dif: '7',
		job: "已经无需多说了吧……总之,\n想办法消灭掉赛瑞尔的部队,少不了奖赏。",
		locat: 1,//目标要求
		locatname: '消灭调和军的部队 剩余',
		locatid: 4,//敌对对象ID
		gold: (Math.randomInt(15)+15)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 6,
		type: '护送',
		name: '护送宝物',
		dif: '5',
		job: "",
		locat: 1,//目标要求
		locatname: '护送宝物到目标地点',
		locatid: 5,//敌对对象ID
		gold: (Math.randomInt(13)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},

] //结束

//战争任务-教国
var wararr3 = [
{
		id: 1,
		type: '歼灭',
		name: '打击苍天军',
		dif: '7',
		job: "已经无需多说了吧……总之,\n想办法消灭一些王国的部队,少不了奖赏。",
		locat: Math.randomInt(2)+1,//目标要求
		locatname: '消灭苍天军的部队 剩余',
		locatid: 1,//敌对对象ID
		gold: (Math.randomInt(15)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 2,
		type: '歼灭',
		name: '打击帝国军',
		dif: '7',
		job: "已经无需多说了吧……总之,\n想办法消灭一些帝国的部队,少不了奖赏。",
		locat: Math.randomInt(2)+1,//目标要求
		locatname: '消灭帝国军的部队 剩余',
		locatid: 2,//敌对对象ID
		gold: (Math.randomInt(15)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 3,
		type: '袭击',
		name: '袭击王国村庄',
		dif: '7',
		job: "已经无需多说了吧……总之,\n想办法袭击一个王国的村庄,少不了奖赏。",
		locat: 1,//目标要求
		locatname: '消灭王国的村庄 剩余',
		locatid: 1,//敌对对象ID
		gold: (Math.randomInt(15)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 4,
		type: '袭击',
		name: '袭击帝国村庄',
		dif: '7',
		job: "已经无需多说了吧……总之,\n想办法袭击一个帝国的村庄,少不了奖赏。",
		locat: 1,//目标要求
		locatname: '消灭帝国的村庄 剩余',
		locatid: 2,//敌对对象ID
		gold: (Math.randomInt(15)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 5,
		type: '歼灭',
		name: '打击调和军',
		dif: '7',
		job: "已经无需多说了吧……总之,\n想办法消灭掉赛瑞尔的部队,少不了奖赏。",
		locat: 1,//目标要求
		locatname: '消灭调和军的部队 剩余',
		locatid: 4,//敌对对象ID
		gold: (Math.randomInt(15)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},
{
		id: 6,
		type: '护送',
		name: '护送宝物',
		dif: '5',
		job: "",
		locat: 1,//目标要求
		locatname: '护送宝物到目标地点',
		locatid: 5,//敌对对象ID
		gold: (Math.randomInt(25)+10)*100,
		gitem: [57,67,68,69,39][Math.randomInt(5)]//道具目标
},

] //结束


if(!war){
	if(id==1)return jobarr1;
	if(id==2)return jobarr2;
	if(id==3)return jobarr3;
	if(id==4)return jobarr4;
	if(id==9)return jobarr9;
}
	if(id==1)return wararr1;
	if(id==2)return wararr2;
	if(id==3)return wararr3;
}

//城市获取
Game_Map.prototype.ciy = function() {
var nowciy = $gameVariables.value(445).substring(0,$gameVariables.value(445).length-3);
var ciys = ["米达兰顿","萨班纳","赛尔","拿波","纳米蒂亚","洛里亚","库拉波特",
"布哈拉顿","赛瑞尔","乌伦","达索","布里扎罗","阿拉瑞克","塞克纳","伊尔瑞姆","西尔达克",
"布鲁姆","加姆","萨洛纳斯","里昂","乌里苏亚","安巴尔洛特","巴雷尔","南兹"];
for (var i = 0;i<ciys.length;i++) {
	if(nowciy == ciys[i]){
		ciys.splice(i,1);
		break;
	}
}
var r = Math.randomInt(ciys.length);
return ciys[r];
};
//emmm
Window_Base.prototype.drawActorNickname = function(actor, x, y, width) {
    width = width || 270;
    
    this.changeTextColor(this.systemColor());
    this.drawText("名望：", x+20, y, width);
    this.resetTextColor();
    this.drawText(actor.exp2(), x+100, y, width);
};
//
//exp2
Game_Actor.prototype.exp2 = function() {
	return parseInt($gameActors.actor(1).currentExp()* 1.25);
}
//
//获取任务
Game_Interpreter.prototype.newjob = function(id,war) {
	
	
    var arr = this.jobarr(id,war);
    var obj = arr[Math.randomInt(arr.length)];

	if(obj.name=='护送信物'){
		var cname = $gameMap.ciy();
		obj.job = "有一份信物需要紧急送到"+cname+",\n拜托了。";
		obj.name += "到"+cname;
 	}
	if(obj.name=='护送宝物'){
		var cname = $gameMap.ciy();
		obj.job = "有一份宝物需要紧急送到"+cname+",\n具体是什么就不要问了,但事先说好,\n这将有可能遇到危险,记得做好准备。";
		obj.name += "到"+cname;
 	}
	if(obj.name=='护送商人'){
		var cname = $gameMap.ciy();
		obj.job = "你需要护送一个商人到"+cname+",\n他似乎还被贼匪一类的人盯上了,\n恐怕不会是一件简单的差事。";
		obj.name += "到"+cname;
 	}
	obj.from = $gameVariables.value(445).substring(0,$gameVariables.value(445).length-3)+$gameMap.event(this.eventId()).event().note;
	return obj;
}
//判断一个数组中某元素的数量
Game_Interpreter.prototype.Arrnum = function(arr,value) {
	var num = 0;
	for (var i = 0;i<arr.length;i++) {
		if(arr[i]==value)num++;
	}
	return num;
}
//存放的情况
Window_ShopCommand.prototype.makeCommandList = function() {
	if($gameSwitches.value(29)){
    this.addCommand('取出',    'buy');
    this.addCommand('存入',   'sell',   !this._purchaseOnly);
  }
	else {
    this.addCommand(TextManager.buy,    'buy');
    this.addCommand(TextManager.sell,   'sell',   !this._purchaseOnly);
	}
    this.addCommand(TextManager.cancel, 'cancel');
};