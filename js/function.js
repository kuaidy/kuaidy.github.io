var DBNAME="NAVDATABASE";
var VERSION=1;
var TBTYPE="SITESTYPESDEFAULT";
var TBSITES="SITES"
var db;
var IndexDefaultType="defaulttype";
var IndexType="type";


//网站
function getdata(resourcename,tagname){
	var innercontent='<div class="tags '+resourcename+'" onclick="ChangeStatus"><span class="titlesign"></span><h3>'+tagname+'</h3></div><div class="sitediv"><ul id="'+resourcename+'" class="sitesul"></ul></div>';
	$("#content").append(innercontent);

	var path="resource/sites/"+resourcename+".json";
	var resourcename='#'+resourcename;
	var fatherdom=$(resourcename);
	$.getJSON(path,function(data){
		for(var i=0;i<data.site.length;i++){
			
		var x=Math.floor(Math.random()*100+1);
		var y=Math.floor(Math.random()*100+1);
		var z=Math.floor(Math.random()*100+1);

		var firstname=data.site[i].name.substring(0,1);
		var childdom='<li class="sitesli"><i class="siteicon" style="background-color:#'+x+y+z+'">'+firstname+'</i><a class="sitetext" href="'+data.site[i].siteurl+'">'+data.site[i].name+'</a></li>';
		fatherdom.append(childdom);
		}

		fatherdom.append("<li style='clear:both;'></li>");
	});
}
//新方法获取网址
function GetData(){
	var catPath="resource/category/category.json";
	$.getJSON(catPath,function(data){
		console.log(data);
	});
}

//软件下载
function gettooldata(url){
	$.getJSON(url,function(data){
		var items1=[];

		$.each(data,function(key,value){
			items1.push('<li class="toolcontent_lis" data-id-name="'+key+'"><div class="toolicon"><img src="'+value.icon+'" class="image_style"></div><div class="toolitems"><div class="tooltitledesc"><div class="tooltitle">'+value.title+'</div><div class="tooldescription">'+value.description+'</div></div><span class="toolpanel"></span></div></li>');
		});
		
		$("#toolcontentul_flex").append(items1);

		$(".click_close").click(function(){
			$("#graybackground").hide();
			$("#downloadpage").hide();
		});

		$(".toolcontent_lis").click(function(){
			$("#graybackground").css("display","flex");
			$("#downloadpage").css("display","block");
			$("#downloadurl_ul").empty();
			$("#downloadurl_article").empty();
			var items2=[];
			items2.push('<li class="lititle">下载地址：</li>');
			var tname=$(this).data("id-name");
			var tcontent=data[tname];
			//console.log(tcontent);
			$(".downloadname").html(tcontent.title);
			//下载地址加载
			$.each(tcontent.downsite,function(key,value){
				if(key=="official"){
					//console.log(value.length);
					items2.push('<li class="downloadurl_address"><a href="'+value+'" class="official" title="'+value+'">官网下载</a></li>');
				}else if(key=="dropbox"){
					//console.log(value.length);
					for(var i=0;i<value.length;){
						items2.push('<li class="downloadurl_address"><a href="'+value[i]+'" class="dropbox" title="'+value[i]+'">网盘下载 '+value[i+1]+'</a></li>');
						i+=2;
					}

				}else if(key=="magnetic"){
					for(var j=0;j<value.length;j++){
						items2.push('<li class="downloadurl_address"><a href="'+value[j]+'" class="magnetic" title="'+value[j]+'">磁链下载</a></li>');
					}
				}else{
					items2.push('<li class="downloadurl_address"><a href="'+value+'" class="download" title="'+value+'"">直接下载</a></li>');
				}
			});
			$("#downloadurl_ul").append(items2);

			//文档教程加载
			var items3=[];
			items3.push('<li class="lititle">相关教程：</li>');	
			for(var k=0;k<tcontent.document.length;){
					console.log(tcontent.document);
					items3.push('<li class="downloadurl_use"><a href="'+tcontent.document[k+1]+'" class="article_url">'+tcontent.document[k]+'</a></li>');
					k+=2;
				}
			$("#downloadurl_article").append(items3);
		});
	});
}

//动漫导航
function GetAnimationData(url){
	$.getJSON(url,function(data){
		console.log(data);
		//存放p(标题)，ul(内容)
		var items=[];
		

		for(var i=0;i<data.All.length;i++){
			items.push('<p class="lookcartoon">'+data.All[i].title+'</p>');			
			//存放li(网站)
			var itemli=[];
			for(var j=0;j<data.All[i].sites.length;j++){
				
				itemli.push('<li class="siteli"><a href="'+data.All[i].sites[j].url+'"><div class="sitedtail"><p class="sitename">'+data.All[i].sites[j].title+'</p><span class="siteimg"><img class="imgurl" src="'+data.All[i].sites[j].image+'"></span><p class="sitedesc">'+data.All[i].sites[j].desc+'</p></div></a></li>');
			}

			items.push($('<ul class="sitesul"></ul>').append(itemli));
		}

		$("#content").append(items);
	});
}

//改变icon的背景颜色
function SetIconBgColor(){
    var colors=["#FFA000","#FFECB3","#FFC107","#212121","#009688","#757575","#03A9F4","#E91E63","#ffff8d","#607D8B"];
	var sitesicons=document.getElementsByClassName("siteicon");

	// $("#content").bind(,"siteicon",function(){
	// 	alert("11");
	// });

	//  console.log(sitesicons);
	// var randomnum=Math.floor(Math.random()*10);

//    console.log($("i[class='siteicon']").length);
//    $(".siteicon").each(function(){
// 	   console.log();
//    });

// $(".siteicon").each(function(){
// 	var x=Math.floor(Math.random()*99);
// 	var y=Math.floor(Math.random()*99);
// 	var z=Math.floor(Math.random()*99);
// 	$(this).css("background-color","#"+x+y+z);
//  });


	// Array.prototype.forEach.call(sitesicons,function(siteicon,index){
	// 	var randomnum=Math.floor(Math.random()*10);
	// 	confirm.log(randomnum);
	// 	siteicon.style.backgroundColor=colors[randomnum];
	// 	console.log(colors[randomnum]);
	// });


	// sitesicons.forEach(siteicon => {
	//     var randomnum=Math.floor(Math.random()*10);
	// 	siteicon.style.backgroundColor=colors[randomnum];
	// });
}

//循环获取最近收录的网站，文件资源按时间命名
var globaldays="";
function GetIncludedData(day){
	// days=GetDate();
	if(globaldays==""){
		globaldays=GetDate();
	}else{
		globaldays=DateAdd(globaldays,-day);
	}
	$.ajaxSettings.async = false;
	var items=[];
	var includeli=[];
	for(var i=0;i<day;i++){
		var filepath="./resource/encounter/"+globaldays+".json";
		$.getJSON(filepath,function(data){
			console.log(data);
			var inlcudeditem=[];
			// var includedate=$('<div class="included_date"></div>');	
			var includetitle='<div class="title"><img class="dateicon" src="https://gsp0.baidu.com/5aAHeD3nKhI2p27j8IqW0jdnxx1xbK/tb/editor/images/client/image_emoticon25.png"><span calss="datetitle">'+data.date+'</span></div>';
			var includeul='<ul class="included_items"></ul>';
			var includedli=[];
			for(var i=0;i<data.site.length;i++){
				var sitetname=data.site[i].name;
				var siteurl=data.site[i].siteurl;
				var siteicon=data.site[i].siteicon;
				var sitedesc=data.site[i].sitedesc;
				includedli.push('<li><a href="'+siteurl+'" class="card-link" target="_blank"><div class="card-tit"><img src="'+siteicon+'"><span class="name">'+sitetname+'</span></div><div class="card-desc">'+sitedesc+'</div></a></li>');
			}
			inlcudeditem.push(includetitle);
			inlcudeditem.push($(includeul).append(includedli));
			$("#included_content").append(inlcudeditem);
		});
		globaldays=DateAdd(globaldays,-1);
		// console.log(itemschild);
	}
}

//得到当前日期

function GetDate(){
	var d=new Date();
	var y=d.getFullYear();
	var m=d.getMonth()+1;
	var t=d.getDate();
	if(m>0&&m<10){
		m="0"+m;
	}
	if(t>0&&t<10){
		t="0"+t;
	}
	return y+"-"+m+"-"+t;
}


//加减日期
 function DateAdd(today,days){ 
	var d=new Date(today);
	d.setDate(d.getDate()+days);
	var y=d.getFullYear();
	var m=d.getMonth()+1;
	if(m>0&&m<10){
		m="0"+m;
	}
	var t=d.getDate();
	if(t>0&&t<10){
		t="0"+t;
	}
	return y+'-'+m+'-'+t;
} 


//首页轮播 广告
function ChangeHotProject()
{
	var adimage=["http://www.rdonly.com/wp-content/uploads/2019/10/appfuns.png"];
	var adurl=["#"];
	var i=0;
	setInterval(function(){
		console.log(adurl.length);
		if(i==adurl.length){
			i=0;
		}
		$("#RecommandUrl").attr("href",adurl[i]);
		$("#RecommandView").css("background-image","url("+adimage[i]+")");
		i++;
	},5000);
}


//更多网站
//网站
function GetMoreData(url){
	$.getJSON(url,function(data){
		var items1=[];

		$.each(data,function(key,value){
			items1.push('<li class="toolcontent_lis" data-id-name="'+key+'"><div class="toolitems"><div class="tooltitledesc"><div class="tooltitle"><a style="width:100%;" href="'+value.url+'">'+value.title+'</div></div></div></li>');
		});
		
		$("#toolcontentul_flex").append(items1);

	});
}


//判断浏览器是否可用indexeddb数据库
function IsSupportIndexeddb(){
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
	
	if (!window.indexedDB) {
		window.alert("您的浏览器不支持indexeddb数据库，无法使用此功能，请使用最新版谷歌，edge，火狐浏览器！")
		return false;
	}else{
		return true;
	}
}

//创建一个数据库，版本号为1，表
function CreateDatabase(src){
	var request = indexedDB.open(DBNAME,VERSION);
	
	request.onerror = function(event) {
		console.log("打开失败");
	};
		
	request.onupgradeneeded = function(event) {
		db = event.target.result;
		if (!db.objectStoreNames.contains(TBSITES)){
			var objstore=db.createObjectStore(TBSITES, { keyPath:'id',autoIncrement:true });
			objstore.createIndex('type', 'type', { unique: false });
		}
		if (!db.objectStoreNames.contains(TBTYPE)){
			var objstore=db.createObjectStore(TBTYPE, {keyPath:'id',autoIncrement:true });
			objstore.createIndex('defaulttype', 'defaulttype', { unique: false });
		}
	}

	request.onsuccess = function(event) {
		db = event.target.result;
		if(src=="set"){
			readAll(TBSITES);
			readAll(TBTYPE);
		}else{
			ReadHomeData(TBSITES);
			ReadHomeData(TBTYPE);
		}
		
		console.log("打开成功");
		};
}

//添加内容
function AddData(obj,data,index,indexvalue){
	if(db){
		var transaction = db.transaction([obj], 'readonly');
		var store = transaction.objectStore(obj);
		var index = store.index(index);
		var request = index.get(indexvalue);

		request.onsuccess = function (e) {
			var result = e.target.result;
			if (result) {
				switch(obj){
					case TBTYPE:
						result.canuse=data.canuse;
						break;
				}
				Update(obj,result);
			} else {
				Add(obj,data);
			}
		}
	}
};

//添加数据
function Add(obj,data){
	if(db){
		var res = db.transaction([obj],'readwrite').objectStore(obj).add(data);
		res.onsuccess = function (event) {
			console.log('数据写入成功');
			switch(obj){
				case TBSITES:
					readAll(obj);
					break;
			}
			
		};
		res.onerror = function (event) {
			console.log('数据写入失败');
		}
	}
}

//更新数据
function Update(obj,data){
	if(db){
		var res = db.transaction([obj], 'readwrite').objectStore(obj).put(data);
		res.onsuccess = function (e) {
			console.log('数据更新成功');
		}

		res.onerror = function (event) {
			console.log('数据更新失败');
		}
	}
}

//删除数据
function Delete(obj,id){
	if(db){
		var request = db.transaction([obj], 'readwrite').objectStore(obj).delete(Number(id));
		request.onsuccess = function (event) {
			switch(obj){
				case TBSITES:
					readAll(obj);
					break;
			}
			console.log('数据删除成功');
		};
	}
}

//显示设置的所有数据
function readAll(obj,src) {
	if(db){
		var arr=new Array();
		var tran=db.transaction([obj],'readonly');
		var objectStore =tran.objectStore(obj);
		objectStore.openCursor().onsuccess = function (event) {
			var cursor = event.target.result;
			if (cursor) {
				arr.push(cursor.value);
				cursor.continue();
			} else {
				console.log('没有更多数据了！');
			}
		};
		tran.oncomplete=function(event){
			switch(obj){
				case TBSITES:
					var data=HandleData(arr);
					ShowData(data);
					break;
				case TBTYPE:
					ShowTypeStatus(arr);
			}
			
		}
	}else{
		CreateDatabase(src);
	}
};

//数据按照type分类
function HandleData(arr){
	console.log(arr);
	var nlist = [];
	for (var i = 0; i < arr.length; i++) {
		console.log(arr[i].str);
		if (nlist.length == 0) {
			nlist.push({
				type: arr[i].type,
				data: [arr[i]]
			})
		} else {
			var index = nlist.findIndex(item => item.type == arr[i].type);
			if (index >= 0) {
				nlist[index].data.push(arr[i])
			} else {
				nlist.push({
					type: arr[i].type,
					data: [arr[i]]
				})
			}
		}
	}
	return nlist;
}

//显示自定义的网站数据
function ShowData(data){
	$("#selfcontent").children().remove();
	for(var i=0;i<data.length;i++){
		console.log(data);
		var innercontent='<div class="tags" onclick="ChangeStatus"><span class="titlesign"></span><h3>'+data[i].type+'</h3></div><div class="sitediv"><ul id="'+i+'" class="sitesul"></ul></div>';
		$("#selfcontent").append(innercontent);
		
		var resourcename='#'+i;
		var fatherdom=$(resourcename);
		for(var j=0;j<data[i].data.length;j++){
			var x=Math.floor(Math.random()*100+1);
			var y=Math.floor(Math.random()*100+1);
			var z=Math.floor(Math.random()*100+1);

			var firstname=data[i].data[j].name.substring(0,1);
			var childdom='<li class="sitesli">';
			childdom+='<i class="siteicon" style="background-color:#'+x+y+z+'">'+firstname+'</i>';
			childdom+='<a class="sitetext" href="'+data[i].data[j].url+'">'+data[i].data[j].name+'</a>';
			childdom+='<span  data="'+data[i].data[j].id+'" onclick="spanclick(this);"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-shanchu"></use></svg></span>';
			childdom+='</li>';
			fatherdom.append(childdom);
		}
		fatherdom.append("<li style='clear:both;'></li>");
	}
}

//显示分类的显示状态
function ShowTypeStatus(arr){
	for(var i=0;i<arr.length;i++){
		// console.log(arr[i]);
		if(arr[i].canuse==false){
			var dom="input[type='checkbox'][value='"+arr[i].defaulttype+"']";
			// console.log(dom);
			$(".ulsettypes").find(dom).prop('checked',false);
		}else{
			var dom="input[type='checkbox'][value='"+arr[i].defaulttype+"']";
			// console.log(dom);
			$(".ulsettypes").find(dom).prop('checked',true);
		}
	}
}

//显示主页的数据
function ReadHomeData(obj){
	if(db){
		var arr=new Array();
		var tran=db.transaction([obj],'readonly');
		var objectStore =tran.objectStore(obj);
		objectStore.openCursor().onsuccess = function (event) {
			var cursor = event.target.result;
			if (cursor) {
				arr.push(cursor.value);
				cursor.continue();
			} else {
				console.log('没有更多数据了！');
			}
		};
		tran.oncomplete=function(event){
			switch(obj){
				case TBSITES:
					
					break;
				case TBTYPE:
					LoadUseData(arr);
			}
			
		}
	}else{
		CreateDatabase("home");
	}
}

//根据配置显示数据
function LoadUseData(arr){
	for(var i=0;i<arr.length;i++){
		if(arr[i].canuse==false){
			var classname='.'+arr[i].defaulttype;
			var id='#'+arr[i].defaulttype;
			console.log(classname);
			$(classname).css("display","none");
			$(id).css("display","none");
		}else{
			if(arr[i].defaulttype=="custom"){
				readAll(TBSITES,"set");
			}
		}
	}
}