function sendMsg3() {
    if (document.getElementById("txtName").value == "") {
        show_error("请填写联系人");
        document.getElementById("txtName").focus()
        return false;
    }
    if (document.getElementById("txtTelphone").value == "") {
        show_error("请填写您的联系电话");
        document.getElementById("txtTelphone").focus()
        return false;
    }
    var otherInfo = ""; var isMember = "0"; var answerDate = ""; var strSex = ""; var strIndustrys = "";
    if (document.getElementById("IsMember") != null) {
        if (document.getElementById("IsMember").checked)
            isMember = "1";
    }
    if (document.getElementById("Sex1") != null) {
        if (document.getElementById("Sex1").checked)
            strSex = "1";
        else if (document.getElementById("Sex2").checked)
            strSex = "0";
    }
    if (document.getElementById("txtAnswerDate") != null) {
        answerDate = document.getElementById("txtAnswerDate").value;
    }
    if (document.getElementById("selIndustrys") != null) {
        var selectOb = document.getElementById("selIndustrys");
        var index = selectOb.selectedIndex;
        if (selectOb.options[index].value != "0")
            strIndustrys = selectOb.options[index].text;
    }
    var result = Vivian.SendMsg(document.getElementById("valCode").value, document.getElementById("txtProID").value,
        document.getElementById("txtProductName").value, document.getElementById("txtDetail").value, document.getElementById("txtDepartment").value, document.getElementById("txtName").value, document.getElementById("txtAddress").value,
        document.getElementById("txtTelphone").value, document.getElementById("txtEmail").value, document.getElementById("txtUserId").value,
        document.getElementById("cid2").value, document.getElementById("txtIP").value, otherInfo, answerDate, isMember, strSex,strIndustrys, document.getElementById("txtUrl").value).value;
    try {
        var jobj = eval("data=" + result);
        if (jobj.Success) {//第一步存入数据库成功
	        var sendemail =jobj.Success;
	        if (sendemail == "1" || sendemail == "0") {
				if (typeof parent.showCompanyInfo != "undefined") {
                parent.showCompanyInfo();
            }
            parent.dialog.reset33();
            }
        }
        else if (jobj.Error == "0") {
	        show_error("您填写的信息中包含敏感信息("+jobj.DirtyWords+")，请检查后重新提交。");
        }
        else if (jobj.Error == "-1") {
	        show_error("验证码错误");
        }
        else if (jobj.Error == "-2") {
	        show_error("请您填写必要的信息");
        }
        else {
	        show_error("留言失败");
        }
	}
    catch (ex) {
        show_error("留言失败。");
    }
}

function sendMsg2() {

    if (document.getElementById("txtProductName").value == "") {
        show_error("请填写询价对象");
        document.getElementById("txtProductName").focus()
        return false;
    }
    if (document.getElementById("txtDetail").value == "" || document.getElementById("txtDetail").value == "详细需求，如型号规格、目标价、售后服务等特殊需求进行说明。") {
        show_error("请填写详细说明");
        document.getElementById("txtDetail").focus()
        return false;
    }
    if (document.getElementById("txtDetail").value.length > 100) {
        show_error("详细说明字数不能大于100");
        document.getElementById("txtDetail").focus()
        return false;
    }
//    if (document.getElementById("txtAnswerDate") != null) {
//        var answerDate = document.getElementById("txtAnswerDate").value;
//        if (daysBetween(answerDate) < 0) {
//            show_error("回复日期早于当前日期");
//            return;
//        }
//    }
    if (document.getElementById("txtName").value == "") {
        show_error("请填写联系人");
        document.getElementById("txtName").focus()
        return false;
    }
//    if (document.getElementById("txtEmail").value == "" || !IsEmail(document.getElementById("txtEmail").value)) {
//        show_error("电子邮箱的值不能为空或邮箱格式填写不正确");
//        document.getElementById("txtEmail").focus()
//        return false;
//    }
    if (document.getElementById("txtTelphone").value == "") {
        show_error("请填写您的联系电话");
        document.getElementById("txtTelphone").focus()
        return false;
    }
    if (document.getElementById("txtDepartment").value == "") {
        show_error("请填写公司名称");
        document.getElementById("txtDepartment").focus()
        return false;
    }
    var otherInfo = ""; var isMember = "0"; var answerDate = ""; var strSex = ""; var strIndustrys = "";
    if (document.getElementById("IsMember") != null) {
        if (document.getElementById("IsMember").checked)
            isMember = "1";
    }
    if (document.getElementById("Sex1") != null) {
        if (document.getElementById("Sex1").checked)
            strSex = "1";
        else if (document.getElementById("Sex2").checked)
            strSex = "0";

    }
    if (document.getElementById("txtAnswerDate") != null) {
        answerDate = document.getElementById("txtAnswerDate").value;
    }
    if (document.getElementById("selIndustrys") != null) {
        var selectOb = document.getElementById("selIndustrys");
        var index = selectOb.selectedIndex;
        if (selectOb.options[index].value != "0")
            strIndustrys = selectOb.options[index].text;
//        else {
//            show_error("请选择您的行业");
//            document.getElementById("selIndustrys").focus()
//            return false;
//        }
    }
//    if (document.getElementById("txtQqMsn") != null && document.getElementById("txtQqMsn").value != "QQ/MSN") {
//        otherInfo = document.getElementById("txtQqMsn").value;
//    }
    var result = Vivian.SendMsg(document.getElementById("valCode").value, document.getElementById("txtProID").value,
        document.getElementById("txtProductName").value, document.getElementById("txtDetail").value, document.getElementById("txtDepartment").value, document.getElementById("txtName").value, document.getElementById("txtAddress").value,
        document.getElementById("txtTelphone").value, document.getElementById("txtEmail").value, document.getElementById("txtUserId").value,
        document.getElementById("cid2").value, document.getElementById("txtIP").value, otherInfo, answerDate, isMember, strSex, strIndustrys,document.getElementById("txtUrl").value).value;
    try {
        var jobj = eval("data=" + result);
        if (jobj.Success) {//第一步存入数据库成功
        	var sendemail =jobj.Success;
            if (sendemail == "1") {
                if(document.getElementById("Hidden1").value=='1')
                {
                    if(typeof(parent.EmailOKShowDiv)=="undefined")
                    {
                        dialog.alert123("留言成功");
                    }
                    else
                    {
                        //弹出框代码   
                        window.open(parent.EmailOKShowDiv)
                        parent.dialog.reset33();
                    }
                }
                else{
                        if(typeof(parent.EmailOKShowDiv)=="undefined")
                        {
                            dialog.alert("留言成功!!");
                            ClearAllData();
                        }
                        else
                        {
                            //弹出框代码   
                            ClearAllData();                         
                            window.open(parent.EmailOKShowDiv)
                        }
                    }
            }
            else {
                if (parseInt(ProductID) == 0) {
                    if(document.getElementById("Hidden1").value=='1')
                    {
                        if(typeof(parent.EmailOKShowDiv)=="undefined")
                        {
                            dialog.alert123("留言成功");
                        }
                        else
                        {
                            //弹出框代码     
                            window.open(parent.EmailOKShowDiv)
                            parent.dialog.reset33();
                        }
                    }
                    else{
                        if(typeof(parent.EmailOKShowDiv)=="undefined")
                        {
                            dialog.alert("留言成功!!");
                            ClearAllData();
                        }
                        else
                        {
                            //弹出框代码
                            ClearAllData();
                            window.open(parent.EmailOKShowDiv)
                        }
                    }
                } 
                else {
                    show_error("留言成功,邮件发送失败");
                }
            }
        }
        else if (jobj.Error == "0") {
            show_error("您填写的信息中包含敏感信息("+jobj.DirtyWords+")，请检查后重新提交。");
        }
        else if (jobj.Error == "-1") {
            show_error("验证码错误");
        }
        else if (jobj.Error == "-2") {
            show_error("请您填写必要的信息");
        }
        else {
            show_error("留言失败");
        }
    }
    catch (ex) {
        show_error("留言失败。");
    }

}
//点击询价弹出窗口
function showInquiry(cid, proid, proname, stype) {
    if (stype != null && stype != "" && stype == "1")
        dialog.iframe33("../../SendOrder/Send2.aspx?stype=1&scid=" + cid + "&sproid=" + proid + "&sproname=" + proname, 625, 560);
    else
        dialog.iframe33("../../SendOrder/Send2.aspx?", 625, 560);
}
function showContact() {
    dialog.iframe33("../../SendOrder/Send4.aspx?", 510, 250);
}
function sendMsg(){
    if(checkForm()){
        //下面有三个参数需要从父页面获取ID,UserID,CompanyID
        var result = Send.SendMsg(document.getElementById("txtValidCode").value,parent.document.getElementById("txtProID").value,
        document.getElementById("txtProductName").value,document.getElementById("txtDetail").value,document.getElementById("txtDepartment").value,document.getElementById("txtName").value,document.getElementById("txtAddress").value,
        document.getElementById("txtTelphone").value,document.getElementById("txtEmail").value,parent.document.getElementById("txtUserID").value,
        parent.document.getElementById("txtCompanyID").value,document.getElementById("txtIP").value).value;
        try{
            var jobj = eval("data="+result);
            if(jobj.Detail){//第一步存入数据库成功
                var orderID=jobj.Detail[0].Success;
                var ProductID =parent.document.getElementById("txtProID").value;
                var companyid = parent.document.getElementById("txtCompanyID").value;
                var sendemail = Vivian.SendEmail(document.getElementById("txtDepartment").value,document.getElementById("txtName").value,document.getElementById("txtTelphone").value,
                document.getElementById("txtAddress").value,document.getElementById("txtEmail").value,document.getElementById("txtDetail").value,ProductID,document.getElementById("txtUrl").value,companyid,document.getElementById("txtProductName").value,orderID,"").value;
                if (sendemail == "1") {
                    show_success("留言成功");
                    SendedClearData();
                }
                else {
                    if (parseInt(ProductID) == 0) {
                        show_success("留言成功");
                    } else {
                        show_error("留言成功,邮件发送失败");
                    }
                }
            }
            else if(jobj.Error=="0"){
                show_error("您填写的信息中包含敏感信息("+jobj.DirtyWords+")，请检查后重新提交。");
                }
            else if(jobj.Error=="-1"){
                show_error("验证码错误");}
            else if(jobj.Error=="-2"){
                show_error("请您填写必要的信息");}
            else{
                show_error("留言失败");
            }
        }
        catch(ex){
            show_error("留言失败。");
        }
    }
    return false;
}

function SendedClearData() {
    document.getElementById("txtDepartment").value = '';
    document.getElementById("txtName").value = '';
    document.getElementById("txtTelphone").value = '';
    document.getElementById("txtAddress").value = '';
    document.getElementById("txtEmail").value = '';
    document.getElementById("txtDetail").value = '';
    document.getElementById("txtValidCode").value = '';
}
function checkForm(){
    if(document.getElementById("txtProductName").value==""){
        show_error("请填写您感兴趣的产品");
        return false;
    }
    if(document.getElementById("txtDepartment").value==""){
        show_error("请填写您的单位");
        return false;
    }
    if(document.getElementById("txtName").value==""){
        show_error("请填写您的姓名");
        return false;
    }
    if(document.getElementById("txtTelphone").value==""){
        show_error("请填写您的联系电话");
        return false;
    }
    if(document.getElementById("txtAddress").value==""){
        show_error("请填写您的详细地址");
        return false;
    }
  // <%-- if(document.getElementById("txtEmail").value==""){
       // show_error("请填写您的邮箱");
       // return false;
   // }--%>
    if(document.getElementById("txtDetail").value==""){
        show_error("请填写您的要求或建议");
        return false;
    }
//    document.getElementById("ok").disabled="disabled";
    //    document.getElementById("no").disabled="disabled";
    return true;
}

function daysBetween(DateOne) {
    var myDate = new Date();
    var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
    var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
    var OneYear = DateOne.substring(0, DateOne.indexOf('-'));

    var TwoMonth = myDate.getMonth() + 1;
    var TwoDay = myDate.getDate();
    var TwoYear = myDate.getFullYear();
    return cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
}
function login(u, p) {
    var strInfo = "";
    if (u != '' && p != '') {
        var result = Vivian.CheckLogin(u, p).value;
        switch (result) {
            case "-1":
                strInfo = "用户名或密码错误，请二十分钟后重试。";
                break;
            case "10":
                strInfo = "您还有<span style='color:red'>10</span>次机会来填写正确的用户名和密码";
                break;
            case "9":
                strInfo = "您还有<span style='color:red'>9</span>次机会来填写正确的用户名和密码";
                break;
            case "8":
                strInfo = "您还有<span style='color:red'>8</span>次机会来填写正确的用户名和密码";
                break;
            case "7":
                strInfo = "您还有<span style='color:red'>7</span>次机会来填写正确的用户名和密码";
                break;
            case "6":
                strInfo = "您还有<span style='color:red'>6</span>次机会来填写正确的用户名和密码";
                break;
            case "5":
                strInfo = "您还有<span style='color:red'>5</span>次机会来填写正确的用户名和密码";
                break;
            case "4":
                strInfo = "您还有<span style='color:red'>4</span>次机会来填写正确的用户名和密码";
                break;
            case "3":
                strInfo = "您还有<span style='color:red'>3</span>次机会来填写正确的用户名和密码";
                break;
            case "2":
                strInfo = "您还有<span style='color:red'>2</span>次机会来填写正确的用户名和密码";
                break;
            case "1":
                strInfo = "您还有<span style='color:red'>1</span>次机会来填写正确的用户名和密码";
                break;
            default:
                strInfo = "true";
                break;
        }
    }
    return strInfo;
}
function IsEmail(s) {
    var patrn = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    if (!patrn.exec(s))
        return false
    else
        return true
}
function IstrueName(s) {
    var patrn = /[（）：；“”‘’，。？《》{}【】、！~,;!()]+/;
    if (patrn.exec(s))
        return false
    else
        return true
}
function IsTel(s) {
    var patrn = /^[ /0-9-/u9fa5]*$/; ///^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
    if (!patrn.exec(s))
        return false
    else
        return true
}
//邮箱
function ShowdivEmail() {
    if (document.getElementById("divEmail").style.display == "none") {
        document.getElementById("divEmail").style.display = "";
    }
}
function setEmailData() {
    var objVal = document.getElementById("txtEmail").value;
    if (objVal.indexOf("@") == -1 && objVal!="") {
        document.getElementById("divEmailLi1").innerHTML = "<a href=\"javascript:void(0)\" onclick=\"GetEmailData('" + objVal + "@163.com')\">" + objVal + "@163.com" + "</a>";
        document.getElementById("divEmailLi1").innerHTML = "<a href=\"javascript:void(0)\" onclick=\"GetEmailData('" + objVal + "@163.com')\">" + objVal + "@163.com" + "</a>";
        document.getElementById("divEmailLi2").innerHTML = "<a href=\"javascript:void(0)\" onclick=\"GetEmailData('" + objVal + "@qq.com')\">" + objVal + "@qq.com" + "</a>";
        document.getElementById("divEmailLi3").innerHTML = "<a href=\"javascript:void(0)\" onclick=\"GetEmailData('" + objVal + "@126.com')\">" + objVal + "@126.com" + "</a>";
        document.getElementById("divEmailLi4").innerHTML = "<a href=\"javascript:void(0)\" onclick=\"GetEmailData('" + objVal + "@sohu.com')\">" + objVal + "@sohu.com" + "</a>";
        document.getElementById("divEmailLi5").innerHTML = "<a href=\"javascript:void(0)\" onclick=\"GetEmailData('" + objVal + "@sina.com')\">" + objVal + "@sina.com" + "</a>";
        document.getElementById("divEmailLi6").innerHTML = "<a href=\"javascript:void(0)\" onclick=\"GetEmailData('" + objVal + "@yahoo.com')\">" + objVal + "@yahoo.com" + "</a>";
        document.getElementById("divEmailLi7").innerHTML = "<a href=\"javascript:void(0)\" onclick=\"GetEmailData('" + objVal + "@hotmail.com')\">" + objVal + "@hotmail.com" + "</a>";
    }
    else {
        document.getElementById("divEmail").style.display = "none";
    }
}
function GetEmailData(lis) {
    document.getElementById("txtEmail").value = lis;
    document.getElementById("divEmail").style.display = "none";
    regStep1.prototype.ChktxtEmail();
}