/***********************************************************************
  https://github.com/iiii7/cartapp
  -------------------------------- (Copyright 2022) ---------------------------------
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE
    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
    SUCH DAMAGE.
 ***********************************************************************/
var l = {
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

function d(c) {
    if (c === void 0) {
        c = 0;
    }
    var p = document.getElementById("lists");
    p.innerHTML = "";
    chrome.storage.sync.get([ "app_storage" ], function(e) {
        if (e.app_storage) l.app_storage = JSON.parse(e.app_storage);
        l.app_storage.lists.forEach(function(t, i) {
            c = 0;
            var e = document.createElement("p");
            e.innerText = i + ". " + t.name;
            var n = document.createElement("a");
            n.className = "btn";
            n.innerText = "Edit List";
            n.href = "#";
            n.onclick = function() {
                var e = prompt("List name", t.name);
                if (e == null) return;
                l.app_storage.lists[i].name = e;
                chrome.storage.sync.set({
                    app_storage: JSON.stringify(l.app_storage)
                }, d);
            };
            e.appendChild(n);
            var a = document.createElement("a");
            a.className = "btn";
            a.innerText = "Remove List";
            a.href = "#";
            a.onclick = function() {
                l.app_storage.lists = g(l.app_storage.lists, i);
                console.log(l.app_storage);
                chrome.storage.sync.set({
                    app_storage: JSON.stringify(l.app_storage)
                }, d);
            };
            e.appendChild(a);
            p.appendChild(e);
            t.list_items.forEach(function(e, t) {
                c += parseFloat(e.price.substr(1));
                var n = document.createElement("div");
                var a = document.createElement("img");
                a.src = e.img;
                a.width = 32;
                a.style.verticalAlign = "middle";
                n.appendChild(a);
                var r = document.createElement("a");
                r.innerText = t + ". " + e.name + " " + e.price;
                r.href = "#";
                r.onclick = function() {
                    chrome.windows.create({
                        url: e.url,
                        incognito: true,
                        type: "normal",
                        focused: true
                    });
                };
                n.appendChild(r);
                var o = document.createElement("a");
                o.className = "btn";
                o.innerText = "x";
                o.href = "#";
                o.onclick = function() {
                    l.app_storage.lists[i].list_items = g(l.app_storage.lists[i].list_items, t);
                    chrome.storage.sync.set({
                        app_storage: JSON.stringify(l.app_storage)
                    }, function() {
                        d();
                    });
                };
                n.appendChild(o);
                p.appendChild(n);
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
                        l.app_storage.lists[i].list_items.push(e.fromcontent);
                        chrome.storage.sync.set({
                            app_storage: JSON.stringify(l.app_storage)
                        }, d);
                    });
                });
            };
            p.appendChild(r);
            var o = document.createElement("button");
            o.innerText = "Add all items to cart";
            o.onclick = function() {
                l.app_storage.state = "adding";
                l.app_storage.adding_list_id = i;
                l.app_storage.adding_item_index = 0;
                var t = l.app_storage.lists[l.app_storage.adding_list_id].list_items[l.app_storage.adding_item_index].url;
                console.log(1);
                chrome.storage.sync.set({
                    app_storage: JSON.stringify(l.app_storage)
                }, function() {
                    chrome.tabs.query({
                        active: true,
                        currentWindow: true
                    }, function(e) {
                        console.log(2, t);
                        chrome.tabs.sendMessage(e[0].id, {
                            theUrl: t,
                            tabId: e[0].id,
                            cmd: "gotoUrl"
                        }, function(e) {});
                    });
                });
            };
            p.appendChild(o);
            var s = document.createElement("span");
            s.innerText = t.list_items.length + " items. total: " + c.toPrecision(2);
            p.appendChild(s);
        });
    });
}

function e() {
    chrome.storage.sync.get([ "app_storage" ], function(e) {
        if (e.app_storage) l.app_storage = JSON.parse(e.app_storage);
        var t = prompt("List name", "List");
        if (t == null) return;
        l.app_storage.lists.push({
            name: t,
            list_items: []
        });
        chrome.storage.sync.set({
            app_storage: JSON.stringify(l.app_storage)
        }, d);
    });
}

document.getElementById("createList").onclick = function() {
    e();
};

document.getElementById("reloadData").onclick = function() {
    d();
};

document.getElementById("export").onclick = function() {
    chrome.storage.sync.get([ "app_storage" ], function(e) {
        if (e.app_storage) alert(e.app_storage);
    });
};

document.getElementById("import").onclick = function() {
    var e = JSON.parse(prompt("Enter data"));
    chrome.storage.sync.set({
        app_storage: JSON.stringify(e)
    }, d);
};

d();

function g(e, n) {
    var a = [];
    e.forEach(function(e, t) {
        if (t != n) a.push(e);
    });
    return a;
}
