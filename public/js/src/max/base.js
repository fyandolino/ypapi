var base = $;

(function ($) {
    /* global window, setTimeout, console, Modernizr, clearTimeout */

    /**
    @class 
    @constructor
    @param {Object} 
    **/
    base.Detect = function () {
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
	base.sample = function(element, position, speed, func) {
		
	};

} (jQuery));


/* END FILE */
var hy = $;

(function ($) {
    /* global window, setTimeout, setInterval, console, Modernizr, clearTimeout */

    /**
    Boilerplate Object reference.

    @class $.BoilerPlateObject
    @constructor
    @param {Object} params External object settings passed into the object.
    **/
    $.main = function (params) {              
       
            /**
            Global This
            **/
 
            /**
            Initializaiton function which runs at object instantiation time.

            @method init
            **/
            function init() { 
                
            }

            function bindEvents() {
            }
          
            init();
    };

    $.secondObject = function (params) { 

        function init(){
        }

        init();
    };

} (jQuery));

$(function() {
    new hy.main();
});
