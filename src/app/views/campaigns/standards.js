﻿KISSY.add("app/views/campaigns/standards", function (S, View, Manager, Mustache, Router) {
    return View.extend({
        init: function () {
            this.observeLocation({
                params: 'sortby,sortkey'
            });
        },
        render: function () {
            var me = this;
            Manager.createRequest(me).fetchAll('Campaigns_List', function (e, m)
            {
                if (e) {
                    me.setHTML(me.id, e.msg);
                } else {
                    var list = m.get('list', []);
                    var loc = me.location;
                    var sortby = loc.get('sortby');
                    var sortkey = loc.get('sortkey');
                    if (sortby && sortkey) { //地址栏中存在sortby和sortkey
                        list.sort(function (a, b) { //直接调用数据的sort方法进行排序
                            var aValue = a[sortkey];
                            var bValue = b[sortkey];
                            aValue = parseInt(aValue.substring(0, aValue.length - 1), 10); //因示例中折扣是类似90%这样的字符串，因此去掉%号并转成整数
                            bValue = parseInt(bValue.substring(0, bValue.length - 1), 10);
                            if (sortby == 'asc') { //根据排序要求，进行相应的升序降序排序
                                return aValue - bValue;
                            } else {
                                return bValue - aValue;
                            }
                        });
                    }
                    var html = Mustache.to_html(me.tmpl, {
                        list: list,
                        sortDesc: sortby == 'desc'
                    });
                    me.setHTML(me.id, html);
                }
            });
        },
        'sort<click>':function(e){
            var loc = this.location;
            var sortby = loc.get('sortby');
            if (sortby == 'desc') {
                sortby = 'asc';
            } else {
                sortby = 'desc';
            }
            var sortkey = e.params.key;
            Router.navigate({
                sortkey: sortkey,
                sortby: sortby
            });
        }
    });
}, {
    requires: ["magix/view", "app/models/manager", "app/common/mustache", 'magix/router']
});