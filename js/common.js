$(document).ready(function() {
    preventDefaultAnchor();
    setCurrentNav();
});


function preventDefaultAnchor() {
$(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
});
}

function setCurrentNav() {
var bodyClass = $('body').attr('class');
var classArray = bodyClass.split(' ');
if (classArray[0] === 'main') return false;