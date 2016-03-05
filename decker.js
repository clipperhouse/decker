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
    
    // remove side columns
    // already hidden, see styles.css
    // this is an optimization to reduce size of DOM
    
    var parent = document.getElementById('page-container');
    var children = document.querySelectorAll('.dashboard');

    for (var i = 0; i < children.length; i++) {
        parent.removeChild(children[i]);
    }
})();