/*地下圆圈动态效果*/ 
var b = 1;
var c = true; 

function fade()
{
if(document.all);
if(c == true) {
b++;
}
if(b==100) {
b--;
c = false
}
if(b==10) {
b++;
c = true;
}
if(c == false) {
b--;
}
gif.width=200 + b;
giff.width=200 + b;
gifff.width=200 + b;
setTimeout("fade()",10);  
}
