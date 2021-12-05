
'use strict';

$(document).ready(function() {
  preventDefaultAnchor();
  pageChange();
  menuOpen('#header div.menu a');
  menuClose('#header div.menu-on a');
  pageVisibility('#main .page');
  setAccordion();
})

function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
}

function pageChange() {
  var numPage = $('section.page').length;
  var pageNow = 0;
  var pagePrev = 0;
  var pageNext = 0;
  var scrollEvent = ('onmousewheel' in window) ? 'mousewheel' : 'DOMMouseScroll';
  var isBlocked = false;

  showPage(1);
  
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
}

function menuOpen(selector) {
  var $selector = $(selector);

  $selector.on('click', function() {
    $('div.menu-on').addClass('active');
  });
};

function menuClose(selector) {
  var $selector = $(selector);

  $selector.on('click', function() {
    $('div.menu-on').removeClass('active');
  });
}


function pageVisibility(selector) { 
  $(window).on('scroll resize', function() {
    $(selector).each(function() {
      var $selector = $(this)
      var start = $selector.offset().top - $(window).height();
      var end = $selector.offset().top + $selector.outerHeight();
      var scrollAmt = $(document).scrollTop();
      if (scrollAmt > start && scrollAmt < end) {
        $selector.addClass('on');
      } else {
        $selector.removeClass('on');
      }
    });
  })
}

function setAccordion() {
  var timerId = '';

  refresh();

  $('#page2 ul.list > li > a').on('click', function() {
    if ($(this).parent().find('ul').length > 0) {
      var height = 0;
      $(this).next().find('> li').each(function() {
        height += $(this).outerHeight(true);
      });
      $('#page2 ul.list > li > ul').css({'height': 0 + 'px'});
      $(this).next().css({'height': height + 'px'});
    }
  });
  
  $('#page2').on('mouseleave', function() {
    timerId = setTimeout(function() {refresh();}, 500);
  }).on('mouseenter', function() {
    clearTimeout(timerId);
  });
  
  function refresh() {
    $('#page2 ul.list > li:not(.on) > ul').css({'height': 0 + 'px'});
    if ($('#page2 ul.list > li.on').find('ul').length > 0) {
      var height = 0;
      $('#page2 ul.list > li.on > ul > li').each(function() {
        height += $(this).outerHeight(true);
      });
      $('#page2 ul.list > li.on > ul').css({'height': height + 'px'});
    }
  }
}


