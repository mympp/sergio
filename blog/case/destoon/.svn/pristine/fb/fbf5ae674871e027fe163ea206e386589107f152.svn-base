var flag=false; 
function DrawImage(ImgD,width,height){ 
	var image=new Image(); 
	image.src=ImgD.src; 
	if(image.width>0 && image.height>0){ 
		flag=true; 
		if(image.width/image.height>1){ 
			if(image.width>width){
				ImgD.width=width; 
				ImgD.height=(image.height*width)/image.width; 
			}else{ 
				ImgD.width=image.width;
				ImgD.height=image.height; 
			} 
		}else{ 
			if(image.height>height){
				ImgD.height=height; 
				ImgD.width=(image.width*height)/image.height;
				if(ImgD.width>width){ 
					ImgD.width=width;
					ImgD.height=(width*image.height)/image.width;
				}
			}else{ 
				ImgD.width=image.width;
				ImgD.height=image.height; 
			} 
		//ImgD.alt="点击查看大图片"; 
		}
		if(ImgD.width>width){ ImgD.width=width;ImgD.height=(width*image.height)/image.width;}
		if(ImgD.height>height){ ImgD.height=height;ImgD.width=(image.width*height)/image.height;}
	}
}

//jquery图片成比例缩放
function jDrawImage(ImgD,width,height){ 
	var rzwidth,rzheight;
	//var realimgwidth =  ImgD.width();
	//var realimgheight = ImgD.height();
	var image=new Image(); 
	image.src=ImgD.attr("src"); 
	var realimgwidth =  image.width?image.width:ImgD.width();
	var realimgheight = image.height?image.height:ImgD.height();
	if(realimgwidth>0 && realimgheight>0){ 
		flag=true; 
		if(realimgwidth/realimgheight>1){ 
			if(realimgwidth>width){
				rzwidth  = width;
				rzheight = (realimgheight*width)/realimgwidth;
			}else{
				rzwidth  = realimgwidth;
				rzheight = realimgheight;
			} 
			
		}else{ 
			if(realimgheight>height){
				rzwidth = (realimgwidth*height)/realimgheight;
				rzheight = height;
			}else{
				rzwidth = realimgwidth;
				rzheight = realimgheight;
			} 
		//ImgD.alt="点击查看大图片"; 
		}
		
		if(rzwidth>width){ rzwidth = width;rzheight = (realimgheight*width)/realimgwidth;}
		if(rzheight>height){ rzheight = height;rzwidth = (realimgwidth*height)/realimgheight;}

		ImgD.width(rzwidth);
		ImgD.height(rzheight); 
		ImgD.css("height",rzheight+"px");
		ImgD.css("width",rzwidth+"px");
	}
}
function setImgSize(dom,width,height){
	for(var i=0;i<dom.length;i++){
		jDrawImage(dom.eq(i),width,height);
	}
}