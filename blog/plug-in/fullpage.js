(function(h, k) {
    var c = {
        direction: "vertical",
        currentClass: "current",
        gestureFollowing: false,
        hasDot: false,
        rememberLastVisited: false,
        preventDefault: true,
        animationPlayOnce: false,
        dev: false,
        onSwipeUp: function() {},
        onSwipeDown: function() {},
        onSwipeLeft: function() {},
        onSwipeRight: function() {},
        oninit: function() {},
        onbeforechange: function() {},
        onchange: function() {}
    };
    var m = document.documentElement.clientWidth, d = document.documentElement.clientHeight, a = "end", l, i, j, f, e, b;
    function g(n) {
        h.extend(this, c, n);
        if (this.pages.length <= 0) {
            throw new Error("target para not pass")
        }
        this.target = this.pages.eq(0).parent();
        this.length = this.pages.length;
        this.moveTo = g.prototype.moveTo;
        this.index = 0;
        this.curPage = this.pages.eq(this.index);
        this.timer = null;
        f = this.gestureFollowing;
        if (this.direction === "vertical" || this.direction === "v") {
            this.direction = "v"
        }
        if (this.direction === "horizontal" || this.direction === "h") {
            this.direction = "h"
        }
        if (this.length <= 1) {
            return
        }
        this._init()
    }
    g.prototype = {
        _init: function() {
            var n = this;
            this.target.css("-webkit-transition", "-webkit-transform 0.5s ease");
            this.pages.each(function() {
                var q = h(this)
                  , p = q.wrapInner('<div class="PageSlider__wraper"></div>').find(".PageSlider__wraper")
                  , o = p.height();
                if (o > d) {
                    q.data("height", o);
                    q.css("overflow", "auto")
                }
                p.children().unwrap()
            });
            if (this.direction === "h") {
                this.target.css("position", "relative");
                this.pages.each(function(o) {
                    h(this).css({
                        position: "absolute",
                        left: o * 100 + "%",
                        top: 0
                    })
                })
            }
            if (this.hasDot) {
                this._createDot()
            }
            n._bindAnimation();
            this.target.on("touchstart", function(o) {
                n._startHandle(o)
            });
            this.target.on("touchmove", function(o) {
                n._moveHandle(o)
            });
            this.target.on("touchend", function(o) {
                n._endHandle(o)
            });
            if (this.rememberLastVisited) {
                this.lastVisitedIndex = this._getLastVisited()
            }
            this.target.css("-webkit-transform", "translate(0, 0)");
            this.pages.eq(0).addClass(this.currentClass);
            this.oninit.call(this);
            this._dev()
        },
        _startHandle: function(n) {
            var o = n.touches[0];
            l = this.curPage.data("lock-next");
            i = this.curPage.data("lock-prev");
            if (a === "running") {
                n.preventDefault();
                return
            }
            j = this.direction === "v" ? o.clientY : o.clientX;
            this.curPage[0].pageScrollHeight = this.curPage.data("height");
            if (this.curPage[0].pageScrollHeight) {
                f && (this.gestureFollowing = false);
                this.preventDefault = false;
                b = d + this.curPage.scrollTop()
            }
            if (this.gestureFollowing) {
                e = -this.index * (this.direction === "v" ? d : m)
            }
        },
        _moveHandle: function(o) {
            var q = o.changedTouches[0], p, n;
            if (a === "running") {
                o.preventDefault();
                return
            }
            n = this.direction === "v" ? q.clientY : q.clientX;
            p = n - j;
            if (this.curPage[0].pageScrollHeight) {
                if (p > 0 && b === d) {
                    o.preventDefault()
                }
                if (p < 0 && b === this.curPage[0].pageScrollHeight) {
                    o.preventDefault()
                }
            }
            if (!this.gestureFollowing) {
                this._preventDefault(o);
                return
            }
            if ((this.index <= 0 && n > j) || (this.index >= this.length - 1 && n < j)) {
                o.preventDefault();
                return
            }
            if ((p > 0 && i) || p < 0 && l) {
                o.preventDefault();
                return
            }
            p = e + p + "px";
            this._removeTransition();
            if (this.direction === "v") {
                this.target.css("-webkit-transform", "translate(0, " + p + ")")
            } else {
                this.target.css("-webkit-transform", "translate(" + p + ", 0)")
            }
            this._preventDefault(o)
        },
        _endHandle: function(o) {
            var q = o.changedTouches[0], p, n;
            if (a === "running") {
                o.preventDefault();
                return
            }
            n = this.direction === "v" ? q.clientY : q.clientX;
            p = n - j;
            this._setTransition();
            if (p > 0) {
                this.direction === "v" ? this.onSwipeDown.call(this) : this.onSwipeRight.call(this);
                if (!i) {
                    if (this.curPage[0].pageScrollHeight && b > d) {
                        return
                    } else {
                        if (p > 20) {
                            this.prev()
                        } else {
                            this.moveTo(this.index)
                        }
                    }
                }
            }
            if (p < 0) {
                this.direction === "v" ? this.onSwipeUp.call(this) : this.onSwipeLeft.call(this);
                if (!l) {
                    if (this.curPage[0].pageScrollHeight && b < this.curPage[0].pageScrollHeight) {
                        return
                    } else {
                        if (p < -20) {
                            this.next()
                        } else {
                            this.moveTo(this.index)
                        }
                    }
                }
            }
        },
        moveTo: function(o, q) {
            var p, n = this;
            a = "running";
            q = q || false;
            if (o >= this.length || o < 0) {
                a = "end";
                return
            }
            q && this._removeTransition();
            this.onbeforechange.call(this);
            if (this.direction === "v") {
                p = -o * 100 + "%";
                this.target.css("-webkit-transform", "translate(0, " + p + ")")
            }
            if (this.direction === "h") {
                p = -o * 100 + "%";
                this.target.css("-webkit-transform", "translate(" + p + ", 0)")
            }
            clearTimeout(this.timer);
            this.timer = setTimeout(function() {
                n._currentClass(o);
                n.prevIndex = n.index;
                n.index = o;
                n.onchange.call(n);
                q && n._setTransition();
                if (n.curPage && n.curPage[0].pageScrollHeight) {
                    f && (n.gestureFollowing = true);
                    n.preventDefault = true;
                    n.curPage.scrollTop(0)
                }
                n.curPage = n.pages.eq(n.index);
                n.rememberLastVisited && n._saveLastVisited();
                a = "end";
                clearTimeout(n.timer)
            }, 500)
        },
        prev: function() {
            this.moveTo(this.index - 1)
        },
        next: function() {
            this.moveTo(this.index + 1)
        },
        _setTransition: function() {
            this.target.css("-webkit-transition", "-webkit-transform 0.5s ease")
        },
        _removeTransition: function() {
            this.target.css("-webkit-transition", "none")
        },
        _currentClass: function(n) {
            var o = this.currentClass;
            this.pages.eq(n).addClass(o);
            if (n !== this.index && !this.animationPlayOnce) {
                this.pages.eq(this.index).removeClass(o)
            }
        },
        _createDot: function() {
            var o = "";
            for (var n = 0; n < this.length; n++) {
                o += "<li>" + (n + 1) + "</li>"
            }
            h(o).appendTo(this.target).wrapAll('<ul class="dot-list">')
        },
        _saveLastVisited: function() {
            var n = k.localStorage;
            if (n) {
                n.setItem("pageSliderIndex", this.index)
            }
        },
        _getLastVisited: function() {
            var n = k.localStorage;
            if (n) {
                this.cacheIndex = n.getItem("pageSliderIndex");
                return parseInt(this.cacheIndex)
            }
        },
        _bindAnimation: function() {
            var n = this
              , o = "<style>";
            h("[data-animation]").each(function(u) {
                var w = h(this)
                  , q = w.data("animation")
                  , t = q.name
                  , x = q.duration || 500
                  , s = q.delay || 0
                  , p = q["timing-function"] || "ease"
                  , v = q["fill-mode"] || "both"
                  , r = q["iteration-count"] || 1;
                w.data("animationid", ++u);
                o += "." + n.currentClass + ' [data-animationid="' + u + '"]{-webkit-animation-name: ' + t + ";-webkit-animation-duration: " + x + "ms;-webkit-animation-delay: " + s + "ms;-webkit-animation-timing-function: " + p + ";-webkit-animation-fill-mode: " + v + ";-webkit-animation-iteration-count: " + r + ";}"
            });
            o + "</style>";
            h("head").eq(0).append(o)
        },
        _preventDefault: function(n) {
            this.preventDefault && n.preventDefault()
        },
        _dev: function() {
            if (this.dev !== false) {
                this.moveTo(this.dev, true)
            }
        }
    };
    k.PageSlider = g
}
)(Zepto, window);
if (typeof define === "function" && define.amd) {
    define("PageSlider", [], function() {
        return PageSlider
    })
}
;