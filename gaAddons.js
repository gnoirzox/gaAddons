// gaAddons FREE v1.0, Copyright 2011, Stephane Hamel - http://gaAddons.com
// Licensed under a Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License
// gaAddons FREE v1.0, Copyright 2011, Stéphane Hamel - http://gaAddons.com
// gaAddons by Stéphane Hamel is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
// Refactored by Simon Rouger.
// This code is provided as is, without guarantee or support.

///////////////////
// _formAnalysis: not provided - use ClickTale!

///////////////////
// _setDayOfWeek: obsolete - this metric is available within GA

///////////////////
// _setDualMode: not provided - refer to _setLocalRemoteServerMode documentation on GA website

///////////////////
// _setXDomain: multiple top domains & sub-domains
var crossDomains = '(mysite.com|myothersite.com)'; // regex matching the list of top domains you own (set your domains)
var baseDomain = location.hostname.match(RegExp(crossDomains + '$'));
baseDomain = (baseDomain ? baseDomain[1].replace(/\:\d+/, '') : location.hostname);
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-31877048-1']); // set your UA account!
_gaq.push(['_setDomainName', baseDomain]);
_gaq.push(['_setAllowLinker', true]);
_gaq.push(['_trackPageview']);
(function() {
	        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; 
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

	jQuery(document).ready(function($) {
		// helper function - allow regex as jQuery selector
		jQuery.extend(
        	$.expr[':'].regex = function(e, l, m) {
	        	var mP = m[3].split(','),
	            	l = /^(data|css):/,
	            	a = {
		        	        method: mP[0].match(l) ? mP[0].split(':')[0] : 'attr',
		                	property: mP.shift().replace(l, '')
	            	},
	            	r = new RegExp(mP.join('').replace(/^\s+|\s+$/g, ''), 'ig');
	        	return r.test($(e)[a.method](a.property));
    		}
		);
	    	// for any link starting with http, but not pointing to the current domain or any of its subdomains, but matching one of our tracked domains...
        	$('a:regex(href,^http[^/]+' + crossDomains + ')').on('click', function(e) {
	        	if (this.href.match(crossDomains)[1] != baseDomain) {
	            		var t = _gat._getTrackerByName();
		    		this.href = t._getLinkerUrl(this.href);
	        	}
    		});
	});

	///////////////////
	// _trackDownloads
	jQuery(document).ready(function($) {
		// helper function - allow regex as jQuery selector
		jQuery.extend(
	        $.expr[':'].regex = function(e, l, m) {
		        var mP = m[3].split(','),
		            l = /^(data|css):/,
		            a = {
		                method: mP[0].match(l) ? mP[0].split(':')[0] : 'attr',
			        property: mP.shift().replace(l, '')
			        },
		            r = new RegExp(mP.join('').replace(/^\s+|\s+$/g, ''), 'ig');
		        return r.test($(e)[a.method](a.property));
	 	}
		);

	        $('a:regex(href,\\.(zip|mp\\d+|mpe*g|pdf|docx*|pptx*|xlsx*|jpe*g|png|gif|tiff*)$)').on('click', function(e) {
		        _gaq.push(['_trackEvent', 'Download', 'Click', this.href.replace(/^.*\/\//, '')]);
		});
	});

		///////////////////
		// _trackError: track 404 - Page not found
		if (document.title.search(/Page Not Found/i) !== -1) {
			    _gaq.push(['_trackPageview', '/vpv/404/' + location.host + location.pathname + '?from=' + document.referrer]);
		}

		///////////////////
		// _trackLoadTime: obsolete - use new GA _trackPageLoadTime

		///////////////////
		// _trackMailTo
		jQuery(document).ready(function($) {
			    $('a[href^="mailto"]').on('click', function(e) {
				            _gaq.push(['_trackEvent', 'Email', 'Click', this.href.replace(/^mailto:/i, '')]);
					        });
		});

		///////////////////
		// _trackOutbound
		jQuery(document).ready(function($) {
			    $('a[href^="http"]:not([href*="//' + location.host + '"])').on('click', function(e) {
				            _gaq.push(['_trackEvent', 'Outbound', 'Click', this.href.match(/\/\/([^\/]+)/)[1]]);
					        });
		});

		///////////////////
		// _trackPageView: not provided

		///////////////////
		// _trackRealBounce: not provided
