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
var d = {
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

function l(c) {
    if (c === void 0) {
        c = 0;
    }
    var p = document.getElementById("lists");
    p.innerHTML = "";
    chrome.storage.sync.get([ "app_storage" ], function(e) {
        if (e.app_storage) d.app_storage = JSON.parse(e.app_storage);
        d.app_storage.lists.forEach(function(t, o) {
            c = 0;
            var e = document.createElement("p");
            e.innerText = o + ". " + t.name;
            var a = document.createElement("a");
            a.className = "btn";
            a.innerText = "Edit List";
            a.href = "#";
            a.onclick = function() {
                var e = prompt("List name", t.name);
                if (e == null) return;
                d.app_storage.lists[o].name = e;
                chrome.storage.sync.set({
                    app_storage: JSON.stringify(d.app_storage)
                }, l);
            };
            e.appendChild(a);
            var n = document.createElement("a");
            n.className = "btn";
            n.innerText = "Remove List";
            n.href = "#";
            n.onclick = function() {
                d.app_storage.lists = m(d.app_storage.lists, o);
                chrome.storage.sync.set({
                    app_storage: JSON.stringify(d.app_storage)
                }, l);
            };
            e.appendChild(n);
            p.appendChild(e);
            t.list_items.forEach(function(e, t) {
                c += parseFloat(e.price.substr(1));
                var a = document.createElement("div");
                var n = document.createElement("img");
                n.src = e.img;
                n.height = 32;
                n.style.verticalAlign = "middle";
                a.appendChild(n);
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
                a.appendChild(r);
                var i = document.createElement("a");
                i.className = "btn";
                i.innerText = "x";
                i.href = "#";
                i.onclick = function() {
                    d.app_storage.lists[o].list_items = m(d.app_storage.lists[o].list_items, t);
                    chrome.storage.sync.set({
                        app_storage: JSON.stringify(d.app_storage)
                    }, function() {
                        l();
                    });
                };
                a.appendChild(i);
                p.appendChild(a);
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
                        d.app_storage.lists[o].list_items.push(e.fromcontent);
                        chrome.storage.sync.set({
                            app_storage: JSON.stringify(d.app_storage)
                        }, l);
                    });
                });
            };
            p.appendChild(r);
            var i = document.createElement("button");
            i.innerText = "Add all items to cart";
            i.onclick = function() {
                d.app_storage.state = "adding";
                d.app_storage.adding_list_id = o;
                d.app_storage.adding_item_index = 0;
                var t = d.app_storage.lists[d.app_storage.adding_list_id].list_items[d.app_storage.adding_item_index].url;
                chrome.storage.sync.set({
                    app_storage: JSON.stringify(d.app_storage)
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
            p.appendChild(i);
            var s = document.createElement("span");
            s.innerText = t.list_items.length + " items. total: " + c.toFixed(2);
            p.appendChild(s);
        });
    });
}

function e() {
    chrome.storage.sync.get([ "app_storage" ], function(e) {
        if (e.app_storage) d.app_storage = JSON.parse(e.app_storage);
        var t = prompt("List name", "List");
        if (t == null) return;
        d.app_storage.lists.push({
            name: t,
            list_items: []
        });
        chrome.storage.sync.set({
            app_storage: JSON.stringify(d.app_storage)
        }, l);
    });
}

document.getElementById("createList").onclick = function() {
    e();
};

document.getElementById("reloadData").onclick = function() {
    l();
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
    }, l);
};

l();

function m(e, a) {
    var n = [];
    e.forEach(function(e, t) {
        if (t != a) n.push(e);
    });
    return n;
}
