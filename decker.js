(function() {
    var expand = function(urlattr) {
        var els = document.querySelectorAll('a[href*="//t.co"][' + urlattr + ']');

        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            var href = el.getAttribute(urlattr);
            el.setAttribute('href', href);
            el.innerHTML = abbrev(href);
            el.removeAttribute(urlattr);
            el.removeAttribute('title');
        }
    };

    var abbrev = function(url) {
        var result = url.replace(/^http(s?)\:\/\//, '');
        if (result.length > 32) {
            result = result.substring(0, 32) + "…";
        }
        return result;
    };

    var tco = function() {
        expand('data-full-url');
        expand('data-expanded-url');
    };

    setInterval(tco, 2000);

    // scroll top on header click
    var home = document.getElementById('global-nav-home');
    var notifications = document.querySelector('li.notifications');
    var nav = [home, notifications];

    for (var el of nav) {
        (function(el) {
            el.addEventListener('click', () => {
                if (el.classList.contains('active')) {
                    document.body.scrollTop = 0;
                }
            });
        })(el);
    }

    // the bar is positioned out of viewport, see styles.css
    // move it down the DOM, gets rid of jumpy bits and style annoyances
    var bar = document.querySelector('.js-new-items-bar-container');
    if (bar) {
        document.body.appendChild(bar);
    }

    // click for reuse later
    var click = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
    });

    // click the home button if new tweets (only if scrolled to top)
    var displayNewTweets = function() {
        if (document.body.scrollTop >= 1) {
            return;
        }
        
        var d = document.getElementById('global-tweet-dialog');
        if (window.getComputedStyle(d).display !== 'none'){
            // tweet modal is open, loading tweets in background causes trouble
            return;
        }

        for (var el of nav) {
            if (el.classList.contains('active') && el.classList.contains('new')) {
                el.querySelector('a').dispatchEvent(click);
            }
        }
    }

    setInterval(displayNewTweets, 1000);
    
    var removePromoted = function() {
        var promoted = document.querySelectorAll('.promoted-tweet');
        for (var i = 0; i < promoted.length; i++) {
            var li =promoted[i].parentNode; 
            li.parentNode.removeChild(li);
        }
    };

    setInterval(removePromoted, 2000);

    var clearColumns = function() {
        // remove side columns
        // already hidden, see styles.css
        // this is an optimization to reduce size of DOM

        var parent = document.getElementById('page-container');
        var children = document.querySelectorAll('.dashboard');

        for (var i = 0; i < children.length; i++) {
            parent.removeChild(children[i]);
        }
    };

    setTimeout(clearColumns, 10000);
})();