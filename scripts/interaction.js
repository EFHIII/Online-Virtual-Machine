var log=document.getElementById("log");
var lastInput="";
var editing="";
function submit(event){
    if (event.keyCode == 13) {
        var input=lastInput.replace(dirTxt()+">","");
		if(input[input.length-1]=="^"){
			var txt=document.getElementById("input").innerText;
			txt=txt.slice(0,txt.length-3)+"\n\xa0 \xa0 ";
			document.getElementById("input").innerText=txt;
			
			var el = document.getElementById("input");
			var range = document.createRange();
			var sel = window.getSelection();
			range.setStart(el,txt.split('\n').length*2-1);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
			return;
		}
        log.innerText+="\n"+dirTxt()+">"+input;
		
		var inputi=input.toLowerCase();
		switch(true){
			case(editing.length>0):
				editing=editing.split("\\");
				var item=editing[editing.length-1];
				editing.pop();
				var at=GET(editing.join("\\"));
				at[item]=input;
				editing="";
			break;
			case(inputi.indexOf("help")==0):
				inputi=inputi.replace(" ","-");
				var help=spc(GET("VM:\\OS\\help\\"+inputi+".txt"));
				try{
				if(help.indexOf("file")!=0){
					log.innerHTML+="<br><br>"+help+"<br>&nbsp;";
					break;
				}
				}catch(e){}
				log.innerHTML+="<br>No help availible for '"+inputi.replace("help-","").toUpperCase()+"'";
			break;
			case(inputi=="clear"):
				log.innerText=GET("VM:\\OS\\clear.txt");
			break;
			case(inputi=="dir"):
				eval(GET("VM:\\OS\\dir.js"));
			break;
			case(inputi=="cd"):
				log.innerText+="\n"+dirTxt();
			break;
			case(inputi.indexOf("cd ")==0):
			try{
				if(inputi=="cd /"||inputi=="cd \\"){
					path=["VM:"];
					break;
				}
				var to=input.replace(/cd /i,"");
				if(GET(dirTxt()+"\\"+to).toString()==="[object Object]"){
					var add=to.split("\\");
					for(var i=0;i<add.length;i++){
						path.push(add[i]);
					}
				}
				else if(GET(to).toString()==="[object Object]"||GET("VM:\\"+to).toString()==="[object Object]"){
					var add=to.split("\\");
					path=[];
					if(add[0]!="VM:"){
						path=["VM:"];
					}
					for(var i=0;i<add.length;i++){
						path.push(add[i]);
					}
				}
				break;
			}catch(e){
				log.innerText+="\n"+e+"\nError: Folder '"+to+"' not found.";
				break;
			}
			break;
			case(inputi.indexOf("get ")==0):
				log.innerText+="\n\n"+spc(GET(input.replace(/get /i,"")))+"\n\xa0";
			break;
			case(inputi.indexOf("md ")==0):
				var at=dir;
				for(var i=1;i<path.length;i++){
					at=at[path[i]];
				}
				var input2=input;
				at[input2.replace(/md /i,"")]={};
				log.innerText+="\n Directory '"+input2.replace(/md /i,"")+"' created.";
			break;
			case(inputi.indexOf("mkdir ")==0):
				var at=dir;
				for(var i=1;i<path.length;i++){
					at=at[path[i]];
				}
				var input2=input;
				at[input2.replace(/mkdir /i,"")]={};
				log.innerText+="\n Directory '"+input2.replace(/mkdir /i,"")+"' created.";
			break;
			case(inputi.indexOf("null>")==0):
				var at=dir;
				for(var i=1;i<path.length;i++){
					at=at[path[i]];
				}
				var input2=input;
				at[input2.replace(/null>/i,"")]="";
				log.innerText+="\nFile '"+input2.replace(/null> /i,"")+"' created.";
			break;
			case(inputi.indexOf("del ")==0):
				var at=dir;
				for(var i=1;i<path.length;i++){
					at=at[path[i]];
				}
				var input2=input;
				delete at[input2.replace(/del /i,"")];
				log.innerText+="\n file '"+input2.replace(/del /i,"")+"' deleted.";
			break;
			case(inputi.indexOf("run ")==0):
				eval(GET(input.replace(/run /i,"")));
			break;
			case(inputi.indexOf("edit ")==0):
				editing=input.replace(/edit /i,"");
				document.getElementById("input").innerText=GET(editing);
			return;
			default:
				var ans;
				try{
					ans=eval(input);
				}catch(e){ans=e;}
				if(ans!=="abort"){
					log.innerText+="\n"+ans;
				}
		}
		document.getElementById("input").innerHTML=dirTxt()+">";
        
        var el = document.getElementById("input");
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(el, 1);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
		
    }
	lastInput=document.getElementById("input").innerText;
};
document.getElementById("input").addEventListener("keyup",submit);