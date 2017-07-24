var path=["VM:"];
var dir={
    "OS":{
		"help":{
		},
        "clear.txt":"Console cleared!",
		"dir.js":"log.innerText+='\\n';\nvar at=GET(dirTxt());\nfor(i in at){\n    var fileType=eval(GET('VM:\\\\OS\\\\fileType.js'));\n    var space='';\n    if(fileType.length<17){\n        var space=Array(16-fileType.length).join(' ');\n    }\n    log.innerText+='\\n'+fileType+space+i;\n}\nlog.innerText+='\\n ';",
		"fileType.js":"if(typeof(at[i])=='object'){'<DIR>';}\nelse{\n    switch(true){\n    case(i.endsWith('.txt')):'Text';break;\n    case(i.endsWith('.js')):'Javascript';break;\n    case(i.endsWith('.html')):'HTML';break;\n    case(i.endsWith('.css')):'Stylesheet';break;\n    }\n}",
    }
};

var helpl={
	'^':{
		short:"Line break",
		long:"line break<br><br>[text]^"
	},
	cd:{
		short:"Displays the name of or changes the current directory",
		long:"Displays the name of or changes the current directory<br><br>CD [path]<br><br>Type CD without parameters to display the current drive and directory."
	},
	clear:{
		short:"Clear the console log",
		long:"Clear the console log"
	},
	del:{
		short:"Delete a file",
		long:"Delete a file<br><br>del [file]"
	},
	dir:{
		short:"Displays a list of files and subdirectories in a directory",
		long:"Displays a list of files and subdirectories in a directory"
	},
	edit:{
		short:"Edit a file's contents",
		long:"Edit a file's contents"
	},
	get:{
		short:"Displays the contents of a file in text form",
		long:"Displays the contents of a file in text form"
	},
	help:{
		short:"Get help about commands",
		long:"Get help about commands<br><br>help [command]<br><br>type 'help' for all comands, type 'help [command]' for more details on a specific command"
	},
	md:{
		short:"Make a new directory",
		long:"Make a new directory<br><br>MD [name]"
	},
	mkdir:{
		short:"Make a new directory",
		long:"Make a new directory<br><br>MD [name]"
	},
	'null>':{
		short:"Make a null file",
		long:"Make a null file<br><br>null>[name]"
	},
	run:{
		short:"Run a script file",
		long:"Run a script file<br><br>run [file]"
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

spc=function(txt){
	return(txt.replace(/ /g,"\xa0"));
};

function GET(filePath){
	if(!filePath||filePath==""){
		return(GET(dirTxt()));
	}
	try{
	if(filePath.indexOf("VM:")===0){
		var Path=filePath.split("\\");
		var file=dir;
		for(var i=1;i<Path.length;i++){
			file=file[Path[i]];
		}
		if(typeof file=='object'){
			return file;
		}
		return spc(file);
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
		if(typeof file=='object'){
			return file;
		}
		return spc(file);
	}
	}catch(e){return "file '"+filePath+"' not found";}
};
