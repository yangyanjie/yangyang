/*
**@Author  douchaoyang
**@Relyed  core.lib.js
*/
   export const  Lottery = function(o) {
        this.o = {
            prefix:"lottery-unit",
            light:"lottery-light",
            loop:3,
            speed:90
        };
        this.o = Object.assign(this.o, o || {});
        /*所要循环的元素类名前缀*/
        this.prefix = this.o.prefix;
        /*高亮时的样式类名*/
        this.light = this.o.light;
        /*循环的次数*/
        this.loop = this.o.loop;
        /*动画的速度*/
        this.speed = this.o.speed;
        this.step = 0;
        this.flag = true;
        //选中所有循环的元素；
        this.unit = document.getElementsByClassName(this.prefix);
        //循环元素的长度；
        this.long = this.unit.length-1;
    };
    /*清除元素高亮样式*/
    Lottery.prototype.clears = function() {
        var _unit = document.getElementsByClassName(this.prefix);
        for (var i = 0; i < _unit.length; i++) {
            _unit[i].childNodes[0].classList.remove(this.light);
        }
    };
    /*开始动画*/
    Lottery.prototype.settle = function(num, callback) {
        if (typeof num === "number") {
            var _t = this, _speed = _t.speed, _total = this.loop * this.long + num;
            _t.flag = false;
            (function callself() {
                if (_t.step < _total) {
                    _t.clears();
                    var un = document.getElementsByClassName(_t.prefix + "-" + ((_t.step + _t.long) % _t.long + 1))[0];
                    if(un) {
                        un.childNodes[0].classList.add(_t.light);
                        
                    }
                    _t.step++;
                    setTimeout(callself, _t.step > (_t.loop - 1) * _t.long + num ? _speed += 177 :_speed);
                } else {
                    _t.flag = true;
                    _t.step = 0;
                    _speed = _t.speed;
                    callback.call(this);
                	_t.clears();
                    return false;
                }
            })();
        } else {
            console.log("Whoops!");
        }
    };
    
    Lottery.prototype.run = function(num, callback) {
        if (this.flag) {
            this.settle(num, callback);
        } else {
            return false;
        }
    };
