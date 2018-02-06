function VisitCount(host){
	if(typeof(host)=="undefined"){
		this.url="http://tj.guidechem.com/StatisticsServlet.do";    		//请求的url
	}else{
		this.url=host+"/StatisticsServlet.do";    		//请求的url
	}
	this.dbName="";
	this.sid="";    		//对象的ID,可以是多个,用','分隔
	this.comid="";    		//对象的公司ID,可以是多个,用','分隔
	this.stype="";  		//类型,产品库,报价,商机等
	this.keyword="";
	this.clientscreen = window.screen.width+"*"+window.screen.height; //客户屏幕大小,例如800*600       
	this.referer=document.referrer;        //来源页面
	this.visittimes=1;
	this.clientkey="";
	this.data="";
	this.types="";
	this.page=window.location.href;
	
	//拼装请求里面的参数
	this.getReqUrl = function(){
		this.url += '?dbName='+this.dbName;
		this.url += '&rpt='+this.visittimes;
		this.url += '&clientkey='+this.clientkey;
		this.url += '&types='+escape(this.types);
		this.url += '&k='+escape(this.keyword);
		this.url += '&'+this.data
		this.url += '&sid='+this.sid;
		this.url += '&comid='+this.comid;
		this.url += '&stype='+escape(this.stype);
		this.url += '&clientscreen='+escape(this.clientscreen);
		this.url += '&referer='+escape(this.referer);
		this.url += '&page='+escape(this.page);
	};
	//发送请求
	this.sentReq = function(){
		this.getReqUrl();
		var requrl = "<script src="+(this.url)+"></script>"
		document.write(requrl);
	};
}
