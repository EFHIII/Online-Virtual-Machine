var path=["VM:"];
var dir={
    "OS":{
		"help":{
	        "help.txt":"CD&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CLEAR    DIR    GET    HELP",
		},
        "clear.txt":"Console cleared!",
		"dir.js":"log.innerText+='\\n';\nvar at=GET(dirTxt());\nfor(i in at){\n\xa0\xa0\xa0\xa0var fileType=eval(GET('VM:\\\\OS\\\\fileType.js'));\n\xa0\xa0\xa0\xa0var space='';\n\xa0\xa0\xa0\xa0if(fileType.length<17){\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0var space=Array(17-fileType.length).join('\xa0');\n\xa0\xa0\xa0\xa0}\n\xa0\xa0\xa0\xa0log.innerText+='\\n'+fileType+space+i;\n}\nlog.innerText+='\\n\xa0';",
		"fileType.js":"if(typeof(at[i])=='object'){'<DIR>';}\nelse{\nswitch(true){\ncase(i.endsWith('.txt')):'Text';break;\ncase(i.endsWith('.js')):'Javascript';break;\ncase(i.endsWith('.html')):'HTML';break;\ncase(i.endsWith('.css')):'Stylesheet';break;\n}\n}",
    }
};

var helpl={
	cd:{
		short:"Displays the name of or changes the current directory.",
		long:"Displays the name of or changes the current directory.<br><br>CD [path]<br><br>Type CD without parameters to display the current drive and directory."
	},
	clear:{
		short:"Clear the console log",
		long:"Clear the console log"
	},
	dir:{
		short:"Displays a list of files and subdirectories in a directory.",
		long:"Displays a list of files and subdirectories in a directory."
	},
	get:{
		short:"Displays a contents of a file in text form.",
		long:"Displays a contents of a file in text form."
	},
	help:{
		short:"Get help about commands.",
		long:"Get help about commands.<br><br>help [command]<br><br>type 'help' for all comands, type 'help [command]' for more details on a specific command"
	},
	
};


var txt="";
for(var i in helpl){
	dir["OS"]["help"]["help-"+i+".txt"]=helpl[i].long;
	txt+="<br>"+i.toUpperCase()+Array(16-i.length).join("&nbsp;")+helpl[i].short;
}
dir["OS"]["help"]["help.txt"]=txt.replace("<br>","");

dirTxt=function(){
	return(path.join("\\"));
};

function GET(filePath){
	try{
	if(filePath.indexOf("VM:")===0){
		var Path=filePath.split("\\");
		var file=dir;
		for(var i=1;i<Path.length;i++){
			file=file[Path[i]];
		}
		return(file);
	}
	else{
		var file=dir;
		for(var i=1;i<path.length;i++){
			file=file[path[i]];
		}
		var Path=filePath.split("\\");
		for(var i=0;i<Path.length;i++){
			file=file[Path[i]];
		}
		return(file);
	}
	}catch(e){return "file '"+filePath+"' not found";}
};
