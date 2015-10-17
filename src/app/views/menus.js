KISSY.add("app/views/menus", function (S, View) {
    return View.extend({
        render: function () {
            this.setHTML(this.id, this.tmpl);
            var pn = this.location.path;
            var link = S.one("#" + this.id).one('a[href="#!' + pn + '"]');
            if (link) {
                link.addClass('hover');
                var topNav = link.parent('.topnav-list');
                var ul = topNav.one('ul');
                if (ul) {
                    ul.removeClass('none');
                    var arrow = topNav.one('i');
                    if (arrow) {
                        arrow.html('&#405')
                    }
                }
            }
        },
        'toggleSubMenus<click>': function (e) {
            // 获取被点击的标签 A
            var target = S.one('#' + e.targetId);

            if (target[0].tagName == "I") {
                target = target.parent();
            }
            // 改变 A 的兄弟节点 ul 和 A 的子节点 arrow 的状态
            var ul = target.next("ul");
            var arrow = target.one("i");

            if (ul.hasClass("none")) {
                ul.removeClass("none");
                arrow.html("&#405");
            } else {
                ul.addClass("none");
                arrow.html("&#402");
            }
        }
    });
}, {
    requires: ['magix/view']
});