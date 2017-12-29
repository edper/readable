$(document).ready( 
    function () { initializeMaterialize() }
); 

function getUUID() 
{ 
    return (Math.random().toString(36).substring(2)+(new Date()).getTime().toString(36));
}

function initializeMaterialize() {
    $('.modal').modal(); 
    $('select').material_select(); 
    $('select[required]').css({display: 'inline',height: 0,padding: 0,width: 0});
    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: true, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
      });
}