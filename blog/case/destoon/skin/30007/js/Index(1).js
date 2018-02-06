var searchUrl="/Product/T0/l_List_p1.html";
function changeSearch(s)
{
    //class change
    
    
    //end
    switch(s)
    {
       case 1:
         document.getElementById("SaleClass").style.display="none";
         searchUrl="/Product/T0/l_List_p1.html";//products search
         changeSearchStyle(1);
         break;
       case 2:
         document.getElementById("SaleClass").style.display="";
       	 searchUrl="/Offer_sale/t0/list_P1.html";//商机
         changeSearchStyle(2);
         break;
       case 3:
         document.getElementById("SaleClass").style.display="none";
         searchUrl="/Company/a_t0/list_P1.html";//企业
         changeSearchStyle(3);
         break;
       case 4:
         document.getElementById("SaleClass").style.display="none";
         searchUrl="/news/T0/list_P1.html";//资讯
         changeSearchStyle(4);
         break;
       case 5:
         document.getElementById("SaleClass").style.display="none";
         searchUrl="/exhibition/t0/list_p1.html";//会展
         changeSearchStyle(5);
         break;
    }
}

function changeSearchStyle(s){
	var idValue = "";
	for(var i=1;i<=5;i++){
		idValue = "searchChose"+i;
		if(s==i)
			document.getElementById(idValue).className = "yes";
		else
			document.getElementById(idValue).className = "";
	}
}

function go(){
	var keys = document.getElementById("keys").value;
	keys = keys.replace(/(^[^\S]+)|([^\S]+$)/g,"");
	keys= keys.replace(/\+/g,"%2b");//替换'+'号，如果不处理‘+’号会被替换成空  add by 李晨 2010-05-31
	if(keys!=""){
		var f = document.getElementById("searchForm");
		f.target = "_blank";
		f.action=searchUrl; 
	}
	return true;
}

//这个函数在屏蔽资讯类别时无效
function sSaleClassClass(p){
	switch(p)
    {
       case "1":
         searchUrl="/product/t0/list_p0.html";
         break;
       case "2":
       	 searchUrl="/offer_buy/t0/list_p0.html";
         break;
       case "3":
         searchUrl="/company/a_t0/list_p0.html";
         break;
       case "4":
         searchUrl="/news/t0/list_p0.html";
         break;
       case "5":
         searchUrl="/exhibition/t0/list_p0.html";
         break;
       case "6":
         searchUrl="/offer_sale/t0/list_p0.html";
         break;
       default:
         f.action = "/product/t0/list_p0.html";
         break;
    }
}
