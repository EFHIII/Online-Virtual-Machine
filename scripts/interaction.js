var log=document.getElementById("log");
var lastInput="";
function submit(event){
    if (event.keyCode == 13) {
        var input=lastInput.replace(Dir+">","");
        console.log(input);
        log.innerHTML+="<br>"+Dir+">"+input;
        document.getElementById("input").innerHTML=Dir+">";
        
        var el = document.getElementById("input");
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(el, 1);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
		
		switch(input){
			case("help"):
				log.innerHTML+="<br>Sorry, you're gonna have to figure it out via inspect ellement.";
			break;
			case("clear"):
				log.innerHTML="Console cleared!";
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
    }
	lastInput=document.getElementById("input").innerText;
};
document.getElementById("input").addEventListener("keyup",submit);