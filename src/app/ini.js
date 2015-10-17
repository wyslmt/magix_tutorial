KISSY.add('app/ini', function (S) {
    return {
        defaultView: 'app/views/default',
        defaultPath: '/home',
        routes: function (path) {
            return path.indexOf('app/') === 0 ? path : this.defaultView;
        }
    };
});
