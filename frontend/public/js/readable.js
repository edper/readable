$(document).ready( 
    function(){ 
        $('.modal').modal(); 
        $('select').material_select(); 
        $('select[required]').css({display: 'inline',height: 0,padding: 0,width: 0});}
); 

function getUUID() 
{ 
    return (Math.random().toString(36).substring(2)+(new Date()).getTime().toString(36));
}