// JavaScript Document
var xhr1;
var xhr2;
function GetselectList(nmList) {
		var idSelect=document.getElementById(nmList);
		return idSelect.options[idSelect.selectedIndex].value;
	}
	function GenerateURL(mfaq,op){


		var mop;
		switch (op)
		{
			case 'S': 
			mop='motif=gerer&operation=supprimer'; 
			break;
			case 'M': 
			mop='operation=modifier';
			break;
			case 'N': mop='operation=nouveau';
			break;
		} 
		if (mfaq!='-')
		{
			var jfaq=GetselectList(mfaq);
			var MyUrl = 'faq_adm.php?'+mop+'&mfqId='+jfaq;		
		}
		else
		{
			var MyUrl = 'faq_adm.php?'+mop;
		}

		if (op=='S')
		{
			if (confirm("voulez vous vraiment suuprimer la FAQ No: "+jfaq)){
				self.location.href=MyUrl;
			}
		}
		else
		{
			self.location.href=MyUrl;	
		}
		
	}
function GenerateURLthm(mthm,op){
		var jfaq=GetselectList(mthm);
		var mop;
		switch (op)
		{
			case 'S': 
			mop='motif=supprimer'; 
			break;
			case 'M': 
			mop='motif=modifier';
			break;
			case 'N': mop='motif=nouveau';		
			break;
		}
		var MyUrl = 'theme_adm.php?'+mop+'&mthqId='+jfaq;
		if (op=='S')
		{
			if (confirm("voulez vous vraiment suuprimer le thème No: "+jfaq)){
				self.location.href=MyUrl;
			}
		}
		else
		{
			self.location.href=MyUrl;		
		}
		
	}	
function afficheFaq(idList)
{
	var idFaq=GetselectList(idList);

	xhr1= getMonxhr();
	xhr2= getMonxhr();
	var url1="FaqAffich1.php?id_faq="+idFaq+"&Time="+ new Date().getTime();
	var url2="FaqAffich2.php?id_faq="+idFaq+"&Time="+ new Date().getTime();
	xhr1.onreadystatechange = traiterReponse1;
	xhr1.open("GET",url1,true);
	
	xhr2.onreadystatechange = traiterReponse2;
	xhr2.open("GET",url2,true);	
	//--
	var ifaqQuest = document.faqfrm.faqQuest;
	var ifaqRep = document.faqfrm.faqRep;
	ifaqQuest.className="textQM";
	ifaqRep.className="textRM";
	//--
	

	xhr1.send(null);
	xhr2.send(null);
}

function traiterReponse1()
{
	if ((xhr1.readyState == 4) && (xhr1.status == 200))
	{
		var str=xhr1.responseText;
		var ifaqQuest = document.faqfrm.faqQuest;
		str=str.replace(/^\s*|\s*$/,"");
		ifaqQuest.value=str;
	}
}
function traiterReponse2()
{
	if ((xhr2.readyState == 4) && (xhr2.status == 200))
	{
		var str=xhr2.responseText;
		var ifaqRep = document.faqfrm.faqRep;
		str=str.replace(/^\s*|\s*$/,"");		
		ifaqRep.value=str;
	}
}