function ajouterOnClickImg() {
  var divCD = document.getElementById("cd");
  var imagesCD = divCD.getElementsByTagName("img");
  for (var i=0; i<imagesCD.length; i++) {
    imagesCD[i].onclick = ajouterAuTop5;
	imagesCD[i].onmouseover=changerCurseurMain;
	imagesCD[i].onmouseout=changerCurseurDef; 
  }
}
function changerCurseurMain(){
	document.body.style.cursor="hand";
}
function changerCurseurDef(){
	document.body.style.cursor="default";
}
function ajouterAuTop5() {
  var elementImg = this;
  var elementTop5 = document.getElementById("top5");
  var nbCD = 0;

  for (var i=0; i<elementTop5.childNodes.length; i++) {
    if (elementTop5.childNodes[i].nodeName.toLowerCase() == "img") {
      nbCD = nbCD + 1;
    }
  }
  if (nbCD >= 5) {
    alert("Vous avez déjà 5CD. Cliquez sur \"Recommencer\" pour réessayer.");
    return;
  }

  elementTop5.appendChild(elementImg);
  elementImg.onclick = null;
  elementImg.onmouseover=null;

  var nouvelElementSpan = document.createElement("span");
  nouvelElementSpan.className = "rang";
  var nouvelElementTexte = document.createTextNode(nbCD + 1);
  nouvelElementSpan.appendChild(nouvelElementTexte);
  elementTop5.insertBefore(nouvelElementSpan, elementImg);
}

function recommencer() {
  var elementTop5 = document.getElementById("top5");
  var elementCD = document.getElementById("cd");
  var separateur = '   ';
  while (elementTop5.hasChildNodes()) {
    var firstChild = elementTop5.firstChild;
    if (firstChild.nodeName.toLowerCase() == "img") {
      elementCD.appendChild(firstChild);
	  var nouvelElementSpan = document.createElement("span");
	  var nouvelElementTexte = document.createTextNode(separateur);
	  nouvelElementSpan.appendChild(nouvelElementTexte);
	  elementCD.appendChild(nouvelElementSpan);
	  //elementCD.appendChild(separateur);
    } else {
      elementTop5.removeChild(firstChild);
    }
  }

  ajouterOnClickImg();
}
