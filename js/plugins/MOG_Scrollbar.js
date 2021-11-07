//=============================================================================
// MOG_Scrollbar.js
//=============================================================================

/*:
 * @plugindesc (v2.2)[v1.2]  主菜单 - 滚动条
 * @author Moghunter （Drill_up翻译+优化）
 *
 * @param 是否一直显示
 * @type boolean
 * @on 一直显示
 * @off 自动按需要显示
 * @desc true - 一直显示，false - 自动按需要显示
 * @default false
 *
 * @param 资源-滚动框
 * @desc 滚动框的图片资源。
 * @default 滚动条-外框
 * @require 1
 * @dir img/Menu__ui/
 * @type file
 *
 * @param 偏移-滚动框 X
 * @desc 以列表框右上角分配点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 偏移-滚动框 Y
 * @desc 以列表框右上角分配点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 资源-滚动内条
 * @desc 滚动框的图片资源。
 * @default 滚动条-内条
 * @require 1
 * @dir img/Menu__ui/
 * @type file
 *
 * @param 偏移-滚动内条 X
 * @desc 以列表框右上角分配点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 1
 *
 * @param 偏移-滚动内条 Y
 * @desc 以列表框右上角分配点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 1
 *
 * @help  
 * =============================================================================
 * +++ MOG - Scroll Bar (v2.2) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 游戏菜单中，当窗口的元素过多不能全显示时，右侧会出现一列滚动条。
 * 【现已支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、菜单界面、地图界面。
 *   滚动条作用于所有含选项的窗口。
 * 2.滚动条只显示，不能被鼠标拖动。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__ui （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__ui文件夹。
 * 使用滚动条，需要配置资源文件：
 *
 * 资源-滚动框
 * 资源-滚动内条
 *
 * -----------------------------------------------------------------------------
 * ----关于Drill_up优化：
 * [v1.1]
 * 使得该插件支持关联资源的打包、加密。
 * 部署时勾选去除无关文件，本插件中相关的文件不会被去除。
 * [v1.2]
 * 修改了插件关联的资源文件夹。
 * 
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

　　var Imported = Imported || {};
　　Imported.MOG_Scrollbar = true;
　　var Moghunter = Moghunter || {}; 

    Moghunter.parameters = PluginManager.parameters('MOG_Scrollbar');
	Moghunter.scrollBarAlwaysVisible = String(Moghunter.parameters['是否一直显示'] || 'false');
    Moghunter.scrollBarX = Number(Moghunter.parameters['偏移-滚动框 X'] || 0);
    Moghunter.scrollBarY = Number(Moghunter.parameters['偏移-滚动框 Y'] || 0);	
    Moghunter.scrollBar_ButtonX = Number(Moghunter.parameters['偏移-滚动内条 X'] || 1);
    Moghunter.scrollBar_ButtonY = Number(Moghunter.parameters['偏移-滚动内条 Y'] || 1);	

	Moghunter.src_ScrollBarA = String(Moghunter.parameters['资源-滚动框']);
	Moghunter.src_ScrollBarB = String(Moghunter.parameters['资源-滚动内条']);
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MenuUi = function(filename) {
    return this.loadBitmap('img/Menu__ui/', filename, 0, true);
};

//=============================================================================
// ** Window Selectable
//=============================================================================	
//==============================
// * Initialize
//==============================
var _mog_scrollbar_winSel_initialize = Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function(x, y, width, height) {
	_mog_scrollbar_winSel_initialize.call(this,x, y, width, height);
	this.createScrollBar();
};

//==============================
// * create Scroll Bar
//==============================
Window_Selectable.prototype.createScrollBar = function() {
	this._refScroll = true;
	this._scrollBar = new SpriteScrollBar(this);
	var id = this.scrollBarSetChild();
	this.addChildAt(this._scrollBar,id);
};

//==============================
// * scrollBarSetChild
//==============================
Window_Selectable.prototype.scrollBarSetChild = function() {
	var id = 3;
	if (id > this.children.length) {id = this.children.length};
	return id;
};

//==============================
// * set Cursor Rect
//==============================
var _mog_scroll_setCursorRect = Window_Selectable.prototype.setCursorRect;
Window_Selectable.prototype.setCursorRect = function(x, y, width, height) {
	_mog_scroll_setCursorRect.call(this,x, y, width, height);
    this._refScroll = true;
};

//==============================
// * select
//==============================
var _mog_scrollbar_wsel_select = Window_Selectable.prototype.select;
Window_Selectable.prototype.select = function(index) {
	_mog_scrollbar_wsel_select .call(this,index);
    if (this._scrollBar) {this._scrollBar.update()};
};

//=============================================================================
// ** Sprite Scroll Bar
//=============================================================================
function SpriteScrollBar() {
    this.initialize.apply(this, arguments);
};

SpriteScrollBar.prototype = Object.create(Sprite.prototype);
SpriteScrollBar.prototype.constructor = SpriteScrollBar;

//==============================
// * Initialize
//==============================
SpriteScrollBar.prototype.initialize = function(win) {
    Sprite.prototype.initialize.call(this);
	this._window = win;	
	this.visible = false;
    this._avisble = String(Moghunter.scrollBarAlwaysVisible) === 'true' ? true : false;
	this.loadBitmaps();
	this.createSprites();
};

//==============================
// * Load Bitmaps
//==============================
SpriteScrollBar.prototype.loadBitmaps = function() {
   this._img1 = ImageManager.load_MenuUi(Moghunter.src_ScrollBarA);
   this._img2 = ImageManager.load_MenuUi(Moghunter.src_ScrollBarB);
};

//==============================
// * rc
//==============================
SpriteScrollBar.prototype.rc = function() {
   return this._window._cursorRect
};

//==============================
// * create Sprites
//==============================
SpriteScrollBar.prototype.createSprites = function() {
    this.createBack();
	this.createButton();
};

//==============================
// * create Back
//==============================
SpriteScrollBar.prototype.createButton = function() {
    this._button = [];
	this._button._ny = 0;
	this._button._maxItens = -1;
	this._button._maxTopRow = -1;
	for (var i = 0; i < 3; i++) {
		 this._button[i] = new Sprite(this._img2);
		 this._button[i].visible = false;
		 this.addChild(this._button[i]);
	};	
};

//==============================
// * refresh button
//==============================
SpriteScrollBar.prototype.refreshButton = function() {
	var w = this._img2.width / 2;
	var h = this._img2.height;
    for (var i = 0; i < this._button.length; i++) {
		 var p = [0,-999];
		 var bx = Moghunter.scrollBar_ButtonX;
		 var by = this.buttonPos();
		 this._button[i].setFrame(0,0,w,h);
		 this._button[i].visible = true;
		 if (i === 0) {p = [bx,by - this._img2.height]};
		 if (i === 1) {p = [bx,by];this._button[i].setFrame(w,0,w,h)};
		 if (i === 2) {p = [bx,by + this.buttonSize() + this._img2.height]};
		 this._button[i].x = p[0];
	     if (this._button._maxItens != this._window.maxItems()) {
			 this._button[i].y = p[1]
			
		};
	};
	this.setScaleButton();
	this._button._maxItens = this._window.maxItems();
};

//==============================
// * update Button
//==============================
SpriteScrollBar.prototype.updateButton = function() {
    for (var i = 0; i < this._button.length; i++) {
		 var by = this.buttonPos();
		 if (i === 0) {ny = by - this._img2.height};
		 if (i === 1) {ny = by};
		 if (i === 2) {ny = by + this.buttonSize() + this._img2.height};
	     this._button[i].y = this.moveto(this._button[i].y,ny);
	};
};

//==============================
// * button Size
//==============================
SpriteScrollBar.prototype.buttonSize = function() {
	var size = (this.heightF() - (this.padding() * this._window.maxTopRow()));
	return Math.min(Math.max(size,this.padding()),this.heightF());
};

//==============================
// * moveto
//==============================
SpriteScrollBar.prototype.moveto = function(value,real_value) {
	if (value == real_value) {return value};
	var dnspeed = 3 + (Math.abs(value - real_value) / 10);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};

//==============================
// * scroll Bar Y
//==============================
SpriteScrollBar.prototype.scrollBarY = function() {
	return Moghunter.scrollBar_ButtonY;
};

//==============================
// * button Pos
//==============================
SpriteScrollBar.prototype.buttonPos = function() {
	var space_max = this.heightF() - this.buttonSize();
 	var space = space_max / this._window.maxTopRow();
	var s = Math.min(Math.max(space,0.001),space_max);
	var y = this.scrollBarY() + (s * Math.floor(this._window.topIndex() / this._window.maxCols()));
	return Math.min(Math.max(y,0),space_max);
};

//==============================
// * set Scale Button
//==============================
SpriteScrollBar.prototype.setScaleButton = function() {
    this._button[1].scale.y = this.buttonSize() / this._img2.height;
	this._button[2].scale.y = -1.00;
};

//==============================
// * create Back
//==============================
SpriteScrollBar.prototype.createBack = function() {
    this._back = [];
	for (var i = 0; i < 3; i++) {
		 this._back[i] = new Sprite(this._img1);
		 this._back[i].visible = false;
		 this.addChild(this._back[i]);
	};	
};

//==============================
// * refresh Back
//==============================
SpriteScrollBar.prototype.refreshBack = function() {
	var w = this._img1.width / 2;
	var h = this._img1.height;
    for (var i = 0; i < this._back.length; i++) {
		 var p = [0,0];
		 this._back[i].setFrame(0,0,w,h);
		 if (i === 0) {p = [0,-this._img1.height]};
		 if (i === 1) {p = [0,0];this._back[i].setFrame(w,0,w,h)};
		 if (i === 2) {p = [0,this.heightF() + this._img1.height]};
		 this._back[i].x = p[0];
		 this._back[i].y = p[1];
		 this._back[i].visible = true;
	};
	this.setScaleBack();
};

//==============================
// * Set Scale Back
//==============================
SpriteScrollBar.prototype.setScaleBack = function() {
    this._back[1].scale.y = this.heightF() / this._img1.height;
	this._back[2].scale.y = -1.00;
};

//==============================
// * Padding
//==============================
SpriteScrollBar.prototype.padding = function() {
   return this._window.standardPadding()
};

//==============================
// * Pos X
//==============================
SpriteScrollBar.prototype.posX = function() {
	return this._window.width - this.padding() + Moghunter.scrollBarX;
};

//==============================
// * Pos Y
//==============================
SpriteScrollBar.prototype.posY = function() {
	return this.padding() + Moghunter.scrollBarY;
};

//==============================
// * Height F
//==============================
SpriteScrollBar.prototype.heightF = function() {
    return this._window.height - (this.padding() * 2);
};

//==============================
// * refresh Sprites
//==============================
SpriteScrollBar.prototype.refreshSprites = function() {
    this._window._refScroll = false;
	this._button._maxTopRow = this._window.maxTopRow();
	this.refreshBack();
	this.refreshButton();
};

//==============================
// * needRefresh
//==============================
SpriteScrollBar.prototype.needRefresh = function() {
	if (this._window._refScroll) {return true};
	if (this._button._maxTopRow != this._window.maxTopRow()) {return true}; 
    return false;
};

//==============================
// * update Position
//==============================
SpriteScrollBar.prototype.updatePosition = function() {
     if (this.needRefresh()) {this.refreshSprites()};
	 this.updateButton();
	 this.visible = this.isVisible();
	 this.x = this.posX();
  	 this.y = this.posY();
     this.opacity = this._window.contentsOpacity;
	 if (!this.visible) {this._button._maxItens = -2}; 
};

//==============================
// * Is Visible
//==============================
SpriteScrollBar.prototype.isVisible = function() {
	if (this._window._opening) {return false};
	if (this._window._closing) {return false};
	if (this._window.openness <= 0) {return false};
	if (!this._window.visible) {return false};
	if (this._window.maxTopRow() === 0) {return false};
	if (!this._avisble && !this._window.active) {return false};
	return true;
};

//==============================
// * Update
//==============================
SpriteScrollBar.prototype.update = function() {
    Sprite.prototype.update.call(this);
	if (!this._img1) {return};
    if (!this._img1.isReady()) {return};
	if (!this.rc()) {this.visible = false;return};
	this.updatePosition();
};

//=============================================================================
// UI_ScrollWindow.js
//=============================================================================
/*:
 * @plugindesc Scrollable Window
 * @author Hoozuki Araragi
 *
 * @help This plugin does not provide plugin commands.
 */
class Window_Scroll extends Window_Base {
        /**
         * 
         * @param {Number} fX 
         * @param {Number} fY 
         * @param {Number} fWidth 
         * @param {Number} fHeight 
         */
    constructor(fX, fY, fWidth, fHeight) {
        super(fX, fY, fWidth, fHeight);
        this._bTouching = false;
        this._bTouched = false;
        this._fScrollX = 0;
        this._fScrollY = 0;
        this._fScrollingX = 0;
        this._fScrollingY = 0;
        this._fScrollOriginX = 0;
        this._fScrollOriginY = 0;
        this._fScrollMaxX = 0;
        this._fScrollMaxY = 0;
        this._fScrollMinX = 0;
        this._fScrollMinY = 0;
        this._fScrollerHeight = 0;
        this._bVertical = true;
        this._bHorizontal = false;
        this._inertia = 0;
        this._lastY = 0;
        this._oHandlers = {};
    }
 
    static get inertiaAttenuation() {return 0.94;}
 
    standardPadding() {
        return 2;
    }
    standardPaddingY() {
        return 2;
    }
 
    move(x, y, w, h) {
        super.move(x, y, w, h);
    }
 
    /**
     *
     * @param {string} symbol
     * @param {function} method
     */
    setHandler(symbol, method) {
        this._oHandlers[symbol] = method;
    }
 
    /**
     *
     * @param {string} symbol
     */
    isHandled(symbol) {
        return !!this._oHandlers[symbol];
    }
 
    /**
     *
     * @param {string} symbol
     */
    callHandler(symbol) {
        if (this.isHandled(symbol)) {
            this._oHandlers[symbol]();
        }
    }
 
    get scrollBarOffset() {
        return 4;
    }
 
    get scrollBarWidth() {
        return 4;
    }
 
    get scrollerHeight() {
        if (this._fScrollerHeight === 0) {
            let l = this._scrollBar.height + this._fScrollMinY / 4;
            this._fScrollerHeight = Math.max(l, 30);
        }
        return this._fScrollerHeight;
    }
 
    get scrollBarColor() {
        return '#000000';
    }
 
    get scrollerColor() {
        return '#000000'
    }
 
    createScrollBar() {
        let bg = new Sprite(new Bitmap(this.scrollBarWidth, this.height - 2 * this.scrollBarOffset));
        bg.bitmap.fillRect(0, 0, this.scrollBarWidth, this.height - 2 * this.scrollBarOffset, this.scrollBarColor);
        this._scrollBar = bg;
        this.addChild(bg);
        bg.move(this.width - this.scrollBarWidth - 4, this.scrollBarOffset);
    }
 
    createScroller() {
        let l = this.scrollerHeight;
        let item = new Sprite(new Bitmap(this.scrollBarWidth, l));
        item.bitmap.drawItemBox(0, 0, this.scrollBarWidth, l, 'img/system/', 'window_scroller', 0, 2);
        this._scroller = item;
        this.addChild(item);
        item.move(this.width - this.scrollBarWidth - 4, this.scrollBarOffset);
    }
 
    processTouch() {
        if (TouchInput.isCancelled()) {
            this.processCancel();
        }
    }
 
    processCancel() {
        if (this.isHandled('cancel')) {
            SoundManager.playCancel();
            this.callHandler('cancel');
        }
    }
 
    contentsHeight() {
        return this.height - this.standardPaddingY() * 2 - this._fScrollMinY;
    }
 
    contentsWidth() {
        return this.width - this.standardPadding() * 2 - this._fScrollMinX;
    }
 
    /**
     *
     * @param fYmax {number}
     * @param fYmin {number}
     * @param fXmax {number}
     * @param fXmin {number}
     */
    setScrollLimit(fYmax, fYmin, fXmax, fXmin) {
        this._fScrollMaxX = fXmax;
        this._fScrollMaxY = fYmax;
        this._fScrollMinX = fXmin;
        this._fScrollMinY = fYmin;
        this.createContents();
        if (fYmin < 0) {
            this.createScrollBar();
            this.createScroller();
        }
    }
 
    /**
     *
     * @param horz {boolean}
     * @param vert {boolean}
     */
    setScrollDirection(horz, vert) {
        this._bVertical = vert;
        this._bHorizontal = horz;
    }
 
    get scrollX() {
        return this._fScrollX + this._fScrollingX;
    }
 
    get scrollY() {
        return this._fScrollY + this._fScrollingY;
    }
 
    resetScroll() {
        this._fScrollX = 0;
        this._fScrollY = 0;
    }
 
    update() {
        super.update();
        this.updateTouching();
        this.processScroll();
        this.updateScroll();
        this.updateContentScroll();
        this.updateScrollBar();
        this.processRelease();
        this.processTouch();
    }
 
    isMouseOver() {
        var x = this.parent.canvasToLocalX? this.parent.canvasToLocalX(TouchInput.x) : TouchInput.x;
        var y = this.parent.canvasToLocalY? this.parent.canvasToLocalY(TouchInput.y) : TouchInput.y;
        return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
    }
 
    updateTouching() {
        if (this.active) {
            if (TouchInput.isPressed() && this.isMouseOver()) {
                if (!this._bTouching) {
                    this._fScrollOriginX = TouchInput.x;
                    this._fScrollOriginY = TouchInput.y;
                }
                this._bTouching = true;
                this._bTouched = true;
            } else {
                this._bTouching = false;
                if (this._inertia > 1 || this._inertia < -1) {
                    this._fScrollY += this._inertia;
                    this._inertia = this._inertia * Window_Scroll.inertiaAttenuation;
                }
            }
        } else {
            this._bTouching = false;
        }
    }
 
    processRelease() {
        if (this.active) {
            if (!this._bTouching && this._bTouched) {
                this._fScrollX += this._fScrollingX;
                this._fScrollY += this._fScrollingY;
                this._fScrollingX = 0;
                this._fScrollingY = 0;
                this._bTouched = false;
            }
        } else {
            this._bTouching = false;
        }
    }
 
    processScroll() {
        if (this.active) {
            if (this._bTouching){
                let x = TouchInput.x;
                let y = TouchInput.y;
                this._bHorizontal? this._fScrollingX = x - this._fScrollOriginX : this._fScrollingX = 0;
                this._bVertical? this._fScrollingY = y - this._fScrollOriginY : this._fScrollingY = 0;
                this._inertia = y - this._lastY;
                this._lastY = y;
            }
        }
    }
 
    updateScroll() {
        if (this._fScrollX > this._fScrollMaxX) {
            this._fScrollX -= (this._fScrollX - this._fScrollMaxX) / 3;
            if (this._fScrollX - this._fScrollMaxX < 1) this._fScrollX = this._fScrollMaxX;
        }
        if (this._fScrollY > this._fScrollMaxY) {
            this._fScrollY -= (this._fScrollY - this._fScrollMaxY) / 3;
            if (this._fScrollY - this._fScrollMaxY < 1) this._fScrollY = this._fScrollMaxY;
        }
 
        if (this._fScrollX < this._fScrollMinX) {
            this._fScrollX -= (this._fScrollX - this._fScrollMinX) / 3;
            if (this._fScrollMinX - this._fScrollX < 1) this._fScrollX = this._fScrollMinX;
        }
        if (this._fScrollY < this._fScrollMinY) {
            this._fScrollY -= (this._fScrollY - this._fScrollMinY) / 3;
            if (this._fScrollMinY - this._fScrollY < 1) this._fScrollY = this._fScrollMinY;
        }
    }
 
    updateScrollBar() {
        if (!this._scrollBar) return;
        this._scrollBar.move(this.width - this.scrollBarWidth - 4, this.scrollBarOffset);
        if (this._scroller) {
            let y = this.scrollBarOffset + (this._scrollBar.height - this.scrollerHeight) * this.scrollY / this._fScrollMinY;
            this._scroller.move(this.width - this.scrollBarWidth - 4, y);
            if ( y + this.scrollerHeight > this.height - this.scrollBarOffset) {
                this._scroller.setFrame(0, 0, this.scrollBarWidth, this.height - this.scrollBarOffset - y);
            } else if ( y  < this.scrollBarOffset) {
                this._scroller.move(this.width - this.scrollBarWidth - 4, this.scrollBarOffset);
                this._scroller.setFrame(0, this.scrollBarOffset, this.scrollBarWidth, this.scrollerHeight - (this.scrollBarOffset - y));
            } else {
                this._scroller.setFrame(0, 0, this.scrollBarWidth, this.scrollerHeight);
            }
        }
    }
 
    updateContentScroll() {
        this.origin.x = -this.scrollX;
        this.origin.y = -this.scrollY;
    }
}
 
class Window_SelectableScroll extends Window_Scroll {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this._index = -1;
    }
 
    get index() {
        return this._index;
    }
 
    get maxCols() {
        return 1;
    }
 
    get maxItems() {
        return 0;
    };
 
    get spacing() {
        return 12;
    }
 
    get itemWidth() {
        return (this.width - this.standardPadding() * 2) / this.maxCols - this.spacing;
    }
 
    get itemHeight() {
        return this.lineHeight();
    }
 
    get maxRows() {
        return Math.max(Math.ceil(this.maxItems / this.maxCols), 1);
    }
    get evaluateScrollLimitY() {
        return Math.min(this.height - (this.itemHeight + this.spacing) * this.maxRows - 2 * this.standardPaddingY(), 0);
    }
    get evaluateScrollLimitX() {
        return Math.min(this.width - (this.itemWidth + this.spacing) * this.maxCols - 2 * this.standardPadding(), 0);
    }
    get itemBox() {
        return ['img/system/', 'itembox', 10];
    }
    get selectedBorder() {
        return ['img/system/', 'itemboxframe', 8];
    }
 
    /**
     * determine if the selection is maintained while scroll;
     * @returns {boolean}
     */
    isSelectionMaintained() {
        return true;
    }
    /**
     * select indicated index
     * @param {number} index 
     */
    select(index) {
        let last_index  = this.index;
        this._index = index;
        this.redrawCurrentItem();
        this.redrawItem(last_index);
 
    }
 
    deselect() {
        this.select(-1);
    }
 
    reselect() {
        this.select(-1);
    }
 
    /**
     * 
     * @param {number} index 
     * @return {Rectangle}
     */
    itemRect(index) {
        let rect = new Rectangle();
        let maxCols = this.maxCols;
        rect.width = this.itemWidth;
        rect.height = this.itemHeight;
        rect.x = this.standardPadding() + index % maxCols * (rect.width + this.spacing);
        rect.y = this.standardPaddingY() + Math.floor(index / maxCols) * rect.height;
        return rect;
    }
 
    itemRectForText(index) {
        let rect = this.itemRect(index);
        rect.x += this.textPadding();
        rect.y += this.textPadding();
        rect.width -= this.textPadding() * 2;
        return rect;
    }
 
 
    isOpenAndActive() {
        return this.isOpen() && this.active;
    }
 
    update() {
        super.update();
        this.processHandling();
    }
 
    processHandling() {
        if (this.isOpenAndActive()) {
            if (this.isOkEnabled() && this.isOkTriggered()) {
                this.processOk();
            } else if (this.isCancelEnabled() && this.isCancelTriggered()) {
                this.processCancel();
            }
        }
    }
 
    updateTouching() {
        if (this.active) {
            if (TouchInput.isPressed() && this.isMouseOver()) {
                if (!this._bTouching) {
                    this._lastIndex = this.index;
                    this._fScrollOriginX = TouchInput.x;
                    this._fScrollOriginY = TouchInput.y;
                }
                if (this._fScrollingY > 1 || this._fScrollingX > 1) {
                    if (!this.isSelectionMaintained()) this.select(-1);
                } else {
                    let x = this.canvasToLocalX(TouchInput.x);
                    let y = this.canvasToLocalY(TouchInput.y);
                    let index = this.hitTest(x,y);
                    if (index > -1) {
                        this.select(index);
                    }
                }
                this._bTouching = true;
                this._bTouched = true;
            } else {
                this._bTouching = false;
                if (this._inertia > 1 || this._inertia < -1) {
                    this._fScrollY += this._inertia;
                    this._inertia = this._inertia * Window_Scroll.inertiaAttenuation;
                }
            }
        } else {
            this._bTouching = false;
        }
    }
 
    processRelease() {
        if (this.active) {
            if (!this._bTouching && this._bTouched) {
                this._fScrollX += this._fScrollingX;
                this._fScrollY += this._fScrollingY;
                if (this._fScrollingY === 0 && this._fScrollingX === 0) {
                    this.processClick();
                } else {
                    this.select(-1);
                }
                this._fScrollingX = 0;
                this._fScrollingY = 0;
                this._bTouched = false;
 
            }
        } else {
            this._bTouching = false;
        }
    }
 
    processClick() {
        let lastIndex = this.index;
        let x = this.canvasToLocalX(TouchInput.x);
        let y = this.canvasToLocalY(TouchInput.y);
        let hitIndex = this.hitTest(x, y);
        if (hitIndex >= 0) {
            this.select(hitIndex);
            if (hitIndex === this.index) {
                if (this.isOkEnabled()) {
                    this.processOk();
                }
            } else {
                this.select(hitIndex);
            }
        }
    }
 
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    hitTest(x, y) {
        if (this.isContentsArea(x, y)) {
            let cx = x - this.scrollX - this.standardPadding();
            let cy = y - this.scrollY - this.standardPaddingY();
            for(let i = 0; i < this.maxItems; i++) {
                let rect = this.itemRect(i);
                let right = rect.x + rect.width;
                let bottom = rect.y + rect.height;
                if(cx >= rect.x && cy >= rect.y && cx < right && cy < bottom) {
                    return i;
                }
            }
        }
        return -1;
    }
 
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    isContentsArea(x, y) {
        let left = this.standardPadding();
        let top = this.standardPaddingY();
        let right = this.width - this.standardPadding();
        let bottom = this.height - this.standardPaddingY();
        return (x >= left && y >= top && x < right && y < bottom);
    }
 
    isOkEnabled() {
        return this.isHandled('ok');
    }
 
    isCancelEnabled() {
        return this.isHandled('cancel');
    }
 
    isOkTriggered() {
        return Input.isRepeated('ok');
    }
 
    isCancelTriggered() {
        return Input.isRepeated('cancel');
    }
 
    processOk() {
        if (this.isCurrentItemEnabled()) {
            this.playOkSound();
            this.updateInputData();
            this.callOkHandler();
        } else {
            this.playBuzzerSound();
        }
    }
 
    playBuzzerSound() {
        SoundManager.playBuzzer();
    }
 
    playOkSound() {
        SoundManager.playOk();
    }
 
    callOkHandler() {
        this.callHandler('ok');
    }
 
    processCancel() {
        if(this.isHandled('cancel')) {
            SoundManager.playCancel();
            this.updateInputData();
            this.callCancelHandler();
        }
    }
 
    callCancelHandler() {
        this.callHandler('cancel');
    }
 
    updateInputData() {
        Input.update();
        TouchInput.update();
    }
 
    isCurrentItemEnabled() {
        return true;
    }
 
    drawAllItems() {
        for (let i = 0; i < this.maxItems; i++) {
            this.drawItem(i);
        }
    }
 
    /**
     * 
     * @param {number} index 
     */
    clearItem(index) {
        let rect = this.itemRect(index);
        this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    }
 
    /**
     * 
     * @param {number} index 
     */
    drawItem(index) {
    }
 
    /**
     * 
     * @param {number} index 
     */
    redrawItem(index) {
        if (index >= 0) {
            this.clearItem(index);
            this.drawItem(index);
        }
    }
 
    redrawCurrentItem() {
        this.redrawItem(this.index);
    }
 
    updateScrollLimit() {
 
    }
 
    refresh() {
        this.updateScrollLimit();
        this.drawAllItems();
    }
}