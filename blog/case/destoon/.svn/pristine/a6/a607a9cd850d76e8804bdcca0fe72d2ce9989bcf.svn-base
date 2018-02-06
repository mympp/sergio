	var username=get_cookie('auth');
	var url="/sso_quest.php";
	if(username != ""){	
		var res=$.ajax({  
		  type:"get", 
		  dataType:"jsonp",/*-----------------------*/  
		  url: url+"?type=login",  
		  crossDomain:true,/*-----------------------*/  
		  success: function(data){  
		  }
		});  
	}
	function logout(){
		var url="/sso_quest.php";
		var res=$.ajax({  
		  type:"get", 
		  dataType:"jsonp",/*-----------------------*/  
		  url: url+"?type=logout",  
		  crossDomain:true,/*-----------------------*/  
		  success: function(data){  
		  }
		}); 
	}
	function login(){
		var username=get_cookie('auth');
		var url="/sso_quest.php";
		if(username != ""){	
			var res=$.ajax({  
			  type:"get", 
			  dataType:"jsonp",/*-----------------------*/  
			  url: url+"?type=login",  
			  crossDomain:true,/*-----------------------*/  
			  success: function(data){  
			  	console.log(data);
			  }
			});  
		}else{
			logout();
		}
	}

	

