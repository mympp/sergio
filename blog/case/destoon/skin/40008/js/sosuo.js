function setModuleli(i, o) {
	Dd('destoon_moduleid').value = i;
	searchid = i;
	var lis = Dd('search_moduleli').getElementsByTagName('a');
	for(var i=0;i<lis.length;i++) {
		lis[i].className = lis[i] == o ? 'search_on' : '';
	}
}