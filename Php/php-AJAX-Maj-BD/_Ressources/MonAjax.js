// JavaScript Document
function getMonxhr()
{
	var xhr;
	try{
		xhr=new XMLHttpRequest();

	}
		catch(try_microsoft1){
			try { xhr=new ActiveXObject("MSXML2.XMLHTTP");
			} 
				catch(try_microsoft2){
					try {
						xhr=new ActiveXObject("Microsoft.XMLHTTP");
					}
						catch (erreur){
							xhr=null;
						}
				}
			
		}
	if (xhr==null){
		alert("Votre navigateur ne supporte la classe XMLHttpRequest de JavaScript");
	}
	else{
		return xhr;
	}
}
