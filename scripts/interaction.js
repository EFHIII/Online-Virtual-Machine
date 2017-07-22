var log=document.getElementById("log");
var lastInput="";
function submit(event){
    if (event.keyCode == 13) {
        var input=lastInput.replace(dirTxt()+">","");
        log.innerHTML+="<br>"+dirTxt()+">"+input;
		
		var inputi=input.toLowerCase();
		switch(true){
			case(inputi=="help"):
				log.innerHTML+="<br>"+GET("VM:\\OS\\help.txt");
			break;
			case(inputi=="clear"):
				log.innerHTML=GET("VM:\\OS\\clear.txt");
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
				log.innerText+="\n\n"+GET(input.replace(/get /i,""))+"\n\xa0";
			break;
			default:
				var ans;
				try{
					ans=eval(input);
				}catch(e){ans=e;}
				if(ans!=="abort"){
					log.innerHTML+="<br>"+ans;
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