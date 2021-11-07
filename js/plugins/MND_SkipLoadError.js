/*:
 * @plugindesc 以弹窗显示与插件、图片、声音文件缺失有关的错误停息，并尝试忽略错误继续游戏。(v1.0.2)
 * @author 莴瓜 @66rpg
 * 
 * @help
 * 本插件不需要配置，但请注意：
 * 本插件可能在官方升级RMMV后存在兼容性问题（如果官方修改了相应的方法的话)，本
 * 插件发布时只在 RMMV 1.4.1 (steam版)下作简单测试。
 * 
 * by 莴瓜
 * 2017.06.06 v1.0.2
 */

PluginManager.checkErrors = function() {
    var url = this._errorUrls.shift();
    if (url) {
        alert('Failed to load: ' + url);
    }
};

ImageManager.loadSvActor = function(filename, hue) {
    var fs=require("fs");
    var path=require("path");
    var folder = path.join(path.dirname(process.mainModule.filename), 'img/sv_actors/');
    var file = folder + filename + '.png';
    if(fs.existsSync(file)){
        return this.loadBitmap('img/sv_actors/', filename, hue, false);
    }else{
        alert("Failed to load: "+file);
        return this.loadEmptyBitmap();
    }
};

Bitmap.prototype._onError = function() {
    this._image.removeEventListener('load', this._loadListener);
    this._image.removeEventListener('error', this._errorListener);
    this._image.removeEventListener('none', this._errorListener);
    this._loadingState = 'none';
};
AudioManager.checkWebAudioError = function(webAudio) {
    if (webAudio && webAudio.isError()) {
        alert('Failed to load: ' + webAudio.url);
        webAudio.initialize("");
    }
};