/**
 * Created by brave on 17/3/28.
 */

require('./index.css');
var loadingGif = require('./loading.gif');

avalon.component('ms-loading', {
    defaults: {
        tid: 'loading-' + parseInt(Math.random() * 100000),
        show: false,
        loadingGif: loadingGif,
        close: function () {
            this.show = false;
        },
        open: function () {
            this.show = true;
            document.getElementById(this.tid).style.height = window.screen.height + 'px';
        },
        onReady: function () {
            window.loading = this;
        }

    },
    template: require('./index.html')
});

