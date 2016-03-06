(function () {
    var expand = function (urlattr) {
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

    var abbrev = function (url) {
        var result = url.replace(/^http(s?)\:\/\//, '');
        if (result.length > 32) {
            result = result.substring(0, 32) + "…";
        }
        return result;
    };

    var tco = function () {
        expand('data-full-url');
        expand('data-expanded-url');
    };

    setInterval(tco, 2000);
    
    // scroll top on header click
    var home = document.getElementById('global-nav-home');
    home.addEventListener('click', () => {
        if (home.classList.contains('active')) {
            document.body.scrollTop = 0;
        }
    });
    var notifications = document.querySelector('li.notifications');
    notifications.addEventListener('click', (evt) => {
        if (notifications.classList.contains('active')) {
            document.body.scrollTop = 0;
        }
    });
    
    // click the new tweets bar (only if scrolled to top)
    // the bar is positioned out of viewport, see styles.css
    var clickNewTweets = function () {
        var bar = document.querySelector('.new-tweets-bar');
        if (bar && document.body.scrollTop < 1) {   // a bit of fudge here, scroll is often something like .9px
            var click = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': true
            });
            bar.dispatchEvent(click);
        }
    }

    setInterval(clickNewTweets, 4000);
    
    // remove side columns
    // already hidden, see styles.css
    // this is an optimization to reduce size of DOM
    
    var parent = document.getElementById('page-container');
    var children = document.querySelectorAll('.dashboard');

    for (var i = 0; i < children.length; i++) {
        parent.removeChild(children[i]);
    }
})();