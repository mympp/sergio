function getDateStr(AddDayCount, split) {
	split = split == undefined || split == "" ? "-" : split;
	var dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1; //获取当前月份的日期
	if (m < 10) {
		m = "0" + m;
	}
	var d = dd.getDate();
	if (d < 10) {
		d = "0" + d;
	}
	return y + split + m + split + d;
}
$(function() {
	var dateRange = new pickerDateRange('ad-search-date', {
		isTodayValid: false,
		startDateId: 'ad-startDate', // 开始日期输入框ID
		endDateId: 'ad-endDate', // 结束日期输入框ID
		startDate: getDateStr(-30),
		endDate: getDateStr(0),
		isTodayValid: true,
		calendars: 2, // 展示的月份数，最大是2
		defaultText: ' - ',
		inputTrigger: 'ad-search-date',
		autoSubmit: false, //没有确定，取消按钮，直接提交
		theme: 'ta'
	});
	$(document).on("click", "#ad-status-select .dropdown-menu>li", function() {
		$(this).parents("#ad-status-select").attr("data-status", $(this).attr("data-status"));
	});
	$(document).on("click", ".dropdown-click:not(.disable)", function(event) {
		event.stopPropagation();
		$(this).toggleClass("opened");
	});
	$(document).on("click", function() {
		$(".dropdown-click").removeClass("opened");
	});
	$(document).on("click", ".dropdown-click .dropdown-menu>li", function() {
		$(this).parents(".dropdown-click").children(".dropdown-toggle").html($(this).text());
	});

});
 var Pagination = function(container, params) {
        var s = this;
       
        s.defaults = {
            pageNo: 1,
            pageCount: 0,
            showRange: 3
        };
        params = params || {};
        var originalParams = {};
        for (var param in params) {
            if (typeof params[param] === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || (typeof Dom7 !== 'undefined' && params[param] instanceof Dom7) || (typeof jQuery !== 'undefined' && params[param] instanceof jQuery))) {
                originalParams[param] = {};
            } else {
                originalParams[param] = params[param];
            }
        }
        for (var def in s.defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = s.defaults[def];
            }
        }

        s.update = function(params) {
            for (var def in s.defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = s.defaults[def];
                }
            }
            var html = '';
            console.log("params.pageCount="+params.pageCount);
            console.log("params.pageNo="+params.pageNo);
            console.log("params.showRange="+params.showRange);
            if (params.pageCount == null || params.pageCount == 0) {
                $(container).attr("data-page", params.pageNo).html(html);
            } else {
                html = '<div class="pagination-prev"><a class="fa fa-angle-left"></a></div><ul class="pagination">';
                for (var i = 1; i <= params.pageCount; i++) {
                    if (params.pageNo == i) {
                        html += '<li class="active"><a>' + i + '</a></li>';
                        continue;
                    } else if (Math.abs(params.pageNo - i) <= params.showRange) {
                        html += '<li><a>' + i + '</a></li>';
                        continue;
                    } else if (i == 1) {
                        if (params.pageNo > params.showRange + 2) {
                            html += '<li><a>' + i + '</a></li><li class="ellipsis"><a>...</a></li>';
                            continue;
                        } else {
                            html += '<li><a>' + i + '</a></li>';
                            continue;
                        }
                    } else if (i == params.pageCount) {
                        if (params.pageCount - params.pageNo > params.showRange + 1) {
                            html += '<li class="ellipsis"><a>...</a></li><li><a>' + i + '</a></li>';
                            continue;
                        } else {
                            html += '<li><a>' + i + '</a></li>';
                            continue;
                        }
                    }
                }
                html += '</ul><div class="pagination-next"><a class="fa fa-angle-right"></a></div>';
                $(container).attr("data-page", params.pageNo).html(html);

                if (params.pageNo == 1) {
                    $(container + ">.pagination-prev").addClass("disabled");
                } else {
                    $(container + ">.pagination-prev").removeClass("disabled");
                }
                if (params.pageNo == params.pageCount) {
                    $(container + ">.pagination-next").addClass("disabled");
                } else {
                    $(container + ">.pagination-next").removeClass("disabled");
                }

                $(container + " .pagination>li").on("click", function() {
                    $(this).addClass("active").siblings().removeClass("active");
                    $(container).attr("data-page", $(this).text());
                });
            }
        }
        s.update(params);
    }
