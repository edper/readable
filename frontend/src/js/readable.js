let isLoaded = 0;

$(document).ready( 
    function () { isLoaded ? false : (initializeMaterialize() && (isLoaded=1)) }
); 

function getUUID() 
{ 
    return (Math.random().toString(36).substring(2)+(new Date()).getTime().toString(36));
}

function initializeMaterialize() {
    $('.modal').modal(); 
    $('.dropdown-button').dropdown('open');
    $('select').material_select(); 
    $('select[required]').css({display: 'inline',height: 0,padding: 0,width: 0});
}