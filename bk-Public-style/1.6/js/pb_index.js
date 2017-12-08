$(function() {
	var hm = document.createElement("script");
	hm.src = "https://hm.baidu.com/hm.js?f0cc1c21e836f7d0511c6532b183a402";
	var s = document.getElementsByTagName("script")[0]; 
	s.parentNode.insertBefore(hm, s);

	//为关闭按钮绑定单击事件
	$(document).on("click", ".close-vx", function() {
		$(".modal_video").fadeOut();
		$(".video-div video").attr("src", "");
	})

	//为视频img绑定单击事件
	$(document).on("click", ".footer-movie div img", function() {
		var vdsrc = $(this).attr("vd-src");
		$(".modal_video").fadeIn();
		$(".video-div video").attr("src", vdsrc);
		$(".video-div video")[0].play();
		//console.log(vdsrc);
	})

	var length,
		currentIndex = 0,
		interval,
		hasStarted = false, //是否已经开始轮播
		t = 6000; //轮播时间间隔
	length = $('.slider-panel').length;

	//将除了第一张图片隐藏
	$('.slider-panel:not(:first)').hide();

	//将第一个slider-item设为激活状态
	$('.slider-item:first').addClass('slider-item-selected');

	//隐藏向前、向后翻按钮
	$('.slider-page').hide();

	//鼠标上悬时显示向前、向后翻按钮,停止滑动，鼠标离开时隐藏向前、向后翻按钮，开始滑动
	$('.slider-panel, .slider-pre, .slider-next').hover(function() {
		stop();
		$('.slider-page').show();
	}, function() {
		$('.slider-page').hide();
		start();
	});

	$('.slider-item').hover(function(e) {
		stop();
		var preIndex = $(".slider-item").filter(".slider-item-selected").index();
		currentIndex = $(this).index();
		play(preIndex, currentIndex);
	}, function() {
		start();
	});

	$('.slider-pre').unbind('click');
	$('.slider-pre').bind('click', function() {
		pre();
	});

	$('.slider-next').unbind('click');
	$('.slider-next').bind('click', function() {
		next();
	});

	/**
	 * 向前翻页
	 */
	function pre() {
		var preIndex = currentIndex;
		currentIndex = (--currentIndex + length) % length;
		play(preIndex, currentIndex);
	}

	/**
	 * 向后翻页
	 */
	function next() {
		var preIndex = currentIndex;
		currentIndex = ++currentIndex % length;
		play(preIndex, currentIndex);
	}

	/**
	 * 从preIndex页翻到currentIndex页
	 * preIndex 整数，翻页的起始页
	 * currentIndex 整数，翻到的那页
	 */
	function play(preIndex, currentIndex) {
		$('.slider-panel').eq(preIndex).fadeOut(500)
			.parent().children().eq(currentIndex).fadeIn(1000);
		$('.slider-item').removeClass('slider-item-selected');
		$('.slider-item').eq(currentIndex).addClass('slider-item-selected');
	}

	/**
	 * 开始轮播
	 */
	function start() {
		if(!hasStarted) {
			hasStarted = true;
			interval = setInterval(next, t);
		}
	}
	/**
	 * 停止轮播
	 */
	function stop() {
		clearInterval(interval);
		hasStarted = false;
	}

	//开始轮播
	start();
});