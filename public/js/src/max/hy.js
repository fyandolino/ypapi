var hy = $;

(function ($) {
    /* global window, setTimeout, console, Modernizr, clearTimeout */

    /**
    @class 
    @constructor
    @param {Object} 
    **/
    hy.Detect = function () {
        console.log('global');        
    };

    /**
	Scrolls to an element.
	@class $.scrollTo
	@constructor
	
	@param {HTMLElement} element - the element you want the body to scroll to.
	@param {Number} position (optional) - the top coordinate where to scroll to.
	@param {Number} speed (optional) - speed of scroll.
	@param {Function} func (optional) - callback function to be called after scroll
	**/
	hy.sample = function(element, position, speed, func) {
		
	};

} (jQuery));


/* END FILE */
var hy = $;

(function ($) {
    /* global window, setTimeout, setInterval, console, Modernizr, clearTimeout */

    $.main = function (params) {              
       
            /**
            Global This
            **/
            // Select Data Array
            var restaurants = {
                'Coffee & Tea': 'coffee',
                'American (New)': 'american',
                'Breakfast & Brunch': 'breakfast',
                'Sandwhiches': 'sandwhiches',
                'Pizza': 'pizza'
            },
            arts = {
                'Art galleries':'galleries',
                'Museums':'museums',
                'Music Venues':'theater',
                'Stadiums & Arenas':'stadiumsarenas'
            },
            nightlife = {
                'Bars (all)':'bars',
                'Beer Gardens':'divebars',
                'Comedy Clubs':'nightlife',
                'Piano Bars':'nightlife'
            },
            shopping = {
                'Fashion':'fashion',
                'Souvenir Shops':'souvenirs',
                'Books':'books',
                'Mags':'mags',
                'Music & Video':'music',
                'Shopping Centers':'shopping'
            },
            cosmetics = {
                'Cosmetics & Beauty Supply':'cosmetics',
                'Day Spas':'spas',
                'Hair Salons':'hair',
                'Nail Salons':'hair'
            };

            var myStyle = [
               {
                 featureType: 'administrative',
                 elementType: 'labels',
                 stylers: [
                   { visibility: 'off' }
                 ]
               },{
                 featureType: 'poi',
                 elementType: 'labels',
                 stylers: [
                   { visibility: 'off' }
                 ]
               },{
                 featureType: 'water',
                 elementType: 'labels',
                 stylers: [
                   { visibility: 'off' }
                 ]
               },{
                 featureType: 'road',
                 elementType: 'labels',
                 stylers: [
                   { visibility: 'off' }
                 ]
               }
             ];

             var mapPin = {
                0:'img/icon/pin1.png',
                1:'img/icon/pin2.png',
                2:'img/icon/pin3.png',
                3:'img/icon/pin4.png',
                4:'img/icon/pin5.png',
                5:'img/icon/pin6.png',
                6:'img/icon/pin7.png',
                7:'img/icon/pin8.png',
                8:'img/icon/pin9.png',
                9:'img/icon/pin10.png'
            };

            // Yelp API key
            var YWSID = '1Hdgo020LXMsNvz5vb3wsQ';// common required parameter (api key)

            // Gmaps center lat long
            var myLatlng = new google.maps.LatLng(41.8909798, -87.63069064);
                
            var mapOptions = {
                  center: myLatlng,
                  zoom: 15,
                  disableDefaultUI: true,
                  mapTypeId: 'mystyle'
                };

            var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions),
                image = 'img/icon/hpin.png';

            map.mapTypes.set('mystyle', new google.maps.StyledMapType(myStyle, { name: 'My Style' }));

            var geocoder,
                bizData = {},
                gmarkers = [],
                activePin = 'img/icon/active.png';
         
            /**
            Initializaiton function which runs at object instantiation time.

            @method init
            **/
            function init() { 
                gmaps();
                bindEvents();          
            }

            function bindEvents() {
                
                google.maps.event.addListener(map, 'idle', function() {
                    var mainFilter = $('.categories').val(),
                        subFilter = $('.sub-categories').val();

                    yelpRequest(mainFilter,subFilter);        
                });

                $('.categories').change(function(e){
                    e.preventDefault();
                    var mainFilter = $(this).val();         

                    switch(mainFilter){ 
                        case 'restaurants':
                            selectOptions(restaurants);
                        break;
                        case 'arts':
                            selectOptions(arts);
                        break;              
                        case 'nightlife':
                            selectOptions(nightlife);
                        break;  
                        case 'shopping':
                            selectOptions(shopping);
                        break;  
                        case 'cosmetics':
                            selectOptions(cosmetics);
                        break;  
                        default: 
                            //$(".sub-categories").html('');  
                        break;
                    }         
                });
    
                $('.distance').change(function(e){
                    e.preventDefault();

                    var distance = $(this).val(),
                        mainFilter = $('.categories').val(),
                        subFilter = $('.sub-categories').val();       

                    removeMarkers();

                    switch(distance){ 
                        case 'walking':
                            map.setZoom(15);
                        break;
                        case 'biking':
                            map.setZoom(14);
                        break;              
                        case 'nightlife':
                            map.setZoom(14);
                        break;  
                        case 'driving':
                            map.setZoom(14);
                        break;  
                        case 'transit':
                            map.setZoom(14);
                        break;  
                        default: 
                            //$(".sub-categories").html('');  
                        break;
                    }    
                    yelpRequest(mainFilter,subFilter); 
                });

                $('.go-btn').on('click', function(e) {
                    e.preventDefault();
                    var mainFilter = $('.categories').val(),
                        subFilter = $('.sub-categories').val();  

                    removeMarkers();  
                    yelpRequest(mainFilter,subFilter);                                       
                });
            }

            function selectOptions(display) {

                var output = '';
                $.each(display, function (display, value) {   
                    output += '<option value="'+ value +'">'+ display +'</option>';
                });
                $('.sub-categories').html(output);
            }

            function yelpRequest(mainFilter,subFilter) {
                var mapBounds = map.getBounds();

                $('.loader').fadeIn();

                var URL = "http://api.yelp.com/" +
                    "business_review_search?"+
                    //"callback=" + "handleResults" +
                    "&term=" + mainFilter +','+ subFilter + 
                    "&num_biz_requested=10" +
                    "&tl_lat=" + mapBounds.getSouthWest().lat() +
                    "&tl_long=" + mapBounds.getSouthWest().lng() + 
                    "&br_lat=" + mapBounds.getNorthEast().lat() + 
                    "&br_long=" + mapBounds.getNorthEast().lng() +
                    "&ywsid=" + YWSID;

                $.ajax({
                    'url' : URL,
                    'dataType' : 'jsonp',
                    //'jsonpCallback' : 'handleResults',
                    'success' : function(data, textStats, XMLHttpRequest) {
                        handleResults(data);
                        $('.loader').fadeOut();
                    }
                });
            }

            function handleResults(data) {

                for(var i=0; i<data.businesses.length; i++) {
                    geocodeBiz(data.businesses[i]);

                    if(i === 0) {
                        displayData(data.businesses[0]);
                    }
                }
            }

            function geocodeBiz(business) {
                biz = business;
                bizAddress = business.address1;
                bizCity = business.city;
                bizState = business.state;
                bizZip = business.zip;
                bizFull = bizAddress + ',' + bizCity + ',' + bizState + ',' + bizZip;

                var bizID = business.id;
                bizData[bizID] = business;

                x = 0;

                geocoder.geocode( { 'address': bizFull}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {

                        var p = results[0].geometry.location;
                        var markerlatlng = new google.maps.LatLng(p.k, p.B);

                        x++;

                        var marker = new google.maps.Marker({
                            position: markerlatlng,
                            map: map,
                            icon: 'img/icon/pin'+ x +'.png'
                        });

                        gmarkers.push(marker);

                        marker.bizID = bizID;   

                        //markerEvent(marker);

                        google.maps.event.addListener(marker, 'click', function() {    
                                                            
                            displayData(bizData[this.bizID]);

                          /*  console.log(gmarkers);

                            for (var i=0; i<gmarkers.length; i++) {
                               gmarkers[i].setIcon(gmarkers[i].icon);
                            }

                            this.setIcon(image);*/

                        });      
                    } else {
                      //alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }

            function markerEvent(marker) {

                google.maps.event.addListener(marker, 'click', function() {    
                                                            
                    displayData(bizData[this.bizID]);                   

                    for (var i=0; i<gmarkers.length; i++) {                    
                         gmarkers[i].setIcon(mapPin[i]);
                    }

                    this.setIcon(activePin);
                });
            }

            function removeMarkers(){
                for(i=0; i<gmarkers.length; i++){
                    gmarkers[i].setMap(null);
                }
            }

            function displayData(markerData) {
                $('.info').hide().fadeIn('slow');
                $('.right .top').html('Results for David');
                $('.loc-img').attr('src',markerData.photo_url);
                $('.info .title').html(markerData.name);
                $('.info .address').html(markerData.address);
                $('.info .number').attr('href',markerData.phone).html(markerData.phone);
            }

            function gmaps() {
                geocoder = new google.maps.Geocoder();

                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,                    
                    icon: image
                });
            }
         
            init();
    };

} (jQuery));

$(function() {
    new hy.main();
});
