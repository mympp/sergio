function createXHR() {
  if (window.XMLHttpRequest) {	//IE7+��Firefox��Opera��Chrome ��Safari
     return new XMLHttpRequest();
  } else if (window.ActiveXObject) {   //IE6 ������
    var versions = ['MSXML2.XMLHttp','Microsoft.XMLHTTP'];
    for (var i = 0,len = versions.length; i<len; i++) {
      try {
        return new ActiveXObject(version[i]);
        break;
      } catch (e) {
        //����
      }	
    }
  } else {
    throw new Error('�������֧��XHR����');
  }
}


//��װajax������Ϊһ������
function doAjax(obj) {
  var xhr = createXHR();	//����XHR����
  //ͨ��ʹ��JS����ַ������IE������ڶ���Ĭ�ϻ�ȡ���������
  obj.url = obj.url + '?rand=' + Math.random();
  obj.data = params(obj.data);  //ͨ��params()����ֵ��ת�����ַ���
  //����GET���������ݼӵ�url����
  if (obj.method === 'get') {
    obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data; 
  }
  if (obj.async === true) {   //true��ʾ�첽��false��ʾͬ��
    //ʹ���첽���õ�ʱ����Ҫ����readystatechange �¼�
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {   //�ж϶����״̬�Ƿ񽻻����
        callback();		 //�ص�
      }
    };
  }
  //��ʹ��XHR����ʱ�������ȵ���open()������
  //������������������������(get��post)�������URL�ͱ�ʾ�Ƿ��첽��
  xhr.open(obj.method, obj.url, obj.async);
  if (obj.method === 'post') {
    //post��ʽ��Ҫ�Լ�����http������ͷ����ģ�±��ύ��
    //����open����֮��send����֮ǰ��
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(obj.data);		//post��ʽ�����ݷ���send()������
  } else {
    xhr.send(null);		//get��ʽ����null
  }
  if (obj.async === false) {  //ͬ��
    callback();
  }
  function callback() {
    if (xhr.status == 200) {  //�ж�http�Ľ����Ƿ�ɹ���200��ʾ�ɹ�
      obj.success(xhr.responseText);			//�ص����ݲ���
    } else {
     // alert('��ȡ���ݴ��󣡴�����ţ�' + xhr.status + '��������Ϣ��' + xhr.statusText);
    }	
  }
}
//��ֵ��ת��Ϊ�ַ���
function params(data) {
  var arr = [];
  for (var i in data) {
    //�����ַ����β������������ʹ��encodeURIComponent()���б��봦��
    arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
  }
  return arr.join('&');
}
