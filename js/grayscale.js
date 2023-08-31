/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// remove the focused state after click,
// otherwise bootstrap will still highlight the link
$("a").mouseup(function(){
    $(this).blur();
})

// Google Maps Scripts
// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 15,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(40.6700, -73.9400), // New York

        // Disables the default Google Maps UI components
        disableDefaultUI: true,
        scrollwheel: false,
        draggable: false,

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 29
            }, {
                "weight": 0.2
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 18
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 21
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "saturation": 36
            }, {
                "color": "#000000"
            }, {
                "lightness": 40
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 19
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }, {
                "weight": 1.2
            }]
        }]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
    var image = 'img/map-marker.png';
    var myLatLng = new google.maps.LatLng(40.6700, -73.9400);
    var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });
}


// projects
var pdfPaths = ['/pdf/honeyPot.pdf', '/pdf/khUniv.pdf']; // PDF 파일 경로 배열

// 현재 페이지
var currentPages = [1, 1];

// PDF를 표시할 컨테이너 요소들 가져오기
var containers = [
  document.getElementById('pdf-container-1'),
  document.getElementById('pdf-container-2')
];

// 이전 버튼과 다음 버튼 요소들 가져오기
var prevButtons = [
  document.getElementById('prev-button-1'),
  document.getElementById('prev-button-2')
];
var nextButtons = [
  document.getElementById('next-button-1'),
  document.getElementById('next-button-2')
];

// 페이지 정보 요소들 가져오기
var pageInfoElements = [
  document.getElementById('page-info-1'),
  document.getElementById('page-info-2')
];

// PDF 로드 및 초기화 실행
for (var i = 0; i < pdfPaths.length; i++) {
  initializePdf(i, pdfPaths[i], currentPages[i]);
}

/**
 * PDF 초기화 및 로드 함수
 */
function initializePdf(index, url, currentPage) {
  pdfjsLib.getDocument(url).promise.then(function(pdfDoc) {

    // 이전 버튼 클릭 시 이벤트 처리
    prevButtons[index].addEventListener('click', function() {
      goToPreviousPage(index, pdfDoc, currentPage);
    });

    // 다음 버튼 클릭 시 이벤트 처리
    nextButtons[index].addEventListener('click', function() {
      goToNextPage(index, pdfDoc, currentPage);
    });

    // 초기 페이지 렌더링
    renderPage(index, pdfDoc, currentPage);
  });
}

/**
 * 특정 페이지의 PDF를 렌더링하여 화면에 표시하는 함수
 */
function renderPage(index, pdfDoc, pageNumber) {
  pdfDoc.getPage(pageNumber).then(function(page) {
    var viewport = page.getViewport({ scale: 1.0 });
    var canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    containers[index].innerHTML = '';
    containers[index].appendChild(canvas);

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    page.render({
      canvasContext: canvas.getContext('2d'),
      viewport: viewport,
    });

    // 페이지 정보 업데이트
    pageInfoElements[index].textContent = pageNumber + '/' + pdfDoc.numPages;
  });
}

/**
 * 이전 페이지로 이동하는 함수
 */
function goToPreviousPage(index, pdfDoc) {
  if (currentPages[index] <= 1) return;

  currentPages[index]--;
  renderPage(index, pdfDoc, currentPages[index]);
}

/**
 * 다음 페이지로 이동하는 함수
 */
function goToNextPage(index, pdfDoc) {
  if (currentPages[index] >= pdfDoc.numPages) return;

  currentPages[index]++;
  renderPage(index, pdfDoc, currentPages[index]);
}
