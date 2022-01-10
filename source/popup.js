var g = {
    app_storage: {
        lists: [],
        state: "",
        adding_item_index: 0,
        adding_list_id: 0
    }
};

document.getElementById("clearData").onclick = function() {
    chrome.storage.sync.clear();
};

document.getElementById("clearCart").onclick = function() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(e) {
        chrome.tabs.sendMessage(e[0].id, {
            url: location.href,
            tabId: e[0].id,
            cmd: "clearCart"
        }, function(e) {});
    });
};

function u(l) {
    if (l === void 0) {
        l = 0;
    }
    var m = document.getElementById("lists");
    m.innerHTML = "";
    chrome.storage.sync.get([ "app_storage" ], function(e) {
        if (e.app_storage) g.app_storage = JSON.parse(e.app_storage);
        g.app_storage.lists.forEach(function(t, d) {
            l = 0;
            var e = document.createElement("div");
            e.innerText = d + ". " + t.name;
            e.className = "list_name_itm";
            var a = document.createElement("a");
            a.className = "btn";
            a.innerText = "Edit";
            a.href = "#";
            a.onclick = function() {
                var e = prompt("List name", t.name);
                if (e == null) return;
                g.app_storage.lists[d].name = e;
                chrome.storage.sync.set({
                    app_storage: JSON.stringify(g.app_storage)
                }, u);
            };
            e.appendChild(a);
            var n = document.createElement("a");
            n.className = "btn";
            n.innerText = "x";
            n.href = "#";
            n.onclick = function() {
                g.app_storage.lists = _(g.app_storage.lists, d);
                chrome.storage.sync.set({
                    app_storage: JSON.stringify(g.app_storage)
                }, u);
            };
            e.appendChild(n);
            m.appendChild(e);
            t.list_items.forEach(function(e, t) {
                l += parseFloat(e.price.substr(1));
                var a = document.createElement("tr");
                var n = document.createElement("img");
                n.src = e.img;
                n.width = 32;
                var r = document.createElement("td");
                r.appendChild(n);
                a.appendChild(r);
                var i = document.createElement("td");
                var o = document.createElement("span");
                o.innerText = t + 1 + ". ";
                i.appendChild(o);
                var s = document.createElement("a");
                s.innerText = e.name;
                s.href = "#";
                s.onclick = function() {
                    chrome.windows.create({
                        url: e.url,
                        incognito: true,
                        type: "normal",
                        focused: true
                    });
                };
                i.appendChild(s);
                var c = document.createElement("span");
                c.innerHTML = "<br />" + e.price;
                i.appendChild(c);
                var p = document.createElement("a");
                p.className = "btn";
                p.innerText = "x";
                p.href = "#";
                p.onclick = function() {
                    g.app_storage.lists[d].list_items = _(g.app_storage.lists[d].list_items, t);
                    chrome.storage.sync.set({
                        app_storage: JSON.stringify(g.app_storage)
                    }, function() {
                        u();
                    });
                };
                i.appendChild(p);
                a.appendChild(i);
                m.appendChild(a);
            });
            var r = document.createElement("button");
            r.innerText = "Add to " + t.name;
            r.onclick = function() {
                chrome.tabs.query({
                    active: true,
                    currentWindow: true
                }, function(e) {
                    chrome.tabs.sendMessage(e[0].id, {
                        url: location.href,
                        tabId: e[0].id,
                        cmd: "getPageInfo"
                    }, function(e) {
                        g.app_storage.lists[d].list_items.push(e.fromcontent);
                        chrome.storage.sync.set({
                            app_storage: JSON.stringify(g.app_storage)
                        }, u);
                    });
                });
            };
            m.appendChild(r);
            var i = document.createElement("button");
            i.innerText = "Add all items to cart";
            i.onclick = function() {
                g.app_storage.state = "adding";
                g.app_storage.adding_list_id = d;
                g.app_storage.adding_item_index = 0;
                var t = g.app_storage.lists[g.app_storage.adding_list_id].list_items[g.app_storage.adding_item_index].url;
                chrome.storage.sync.set({
                    app_storage: JSON.stringify(g.app_storage)
                }, function() {
                    chrome.tabs.query({
                        active: true,
                        currentWindow: true
                    }, function(e) {
                        chrome.tabs.sendMessage(e[0].id, {
                            theUrl: t,
                            tabId: e[0].id,
                            cmd: "gotoUrl"
                        }, function(e) {});
                    });
                });
            };
            m.appendChild(i);
            var o = document.createElement("span");
            o.innerText = t.list_items.length + " items. total: " + l.toFixed(2);
            m.appendChild(o);
        });
    });
}

function e() {
    chrome.storage.sync.get([ "app_storage" ], function(e) {
        if (e.app_storage) g.app_storage = JSON.parse(e.app_storage);
        var t = prompt("Cart name", "Cart");
        if (t == null) return;
        g.app_storage.lists.push({
            name: t,
            list_items: []
        });
        chrome.storage.sync.set({
            app_storage: JSON.stringify(g.app_storage)
        }, u);
    });
}

document.getElementById("createList").onclick = function() {
    e();
};

document.getElementById("export").onclick = function() {
    chrome.storage.sync.get([ "app_storage" ], function(e) {
        if (e.app_storage) {
            var t = JSON.stringify(JSON.parse(e.app_storage), null, 4);
            setTimeout(function() {
                navigator.clipboard.writeText(t);
            }, 300);
        }
        setTimeout(function() {
            alert("Copied to clipboard");
        }, 400);
    });
};

document.getElementById("import").onclick = function() {
    var e = JSON.parse(prompt("Enter data"));
    chrome.storage.sync.set({
        app_storage: JSON.stringify(e)
    }, u);
};

u();

function _(e, a) {
    var n = [];
    e.forEach(function(e, t) {
        if (t != a) n.push(e);
    });
    return n;
}
