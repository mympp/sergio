/*********************************/
/**修改人：李晨2009-7-13**********/
/***原因：登录次数由6次改为10-次**/
/*********************************/

/*********************************/
/**修改人：周欣2010-9-13**********/
/***原因：登录改成无限**/
/*********************************/

function login(u,p){
    if(u!=''&&p!=''){
        var result = Vivian.CheckLogin(u,p).value;
        switch(result){
//            case "-1":
//                show_error("用户名或密码错误，请二十分钟后重试。");
//                break;
//            case "10":
//                 show_error("您还有<span style='color:red'>10</span>次机会来填写正确的用户名和密码");
//                 break;
//            case "9":
//                show_error("您还有<span style='color:red'>9</span>次机会来填写正确的用户名和密码");
//                break;
//            case "8":
//                show_error("您还有<span style='color:red'>8</span>次机会来填写正确的用户名和密码");
//                break;
//            case "7":
//                show_error("您还有<span style='color:red'>7</span>次机会来填写正确的用户名和密码");
//                break;
//            case "6":
//                show_error("您还有<span style='color:red'>6</span>次机会来填写正确的用户名和密码");
//                break;
//            case "5":
//                 show_error("您还有<span style='color:red'>5</span>次机会来填写正确的用户名和密码");
//                 break;
//            case "4":
//                show_error("您还有<span style='color:red'>4</span>次机会来填写正确的用户名和密码");
//                break;
//            case "3":
//                show_error("您还有<span style='color:red'>3</span>次机会来填写正确的用户名和密码");
//                break;
//            case "2":
//                show_error("您还有<span style='color:red'>2</span>次机会来填写正确的用户名和密码");
//                break;
//            case "1":
//                show_error("您还有<span style='color:red'>1</span>次机会来填写正确的用户名和密码");
//                break;
            case "-1":
            case "10":
            case "9":
            case "8":
            case "7":
            case "6":
            case "5":
            case "4":
            case "3":
            case "2":
            case "1":
                show_error1("请填写正确的用户名和密码","window.location.href('\login')");
                break;
            default:
                document.getElementById("divLogin").innerHTML=result;
                break;

        }
    }
}


