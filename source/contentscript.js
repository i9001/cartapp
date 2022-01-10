chrome.runtime.onMessage.addListener(function(e, t, n) {
    if (e.cmd == "getPageInfo") {
        n({
            fromcontent: {
                url: location.toString(),
                name: document.getElementById("productTitle") ? document.getElementById("productTitle").innerText : "",
                price: document.getElementById("priceblock_ourprice") ? document.getElementById("priceblock_ourprice").innerText : "",
                img: document.getElementById("landingImage") ? document.getElementById("landingImage").src : ""
            }
        });
    }
    if (e.cmd == "gotoUrl") {
        n("ok");
        if (location.href == e.theUrl) location.reload(); else location.assign(e.theUrl);
    }
    if (e.cmd == "clearCart") {
        n("ok");
        i();
    }
    if (e.cmd == "export") {
        navigator.clipboard.writeText(e.data);
        n("ok");
    }
});

function i() {
    var e = document.querySelectorAll("input");
    e.forEach(function(e) {
        if (e.getAttribute("data-action") == "delete") {
            e.click();
        }
    });
    setTimeout(i, 1400);
}

function o() {
    chrome.storage.sync.get([ "app_storage" ], function(e) {
        if (e.app_storage == undefined) return;
        var n = JSON.parse(e.app_storage);
        if (n.state == "adding") {
            setTimeout(function() {
                var e = document.getElementsByClassName("a-button-input")[0];
                e.click();
                n.adding_item_index++;
                chrome.storage.sync.set({
                    app_storage: JSON.stringify(n)
                });
                if (n.adding_item_index + 1 > n.lists[n.adding_list_id].list_items.length) {
                    n.adding_item_index = 0;
                    n.adding_list_id = 0;
                    n.state = "";
                    chrome.storage.sync.set({
                        app_storage: JSON.stringify(n)
                    });
                } else {
                    var t = n.lists[n.adding_list_id].list_items[n.adding_item_index].url;
                    setTimeout(function() {
                        if (location.href == t) o(); else location.assign(t);
                    }, 1400);
                }
            }, 1400);
        }
    });
}

o();

var e = document.querySelectorAll('[data-a-strike="true"]');

if (e.length > 0) {
    var a = document.createElement("div");
    a.innerText = "Sales found: ";
    a.style.background = "white";
    a.style.position = "fixed";
    a.style.zIndex = "400";
    e.forEach(function(e) {
        var t = e;
        var n = e.parentElement.getElementsByClassName("a-offscreen")[0];
        var i = e.getElementsByClassName("a-offscreen")[0];
        var o = document.createElement("a");
        o.innerText = i.innerText + " > " + n.innerText;
        o.style.border = "1px solid orange";
        o.style.display = "inline-block";
        o.style.verticalAlign = "middle";
        o.style.margin = "3px";
        o.style.padding = "1px";
        o.onclick = function() {
            t.scrollIntoView({
                block: "center",
                inline: "center"
            });
            t.style.background = "lightblue";
            t.style.fontSize = "x-large";
        };
        a.appendChild(o);
    });
    document.body.prepend(a);
}
