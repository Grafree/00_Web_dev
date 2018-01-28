function confirmation() {
  var test = confirm('Etes-vous sûr de vouloir supprimer définitivement cet élément ?');
  if (test) {
    return true;
  } else {
    return false;
  }
}


function adminMessage( $codeAlert ){
	
	document.getElementById( $codeAlert ).style.display='none';
		
}

function tablehighlight(id){
	
	var td;
	
	td = document.getElementById(id).getElementsByTagName('td');

	for(var i = 0; i < td.length; i++){
	
		if (td[i].className == 'table_rows_click' || td[i].className == 'table_rows_click_hide') {
		
		
		
		
		}else{
		
			if(td[i].className == 'table_rows1_hide' || td[i].className == 'table_rows2_hide' || td[i].className == 'table_rows_click_hide'){
		
				td[i].className = 'table_rows3_hide';
				
			}else{
		
				td[i].className = 'table_rows3';
				
			}
			
		}
		
	}	
	
}

function tablenormal(id, tdclass){

	var td;

	td = document.getElementById(id).getElementsByTagName('td');
	
	for (var i = 0; i < td.length; i++) {
	
		if (td[i].className == 'table_rows_click' || td[i].className == 'table_rows_click_hide') {
		
		
		}else{
	
			if (td[i].className == 'table_rows3_hide' || td[i].className == tdclass+'_hide') {
			
				td[i].className = tdclass+'_hide';
				
			}else{
				
				td[i].className = tdclass;
				
			}
			
		}
		
	}
	
}

function tablechoose(id, tdclass){
	
	var td;
	td = document.getElementById(id).getElementsByTagName('td');

	for(var i = 0; i < td.length; i++){
	
		if (td[i].className == 'table_rows_click' || td[i].className == 'table_rows_click_hide') {

			if (td[i].className == 'table_rows_click_hide') {
				
				td[i].className = tdclass+'_hide';
				
			}else{
			
				td[i].className = tdclass;
				
			}	
			
		}else{		
			
			if (td[i].className == tdclass + '_hide' || td[i].className == 'table_rows3_hide') {
			
				td[i].className = 'table_rows_click_hide';
				
			}else{
		
				td[i].className = 'table_rows_click';				
				
			}
		}
	}	
}


function headingactive(id){
	
	if(document.getElementById(id).className != 'table_heading_active' && document.getElementById(id).className != 'table_heading_active_asc')
	document.getElementById(id).className = 'table_heading_over';
	
}

function headingnormal(id){
	
	if(document.getElementById(id).className != 'table_heading_active' && document.getElementById(id).className != 'table_heading_active_asc')
	document.getElementById(id).className = 'table_heading';
	
}
