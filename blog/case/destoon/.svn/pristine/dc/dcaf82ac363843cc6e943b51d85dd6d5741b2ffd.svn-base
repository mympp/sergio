 
                tab("member", "a", "memberBox", "div", "onmouseover");
                
            function tab(tab_t, tab_t_tag, tab_c, tag_c_tag, evt) {
                var tab_t = document.getElementById(tab_t);
                var tab_t_li = tab_t.getElementsByTagName(tab_t_tag);
                var tab_c = document.getElementById(tab_c);
                var tab_c_li = tab_c.getElementsByTagName(tag_c_tag);
                var len = tab_t_li.length;
                var i = 0;
                var timer = null;
                var num = 0;
                for (i = 0; i < len; i++) {
                    tab_t_li[i].index = i;
                    tab_t_li[i][evt] = function () {
                        clearInterval(timer);
                        num = this.index;
                        tab_change()
                    }
                    tab_t_li[i].onmouseout = function () {
                        autoplay();
                    }
                }

                function tab_change() {
                    for (i = 0; i < len; i++) {
                        tab_t_li[i].className = '';
                        tab_c_li[i].style.display = 'none';
                    }
                    tab_t_li[num].className = 'focus';
                    tab_c_li[num].style.display = 'block';
                }

                function autoplay() {
                    timer = setInterval(function () {
                        num++;
                        if (num >= len) num = 0;
                        tab_change();
                    }, 2000);
                }
                autoplay();
            }
            