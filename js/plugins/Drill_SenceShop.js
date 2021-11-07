//=============================================================================
// Drill_SenceShop.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        面板 - 全自定义商店界面
 * @author Drill_up
 *
 *
 * @help
 * =============================================================================
 * +++ Drill_SenceShop +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可全自定义的商店界面。
 * 想了解更多窗口的设计，去看看"窗口与布局.docx"。
 * 【支持插件关联资源的打包、加密】
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件可以单独使用，对商店做美化，并支持部分设定功能。
 * 被扩展：
 *   - Drill_ItemCategory 控件-物品类型
 *     通过该插件，可以扩展更多物品类型。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   可以设置商店面板(界面)的内容。
 * 2.该界面包含一共7个窗口，一个按钮组。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/pictures （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有pictures文件夹！
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-整体布局
 * 资源-帮助窗口
 * 资源-金钱窗口
 * 资源-购买窗口
 * 资源-持有数窗口
 * 资源-物品数量窗口
 * 资源-出售窗口
 * 资源-出售类型窗口
 *
 * 资源-购买按钮
 * 资源-出售按钮
 * 资源-离开按钮
 *
 * 服务员-1
 * 服务员-2
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 服务员
 * 你可以在进入商店页面前修改服务员：
 *
 * 插件指令（服务员）：  >商店界面 : 当前服务员 : 2
 *
 * 数字表示设置的服务员的编号。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 倍率
 * 你可以通过插件指令手动设置商店的购买/出售倍率。
 *
 * 插件指令（购买倍率）：    >商店界面 : 购买倍率 : B
 * 插件指令（出售倍率）：    >商店界面 : 出售倍率 : B
 * 插件指令（恢复默认）：    >商店界面 : 倍率恢复默认
 * 插件指令（购买倍率变量）：>商店界面 : 购买倍率变量 : C
 * 插件指令（出售倍率变量）：>商店界面 : 出售倍率变量 : C
 *
 * 参数B：倍率值（小数）
 * 参数C：变量倍率
 *        根据变量的值来修改倍率。
 *        由于变量不能表示小数，这里根据变量的值取千分之一。
 *
 * 示例：
 * 插件指令：>商店界面 : 购买倍率 : 1.05
 * （购买倍率设置为 105% ）
 * 插件指令：>商店界面 : 购买倍率变量 : 22
 * （假设变量[22]值为 1100 ，则倍率为 110.0%）
 *
 * 注：1.通过倍率计算转换后最小价格为1。
 *     2.乘积倍率后，价格小数点后面的位都会舍去。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 交换商店
 * 你可以通过插件指令手动设置商店的交换方式。
 *
 * 插件指令（开启）：>商店界面 : 开启交换商店 : D : E
 * 插件指令（关闭）：>商店界面 : 关闭交换商店
 *
 * 参数D：交换的物品id
 * 参数E：交换的物品单位
 *        单位可以填入文字或者图标\I[]。
 *
 * 示例：
 * 插件指令：>商店界面 : 开启交换商店 : 38 : \I[546]
 * 插件指令：>商店界面 : 关闭交换商店
 * （商店将使用 38号物品 作为交换对象，并且单位为 图标546 ）
 *
 * 注：1.商店只是把 金钱 换成了 樱桃（38号物品） 。
 *     2.倍率还是原来的金钱倍率，你需要通过乘积关系，手动调整新的倍率。
 *     3.物品交换商店最好不要有出售交换，玩家可能用这个来刷钱。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了商店的物品交换功能。优化了点击按钮部分。
 * [v1.2]
 * 添加了出售类型窗口的对齐方式，并修复了窗口宽度的bug。
 * [v1.3]
 * 修复了价钱为0时界面会变成1的bug。规范了插件指令格式。
 * 将服务员添加了gif设置。并且添加了按钮的四种效果。
 * [v1.4]
 * 修复了插件指令切换服务员时出现的bug。
 * [v1.5]
 * 修改了插件的内部结构。
 * [v1.6]
 * 修改了插件关联的资源文件夹。
 * 
 *
 * @param ----杂项----
 * @default 
 *
 * @param 资源-整体布局
 * @parent ----杂项----
 * @desc 信息面板的整体布局。
 * @default 商店界面-整体布局
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 默认购买倍率
 * @parent ----杂项----
 * @desc 从商店购买物品价格的倍率，设置1.1表示为物品价格的1.1倍。
 * @default 1.000
 *
 * @param 默认出售倍率
 * @parent ----杂项----
 * @desc 从商店出售物品价格的倍率，设置0.6表示为物品价格的0.6倍。
 * @default 0.500
 *
 * @param ----帮助窗口----
 * @default 
 * 
 * @param 平移-帮助窗口 X
 * @parent ----帮助窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 250
 *
 * @param 平移-帮助窗口 Y
 * @parent ----帮助窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 520
 *
 * @param 帮助窗口起点 X
 * @parent ----帮助窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 帮助窗口起点 Y
 * @parent ----帮助窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 80
 *
 * @param 帮助窗口移动时长
 * @parent ----帮助窗口----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 30
 *
 * @param 是否使用帮助窗口布局
 * @parent ----帮助窗口----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 资源-帮助窗口
 * @desc 帮助窗口的图片资源。
 * @parent 是否使用帮助窗口布局
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 平移-帮助窗口布局 X
 * @parent 是否使用帮助窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-帮助窗口布局 Y
 * @parent 是否使用帮助窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 帮助窗口宽度
 * @parent ----帮助窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 380
 *
 * @param 帮助窗口高度
 * @parent ----帮助窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 130
 *
 * @param 帮助窗口字体大小
 * @parent ----帮助窗口----
 * @type number
 * @min 1
 * @desc 帮助窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param ----金钱窗口----
 * @default 
 * 
 * @param 平移-金钱窗口 X
 * @parent ----金钱窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 0
 *
 * @param 平移-金钱窗口 Y
 * @parent ----金钱窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 528
 *
 * @param 金钱窗口起点 X
 * @parent ----金钱窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default -100
 *
 * @param 金钱窗口起点 Y
 * @parent ----金钱窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 金钱窗口移动时长
 * @parent ----金钱窗口----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 30
 *
 * @param 是否使用金钱窗口布局
 * @parent ----金钱窗口----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 资源-金钱窗口
 * @desc 金钱窗口的图片资源。
 * @parent 是否使用金钱窗口布局
 * @default 商店界面-金钱窗口
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 平移-金钱窗口布局 X
 * @parent 是否使用金钱窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 12
 *
 * @param 平移-金钱窗口布局 Y
 * @parent 是否使用金钱窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 10
 *
 * @param 金钱窗口宽度
 * @parent ----金钱窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 210
 *
 * @param 金钱窗口高度
 * @parent ----金钱窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 80
 *
 * @param 金钱窗口字体大小
 * @parent ----金钱窗口----
 * @type number
 * @min 1
 * @desc 金钱窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param ----选项按钮组----
 * @default 
 *
 * @param 平移-按钮起点 X
 * @parent ----选项按钮组----
 * @desc 按钮初始会出现在起点，x轴方向平移，单位像素。0为贴在最左边。
 * @default 660
 *
 * @param 平移-按钮起点 Y
 * @parent ----选项按钮组----
 * @desc 按钮初始会出现在起点，y轴方向平移，单位像素。0为贴在最上面。
 * @default 300
 *
 * @param 是否使用激活按钮移动效果
 * @parent ----选项按钮组----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用。如果不使用，按钮点击后，直接隐藏。
 * @default true
 *
 * @param 平移-激活的按钮 X
 * @parent 是否使用激活按钮移动效果
 * @desc 按钮被激活后，移动到指定位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 120
 *
 * @param 平移-激活的按钮 Y
 * @parent 是否使用激活按钮移动效果
 * @desc 按钮被激活后，移动到指定位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 135
 *
 * @param 未选中按钮透明度
 * @parent ----选项按钮组----
 * @type number
 * @min 1
 * @max 255
 * @desc 未选中的其它按钮默认的透明度。0为完全透明，255为完全不透明。(设置0会造成鼠标点不了，这里最低为1。)
 * @default 160
 *
 * @param 是否使用缩放效果
 * @parent ----选项按钮组----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，当前选中的按钮，会来回缩放。
 * @default true
 *
 * @param 是否使用闪烁效果
 * @parent ----选项按钮组----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，当前选中的按钮，会来回闪烁。
 * @default false
 *
 * @param 浮动偏移量
 * @parent ----选项按钮组----
 * @type number
 * @min 1
 * @desc 使用左右或者上下浮动时，浮动偏移的位置量，单位像素。
 * @default 15
 *
 * @param 是否使用左右浮动
 * @parent ----选项按钮组----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，当前选中的按钮，会左右浮动。
 * @default false
 *
 * @param 是否使用上下浮动
 * @parent ----选项按钮组----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，当前选中的按钮，会上下浮动。
 * @default false
 *
 * @param 资源-购买按钮
 * @desc 购买按钮的图片资源。
 * @parent ----选项按钮组----
 * @default 商店界面-选项购买
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 平移-购买按钮 X
 * @parent ----选项按钮组----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 370
 *
 * @param 平移-购买按钮 Y
 * @parent ----选项按钮组----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 210
 *
 * @param 资源-出售按钮
 * @desc 出售按钮的图片资源。
 * @parent ----选项按钮组----
 * @default 商店界面-选项出售
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 平移-出售按钮 X
 * @parent ----选项按钮组----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 370
 *
 * @param 平移-出售按钮 Y
 * @parent ----选项按钮组----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 295
 *
 * @param 资源-离开按钮
 * @desc 离开按钮的图片资源。
 * @parent ----选项按钮组----
 * @default 商店界面-选项离开
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 平移-离开按钮 X
 * @parent ----选项按钮组----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 370
 *
 * @param 平移-离开按钮 Y
 * @parent ----选项按钮组----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 380
 *
 * @param ----购买窗口----
 * @default 
 * 
 * @param 平移-购买窗口 X
 * @parent ----购买窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 260
 *
 * @param 平移-购买窗口 Y
 * @parent ----购买窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 66
 *
 * @param 购买窗口起点 X
 * @parent ----购买窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default -80
 *
 * @param 购买窗口起点 Y
 * @parent ----购买窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 购买窗口移动时长
 * @parent ----购买窗口----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 25
 *
 * @param 是否使用购买窗口布局
 * @parent ----购买窗口----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 资源-购买窗口
 * @desc 购买窗口的图片资源。
 * @parent 是否使用购买窗口布局
 * @default 商店界面-购买窗口
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 平移-购买窗口布局 X
 * @parent 是否使用购买窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-购买窗口布局 Y
 * @parent 是否使用购买窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 购买窗口宽度
 * @parent ----购买窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 370
 *
 * @param 购买窗口高度
 * @parent ----购买窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 340
 *
 * @param 购买窗口列数
 * @parent ----购买窗口----
 * @type number
 * @min 1
 * @desc 购买窗口的列数。
 * @default 1
 *
 * @param 购买窗口字体大小
 * @parent ----购买窗口----
 * @type number
 * @min 1
 * @desc 购买窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param ----持有数窗口----
 * @default 
 * 
 * @param 平移-持有数窗口 X
 * @parent ----持有数窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 22
 *
 * @param 平移-持有数窗口 Y
 * @parent ----持有数窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 430
 *
 * @param 持有数窗口起点 X
 * @parent ----持有数窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default -50
 *
 * @param 持有数窗口起点 Y
 * @parent ----持有数窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 持有数窗口移动时长
 * @parent ----持有数窗口----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 15
 *
 * @param 是否使用持有数窗口布局
 * @parent ----持有数窗口----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 资源-持有数窗口
 * @desc 持有数窗口的图片资源。
 * @parent 是否使用持有数窗口布局
 * @default 商店界面-持有数窗口
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 平移-持有数窗口布局 X
 * @parent 是否使用持有数窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default -11
 *
 * @param 平移-持有数窗口布局 Y
 * @parent 是否使用持有数窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 10
 *
 * @param 持有数窗口宽度
 * @parent ----持有数窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 190
 *
 * @param 持有数窗口高度
 * @parent ----持有数窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 80
 *
 * @param 持有数窗口字体大小
 * @parent ----持有数窗口----
 * @type number
 * @min 1
 * @desc 持有数窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param ----物品数量窗口----
 * @default 
 * 
 * @param 平移-物品数量窗口 X
 * @parent ----物品数量窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 260
 *
 * @param 平移-物品数量窗口 Y
 * @parent ----物品数量窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 370
 *
 * @param 物品数量窗口起点 X
 * @parent ----物品数量窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 物品数量窗口起点 Y
 * @parent ----物品数量窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 40
 *
 * @param 物品数量窗口移动时长
 * @parent ----物品数量窗口----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 20
 *
 * @param 是否使用物品数量窗口布局
 * @parent ----物品数量窗口----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 资源-物品数量窗口
 * @desc 物品数量窗口的图片资源。
 * @parent 是否使用物品数量窗口布局
 * @default 商店界面-物品数量窗口
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 平移-物品数量窗口布局 X
 * @parent 是否使用物品数量窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-物品数量窗口布局 Y
 * @parent 是否使用物品数量窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 物品数量窗口宽度
 * @parent ----物品数量窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 370
 *
 * @param 物品数量窗口高度
 * @parent ----物品数量窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 130
 *
 * @param 物品数量窗口字体大小
 * @parent ----物品数量窗口----
 * @type number
 * @min 1
 * @desc 物品数量窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param ----出售窗口----
 * @default 
 * 
 * @param 平移-出售窗口 X
 * @parent ----出售窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 260
 *
 * @param 平移-出售窗口 Y
 * @parent ----出售窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 66
 *
 * @param 出售窗口起点 X
 * @parent ----出售窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default -80
 *
 * @param 出售窗口起点 Y
 * @parent ----出售窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 出售窗口移动时长
 * @parent ----出售窗口----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 25
 *
 * @param 是否使用出售窗口布局
 * @parent ----出售窗口----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 资源-出售窗口
 * @desc 出售窗口的图片资源。
 * @parent 是否使用出售窗口布局
 * @default 商店界面-出售窗口
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 平移-出售窗口布局 X
 * @parent 是否使用出售窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-出售窗口布局 Y
 * @parent 是否使用出售窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 出售窗口宽度
 * @parent ----出售窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 370
 *
 * @param 出售窗口高度
 * @parent ----出售窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 340
 *
 * @param 出售窗口列数
 * @parent ----出售窗口----
 * @type number
 * @min 1
 * @desc 出售窗口的列数。
 * @default 1
 *
 * @param 出售窗口字体大小
 * @parent ----出售窗口----
 * @type number
 * @min 1
 * @desc 出售窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param ----出售类型窗口----
 * @default 
 * 
 * @param 平移-出售类型窗口 X
 * @parent ----出售类型窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 15
 *
 * @param 平移-出售类型窗口 Y
 * @parent ----出售类型窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 180
 *
 * @param 出售类型窗口起点 X
 * @parent ----出售类型窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default -80
 *
 * @param 出售类型窗口起点 Y
 * @parent ----出售类型窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 出售类型窗口移动时长
 * @parent ----出售类型窗口----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 20
 *
 * @param 是否使用出售类型窗口布局
 * @parent ----出售类型窗口----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 资源-出售类型窗口
 * @desc 出售类型窗口的图片资源。
 * @parent 是否使用出售类型窗口布局
 * @default 商店界面-出售类型窗口
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 平移-出售类型窗口布局 X
 * @parent 是否使用出售类型窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-出售类型窗口布局 Y
 * @parent 是否使用出售类型窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 出售类型窗口宽度
 * @parent ----出售类型窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 170
 *
 * @param 出售类型窗口高度
 * @parent ----出售类型窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 240
 *
 * @param 出售类型窗口列数
 * @parent ----出售类型窗口----
 * @type number
 * @min 1
 * @desc 出售类型窗口的列数。
 * @default 1
 *
 * @param 出售类型窗口字体大小
 * @parent ----出售类型窗口----
 * @type number
 * @min 1
 * @desc 出售类型窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param 出售类型对齐方式
 * @parent ----出售类型窗口----
 * @type select
 * @option 左对齐
 * @value left
 * @option 居中
 * @value center
 * @option 右对齐
 * @value right
 * @desc 选项文本的对齐方式，left - 左对齐，center- 居中，right - 右对齐。
 * @default left
 *
 * @param ----服务员----
 * @default 
 *
 * @param 服务员-1
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-2
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-3
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-4
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-5
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-6
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-7
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-8
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-9
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-10
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-11
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-12
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-13
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-14
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-15
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-16
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-17
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-18
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-19
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-20
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-21
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-22
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-23
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-24
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-25
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-26
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-27
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-28
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-29
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-30
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 * 
 *
 */
/*~struct~ShopWaitress:
 * 
 *
 * @param 资源-服务员
 * @desc 服务员的图片资源，可以是单张图片，也可以是多张组合的gif。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file[]
 *
 * @param 帧间隔
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param 平移-服务员 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 580
 *
 * @param 平移-服务员 Y
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 200
 *
 * @param 服务员起点 X
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default 80
 *
 * @param 服务员起点 Y
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 服务员移动时长
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 50
 *
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		SSh（Sence_Shop）
//		临时全局变量	DrillUp.g_SSh_xxx
//		临时局部变量	this._drill_SSh_xxx
//		存储数据变量	$gameSystem._drill_SSh_xxx
//		全局存储变量	无
//		覆盖重写方法	重写方法非常多，未带 drill_ 前缀的都是
//
//插件记录：
//		★大体框架与功能如下：
//			全自定义商店界面：
//				->9个窗口移动
//				->购买、出售、离开按钮
//				->服务员
//				->特殊物品交易
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.rmmv本体的代码太烂，每个变量布局都被相互制约。
//			  各窗口初始化全被写死了，如果覆盖某些泛用窗口又会影响其他的菜单。
//			  所以这里采取的全是在初始化之后，修改窗口的各个参数。
//			  有些参数由于内部关系，必须在初始化前就设置好，所以窗口的格式都有一些不同的小变动。（本来想完全统一写法的，现在没办法控制了）
//			（目前知道的最好的方法是继承 window_selectable 并新写9个窗口，展开全部方法，然而现在已经都写出来，晚了）
//			（另外，调整坐标和画素材的我被这个弄炸了……）
//
//		★存在的问题：
//			1.商店界面有必要重构分析，因为商店继续下分可以分为各种不同的窗口面板。
//			  包括越买越贵的物品，宝物商店等。
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_SenceShop = true;
　　var DrillUp = DrillUp || {}; 

    DrillUp.parameters = PluginManager.parameters('Drill_SenceShop');
    DrillUp.g_SSh_layout = String(DrillUp.parameters['资源-整体布局'] || "");
    DrillUp.g_SSh_layout_help = String(DrillUp.parameters['资源-帮助窗口'] || "");
    DrillUp.g_SSh_layout_gold = String(DrillUp.parameters['资源-金钱窗口'] || "");
    DrillUp.g_SSh_layout_buy = String(DrillUp.parameters['资源-购买窗口'] || "");
    DrillUp.g_SSh_layout_status = String(DrillUp.parameters['资源-持有数窗口'] || "");
    DrillUp.g_SSh_layout_number = String(DrillUp.parameters['资源-物品数量窗口'] || "");
    DrillUp.g_SSh_layout_sell = String(DrillUp.parameters['资源-出售窗口'] || "");
    DrillUp.g_SSh_layout_category = String(DrillUp.parameters['资源-出售类型窗口'] || "");
	
	DrillUp.g_SSh_btn_start_X = Number(DrillUp.parameters['平移-按钮起点 X'] || 25);
	DrillUp.g_SSh_btn_start_Y = Number(DrillUp.parameters['平移-按钮起点 Y'] || 130); 
	DrillUp.g_SSh_btn_active_usable = String(DrillUp.parameters['是否使用激活按钮移动效果'] || "true") === "true";	
	DrillUp.g_SSh_btn_active_X = Number(DrillUp.parameters['平移-激活的按钮 X'] || 25);
	DrillUp.g_SSh_btn_active_Y = Number(DrillUp.parameters['平移-激活的按钮 Y'] || 130);   
    DrillUp.g_SSh_btn_unselect_opacity = Number(DrillUp.parameters['未选中按钮透明度'] || 160);
	DrillUp.g_SSh_btn_a_zoom = String(DrillUp.parameters['是否使用缩放效果'] || "true") == "true";	
	DrillUp.g_SSh_btn_a_flash = String(DrillUp.parameters['是否使用闪烁效果'] || "false") == "true";	
    DrillUp.g_SSh_btn_a_float_var = Number(DrillUp.parameters['浮动偏移量'] || 15);
	DrillUp.g_SSh_btn_a_float_lr = String(DrillUp.parameters['是否使用左右浮动'] || "false") == "true";	
	DrillUp.g_SSh_btn_a_float_ud = String(DrillUp.parameters['是否使用上下浮动'] || "false") == "true";	
    DrillUp.g_SSh_btn_1 = String(DrillUp.parameters['资源-购买按钮'] || "");
	DrillUp.g_SSh_btn_1X = Number(DrillUp.parameters['平移-购买按钮 X'] || 370);
	DrillUp.g_SSh_btn_1Y = Number(DrillUp.parameters['平移-购买按钮 Y'] || 210);  
    DrillUp.g_SSh_btn_2 = String(DrillUp.parameters['资源-出售按钮'] || "");
	DrillUp.g_SSh_btn_2X = Number(DrillUp.parameters['平移-出售按钮 X'] || 370);
	DrillUp.g_SSh_btn_2Y = Number(DrillUp.parameters['平移-出售按钮 Y'] || 295);  
    DrillUp.g_SSh_btn_3 = String(DrillUp.parameters['资源-离开按钮'] || "");
	DrillUp.g_SSh_btn_3X = Number(DrillUp.parameters['平移-离开按钮 X'] || 370);
	DrillUp.g_SSh_btn_3Y = Number(DrillUp.parameters['平移-离开按钮 Y'] || 380);  
	DrillUp.g_SSh_buyingPer = Number(DrillUp.parameters['默认购买倍率'] || 1);
	DrillUp.g_SSh_sellingPer = Number(DrillUp.parameters['默认出售倍率'] || 0.5);
	
	DrillUp.g_SSh_help_x = Number(DrillUp.parameters['平移-帮助窗口 X'] || 30);
	DrillUp.g_SSh_help_y = Number(DrillUp.parameters['平移-帮助窗口 Y'] || 120);
	DrillUp.g_SSh_help_slideX = Number(DrillUp.parameters['帮助窗口起点 X'] || -100);
	DrillUp.g_SSh_help_slideY = Number(DrillUp.parameters['帮助窗口起点 Y'] || 0);
	DrillUp.g_SSh_help_slideTime = Number(DrillUp.parameters['帮助窗口移动时长'] || 30);
	DrillUp.g_SSh_help_Layout_visible = String(DrillUp.parameters['是否使用帮助窗口布局'] || "true") === "true";	
	DrillUp.g_SSh_help_LayoutX = Number(DrillUp.parameters['平移-帮助窗口布局 X'] || 0);
	DrillUp.g_SSh_help_LayoutY = Number(DrillUp.parameters['平移-帮助窗口布局 Y'] || 0);
	DrillUp.g_SSh_help_width = Number(DrillUp.parameters['帮助窗口宽度'] || 220);
	DrillUp.g_SSh_help_height = Number(DrillUp.parameters['帮助窗口高度'] || 460);
	DrillUp.g_SSh_help_fontsize = Number(DrillUp.parameters['帮助窗口字体大小'] || 22);
	
	DrillUp.g_SSh_gold_x = Number(DrillUp.parameters['平移-金钱窗口 X'] || 30);
	DrillUp.g_SSh_gold_y = Number(DrillUp.parameters['平移-金钱窗口 Y'] || 120);
	DrillUp.g_SSh_gold_slideX = Number(DrillUp.parameters['金钱窗口起点 X'] || -100);
	DrillUp.g_SSh_gold_slideY = Number(DrillUp.parameters['金钱窗口起点 Y'] || 0);
	DrillUp.g_SSh_gold_slideTime = Number(DrillUp.parameters['金钱窗口移动时长'] || 30);
	DrillUp.g_SSh_gold_Layout_visible = String(DrillUp.parameters['是否使用金钱窗口布局'] || "true") === "true";	
	DrillUp.g_SSh_gold_LayoutX = Number(DrillUp.parameters['平移-金钱窗口布局 X'] || 0);
	DrillUp.g_SSh_gold_LayoutY = Number(DrillUp.parameters['平移-金钱窗口布局 Y'] || 0);
	DrillUp.g_SSh_gold_width = Number(DrillUp.parameters['金钱窗口宽度'] || 220);
	DrillUp.g_SSh_gold_height = Number(DrillUp.parameters['金钱窗口高度'] || 460);
	DrillUp.g_SSh_gold_fontsize = Number(DrillUp.parameters['金钱窗口字体大小'] || 22);
		
	DrillUp.g_SSh_buy_x = Number(DrillUp.parameters['平移-购买窗口 X'] || 30);
	DrillUp.g_SSh_buy_y = Number(DrillUp.parameters['平移-购买窗口 Y'] || 120);
	DrillUp.g_SSh_buy_slideX = Number(DrillUp.parameters['购买窗口起点 X'] || -100);
	DrillUp.g_SSh_buy_slideY = Number(DrillUp.parameters['购买窗口起点 Y'] || 0);
	DrillUp.g_SSh_buy_slideTime = Number(DrillUp.parameters['购买窗口移动时长'] || 30);
	DrillUp.g_SSh_buy_Layout_visible = String(DrillUp.parameters['是否使用购买窗口布局'] || "true") === "true";	
	DrillUp.g_SSh_buy_LayoutX = Number(DrillUp.parameters['平移-购买窗口布局 X'] || 0);
	DrillUp.g_SSh_buy_LayoutY = Number(DrillUp.parameters['平移-购买窗口布局 Y'] || 0);
	DrillUp.g_SSh_buy_width = Number(DrillUp.parameters['购买窗口宽度'] || 220);
	DrillUp.g_SSh_buy_height = Number(DrillUp.parameters['购买窗口高度'] || 460);
	DrillUp.g_SSh_buy_col = Number(DrillUp.parameters['购买窗口列数'] || 1);
	DrillUp.g_SSh_buy_fontsize = Number(DrillUp.parameters['购买窗口字体大小'] || 22);
	
	DrillUp.g_SSh_status_x = Number(DrillUp.parameters['平移-持有数窗口 X'] || 30);
	DrillUp.g_SSh_status_y = Number(DrillUp.parameters['平移-持有数窗口 Y'] || 120);
	DrillUp.g_SSh_status_slideX = Number(DrillUp.parameters['持有数窗口起点 X'] || -100);
	DrillUp.g_SSh_status_slideY = Number(DrillUp.parameters['持有数窗口起点 Y'] || 0);
	DrillUp.g_SSh_status_slideTime = Number(DrillUp.parameters['持有数窗口移动时长'] || 30);
	DrillUp.g_SSh_status_Layout_visible = String(DrillUp.parameters['是否使用持有数窗口布局'] || "true") === "true";	
	DrillUp.g_SSh_status_LayoutX = Number(DrillUp.parameters['平移-持有数窗口布局 X'] || 0);
	DrillUp.g_SSh_status_LayoutY = Number(DrillUp.parameters['平移-持有数窗口布局 Y'] || 0);
	DrillUp.g_SSh_status_width = Number(DrillUp.parameters['持有数窗口宽度'] || 220);
	DrillUp.g_SSh_status_height = Number(DrillUp.parameters['持有数窗口高度'] || 460);
	DrillUp.g_SSh_status_fontsize = Number(DrillUp.parameters['持有数窗口字体大小'] || 22);
	
	DrillUp.g_SSh_number_x = Number(DrillUp.parameters['平移-物品数量窗口 X'] || 30);
	DrillUp.g_SSh_number_y = Number(DrillUp.parameters['平移-物品数量窗口 Y'] || 120);
	DrillUp.g_SSh_number_slideX = Number(DrillUp.parameters['物品数量窗口起点 X'] || -100);
	DrillUp.g_SSh_number_slideY = Number(DrillUp.parameters['物品数量窗口起点 Y'] || 0);
	DrillUp.g_SSh_number_slideTime = Number(DrillUp.parameters['物品数量窗口移动时长'] || 30);
	DrillUp.g_SSh_number_Layout_visible = String(DrillUp.parameters['是否使用物品数量窗口布局'] || "true") === "true";	
	DrillUp.g_SSh_number_LayoutX = Number(DrillUp.parameters['平移-物品数量窗口布局 X'] || 0);
	DrillUp.g_SSh_number_LayoutY = Number(DrillUp.parameters['平移-物品数量窗口布局 Y'] || 0);
	DrillUp.g_SSh_number_width = Number(DrillUp.parameters['物品数量窗口宽度'] || 220);
	DrillUp.g_SSh_number_height = Number(DrillUp.parameters['物品数量窗口高度'] || 460);
	DrillUp.g_SSh_number_fontsize = Number(DrillUp.parameters['物品数量窗口字体大小'] || 22);
	
	DrillUp.g_SSh_sell_x = Number(DrillUp.parameters['平移-出售窗口 X'] || 30);
	DrillUp.g_SSh_sell_y = Number(DrillUp.parameters['平移-出售窗口 Y'] || 120);
	DrillUp.g_SSh_sell_slideX = Number(DrillUp.parameters['出售窗口起点 X'] || -100);
	DrillUp.g_SSh_sell_slideY = Number(DrillUp.parameters['出售窗口起点 Y'] || 0);
	DrillUp.g_SSh_sell_slideTime = Number(DrillUp.parameters['出售窗口移动时长'] || 30);
	DrillUp.g_SSh_sell_Layout_visible = String(DrillUp.parameters['是否使用出售窗口布局'] || "true") === "true";	
	DrillUp.g_SSh_sell_LayoutX = Number(DrillUp.parameters['平移-出售窗口布局 X'] || 0);
	DrillUp.g_SSh_sell_LayoutY = Number(DrillUp.parameters['平移-出售窗口布局 Y'] || 0);
	DrillUp.g_SSh_sell_width = Number(DrillUp.parameters['出售窗口宽度'] || 220);
	DrillUp.g_SSh_sell_height = Number(DrillUp.parameters['出售窗口高度'] || 460);
	DrillUp.g_SSh_sell_col = Number(DrillUp.parameters['出售窗口列数'] || 1);
	DrillUp.g_SSh_sell_fontsize = Number(DrillUp.parameters['出售窗口字体大小'] || 22);
	
	DrillUp.g_SSh_category_x = Number(DrillUp.parameters['平移-出售类型窗口 X'] || 30);
	DrillUp.g_SSh_category_y = Number(DrillUp.parameters['平移-出售类型窗口 Y'] || 120);
	DrillUp.g_SSh_category_slideX = Number(DrillUp.parameters['出售类型窗口起点 X'] || -100);
	DrillUp.g_SSh_category_slideY = Number(DrillUp.parameters['出售类型窗口起点 Y'] || 0);
	DrillUp.g_SSh_category_slideTime = Number(DrillUp.parameters['出售类型窗口移动时长'] || 30);
	DrillUp.g_SSh_category_Layout_visible = String(DrillUp.parameters['是否使用出售类型窗口布局'] || "true") === "true";	
	DrillUp.g_SSh_category_LayoutX = Number(DrillUp.parameters['平移-出售类型窗口布局 X'] || 0);
	DrillUp.g_SSh_category_LayoutY = Number(DrillUp.parameters['平移-出售类型窗口布局 Y'] || 0);
	DrillUp.g_SSh_category_width = Number(DrillUp.parameters['出售类型窗口宽度'] || 220);
	DrillUp.g_SSh_category_height = Number(DrillUp.parameters['出售类型窗口高度'] || 460);
	DrillUp.g_SSh_category_col = Number(DrillUp.parameters['出售类型窗口列数'] || 1);
	DrillUp.g_SSh_category_fontsize = Number(DrillUp.parameters['出售类型窗口字体大小'] || 22);
    DrillUp.g_SSh_category_align  = String(DrillUp.parameters['出售类型对齐方式'] || "left");	
	
	DrillUp.g_SSh_waitress_list = [];
	DrillUp.g_SSh_waitress_list_max = 30;
	
	for (var i = 0; i < DrillUp.g_SSh_waitress_list_max; i++) {
		if( DrillUp.parameters['服务员-' + String(i+1) ] != "" ){
			DrillUp.g_SSh_waitress_list[i] = JSON.parse(DrillUp.parameters['服务员-' + String(i+1) ]);
			if( DrillUp.g_SSh_waitress_list[i]["资源-服务员"] != ""){
				DrillUp.g_SSh_waitress_list[i]['src_img'] = JSON.parse(DrillUp.g_SSh_waitress_list[i]["资源-服务员"]);
			}else{
				DrillUp.g_SSh_waitress_list[i]['src_img'] = [] ;
			}
			DrillUp.g_SSh_waitress_list[i]['src_bitmaps'] = [];
			DrillUp.g_SSh_waitress_list[i]['interval'] = Number(DrillUp.g_SSh_waitress_list[i]["帧间隔"]);
			DrillUp.g_SSh_waitress_list[i]['back_run'] = String(DrillUp.g_SSh_waitress_list[i]["是否倒放"] || "false") === "true";	
			DrillUp.g_SSh_waitress_list[i]['x'] = Number(DrillUp.g_SSh_waitress_list[i]["平移-服务员 X"]);
			DrillUp.g_SSh_waitress_list[i]['y'] = Number(DrillUp.g_SSh_waitress_list[i]["平移-服务员 Y"]);
			DrillUp.g_SSh_waitress_list[i]['slide_x'] = Number(DrillUp.g_SSh_waitress_list[i]["服务员起点 X"]);
			DrillUp.g_SSh_waitress_list[i]['slide_y'] = Number(DrillUp.g_SSh_waitress_list[i]["服务员起点 Y"]);
			DrillUp.g_SSh_waitress_list[i]['slide_time'] = Number(DrillUp.g_SSh_waitress_list[i]["服务员移动时长"]);
		}else{
			DrillUp.g_SSh_waitress_list[i] = [];
		}
	}
	
//=============================================================================
// ** ImageManager
//=============================================================================
ImageManager.load_MenuShop = function(filename) {
    return this.loadBitmap('img/pictures/', filename, 0, true);
};

//==============================
// * 插件指令
//==============================
var _drill_SSh_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_SSh_pluginCommand.call(this, command, args);
	//切换商店服务员
	if (command === '>商店界面') {
		if(args.length >= 2){
			var temp1 = args[3];
			if(args[5]){ var temp2 = args[5]; }
			var type = String(args[1]);
			if( type == "当前服务员" ){
				$gameSystem._drill_SSh_waitress_id = Number(temp1)-1;
			}
			if( type == "购买倍率" ){
				$gameSystem._drill_SSh_buy_rate = Number(temp1);
			}
			if( type == "出售倍率" ){
				$gameSystem._drill_SSh_sell_rate = Number(temp1);
			}
			if( type == "倍率恢复默认" ){
				$gameSystem._drill_SSh_buy_rate = DrillUp.g_SSh_buyingPer;
				$gameSystem._drill_SSh_sell_rate = DrillUp.g_SSh_sellingPer;
			}
			if( type == "购买倍率变量" ){
				$gameSystem._drill_SSh_buy_rate = $gameVariables.value(Number(temp1)) / 1000;
			}
			if( type == "出售倍率变量" ){
				$gameSystem._drill_SSh_sell_rate = $gameVariables.value(Number(temp1)) / 1000;
			}
			if( type == "开启交换商店" ){
				$gameSystem._drill_SSh_exchange_mode = true;
				$gameSystem._drill_SSh_exchange_item = temp1;
				$gameSystem._drill_SSh_exchange_unit = temp2;
			}
			if( type == "关闭交换商店" ){
				$gameSystem._drill_SSh_exchange_mode = false;
			}
		}
	}
	
};

//==============================
// * $gameSystem 存储数据初始化
// *（初始化一次，如果有存档数据，数值覆盖第二次，全局数据需要手动载入）
//==============================
var _drill_SSh_system_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_SSh_system_initialize.call(this);
	this._drill_SSh_buy_rate = DrillUp.g_SSh_buyingPer;
	this._drill_SSh_sell_rate = DrillUp.g_SSh_sellingPer;
};	


//==============================
// * 商店-初始化
//==============================
var _drill_SSh_initialize = Scene_Shop.prototype.initialize;
Scene_Shop.prototype.initialize = function() {
	_drill_SSh_initialize.call(this);
	//暂无
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
        $dataItems[1].name = "金币:"+goldtxt;
};

//==============================
// * 商店-创建
//==============================
Scene_Shop.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	
    this.createHelpWindow();
    this.createGoldWindow();
    this.createCommandWindow();
    this.createDummyWindow();
    this.createNumberWindow();
    this.createStatusWindow();
    this.createBuyWindow();
    this.createCategoryWindow();
    this.createSellWindow();
	
	this._commandWindow.zIndex = 1;	//窗口显示先后顺序重配
	this._helpWindow.zIndex = 2;
	this._buyWindow.zIndex = 3;
	this._numberWindow.zIndex = 4;
	this._categoryWindow.zIndex = 5;
	this._sellWindow.zIndex = 6;
	this._statusWindow.zIndex = 7;
	this._goldWindow.zIndex = 8;
	this.drill_sortByZIndex();
	
	this.drill_SSh_createLayout();
	this.drill_SSh_createButtons();
	this.drill_SSh_createWaitress();
};

Scene_Shop.prototype.drill_sortByZIndex = function() {
	this._windowLayer.children.sort(function(a, b){	//比较器
		if(!a.zIndex ){a.zIndex = 1;}
		if(!b.zIndex ){b.zIndex = 1;}
		return a.zIndex-b.zIndex;
	});
};
Window_ShopBuy.prototype.itemHeight = function() {
    return 50;
};
Window_ShopSell.prototype.itemHeight = function() {
    return 50;
};
Window_ShopSell.prototype.drawItemName = function(item, x, y, width) {
    width = 420;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        var color = RJO.IQ.QualitiesColor[item.meta.quality||0];
        this.drawIcon(item.iconIndex, x + 2, y + 2);
        this.changeTextColor(color);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
        if(RJO.IQ.DrawOutline>=0){this.drawOutline(x + 2, y + 2, Window_Base._iconWidth, Window_Base._iconHeight, color, RJO.IQ.DrawOutline);}
    }
};
//==============================
// * 商店-在背景的上一层添加布局
//==============================
var _drill_SSh_createBackground = Scene_Shop.prototype.createBackground;
Scene_Shop.prototype.createBackground = function() {
	_drill_SSh_createBackground.call(this);
	this._field = new Sprite();
	this.addChild(this._field);	
}

//==============================
// * 商店-每帧刷新
//==============================
var _drill_SSh_update = Scene_Shop.prototype.update;
Scene_Shop.prototype.update = function() { 
	_drill_SSh_update.call(this);
	//this.drill_SSh_updateHelpWindow();
	this.drill_SSh_updateGoldWindow();
	this.drill_SSh_updateBuyWindow();
	this.drill_SSh_updateStatusWindow();
	this.drill_SSh_updateNumberWindow();
	this.drill_SSh_updateSellWindow();
	this.drill_SSh_updateCategoryWindow();
	
	this.drill_SSh_updateButtons();
	this.drill_SSh_updateWaitress();
	
	this.drill_checkKeyTouch();			//键盘按键监听
    if (TouchInput.isTriggered()) {		//鼠标点击图片监听
		this.drill_checkImgTouch();
	};
}

//==============================
// * 商店-键盘按键监听
//==============================
Scene_Shop.prototype.drill_checkKeyTouch = function() {
	
	//键盘 - 选项按钮组
	if( this._commandWindow.active ){
		if (Input.isRepeated("up")) {this._commandWindow.cursorLeft();SoundManager.playCursor();}
		else if (Input.isRepeated("down")) {this._commandWindow.cursorRight();SoundManager.playCursor();}
	}
}
//==============================
// * 商店-鼠标点击图片监听
//==============================
Scene_Shop.prototype.drill_checkImgTouch = function() {
	
	//图片 - 选项按钮组
	if( this._commandWindow.active ){
		 for (var i = 0; i < this._drill_SSh_buttons.length; i++) {
			if (this.drill_SSh_isOnSprite(this._drill_SSh_buttons[i])) {
				if(this._commandWindow._index != i){	//点击未激活按钮
					SoundManager.playCursor();
					this._commandWindow._index = i;
				}else{	//点击已激活按钮
					SoundManager.playOk();
					this._commandWindow.active = false;
					if( i == 0 ){
						this.commandBuy();
					}
					if( i == 1 ){
						this.commandSell();
					}
					if( i == 2 ){
						this.popScene();
					}
				}
			};
		 };
	}
}
//==============================
// * 商店-鼠标点击图片范围判断
//==============================
Scene_Shop.prototype.drill_SSh_isOnSprite = function(sprite) {
	 if(sprite == null){ return false };
	 if (sprite.bitmap == null){ return false };
	 if( !sprite.bitmap.isReady() ){ return false };
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

//==============================
// * 商店-整体布局
//==============================
Scene_Shop.prototype.drill_SSh_createLayout = function() {
	this._layout = new Sprite(ImageManager.load_MenuShop(DrillUp.g_SSh_layout));
	this._field.addChild(this._layout);	
};

//=============================================================================
// ** 商店-选项按钮组
//=============================================================================
//==============================
// * 商店-选项按钮窗口（直接隐藏）
//==============================
Scene_Shop.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_ShopCommand(0, this._purchaseOnly);
	this._commandWindow.y = Graphics.boxHeight * 2
    this._commandWindow.setHandler('buy',    this.commandBuy.bind(this));
    this._commandWindow.setHandler('sell',   this.commandSell.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};

//==============================
// * 商店-选项按钮初始化
//==============================
Scene_Shop.prototype.drill_SSh_createButtons = function() {
    this._drill_SSh_buttons = [];
	this._drill_SSh_buttons_data = [];		//建立按钮组
	
	var temp_btn_data1 = {};
	temp_btn_data1['bitmap'] = DrillUp.g_SSh_btn_1;
	temp_btn_data1['org_x'] = DrillUp.g_SSh_btn_1X;
	temp_btn_data1['org_y'] = DrillUp.g_SSh_btn_1Y;
	temp_btn_data1['Ani'] = 0;
	temp_btn_data1['start_x'] = DrillUp.g_SSh_btn_start_X;
	temp_btn_data1['start_y'] = DrillUp.g_SSh_btn_start_Y;
	temp_btn_data1['active_x'] = DrillUp.g_SSh_btn_active_X;
	temp_btn_data1['active_y'] = DrillUp.g_SSh_btn_active_Y;
	this._drill_SSh_buttons_data.push(temp_btn_data1);
	
	var temp_btn_data2 = {};
	temp_btn_data2['bitmap'] = DrillUp.g_SSh_btn_2;
	temp_btn_data2['org_x'] = DrillUp.g_SSh_btn_2X;
	temp_btn_data2['org_y'] = DrillUp.g_SSh_btn_2Y;
	temp_btn_data2['Ani'] = 0;
	temp_btn_data2['start_x'] = DrillUp.g_SSh_btn_start_X;
	temp_btn_data2['start_y'] = DrillUp.g_SSh_btn_start_Y;	
	temp_btn_data2['active_x'] = DrillUp.g_SSh_btn_active_X;
	temp_btn_data2['active_y'] = DrillUp.g_SSh_btn_active_Y;
	this._drill_SSh_buttons_data.push(temp_btn_data2);
	
	var temp_btn_data3 = {};
	temp_btn_data3['bitmap'] = DrillUp.g_SSh_btn_3;
	temp_btn_data3['org_x'] = DrillUp.g_SSh_btn_3X;
	temp_btn_data3['org_y'] = DrillUp.g_SSh_btn_3Y;
	temp_btn_data3['Ani'] = 0;
	temp_btn_data3['start_x'] = DrillUp.g_SSh_btn_start_X;
	temp_btn_data3['start_y'] = DrillUp.g_SSh_btn_start_Y;
	temp_btn_data3['active_x'] = DrillUp.g_SSh_btn_active_X;
	temp_btn_data3['active_y'] = DrillUp.g_SSh_btn_active_Y;
	this._drill_SSh_buttons_data.push(temp_btn_data3);
	
    for (var i = 0; i < this._drill_SSh_buttons_data.length ; i++) {
		temp_btn = new Sprite();
		temp_btn.anchor.x = 0.5;
		temp_btn.anchor.y = 0.5;
		temp_btn.bitmap = ImageManager.load_MenuShop(this._drill_SSh_buttons_data[i]['bitmap']);
		temp_btn.x = this._drill_SSh_buttons_data[i]['start_x'];
		temp_btn.y = this._drill_SSh_buttons_data[i]['start_y'];
		temp_btn.opacity = 255;
		
		this._drill_SSh_buttons.push(temp_btn);
		this._field.addChild(temp_btn);
	};
	if( this._purchaseOnly ){ this._drill_SSh_buttons[1].visible = false }
};

//==============================
// * 商店-选项按钮切换选项
//==============================
Window_ShopCommand.prototype.cursorRight = function(wrap) {
    this._index += 1;
    if (this._index > 2) {
		this._index = 0;
    }
	if( this._purchaseOnly && this._index == 1 ){
		this._index += 1;
	}
};
//==============================
// * 商店-选项按钮切换选项
//==============================
Window_ShopCommand.prototype.cursorLeft = function(wrap) {
    this._index -= 1;
    if (this._index < 0) {
		this._index = 2;
    }
	if( this._purchaseOnly && this._index == 1 ){
		this._index -= 1;
	}
};
//==============================
// * 商店-选项按钮帧变化
//==============================
Scene_Shop.prototype.drill_SSh_updateButtons = function() {
	
	for (var i = 0; i < this._drill_SSh_buttons.length; i++) {
		var temp_btn = this._drill_SSh_buttons[i];
		var temp_btn_data = this._drill_SSh_buttons_data[i];
		//alert(JSON.stringify(temp_btn_data));
		
		if( this._commandWindow.active ){	//选择按钮时
			if (this._commandWindow._index === i )  {	//当前选中的按钮
				//缩放效果
				if(DrillUp.g_SSh_btn_a_zoom){
					if (temp_btn_data['Ani'] === 0) {
						this.drill_SSh_scale_move_to(temp_btn,1.30, 0.01);
						if (temp_btn.scale.x >= 1.30) {
							temp_btn_data['Ani'] = 1; 
						};
					} else  {
						this.drill_SSh_scale_move_to(temp_btn,1.00, 0.01);
						if (temp_btn.scale.x <= 1.00) {
							temp_btn_data['Ani'] = 0; 
						};				 
					};
				}
				//闪烁效果
				if(DrillUp.g_SSh_btn_a_flash){
					if (temp_btn_data['Ani'] === 0) {
						this.drill_SSh_opacity_move_to(temp_btn,255, 10);
						if (temp_btn.opacity >= 255) {
							temp_btn_data['Ani'] = 1; 
						};
					} else  {
						this.drill_SSh_opacity_move_to(temp_btn,30, 10);
						if (temp_btn.opacity <= 30) {
							temp_btn_data['Ani'] = 0; 
						};				 
					};
				}else{
					this.drill_SSh_opacity_move_to(temp_btn,255,20); 
				}
				
				var target_x = temp_btn_data['org_x'];
				var target_y = temp_btn_data['org_y'];
				var target_slow = false;
				if(DrillUp.g_SSh_btn_a_float_lr){		//按钮左右（距离判定）
					if( Math.abs(temp_btn.x - target_x) + Math.abs(temp_btn.y - target_y) < DrillUp.g_SSh_btn_a_float_var * 4.15 ){
						if (temp_btn_data['Ani'] === 0) {
							target_x = temp_btn_data['org_x'] + DrillUp.g_SSh_btn_a_float_var;
							if ( Math.abs(temp_btn.x - target_x) <= 1) {
								temp_btn_data['Ani'] = 1; 
							};
						} else  {
							target_x = temp_btn_data['org_x'] - DrillUp.g_SSh_btn_a_float_var;
							if ( Math.abs(temp_btn.x - target_x) <= 1) {
								temp_btn_data['Ani'] = 0; 
							};
						};
						target_slow = true;
					}
				}
				if(DrillUp.g_SSh_btn_a_float_ud){		//按钮上下（距离判定）
					if( Math.abs(temp_btn.x - target_x) + Math.abs(temp_btn.y - target_y) < DrillUp.g_SSh_btn_a_float_var * 4.15 ){
						if (temp_btn_data['Ani'] === 0) {
							target_y = temp_btn_data['org_y'] + DrillUp.g_SSh_btn_a_float_var;
							if ( Math.abs(temp_btn.y - target_y) <= 1) {
								temp_btn_data['Ani'] = 1; 
							};
						} else  {
							target_y = temp_btn_data['org_y'] - DrillUp.g_SSh_btn_a_float_var;
							if ( Math.abs(temp_btn.y - target_y) <= 1) {
								temp_btn_data['Ani'] = 0; 
							};
						};
						target_slow = true;
					}
				}
				if(target_slow){
					this.drill_SSh_button_move_to(temp_btn,target_x,target_y,1.2);
				}else{
					this.drill_SSh_button_move_to(temp_btn,target_x,target_y,7);
				}
				
			} else {	//当前未选中的按钮（半隐藏）
				temp_btn_data['Ani'] = 0
				this.drill_SSh_scale_move_to(temp_btn,1.00, 0.01);
				this.drill_SSh_opacity_move_to(temp_btn,DrillUp.g_SSh_btn_unselect_opacity,4); 
				this.drill_SSh_button_move_to(temp_btn,temp_btn_data['org_x'],temp_btn_data['org_y'],7);
			};
			
		}else{	//按钮激活时
			if( DrillUp.g_SSh_btn_active_usable ){
				if (this._commandWindow._index === i )  {	//激活的按钮
					temp_btn_data['Ani'] = 0; 
					this.drill_SSh_scale_move_to(temp_btn,1.00, 0.01);
					this.drill_SSh_opacity_move_to(temp_btn,255,20); 
					this.drill_SSh_button_move_to(temp_btn,temp_btn_data['active_x'],temp_btn_data['active_y'],10);
					
				} else {	//未激活的按钮（隐藏）
					temp_btn_data['Ani'] = 0
					this.drill_SSh_scale_move_to(temp_btn,1.00, 0.01);
					this.drill_SSh_opacity_move_to(temp_btn,0,15); 
					this.drill_SSh_button_move_to(temp_btn,temp_btn_data['org_x'],temp_btn_data['org_y'],7);
				};
			}else{
				temp_btn_data['Ani'] = 0
				this.drill_SSh_scale_move_to(temp_btn,1.00, 0.01);
				this.drill_SSh_opacity_move_to(temp_btn,0,15); 
				this.drill_SSh_button_move_to(temp_btn,temp_btn_data['org_x'],temp_btn_data['org_y'],7);
			}
		}
	};
};

//==============================
// * 商店-选项按钮变化工具方法
//==============================
Scene_Shop.prototype.drill_SSh_button_move_to = function(sprite,x,y,speed) {
	var dx = sprite.x - x;
	var dy = sprite.y - y;
	if( dx < 0 ){ sprite.x += speed; }
	if( dx > 0 ){ sprite.x -= speed; }
	if( dy < 0 ){ sprite.y += speed; }
	if( dy > 0 ){ sprite.y -= speed; }
		
	if( Math.abs(dx) <= speed ){ sprite.x = x; }
	if( Math.abs(dy) <= speed ){ sprite.y = y; }
}
Scene_Shop.prototype.drill_SSh_opacity_move_to = function(sprite,o,speed) {
	var d_o = sprite.opacity - o;
	if( d_o < 0 ){ sprite.opacity += speed; }
	if( d_o > 0 ){ sprite.opacity -= speed; }
		
	if( Math.abs(d_o) <= speed ){ sprite.opacity = o; }
}
Scene_Shop.prototype.drill_SSh_scale_move_to = function(sprite,s,speed) {
	var ds = sprite.scale.x - s;
	if( ds < 0 ){ sprite.scale.x += speed; }
	if( ds > 0 ){ sprite.scale.x -= speed; }
		
	if( Math.abs(ds) <= speed ){ sprite.scale.x = s; }
	sprite.scale.y = sprite.scale.x;
}

//=============================================================================
// ** 商店-帮助窗口
//=============================================================================
/*
Scene_Shop.prototype.createHelpWindow = function() {
	var wx = DrillUp.g_SSh_help_x;
    var wy = DrillUp.g_SSh_help_y;
	var ww = DrillUp.g_SSh_help_width;
    var wh = DrillUp.g_SSh_help_height;
    this._helpWindow = new Window_Help();
    this._helpWindow.x = wx + DrillUp.g_SSh_help_slideX;
    this._helpWindow.y = wy + DrillUp.g_SSh_help_slideY;
    this._helpWindow.width = ww;
    this._helpWindow.height = wh;
	this._helpWindow.windowWidth = function(){ return ww;}
	this._helpWindow.windowHeight = function(){ return wh;}
	this._helpWindow.opacity = 255;
	this._helpWindow.contentsOpacity = 0;
	this._helpWindow._move = 0;

    this._helpWindow.standardFontSize = function(){ return DrillUp.g_SSh_help_fontsize;}
	if( DrillUp.g_SSh_help_Layout_visible ){
		this._layout_helpWindow = new Sprite(ImageManager.load_MenuShop(DrillUp.g_SSh_layout_help));
		this._layout_helpWindow.opacity = 0;
		this._field.addChild(this._layout_helpWindow);	
	}
    this.addWindow(this._helpWindow);
}
*/
Scene_Shop.prototype.drill_SSh_updateHelpWindow = function() {
	this._helpWindow._move += 1;
	if( this._helpWindow._move <= DrillUp.g_SSh_help_slideTime ){
		this._helpWindow.x -= DrillUp.g_SSh_help_slideX / DrillUp.g_SSh_help_slideTime;
		this._helpWindow.y -= DrillUp.g_SSh_help_slideY / DrillUp.g_SSh_help_slideTime;
		this._helpWindow.contentsOpacity += 256 / DrillUp.g_SSh_help_slideTime;
		if( DrillUp.g_SSh_help_Layout_visible ){
			this._layout_helpWindow.x = this._helpWindow.x + DrillUp.g_SSh_help_LayoutX;
			this._layout_helpWindow.y = this._helpWindow.y + DrillUp.g_SSh_help_LayoutY;
			this._layout_helpWindow.opacity = this._helpWindow.contentsOpacity;
		}else{
			this._helpWindow.opacity += 256 / DrillUp.g_SSh_help_slideTime;
		}
	}
}


//=============================================================================
// ** 商店-金钱窗口
//=============================================================================

Window_Gold.prototype.initialize = function(x, y , width, height) {
    if(!width){var width = this.windowWidth();}
    if(!height){var height = this.windowHeight();}
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Scene_Shop.prototype.createGoldWindow = function() {
	var wx = DrillUp.g_SSh_gold_x;
    var wy = DrillUp.g_SSh_gold_y;
	var ww = DrillUp.g_SSh_gold_width;
    var wh = DrillUp.g_SSh_gold_height;
    this._goldWindow = new Window_Gold(wx,wy,ww,wh);
    this._goldWindow.x = wx + DrillUp.g_SSh_gold_slideX;
    this._goldWindow.y = wy + DrillUp.g_SSh_gold_slideY;
    this._goldWindow.width = ww;
    this._goldWindow.height = wh;
	this._goldWindow.windowWidth = function(){ return ww;}
	this._goldWindow.windowHeight = function(){ return wh;}
	this._goldWindow.opacity = 0;
	this._goldWindow.contentsOpacity = 0;
	this._goldWindow._move = 0;
    this._goldWindow.standardFontSize = function(){ return DrillUp.g_SSh_gold_fontsize;}
	if( DrillUp.g_SSh_gold_Layout_visible ){
		this._layout_goldWindow = new Sprite(ImageManager.load_MenuShop(DrillUp.g_SSh_layout_gold));
		this._layout_goldWindow.opacity = 0;
		this._field.addChild(this._layout_goldWindow);	
	}
    this.addWindow(this._goldWindow);
};

Scene_Shop.prototype.drill_SSh_updateGoldWindow = function() {
	this._goldWindow._move += 1;
	if( this._goldWindow._move <= DrillUp.g_SSh_gold_slideTime ){
		this._goldWindow.x -= DrillUp.g_SSh_gold_slideX / DrillUp.g_SSh_gold_slideTime;
		this._goldWindow.y -= DrillUp.g_SSh_gold_slideY / DrillUp.g_SSh_gold_slideTime;
		this._goldWindow.contentsOpacity += 256 / DrillUp.g_SSh_gold_slideTime;
		if( DrillUp.g_SSh_gold_Layout_visible ){
			this._layout_goldWindow.x = this._goldWindow.x + DrillUp.g_SSh_gold_LayoutX;
			this._layout_goldWindow.y = this._goldWindow.y + DrillUp.g_SSh_gold_LayoutY;
			this._layout_goldWindow.opacity = this._goldWindow.contentsOpacity;
		}else{
			this._goldWindow.opacity += 256 / DrillUp.g_SSh_gold_slideTime;
		}
	}
}	

//==============================
// * 商店-金钱窗口交换物设置
//==============================
Window_Gold.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
	
	if( $gameSystem._drill_SSh_exchange_mode ){
		this.drawCurrencyValue(this.value(),this.convertEscapeCharacters($gameSystem._drill_SSh_exchange_unit), x, 0, width);
	}else{
		this.drawCurrencyValue(this.value(), this.currencyUnit(), x, 0, width);
	}
};
Window_Gold.prototype.value = function() {
	if( $gameSystem._drill_SSh_exchange_mode ){
		return $gameParty.numItems( $dataItems[$gameSystem._drill_SSh_exchange_item ] );
	}else{
		return $gameParty.gold();
	}
};
Window_Gold.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};
var _drill_SSh_g_drawCurrencyValue = Window_Gold.prototype.drawCurrencyValue;
Window_Gold.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
	if( $gameSystem._drill_SSh_exchange_mode ){
		var unitWidth = Math.min(80, this.textWidth(unit));
		this.resetTextColor();
		this.drawText(value, x, y, width - unitWidth - 6, 'right');
		this.changeTextColor(this.systemColor());
		this.drawTextEx(unit, x + width - unitWidth, y );		//修改货币单位为图标
	}else{
		_drill_SSh_g_drawCurrencyValue.call(this,value, unit, x, y, width);
	}
};

//==============================
// * 商店-空白窗口
//==============================
Scene_Shop.prototype.createDummyWindow = function() {
    var wy = Graphics.boxHeight * 2;
    var wh = 0;
    this._dummyWindow = new Window_Base(0, wy, Graphics.boxWidth, wh);
	this._dummyWindow.visible = false;
    this.addWindow(this._dummyWindow);
};

//=============================================================================
// ** 商店-购买窗口
//=============================================================================

//==============================
// * 商店-购买窗口初始化
//==============================
Scene_Shop.prototype.createBuyWindow = function() {
	var wx = DrillUp.g_SSh_buy_x;
    var wy = DrillUp.g_SSh_buy_y;
	var ww = DrillUp.g_SSh_buy_width;
    var wh = DrillUp.g_SSh_buy_height;
    this._buyWindow = new Window_ShopBuy(wx, wy, wh, this._goods);
    this._buyWindow.x = wx + DrillUp.g_SSh_buy_slideX;
    this._buyWindow.y = wy + DrillUp.g_SSh_buy_slideY;
    this._buyWindow.width = ww;
    this._buyWindow.height = wh;
	this._buyWindow.windowWidth = function(){ return ww;}
	this._buyWindow.windowHeight = function(){ return wh;}
	this._buyWindow.opacity = 0;
	this._buyWindow.contentsOpacity = 0;
	this._buyWindow.visible = false;
	this._buyWindow._move = 0;
	this._buyWindow.standardFontSize = function(){ return DrillUp.g_SSh_buy_fontsize;}
	this._buyWindow.maxCols = function(){ return DrillUp.g_SSh_buy_col;}
    this._buyWindow.hide = function(){ return null;}	//购买窗口禁止瞬间隐藏
	if( DrillUp.g_SSh_buy_Layout_visible ){
		this._layout_buyWindow = new Sprite(ImageManager.load_MenuShop(DrillUp.g_SSh_layout_buy));
		this._layout_buyWindow.opacity = 0;
		this._field.addChild(this._layout_buyWindow);	
	}
    this._buyWindow.setHelpWindow(this._helpWindow);
    this._buyWindow.setStatusWindow(this._statusWindow);
    this._buyWindow.hide();
    this._buyWindow.setHandler('ok',     this.onBuyOk.bind(this));
    this._buyWindow.setHandler('cancel', this.onBuyCancel.bind(this));
    this.addWindow(this._buyWindow);
};

//==============================
// * 商店-购买窗口帧变化
//==============================
Scene_Shop.prototype.drill_SSh_updateBuyWindow = function() {
	if( this._buyWindow.active ||
		(this._commandWindow._index === 0 && this._numberWindow.active ) ){	//购买窗口显示
		if( this._buyWindow._move < DrillUp.g_SSh_buy_slideTime ){
			this._buyWindow.x -= DrillUp.g_SSh_buy_slideX / DrillUp.g_SSh_buy_slideTime;
			this._buyWindow.y -= DrillUp.g_SSh_buy_slideY / DrillUp.g_SSh_buy_slideTime;
			this._buyWindow.contentsOpacity += 256 / DrillUp.g_SSh_buy_slideTime;
			if( DrillUp.g_SSh_buy_Layout_visible ){
				this._layout_buyWindow.x = this._buyWindow.x + DrillUp.g_SSh_buy_LayoutX;
				this._layout_buyWindow.y = this._buyWindow.y + DrillUp.g_SSh_buy_LayoutY;
				this._layout_buyWindow.opacity = this._buyWindow.contentsOpacity;
			}else{
				this._buyWindow.opacity += 256 / DrillUp.g_SSh_buy_slideTime;
			}
		}
		this._buyWindow._move += 1;
		this._buyWindow.visible = true;
		if( this._buyWindow._move >= DrillUp.g_SSh_buy_slideTime ){ this._buyWindow._move = DrillUp.g_SSh_buy_slideTime }
		
	}else{	//购买窗口隐藏
		if( this._buyWindow._move > 0 ){
			this._buyWindow.x += DrillUp.g_SSh_buy_slideX / DrillUp.g_SSh_buy_slideTime;
			this._buyWindow.y += DrillUp.g_SSh_buy_slideY / DrillUp.g_SSh_buy_slideTime;
			this._buyWindow.contentsOpacity -= 256 / DrillUp.g_SSh_buy_slideTime;
			if( DrillUp.g_SSh_buy_Layout_visible ){
				this._layout_buyWindow.x = this._buyWindow.x + DrillUp.g_SSh_buy_LayoutX;
				this._layout_buyWindow.y = this._buyWindow.y + DrillUp.g_SSh_buy_LayoutY;
				this._layout_buyWindow.opacity = this._buyWindow.contentsOpacity;
			}else{
				this._buyWindow.opacity -= 256 / DrillUp.g_SSh_buy_slideTime;
			}
		}
		this._buyWindow._move -= 1;
		if( this._buyWindow._move <= 0 ){ this._buyWindow._move = 0;this._buyWindow.visible = false; }
	}
}	

//==============================
// * 商店-执行购买
//==============================
Scene_Shop.prototype.doBuy = function(number) {
	if( $gameSystem._drill_SSh_exchange_mode ){
		$gameParty.loseItem($dataItems[$gameSystem._drill_SSh_exchange_item], number*this.buyingPrice() );
	}else{
		if(this._item.note.indexOf('货物')!=-1)$gameVariables.value(705)[this._item.id-220] = this.buyingPrice();
		$gameParty.loseGold(number * this.buyingPrice() );
	}
    $gameParty.gainItem(this._item, number);
    if(number==1 && this._item.note.contains('open')){
    $gameVariables.setValue(397,this._item.id);
    $gameTemp.reserveCommonEvent(17);
    SceneManager.push(Scene_Map);
    }
};

//==============================
// * 商店-购买倍率
//==============================
Window_ShopBuy.prototype.price = function(item) {		
	var result = Math.ceil( (this._price[this._data.indexOf(item)] || 0) * $gameSystem._drill_SSh_buy_rate );
	//if( result == 0 ){ result = 1;}
	return result;
};


//=============================================================================
// ** 商店-持有数窗口
//=============================================================================

//==============================
// * 商店-持有数窗口初始化
//==============================
Scene_Shop.prototype.createStatusWindow = function() {
	var wx = DrillUp.g_SSh_status_x;
    var wy = DrillUp.g_SSh_status_y;
	var ww = DrillUp.g_SSh_status_width;
    var wh = DrillUp.g_SSh_status_height;
    this._statusWindow = new Window_ShopStatus(wx, wy, ww, wh);
    this._statusWindow.x = wx + DrillUp.g_SSh_status_slideX;
    this._statusWindow.y = wy + DrillUp.g_SSh_status_slideY;
    this._statusWindow.width = ww;
    this._statusWindow.height = wh;
	this._statusWindow.windowWidth = function(){ return ww;}
	this._statusWindow.windowHeight = function(){ return wh;}
	this._statusWindow.opacity = 0;
	this._statusWindow.contentsOpacity = 0;
	this._statusWindow.visible = false;
	this._statusWindow._move = 0;
	this._statusWindow.standardFontSize = function(){ return DrillUp.g_SSh_status_fontsize;}
    this._statusWindow.hide = function(){ return null;}
	if( DrillUp.g_SSh_status_Layout_visible ){
		this._layout_statusWindow = new Sprite(ImageManager.load_MenuShop(DrillUp.g_SSh_layout_status));
		this._layout_statusWindow.opacity = 0;
		this._field.addChild(this._layout_statusWindow);	
	}
    this._statusWindow.hide();
    this.addWindow(this._statusWindow);
};

//==============================
// * 商店-持有数窗口帧变化
//==============================
Scene_Shop.prototype.drill_SSh_updateStatusWindow = function() {
	if( this._statusWindow.active ){	//持有数窗口显示
		if( this._statusWindow._move < DrillUp.g_SSh_status_slideTime ){
			this._statusWindow.x -= DrillUp.g_SSh_status_slideX / DrillUp.g_SSh_status_slideTime;
			this._statusWindow.y -= DrillUp.g_SSh_status_slideY / DrillUp.g_SSh_status_slideTime;
			this._statusWindow.contentsOpacity += 256 / DrillUp.g_SSh_status_slideTime;
			if( DrillUp.g_SSh_status_Layout_visible ){
				this._layout_statusWindow.x = this._statusWindow.x + DrillUp.g_SSh_status_LayoutX;
				this._layout_statusWindow.y = this._statusWindow.y + DrillUp.g_SSh_status_LayoutY;
				this._layout_statusWindow.opacity = this._statusWindow.contentsOpacity;
			}else{
				this._statusWindow.opacity += 256 / DrillUp.g_SSh_status_slideTime;
			}
		}
		this._statusWindow._move += 1;
		this._statusWindow.visible = true;
		if( this._statusWindow._move >= DrillUp.g_SSh_status_slideTime ){ this._statusWindow._move = DrillUp.g_SSh_status_slideTime }
		
	}else{	//持有数窗口隐藏
		if( this._statusWindow._move > 0 ){
			this._statusWindow.x += DrillUp.g_SSh_status_slideX / DrillUp.g_SSh_status_slideTime;
			this._statusWindow.y += DrillUp.g_SSh_status_slideY / DrillUp.g_SSh_status_slideTime;
			this._statusWindow.contentsOpacity -= 256 / DrillUp.g_SSh_status_slideTime;
			if( DrillUp.g_SSh_status_Layout_visible ){
				this._layout_statusWindow.x = this._statusWindow.x + DrillUp.g_SSh_status_LayoutX;
				this._layout_statusWindow.y = this._statusWindow.y + DrillUp.g_SSh_status_LayoutY;
				this._layout_statusWindow.opacity = this._statusWindow.contentsOpacity;
			}else{
				this._statusWindow.opacity -= 256 / DrillUp.g_SSh_status_slideTime;
			}
		}
		this._statusWindow._move -= 1;
		if( this._statusWindow._move <= 0 ){ this._statusWindow._move = 0;this._statusWindow.visible = false; }
	}
}	
//==============================
// * 商店-持有数窗口刷新
//==============================
var _drill_SSh_Status_refresh = Window_ShopStatus.prototype.refresh;
Window_ShopStatus.prototype.refresh = function() {
	this.contents.fontSize = DrillUp.g_SSh_status_fontsize;
	_drill_SSh_Status_refresh.call(this);
	this._move = 0;
	this.opacity = 0;
	this.contentsOpacity = 0;
	this.x = DrillUp.g_SSh_status_x + DrillUp.g_SSh_status_slideX ;
	this.y = DrillUp.g_SSh_status_y + DrillUp.g_SSh_status_slideY ;
};


//=============================================================================
// ** 商店-物品数量窗口
//=============================================================================

//==============================
// * 商店-物品数量窗口
//==============================
Scene_Shop.prototype.createNumberWindow = function() {
	var wx = DrillUp.g_SSh_number_x;
    var wy = DrillUp.g_SSh_number_y;
	var ww = DrillUp.g_SSh_number_width;
    var wh = DrillUp.g_SSh_number_height;
    this._numberWindow = new Window_ShopNumber(wx, wy, wh);
    this._numberWindow.x = wx + DrillUp.g_SSh_number_slideX;
    this._numberWindow.y = wy + DrillUp.g_SSh_number_slideY;
    this._numberWindow.width = ww;
    this._numberWindow.height = wh;
	this._numberWindow.windowWidth = function(){ return ww;}
	this._numberWindow.windowHeight = function(){ return wh;}
	this._numberWindow.opacity = 0;
	this._numberWindow.contentsOpacity = 0;
	this._numberWindow.visible = false;
	this._numberWindow._move = 0;
	this._numberWindow.standardFontSize = function(){ return DrillUp.g_SSh_number_fontsize;}
    this._numberWindow.hide = function(){ return null;}
    this._numberWindow.lineHeight = function(){ return DrillUp.g_SSh_number_fontsize;}
	if( DrillUp.g_SSh_number_Layout_visible ){
		this._layout_numberWindow = new Sprite(ImageManager.load_MenuShop(DrillUp.g_SSh_layout_number));
		this._layout_numberWindow.opacity = 0;
		this._field.addChild(this._layout_numberWindow);	
	}
    this._numberWindow.hide();
    this._numberWindow.setHandler('ok',     this.onNumberOk.bind(this));
    this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
    this.addWindow(this._numberWindow);
};

Scene_Shop.prototype.drill_SSh_updateNumberWindow = function() {
	if( this._numberWindow.active ){	//物品数量显示
		if( this._numberWindow._move < DrillUp.g_SSh_number_slideTime ){
			this._numberWindow.x -= DrillUp.g_SSh_number_slideX / DrillUp.g_SSh_number_slideTime;
			this._numberWindow.y -= DrillUp.g_SSh_number_slideY / DrillUp.g_SSh_number_slideTime;
			this._numberWindow.contentsOpacity += 256 / DrillUp.g_SSh_number_slideTime;
			if( DrillUp.g_SSh_number_Layout_visible ){
				this._layout_numberWindow.x = this._numberWindow.x + DrillUp.g_SSh_number_LayoutX;
				this._layout_numberWindow.y = this._numberWindow.y + DrillUp.g_SSh_number_LayoutY;
				this._layout_numberWindow.opacity = this._numberWindow.contentsOpacity;
			}else{
				this._numberWindow.opacity += 256 / DrillUp.g_SSh_number_slideTime;
			}
		}
		this._numberWindow._move += 1;
		this._numberWindow.visible = true;
		if( this._numberWindow._move >= DrillUp.g_SSh_number_slideTime ){ this._numberWindow._move = DrillUp.g_SSh_number_slideTime }
		
	}else{	//物品数量隐藏
		if( this._numberWindow._move > 0 ){
			this._numberWindow.x += DrillUp.g_SSh_number_slideX / DrillUp.g_SSh_number_slideTime;
			this._numberWindow.y += DrillUp.g_SSh_number_slideY / DrillUp.g_SSh_number_slideTime;
			this._numberWindow.contentsOpacity -= 256 / DrillUp.g_SSh_number_slideTime;
			if( DrillUp.g_SSh_number_Layout_visible ){
				this._layout_numberWindow.x = this._numberWindow.x + DrillUp.g_SSh_number_LayoutX;
				this._layout_numberWindow.y = this._numberWindow.y + DrillUp.g_SSh_number_LayoutY;
				this._layout_numberWindow.opacity = this._numberWindow.contentsOpacity;
			}else{
				this._numberWindow.opacity -= 256 / DrillUp.g_SSh_number_slideTime;
			}
		}
		this._numberWindow._move -= 1;
		if( this._numberWindow._move <= 0 ){ this._numberWindow._move = 0; this._numberWindow.visible = false;  }
	}
}	

//==============================
// * 商店-物品数量（交换物计算）
//==============================
Window_ShopNumber.prototype.refresh = function() {
    if(this._item.note.indexOf('货物')!=-1)$gameSystem._drill_SSh_sell_rate = 1;
    else $gameSystem._drill_SSh_sell_rate = 0.5;
    this.contents.clear();
    //this.drawText("x"+this._number, 100, this.itemY(),300, 'left');
    this.drawItemName(this._item, 0, this.itemY());
    this.drawMultiplicationSign();
    this.drawNumber();
    this.drawTotalPrice();
};
Window_ShopNumber.prototype.cursorX = function() {
    return this.contentsWidth() - this.cursorWidth() - this.textPadding()+300;
};
Window_ShopNumber.prototype.drawNumber = function() {
    var x = this.cursorX();
    var y = this.itemY();
    var width = this.cursorWidth() - this.textPadding();
    this.resetTextColor();
    this.drawText("x"+this._number, 250, y, width+100, 'left');
};
Window_ShopNumber.prototype.drawTotalPrice = function() {
    var total = this._price * this._number;
    //alert(this._price);
    var width = this.contentsWidth() - this.textPadding();
	
	if( $gameSystem._drill_SSh_exchange_mode ){
		this.drawCurrencyValue(total, this.convertEscapeCharacters($gameSystem._drill_SSh_exchange_unit), 0, this.priceY(), width);
	}else{
		this.drawCurrencyValue(total, this._currencyUnit, 0, this.priceY(), width);
	}
};
var _drill_SSh_n_drawCurrencyValue = Window_ShopNumber.prototype.drawCurrencyValue;
Window_ShopNumber.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
    if($gameSystem._drill_SSh_exchange_mode){
		var unitWidth = Math.min(80, this.textWidth(unit));
		this.resetTextColor();
		//this.drawText(value+"金币", x, y, width - unitWidth - 6, 'right');
		this.changeTextColor(this.systemColor());
		this.drawTextEx(unit, x + width - unitWidth + 5, y-5 );		//修改货币单位为图标
	}else{
	//	_drill_SSh_n_drawCurrencyValue.call(this,value+"金币", unit, x, y, width);
	}
};

//=============================================================================
// ** 商店-出售窗口
//=============================================================================

//==============================
// * 商店-出售窗口初始化
//==============================
Scene_Shop.prototype.createSellWindow = function() {

	var wx = DrillUp.g_SSh_sell_x;
    var wy = DrillUp.g_SSh_sell_y;
	var ww = DrillUp.g_SSh_sell_width;
    var wh = DrillUp.g_SSh_sell_height;
    this._sellWindow = new Window_ShopSell(wx, wy, ww, wh);
    this._sellWindow.x = wx + DrillUp.g_SSh_sell_slideX;
    this._sellWindow.y = wy + DrillUp.g_SSh_sell_slideY;
    this._sellWindow.width = ww;
    this._sellWindow.height = wh;
	this._sellWindow.windowWidth = function(){ return ww;}
	this._sellWindow.windowHeight = function(){ return wh;}
	this._sellWindow.opacity = 0;
	this._sellWindow.contentsOpacity = 0;
	this._sellWindow.visible = false;
	this._sellWindow._move = 0;
	this._sellWindow.standardFontSize = function(){ return DrillUp.g_SSh_sell_fontsize;}
	this._sellWindow.maxCols = function(){ return DrillUp.g_SSh_sell_col;}
    this._sellWindow.hide = function(){ return null;}
	if( DrillUp.g_SSh_sell_Layout_visible ){
		this._layout_sellWindow = new Sprite(ImageManager.load_MenuShop(DrillUp.g_SSh_layout_sell));
		this._layout_sellWindow.opacity = 0;
		this._field.addChild(this._layout_sellWindow);	
	}
    this._sellWindow.setHelpWindow(this._helpWindow);
    this._sellWindow.hide();
    this._sellWindow.setHandler('ok',     this.onSellOk.bind(this));
    this._sellWindow.setHandler('cancel', this.onSellCancel.bind(this));
    this._categoryWindow.setItemWindow(this._sellWindow);
    this.addWindow(this._sellWindow);
};

//==============================
// * 商店-出售窗口帧变化
//==============================
Scene_Shop.prototype.drill_SSh_updateSellWindow = function() {
	if( this._sellWindow.active ||
		(this._commandWindow._index === 1 && this._numberWindow.active ) ){	//出售窗口显示
		if( this._sellWindow._move < DrillUp.g_SSh_sell_slideTime ){
			this._sellWindow.x -= DrillUp.g_SSh_sell_slideX / DrillUp.g_SSh_sell_slideTime;
			this._sellWindow.y -= DrillUp.g_SSh_sell_slideY / DrillUp.g_SSh_sell_slideTime;
			this._sellWindow.contentsOpacity += 256 / DrillUp.g_SSh_sell_slideTime;
			if( DrillUp.g_SSh_sell_Layout_visible ){
				this._layout_sellWindow.x = this._sellWindow.x + DrillUp.g_SSh_sell_LayoutX;
				this._layout_sellWindow.y = this._sellWindow.y + DrillUp.g_SSh_sell_LayoutY;
				this._layout_sellWindow.opacity = this._sellWindow.contentsOpacity;
			}else{
				this._sellWindow.opacity += 256 / DrillUp.g_SSh_sell_slideTime;
			}
		}
		this._sellWindow._move += 1;
		this._sellWindow.visible = true;
		if( this._sellWindow._move >= DrillUp.g_SSh_sell_slideTime ){ this._sellWindow._move = DrillUp.g_SSh_sell_slideTime }
		
	}else{	//出售窗口隐藏
		if( this._sellWindow._move > 0 ){
			this._sellWindow.x += DrillUp.g_SSh_sell_slideX / DrillUp.g_SSh_sell_slideTime;
			this._sellWindow.y += DrillUp.g_SSh_sell_slideY / DrillUp.g_SSh_sell_slideTime;
			this._sellWindow.contentsOpacity -= 256 / DrillUp.g_SSh_sell_slideTime;
			if( DrillUp.g_SSh_sell_Layout_visible ){
				this._layout_sellWindow.x = this._sellWindow.x + DrillUp.g_SSh_sell_LayoutX;
				this._layout_sellWindow.y = this._sellWindow.y + DrillUp.g_SSh_sell_LayoutY;
				this._layout_sellWindow.opacity = this._sellWindow.contentsOpacity;
			}else{
				this._sellWindow.opacity -= 256 / DrillUp.g_SSh_sell_slideTime;
			}
		}
		this._sellWindow._move -= 1;
		if( this._sellWindow._move <= 0 ){ this._sellWindow._move = 0; this._sellWindow.visible = false; }
		
	}
}	

//==============================
// * 商店-执行出售
//==============================
Scene_Shop.prototype.doSell = function(number) {
	if( $gameSystem._drill_SSh_exchange_mode ){
		$gameParty.gainItem($dataItems[$gameSystem._drill_SSh_exchange_item], number*this.sellingPrice() );
	}else{
		$gameParty.gainGold(number * this.sellingPrice(this._item.id));
	}
    $gameParty.loseItem(this._item, number);
};
//==============================
// * 商店-出售倍率
//==============================
Scene_Shop.prototype.sellingPrice = function(id) {
	var result = Math.ceil( this._item.price * $gameSystem._drill_SSh_sell_rate );
	if( result == 0 ){ result = 1;}
//	if(id >= 220 && id <= 240)result = this._item.price;
	return result;
};

//=============================================================================
// ** 商店-出售类型窗口
//=============================================================================

//==============================
// * 商店-出售类型窗口初始化
//==============================
Scene_Shop.prototype.createCategoryWindow = function() {
	var wx = DrillUp.g_SSh_category_x;
    var wy = DrillUp.g_SSh_category_y;
	var ww = DrillUp.g_SSh_category_width;
    var wh = DrillUp.g_SSh_category_height;
    this._categoryWindow = new Window_ShopItemCategory();
    this._categoryWindow.x = wx + DrillUp.g_SSh_category_slideX;
    this._categoryWindow.y = wy + DrillUp.g_SSh_category_slideY;
    this._categoryWindow.width = ww;
    this._categoryWindow.height = wh;
	this._categoryWindow.windowWidth = function(){ return ww;}
	this._categoryWindow.windowHeight = function(){ return wh;}
	this._categoryWindow.opacity = 0;
	this._categoryWindow.contentsOpacity = 0;
	this._categoryWindow.visible = false;
	this._categoryWindow._move = 0;
	this._categoryWindow.standardFontSize = function(){ return DrillUp.g_SSh_category_fontsize;}
    this._categoryWindow.hide = function(){ return null;}
	if( DrillUp.g_SSh_category_Layout_visible ){
		this._layout_categoryWindow = new Sprite(ImageManager.load_MenuShop(DrillUp.g_SSh_layout_category));
		this._layout_categoryWindow.opacity = 0;
		this._field.addChild(this._layout_categoryWindow);	
	}
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.hide();
    this._categoryWindow.deactivate();
    this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler('cancel', this.onCategoryCancel.bind(this));
    this.addWindow(this._categoryWindow);
};

//==============================
// * 商店-出售类型窗口帧变化
//==============================
Scene_Shop.prototype.drill_SSh_updateCategoryWindow = function() {
	if( this._categoryWindow.active ){	//出售类型窗口显示
		if( this._categoryWindow._move < DrillUp.g_SSh_category_slideTime ){
			this._categoryWindow.x -= DrillUp.g_SSh_category_slideX / DrillUp.g_SSh_category_slideTime;
			this._categoryWindow.y -= DrillUp.g_SSh_category_slideY / DrillUp.g_SSh_category_slideTime;
			this._categoryWindow.contentsOpacity += 256 / DrillUp.g_SSh_category_slideTime;
			if( DrillUp.g_SSh_category_Layout_visible ){
				this._layout_categoryWindow.x = this._categoryWindow.x + DrillUp.g_SSh_category_LayoutX;
				this._layout_categoryWindow.y = this._categoryWindow.y + DrillUp.g_SSh_category_LayoutY;
				this._layout_categoryWindow.opacity = this._categoryWindow.contentsOpacity;
			}else{
				this._categoryWindow.opacity += 256 / DrillUp.g_SSh_category_slideTime;
			}
			this._categoryWindow._move += 1;
			this._categoryWindow.visible = true;
			if( this._categoryWindow._move >= DrillUp.g_SSh_category_slideTime ){ this._categoryWindow._move = DrillUp.g_SSh_category_slideTime }
		}
		
	}else{	//出售类型窗口隐藏
		if( this._categoryWindow._move > 0 ){
			this._categoryWindow.x += DrillUp.g_SSh_category_slideX / DrillUp.g_SSh_category_slideTime;
			this._categoryWindow.y += DrillUp.g_SSh_category_slideY / DrillUp.g_SSh_category_slideTime;
			this._categoryWindow.contentsOpacity -= 256 / DrillUp.g_SSh_category_slideTime;
			if( DrillUp.g_SSh_category_Layout_visible ){
				this._layout_categoryWindow.x = this._categoryWindow.x + DrillUp.g_SSh_category_LayoutX;
				this._layout_categoryWindow.y = this._categoryWindow.y + DrillUp.g_SSh_category_LayoutY;
				this._layout_categoryWindow.opacity = this._categoryWindow.contentsOpacity;
			}else{
				this._categoryWindow.opacity -= 256 / DrillUp.g_SSh_category_slideTime;
			}
			this._categoryWindow._move -= 1;
			if( this._categoryWindow._move <= 0 ){ this._categoryWindow._move = 0;this._categoryWindow.visible = false; }
		}
	}
}	

//==============================
// * 商店-手动新建一个出售物品类型窗口
//==============================
function Window_ShopItemCategory() {
    this.initialize.apply(this, arguments);
}

Window_ShopItemCategory.prototype = Object.create(Window_Command.prototype);
Window_ShopItemCategory.prototype.constructor = Window_ShopItemCategory;

Window_ShopItemCategory.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
};

Window_ShopItemCategory.prototype.update = function() {
    Window_Command.prototype.update.call(this);
    if (this._itemWindow) {
        this._itemWindow.setCategory(this.currentSymbol());
    }
};
Window_ShopItemCategory.itemHeight = function() {
    return 40;
};
Window_ShopItemCategory.prototype.makeCommandList = function() {
    this.addCommand(TextManager.item,    'item');
    this.addCommand(TextManager.weapon,  'weapon');
    this.addCommand(TextManager.armor,   'armor');
    this.addCommand(TextManager.keyItem, 'keyItem');
};
Window_ShopItemCategory.prototype.windowWidth = function() {
    return DrillUp.g_SSh_category_width;
};
Window_ShopItemCategory.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
};
Window_ShopItemCategory.prototype.maxCols = function() {
    return DrillUp.g_SSh_category_col;
};
Window_ShopItemCategory.prototype.itemTextAlign = function() {
    return DrillUp.g_SSh_category_align;
};

//=============================================================================
// ** 商店-服务员
//=============================================================================
Scene_Shop.prototype.drill_SSh_createWaitress = function() {
	if( !$gameSystem._drill_SSh_waitress_id ){$gameSystem._drill_SSh_waitress_id = 0;}
	this._drill_SSh_cur_waitress = DrillUp.g_SSh_waitress_list[$gameSystem._drill_SSh_waitress_id];
	//载入图片
	for(var j = 0; j < this._drill_SSh_cur_waitress['src_img'].length ; j++){
		this._drill_SSh_cur_waitress['src_bitmaps'].push(ImageManager.load_MenuShop(this._drill_SSh_cur_waitress['src_img'][j]));
	}
	
	this._drill_SSh_waitress = new Sprite( this._drill_SSh_cur_waitress['src_bitmaps'][0] );
	this._drill_SSh_waitress._flash = 0 ;
	this._drill_SSh_waitress.x = this._drill_SSh_cur_waitress['x'] + this._drill_SSh_cur_waitress['slide_x'] ;
	this._drill_SSh_waitress.y = this._drill_SSh_cur_waitress['y'] + this._drill_SSh_cur_waitress['slide_y'] ;
	this._drill_SSh_waitress.opacity = 0 ;
	this._drill_SSh_waitress._move = 0 ;
	this._field.addChild(this._drill_SSh_waitress);	
}

Scene_Shop.prototype.drill_SSh_updateWaitress = function() {
	if( !this._drill_SSh_waitress){return;}
	if( !this._drill_SSh_waitress.bitmap.isReady()){return;}
	
	this._drill_SSh_cur_waitress = DrillUp.g_SSh_waitress_list[$gameSystem._drill_SSh_waitress_id];
	this._drill_SSh_waitress._flash += 1;			//帧变化
	var inter = this._drill_SSh_waitress._flash ;
	inter = inter / this._drill_SSh_cur_waitress['interval'];
	inter = inter % this._drill_SSh_cur_waitress['src_bitmaps'].length;
	if( this._drill_SSh_cur_waitress['back_run'] ){
		inter = this._drill_SSh_cur_waitress['src_bitmaps'].length - 1 - inter;
	}
	inter = Math.floor(inter);
	this._drill_SSh_waitress.bitmap = this._drill_SSh_cur_waitress['src_bitmaps'][inter];
	
	if( this._drill_SSh_waitress._move < this._drill_SSh_cur_waitress['slide_time'] ){
		this._drill_SSh_waitress.x -= this._drill_SSh_cur_waitress['slide_x'] / this._drill_SSh_cur_waitress['slide_time'] ;
		this._drill_SSh_waitress.y -= this._drill_SSh_cur_waitress['slide_y'] / this._drill_SSh_cur_waitress['slide_time'] ;
		this._drill_SSh_waitress.opacity += 256 / this._drill_SSh_cur_waitress['slide_time'] ;
		this._drill_SSh_waitress._move += 1;
	}
}	

