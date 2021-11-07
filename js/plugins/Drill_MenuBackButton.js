//=============================================================================
// Drill_MenuBackButton.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        主菜单 - 返回按钮
 * @author Drill_up
 * 
 * @help  
 * =============================================================================
 * +++ Drill_MenuBackButton +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在任意菜单中放置返回按钮，只要关键字对上。
 * 要了解更详细的组合方法，去看看"多层组合背景,粒子,魔法圈,gif,视频.docx"。
 * ★★必须放在 各菜单界面、菜单插件 的前面★★
 * ★★自带背景的菜单插件可能不起作用，因为那个插件自己设置了底图★★
 * 【支持插件关联资源的打包、加密】
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   固定放置在菜单前面层。
 * 2.返回按钮与菜单背景、粒子、gif原理一样，默认所有菜单都有返回按钮。
 * 3.注意，并不是所有菜单都可以有返回按钮。角色选择界面就不能有，要隐藏。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__layer_backBtn （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__layer_backBtn文件夹！
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 返回按钮1 资源-返回按钮
 * 返回按钮2 资源-返回按钮
 * 返回按钮3 资源-返回按钮
 * ……
 *
 * 所有素材都放在Menu__layer_backBtn文件夹下。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制菜单返回按钮的显示情况：
 * 
 * 插件指令： >菜单返回按钮 : 2 : 显示
 * 插件指令： >菜单返回按钮 : 2 : 隐藏
 *
 * 1.数字表示返回按钮对应配置的编号。
 * 2.你可以在同一个界面添加多个不同样式的返回按钮。
 *
 * -----------------------------------------------------------------------------
 * ----界面与返回按钮关系表
 * 
 * 可设置   关键字            关系界面
 *  √       Menu             （主菜单界面） 
 *  √       Item             （道具界面） 
 *  √       Skill            （技能界面）
 *  √       Equip            （装备界面） 
 *  √       Status           （状态界面） 
 *  √       Formation        （队形界面） 
 *  √       Options          （选项界面） 
 *  √       Save             （保存界面） 
 *  √       Shop             （商店界面） 
 *  √       GameEnd          （游戏结束选择界面）
 *
 *  √       EnemyBook        （敌人图鉴界面）
 *  √       ItemBook         （道具图鉴界面）
 *  √       Picture_Gallery  （画廊界面）
 *  x       Music_Book       （音乐书界面）
 *  x       Fast_Travel      （世界地图界面）
 *  x       CharSelect       （角色选择界面）
 *
 *  √       Selfplate_A      （全自定义信息面板A）
 *  √       Lagomoro_Mission （小优任务界面）
 *  √       Synthesis        （YEP物品合成界面）
 *  √       Quest            （YEP任务系统界面）
 *
 * 配置返回按钮关键字时，不要忘了加"Scene_"前缀！
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了鼠标高亮在浏览器中玩的错位问题。
 * [v1.2]
 * 修改了插件关联的资源文件夹。
 *
 *
 * @param ----默认按钮----
 * @default 
 *
 * @param 是否使用默认按钮
 * @parent ----默认按钮----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc 所有菜单都会使用默认的按钮。只要指定菜单未设置自己的底图。
 * @default true
 *
 * @param 资源-默认返回按钮
 * @parent ----默认按钮----
 * @default ["返回按钮-默认"]
 * @require 1
 * @dir img/Menu__layer_backBtn/
 * @type file[]
 *
 * @param 默认帧间隔
 * @parent ----默认按钮----
 * @type number
 * @min 1
 * @desc 返回按钮每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 默认是否倒放
 * @parent ----默认按钮----
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param 平移-默认返回按钮 X
 * @parent ----默认按钮----
 * @desc x轴方向平移，单位像素。0为圈的圆心贴在最左边。
 * @default 40
 *
 * @param 平移-默认返回按钮 Y
 * @parent ----默认按钮----
 * @desc x轴方向平移，单位像素。0为圈的圆心贴在最上面。
 * @default 125
 *
 * @param 默认返回按钮起点 X
 * @parent ----默认按钮----
 * @desc 按钮初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default -60
 *
 * @param 默认返回按钮起点 Y
 * @parent ----默认按钮----
 * @desc 按钮初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 默认返回按钮移动时长
 * @parent ----默认按钮----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 20
 *
 * @param 默认按钮透明度
 * @parent ----默认按钮----
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 默认混合模式
 * @parent ----默认按钮----
 * @type number
 * @min 0
 * @max 16
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"pixi的渲染混合模式"。
 * @default 0
 *
 * @param 默认图片层级
 * @parent ----默认按钮----
 * @type number
 * @min 0
 * @desc 背景在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 20
 *
 * @param 默认是否显示高亮
 * @parent ----默认按钮----
 * @type boolean
 * @on 高亮
 * @off 不高亮
 * @desc true - 高亮，false - 不高亮，鼠标靠近按钮时，按钮会高亮。
 * @default true
 *
 * @param 默认高亮模式
 * @parent 默认是否显示高亮
 * @type select
 * @option 图片切换
 * @value 图片切换
 * @option 图片叠加
 * @value 图片叠加
 * @desc 切换，鼠标靠近时，按钮直接换成高亮的图片。如果为叠加，则直接在按钮上加资源图片。
 * @default 图片叠加
 *
 * @param 资源-默认高亮图片
 * @parent 默认是否显示高亮
 * @desc 返回按钮高亮的图片资源。
 * @default 返回按钮-高亮图片
 * @require 1
 * @dir img/Menu__layer_backBtn/
 * @type file
 *
 * @param 默认是否显示按下情况
 * @parent ----默认按钮----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示，鼠标按下按钮时，会留有几帧显示按钮按下的情况。
 * @default true
 *
 * @param 资源-默认按下图片
 * @parent 默认是否显示按下情况
 * @desc 返回按钮按下的图片资源。
 * @default 返回按钮-按下图片
 * @require 1
 * @dir img/Menu__layer_backBtn/
 * @type file
 *
 * @param ----新增按钮----
 * @default 
 *
 * @param 返回按钮-1
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-2
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-3
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-4
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-5
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-6
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-7
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-8
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-9
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-10
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-11
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-12
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-13
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-14
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-15
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-16
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-17
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-18
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-19
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-20
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-21
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-22
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-23
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-24
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-25
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-26
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-27
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-28
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-29
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-30
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-31
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-32
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-33
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-34
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-35
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-36
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-37
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-38
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-39
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-40
 * @parent ----新增按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * 
 */
/*~struct~BackButton:
 * 
 * @param 标记
 * @desc 用于区分你设置的颜色的说明注释，脚本中不起作用。
 * @default ==新的返回按钮==
 *
 * @param 所属菜单
 * @type select
 * @option 主菜单
 * @value 主菜单
 * @option 道具
 * @value 道具
 * @option 技能
 * @value 技能
 * @option 装备
 * @value 装备
 * @option 状态
 * @value 状态
 * @option 队形
 * @value 队形
 * @option 选项
 * @value 选项
 * @option 保存
 * @value 保存
 * @option 商店
 * @value 商店
 * @option 游戏结束
 * @value 游戏结束
 * @option 敌人图鉴
 * @value 敌人图鉴
 * @option 道具图鉴
 * @value 道具图鉴
 * @option 画廊
 * @value 画廊
 * @option 自定义
 * @value 自定义
 * @desc 将返回按钮放在指定的菜单。如果为自定义的菜单，那么要填写自定义关键字。
 * @default 主菜单
 * 
 * @param 自定义关键字
 * @parent 所属菜单
 * @desc 设置所属菜单为自定义时，将根据此关键字找到对应的菜单。前缀为Scene_，比如：Scene_Synthesis。
 * @default 
 *
 * @param 初始是否显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 资源-返回按钮
 * @desc 返回按钮的图片资源。
 * @default ["返回按钮-默认"]
 * @require 1
 * @dir img/Menu__layer_backBtn/
 * @type file[]
 *
 * @param 帧间隔
 * @type number
 * @min 1
 * @desc 返回按钮每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param 平移-返回按钮 X
 * @desc x轴方向平移，单位像素。0为圈的圆心贴在最左边。
 * @default 0
 *
 * @param 平移-返回按钮 Y
 * @desc x轴方向平移，单位像素。0为圈的圆心贴在最上面。
 * @default 0
 *
 * @param 返回按钮起点 X
 * @desc 按钮初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default -60
 *
 * @param 返回按钮起点 Y
 * @desc 按钮初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 返回按钮移动时长
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 20
 *
 * @param 透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
 * @type number
 * @min 0
 * @max 16
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"pixi的渲染混合模式"。
 * @default 0
 *
 * @param 图片层级
 * @type number
 * @min 0
 * @desc 背景在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 20
 *
 * @param 是否显示高亮
 * @type boolean
 * @on 高亮
 * @off 不高亮
 * @desc true - 高亮，false - 不高亮，鼠标靠近按钮时，按钮会高亮。
 * @default true
 *
 * @param 高亮模式
 * @parent 是否显示高亮
 * @type select
 * @option 图片切换
 * @value 图片切换
 * @option 图片叠加
 * @value 图片叠加
 * @desc 切换，鼠标靠近时，按钮直接换成高亮的图片。如果为叠加，则直接在按钮上加资源图片。
 * @default 图片叠加
 *
 * @param 资源-高亮图片
 * @parent 是否显示高亮
 * @desc 返回按钮高亮的图片资源。
 * @default 返回按钮-高亮图片
 * @require 1
 * @dir img/Menu__layer_backBtn/
 * @type file
 *
 * @param 是否显示按下情况
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示，鼠标按下按钮时，会留有几帧显示按钮按下的情况。
 * @default true
 *
 * @param 资源-按下图片
 * @parent 是否显示按下情况
 * @desc 返回按钮按下的图片资源。
 * @default 返回按钮-按下图片
 * @require 1
 * @dir img/Menu__layer_backBtn/
 * @type file
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MBB（Menu_Back_Button）
//		临时全局变量	DrillUp.xxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//插件记录：
//		代码原理实际上就是菜单gif的改进。
//		（只不过，要考虑的东西更多……并且更多细节了）
//
//		这个插件一样，必须放在所有菜单插件前面。放后面会出现半覆写的奇怪bug。
//
//		鼠标和触屏需要考虑html的基本情况：靠近、按下、释放
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MenuBackButton = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MenuBackButton');
	
	DrillUp.menu_default_backbtn = {};
	DrillUp.menu_default_backbtn['visible'] = String(DrillUp.parameters["是否使用默认按钮"] || "true") == "true";
	DrillUp.menu_default_backbtn['interval'] = Number(DrillUp.parameters["默认帧间隔"] || 4);
	DrillUp.menu_default_backbtn['back_run'] = String(DrillUp.parameters["默认是否倒放"] || "false") == "true";
	DrillUp.menu_default_backbtn['x'] = Number(DrillUp.parameters["平移-默认返回按钮 X"] || 0);
	DrillUp.menu_default_backbtn['y'] = Number(DrillUp.parameters["平移-默认返回按钮 Y"] || 0);
	DrillUp.menu_default_backbtn['slide_x'] = Number(DrillUp.parameters["默认返回按钮起点 X"] || 0);
	DrillUp.menu_default_backbtn['slide_y'] = Number(DrillUp.parameters["默认返回按钮起点 Y"] || 0);
	DrillUp.menu_default_backbtn['slide_time'] = Number(DrillUp.parameters["默认返回按钮移动时长"] || 20);
	DrillUp.menu_default_backbtn['opacity'] = Number(DrillUp.parameters["默认按钮透明度"] || 255);
	DrillUp.menu_default_backbtn['blendMode'] = Number(DrillUp.parameters["默认混合模式"] || 0);
	DrillUp.menu_default_backbtn['zIndex'] = Number(DrillUp.parameters["默认图片层级"] || 20);
	DrillUp.menu_default_backbtn['highlight'] = String(DrillUp.parameters["默认是否显示高亮"] || "true") == "true";
	DrillUp.menu_default_backbtn['highlight_mode'] = String(DrillUp.parameters["默认高亮模式"] || "图片叠加");
	DrillUp.menu_default_backbtn['highlight_src_img'] = String(DrillUp.parameters["资源-默认高亮图片"] );
	DrillUp.menu_default_backbtn['pushdown'] = String(DrillUp.parameters["默认是否显示按下情况"] || "true") == "true";
	DrillUp.menu_default_backbtn['pushdown_src_img'] = String(DrillUp.parameters["资源-默认按下图片"] );
	DrillUp.menu_default_backbtn['src_img'] = JSON.parse(DrillUp.parameters["资源-默认返回按钮"]);
	DrillUp.menu_default_backbtn['src_bitmaps'] = [];
	
	DrillUp.menu_backbtns_max = 40;
	DrillUp.menu_backbtns = [];
	
	for (var i = 0; i < DrillUp.menu_backbtns_max; i++) {
		if( DrillUp.parameters['返回按钮-' + String(i+1) ] != "" ){
			DrillUp.menu_backbtns[i] = JSON.parse(DrillUp.parameters['返回按钮-' + String(i+1) ]);
			DrillUp.menu_backbtns[i]['visible'] = String(DrillUp.menu_backbtns[i]["初始是否显示"] || "true") == "true";
			DrillUp.menu_backbtns[i]['menu'] = DrillUp.menu_backbtns[i]["所属菜单"];
			DrillUp.menu_backbtns[i]['menu_key'] = DrillUp.menu_backbtns[i]["自定义关键字"];
			DrillUp.menu_backbtns[i]['interval'] = Number(DrillUp.menu_backbtns[i]["帧间隔"]);
			DrillUp.menu_backbtns[i]['back_run'] = String(DrillUp.menu_backbtns[i]["是否倒放"] || "false") == "true";
			DrillUp.menu_backbtns[i]['x'] = Number(DrillUp.menu_backbtns[i]["平移-返回按钮 X"]);
			DrillUp.menu_backbtns[i]['y'] = Number(DrillUp.menu_backbtns[i]["平移-返回按钮 Y"]);
			DrillUp.menu_backbtns[i]['slide_x'] = Number(DrillUp.menu_backbtns[i]["返回按钮起点 X"] || 0);
			DrillUp.menu_backbtns[i]['slide_y'] = Number(DrillUp.menu_backbtns[i]["返回按钮起点 Y"] || 0);
			DrillUp.menu_backbtns[i]['slide_time'] = Number(DrillUp.menu_backbtns[i]["返回按钮移动时长"] || 20);
			DrillUp.menu_backbtns[i]['opacity'] = Number(DrillUp.menu_backbtns[i]["透明度"]);
			DrillUp.menu_backbtns[i]['blendMode'] = Number(DrillUp.menu_backbtns[i]["混合模式"]);
			DrillUp.menu_backbtns[i]['zIndex'] = Number(DrillUp.menu_backbtns[i]["图片层级"] || 20);
			DrillUp.menu_backbtns[i]['highlight'] = String(DrillUp.menu_backbtns[i]["是否显示高亮"] || "true") == "true";
			DrillUp.menu_backbtns[i]['highlight_mode'] = String(DrillUp.menu_backbtns[i]["高亮模式"] || "图片叠加");
			DrillUp.menu_backbtns[i]['highlight_src_img'] = String(DrillUp.menu_backbtns[i]["资源-高亮图片"] );
			DrillUp.menu_backbtns[i]['pushdown'] = String(DrillUp.menu_backbtns[i]["是否显示按下情况"] || "true") == "true";
			DrillUp.menu_backbtns[i]['pushdown_src_img'] = String(DrillUp.menu_backbtns[i]["资源-按下图片"] );
			DrillUp.menu_backbtns[i]['src_img'] = JSON.parse(DrillUp.menu_backbtns[i]["资源-返回按钮"]);
			DrillUp.menu_backbtns[i]['src_bitmaps'] = [];
			
			//alert(JSON.stringify(DrillUp.menu_backbtns[i]['src_img']));
		}else{
			DrillUp.menu_backbtns[i] = [];
		}
	}
	//alert(JSON.strinbackbtny(DrillUp.menu_backbtns[0]));
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MenuBackBtn = function(filename) {
    return this.loadBitmap('img/Menu__layer_backBtn/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_menu_backbtns_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_menu_backbtns_pluginCommand.call(this, command, args);
	if (command === '>菜单返回按钮') {
		if(args.length == 4){
			var temp1 = Number(args[1]) - 1;
			var type = String(args[3]);
			if (type === '显示') {
				if( !$gameSystem._drill_sprite_backbtns_visible ){ $gameSystem.drill_backbtnVarInit();}
				$gameSystem._drill_sprite_backbtns_visible[temp1] = true;
			}
			if (type === '隐藏') {
				if( !$gameSystem._drill_sprite_backbtns_visible ){ $gameSystem.drill_backbtnVarInit();}
				$gameSystem._drill_sprite_backbtns_visible[temp1] = false;
			}
		}
	}
};


//=============================================================================
// ** 从 Scene_MenuBase 中进行backbtn追加
//=============================================================================

var _drill_menu_backbtn_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
	SceneManager._drill_menu_backbtn = false;	
   	this._drill_sprite_backbtns = [];
	this._drill_sprite_backbtns_highlight = [];
	this._drill_sprite_backbtns_pushdown = [];
   	this._drill_sprite_backbtns_data = [];
	if( !$gameSystem._drill_sprite_backbtns_visible ){ $gameSystem.drill_backbtnVarInit();}
	_drill_menu_backbtn_createBackground.call(this);		//与背景一同创建
};

var _drill_menu_backbtn_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function() {
	_drill_menu_backbtn_terminate.call(this);			//设置需要下次重新创建
	SceneManager._drill_menu_backbtn = false;
};

Game_System.prototype.drill_backbtnVarInit = function() {	//显示数据初始化
	$gameSystem._drill_sprite_backbtns_visible = [];
	for(var i = 0; i< DrillUp.menu_backbtns.length ;i++){
		$gameSystem._drill_sprite_backbtns_visible[i] = DrillUp.menu_backbtns[i]['visible'];
	}
};

//==============================
// ** 层级排序（公用的方法，即使没有_backgroundSprite，也不能去掉）
//==============================
Scene_MenuBase.prototype.drill_sortByZIndex = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};

//==============================
// * 创建backbtn
//==============================
Scene_MenuBase.prototype.drill_createbackbtns = function() {	
	SceneManager._drill_menu_backbtn = true;
	
	if(!this._drill_sprite_backbtns){
		this._drill_sprite_backbtns = [];		//防止某些覆写的菜单报错
		this._drill_sprite_backbtns_highlight = [];
		this._drill_sprite_backbtns_pushdown = [];
		this._drill_sprite_backbtns_data = [];
	}
	if( !this._foregroundSprite ){		//菜单前面层
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);
	}
	if( !$gameSystem._drill_sprite_backbtns_visible ){ $gameSystem.drill_backbtnVarInit();}
	
	for (var i = 0; i < DrillUp.menu_backbtns_max; i++) {
		if( this.drill_checkbackbtns(i) ){
			var temp_sprite_data = JSON.parse(JSON.stringify( DrillUp.menu_backbtns[i] ));	//拷贝object（杜绝引用造成的修改）
			
			for(var j = 0; j < temp_sprite_data['src_img'].length ; j++){
				temp_sprite_data['src_bitmaps'].push(ImageManager.load_MenuBackBtn(temp_sprite_data['src_img'][j]));
			}
			
			var temp_sprite = new Sprite();
			temp_sprite.bitmap = temp_sprite_data['src_bitmaps'][0];
			temp_sprite._time = 0;
			temp_sprite._move = 0;
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0.5;
			temp_sprite.x = temp_sprite_data['x'] + temp_sprite_data['slide_x'];
			temp_sprite.y = temp_sprite_data['y'] + temp_sprite_data['slide_y'];
			temp_sprite._org_x = temp_sprite.x;
			temp_sprite._org_y = temp_sprite.y;
			temp_sprite.opacity = 0;
			temp_sprite.blendMode = temp_sprite_data['blendMode'];
			temp_sprite.zIndex = temp_sprite_data['zIndex'];
			temp_sprite.visible = $gameSystem._drill_sprite_backbtns_visible[i];
			
			var temp_highlight = new Sprite();
			temp_highlight.bitmap = ImageManager.load_MenuBackBtn(temp_sprite_data['highlight_src_img']);
			temp_highlight.anchor.x = 0.5;
			temp_highlight.anchor.y = 0.5;
			temp_highlight.visible = false;
			temp_highlight._touched = false;
			temp_sprite.addChild(temp_highlight);
			this._drill_sprite_backbtns_highlight.push(temp_highlight);
			var temp_pushdown = new Sprite();
			temp_pushdown.bitmap = ImageManager.load_MenuBackBtn(temp_sprite_data['pushdown_src_img']);
			temp_pushdown.anchor.x = 0.5;
			temp_pushdown.anchor.y = 0.5;
			temp_pushdown.visible = false;
			temp_pushdown._needPopScene = false;
			temp_sprite.addChild(temp_pushdown);
			this._drill_sprite_backbtns_pushdown.push(temp_pushdown);
			
			this._drill_sprite_backbtns.push(temp_sprite);
			this._drill_sprite_backbtns_data.push(temp_sprite_data);
			this._foregroundSprite.addChild(temp_sprite);
		}
	}
	if(this._drill_sprite_backbtns.length == 0 && DrillUp.menu_default_backbtn['visible'] ){	//使用默认按钮
		var temp_sprite_data = JSON.parse(JSON.stringify( DrillUp.menu_default_backbtn ));	//拷贝object（杜绝引用造成的修改）
		//alert(temp_sprite_data);
		
		for(var j = 0; j < temp_sprite_data['src_img'].length ; j++){
			temp_sprite_data['src_bitmaps'].push(ImageManager.load_MenuBackBtn(temp_sprite_data['src_img'][j]));
		}
		
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = temp_sprite_data['src_bitmaps'][0];
		temp_sprite._time = 0;
		temp_sprite._move = 0;
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
		temp_sprite.x = temp_sprite_data['x'] + temp_sprite_data['slide_x'];
		temp_sprite.y = temp_sprite_data['y'] + temp_sprite_data['slide_y'];
		temp_sprite._org_x = temp_sprite.x;
		temp_sprite._org_y = temp_sprite.y;
		temp_sprite.opacity = 0;
		temp_sprite.blendMode = temp_sprite_data['blendMode'];
		temp_sprite.zIndex = temp_sprite_data['zIndex'];
		
		var temp_highlight = new Sprite();
		temp_highlight.bitmap = ImageManager.load_MenuBackBtn(temp_sprite_data['highlight_src_img']);
		temp_highlight.anchor.x = 0.5;
		temp_highlight.anchor.y = 0.5;
		temp_highlight.visible = false;
		temp_highlight._touched = false;
		temp_sprite.addChild(temp_highlight);
		this._drill_sprite_backbtns_highlight.push(temp_highlight);
		var temp_pushdown = new Sprite();
		temp_pushdown.bitmap = ImageManager.load_MenuBackBtn(temp_sprite_data['pushdown_src_img']);
		temp_pushdown.anchor.x = 0.5;
		temp_pushdown.anchor.y = 0.5;
		temp_pushdown.visible = false;
		temp_pushdown._needPopScene = false;
		temp_sprite.addChild(temp_pushdown);
		this._drill_sprite_backbtns_pushdown.push(temp_pushdown);
		
		this._drill_sprite_backbtns.push(temp_sprite);
		this._drill_sprite_backbtns_data.push(temp_sprite_data);
		this._foregroundSprite.addChild(temp_sprite);
	}
	
	this.drill_sortByZIndex();
};

//==============================
// * 检查backbtn所在菜单
//==============================
Scene_MenuBase.prototype.drill_checkbackbtns = function(i) {
	var temp_sprite_data = DrillUp.menu_backbtns[i] ; 	//注意，执行该方法，是在DrillUp.menu_backbtns中遍历
	if ( temp_sprite_data === undefined || temp_sprite_data.length == 0  ) {
		return false;	
	}
	if( SceneManager._scene.constructor.name === "Scene_Menu" && temp_sprite_data['menu'] == "主菜单" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Item" && temp_sprite_data['menu'] == "道具" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Skill" && temp_sprite_data['menu'] == "技能" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Equip" && temp_sprite_data['menu'] == "装备" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Status" && temp_sprite_data['menu'] == "状态" ){
		return true;
	}else if( (SceneManager._scene.constructor.name === "Scene_Party"||SceneManager._scene.constructor.name === "Scene_Formation") && temp_sprite_data['menu'] == "队形"  ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Options" && temp_sprite_data['menu'] == "选项" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Save" && temp_sprite_data['menu'] == "保存" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Shop" && temp_sprite_data['menu'] == "商店" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_GameEnd" && temp_sprite_data['menu'] == "游戏结束" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_EnemyBook" && temp_sprite_data['menu'] == "敌人图鉴" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_ItemBook" && temp_sprite_data['menu'] == "物品图鉴" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Picture_Gallery" && temp_sprite_data['menu'] == "画廊" ){
		return true;
	}else{
		if( SceneManager._scene.constructor.name === temp_sprite_data['menu_key'] ){
			return true;
		}
	}
	return false;
};

//==============================
// * 刷新backbtn
//==============================
var _drill_menu_backbtn_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_menu_backbtn_update.call(this);
	
	if ( SceneManager.isCurrentSceneStarted() && !SceneManager._drill_menu_backbtn ) {
		this.drill_createbackbtns();				//创建，进入界面后只执行一次
	}
	if (SceneManager._drill_menu_backbtn) { this.drill_updatebackbtns();  }
};

Scene_MenuBase.prototype.drill_updatebackbtns = function() {
	for (var i = 0; i < this._drill_sprite_backbtns.length; i++) {
		var t_backbtn = this._drill_sprite_backbtns[i];
		var t_highlight = this._drill_sprite_backbtns_highlight[i];
		var t_pushdown = this._drill_sprite_backbtns_pushdown[i];
		var t_backbtn_data = this._drill_sprite_backbtns_data[i];
		
		//移动到指定位置
		t_backbtn._move += 1;
		if(t_backbtn._move < t_backbtn_data['slide_time']){
			t_backbtn.x -= t_backbtn_data['slide_x']/ t_backbtn_data['slide_time'];
			t_backbtn.y -= t_backbtn_data['slide_y']/ t_backbtn_data['slide_time'];
			t_backbtn.opacity += t_backbtn_data['opacity']/ t_backbtn_data['slide_time'];
		}
		
		//播放按钮动画
		t_backbtn._time += 1;
		var inter = this._drill_sprite_backbtns[i]._time ;
		inter = inter / t_backbtn_data['interval'];
		inter = inter % t_backbtn_data['src_bitmaps'].length;
		if(t_backbtn_data['back_run']){
			inter = t_backbtn_data['src_bitmaps'].length - 1 - inter;
		}
		inter = Math.floor(inter);
		t_backbtn.bitmap = t_backbtn_data['src_bitmaps'][inter];
		
		//高亮控制
		if( this.drill_isOnHighlight(t_backbtn) && t_backbtn_data['highlight'] ){
			if( t_backbtn_data['highlight_mode'] == "图片切换" ){
				t_backbtn.bitmap = null;
			}
			if( t_highlight._touched == false ){
				t_highlight.visible = true;
				t_highlight._touched = true;
				//SoundManager.playCursor();
			}
		}else{
			if( t_highlight._touched == true ){
				t_highlight.visible = false;
				t_highlight._touched = false;
			}
		}
		
		//按下控制
		if( this.drill_isOnTouchSprite(t_backbtn) ){	//注意帧刷新 与 检测高亮、检测按下事件 之间的执行情况，有些地方需要加锁，只执行一次
			if( t_backbtn_data['pushdown'] ){
				if( t_pushdown._needPopScene == false ){
				
					t_pushdown._needPopScene = true;
				}
			}else{
				SoundManager.playOk();
				this.popScene();
			}
		}
		if(t_pushdown._needPopScene && Input._currentState['escape']==false){	//按下延迟
			if(TouchInput.isReleased()){	//鼠标释放后执行操作 鼠标取消键
			SoundManager.playOk();
			setTimeout(Input._currentState['escape'] = true,1000);	  
			}
		}
		else {
			t_pushdown._needPopScene = false
			setTimeout(Input._currentState['escape'] = false,1000);
		}

	};
};

//==============================
// * 高亮事件监听
//==============================
Scene_MenuBase.prototype.drill_isOnHighlight = function(sprite) {
	 if (sprite == null){ return false };
	 if (sprite.bitmap == null){ return false };
	 if (!sprite.bitmap.isReady() ){ return false };
	 var cw = sprite.bitmap.width / 2;
	 var ch = sprite.bitmap.height / 2;
	 if (sprite.visible === false) {return false};
	 if (sprite.opacity === 0) {return false};
	 if (_drill_mouse_x < sprite.x - cw) {return false};
	 if (_drill_mouse_x > sprite.x + cw) {return false};
	 if (_drill_mouse_y < sprite.y - ch) {return false};
	 if (_drill_mouse_y > sprite.y + ch) {return false};
	 return true;	
};
//==============================
// * 点击事件监听
//==============================
Scene_MenuBase.prototype.drill_isOnTouchSprite = function(sprite) {
	 if (sprite == null){ return false };
	 if (sprite.bitmap == null){ return false };
	 if (!sprite.bitmap.isReady() ){ return false };
	 if ( !TouchInput.isPressed() ) {return false};		//需要确定是否为鼠标点击
	 var cw = sprite.bitmap.width / 2;
	 var ch = sprite.bitmap.height / 2;
	 if (sprite.visible === false) {return false};
	 if (sprite.opacity === 0) {return false};
	 if (TouchInput.x < sprite.x - cw) {return false};
	 if (TouchInput.x > sprite.x + cw) {return false};
	 if (TouchInput.y < sprite.y - ch) {return false};
	 if (TouchInput.y > sprite.y + ch) {return false};
	 return true;	
};

//=============================================================================
// ** 获取鼠标位置
//=============================================================================
if( typeof(_drill_mouse_getCurPos) == "undefined" ){	//防止重复定义
	
	var _drill_mouse_getCurPos = TouchInput._onMouseMove;
	var _drill_mouse_x = 0;
	var _drill_mouse_y = 0;
	TouchInput._onMouseMove = function(event) {		//绑定在TouchInput中
		_drill_mouse_getCurPos.call(this,event);
		
        _drill_mouse_x = Graphics.pageToCanvasX(event.pageX);
        _drill_mouse_y = Graphics.pageToCanvasY(event.pageY);
	};
}

