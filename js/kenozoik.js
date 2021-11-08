
'use strict';

var numPage = $('section.page').length;
var pageNow = 0;
var pagePrev = 0;
var pageNext = 0;
var scrollEvent = ('onmousewheel' in window) ? 'mousewheel' : 'DOMMouseScroll';
var isBlocked = false;
// console.log(scrollEvent);

showPage(1);
checkVisibility('p.content');

$(window).on('scroll resize', function() {
  checkVisibility('p.content');
});

$('#page-indicator > li > a').on('click', function() {
  var index = $('#page-indicator > li').index($(this).parent());
  showPage(index + 1);
});

window.addEventListener(scrollEvent, function(e) {
  e.preventDefault();
  if (isBlocked === true) return false;
  isBlocked = true;
  var delta = 0;
  if (scrollEvent === 'mousewheel') {
    delta = e.wheelDelta / -120;
  } else {
    delta = e.detail / 3;
  }
  if (delta > 0) {
    showPage(pageNext);
  } else if (delta < 0) {
    showPage(pagePrev);
  }
}, {'passive': false});


function showPage(n) {
  var scrollAmt = $('section.page:eq(' + (n - 1) + ')').offset().top;
  $('html').stop(true).animate({'scrollTop': scrollAmt}, 500, function() {
    isBlocked = false;
  });
  $('#page-indicator > li').removeClass('on');
  $('#page-indicator > li:eq(' + (n - 1) + ')').addClass('on');
  pageNow = n;
  pagePrev = (n <= 1) ? 1 : (n - 1);
  pageNext = (n >= numPage) ? numPage : (n + 1);
}

function checkVisibility(selector) {
  $(selector).each(function() {
    var $selector = $(this);
    var start = $selector.offset().top - $(window).height();
    var end = $selector.offset().top + $selector.outerHeight();
    var scrollAmt = $(document).scrollTop();
    if (scrollAmt < start) {
      $selector.removeClass('up on');
      $selector.addClass('down');
    } else if (scrollAmt > end) {
      $selector.removeClass('down on');
      $selector.addClass('up');
    } else {
      $selector.removeClass('down up');
      $selector.addClass('on');
    }
  });
}


