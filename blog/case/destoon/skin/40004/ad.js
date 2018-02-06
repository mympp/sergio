$(function() {
	$('#accordion li').hover(
		function () {
			var $this = $(this);
			var $id = $(this).attr("id");
			for(var i=1; i<=5; i++) {
				if($id == 'id'+i) {$this.stop().animate({'width':'480px'},400);} else {$("#id"+i).stop().animate({'width':'125px'},400);}
			}
		},
		function () {
			var $this = $(this);
			var $id = $(this).attr("id");
			for(var i=1; i<=5; i++) {
				$("#id"+i).stop().animate({'width':'196px'},400);
			}
		}
	);
});