/***********************************************************************
  https://github.com/i9001
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
});

function i() {
    var e = document.querySelectorAll("input");
    e.forEach(function(e) {
        if (e.getAttribute("data-action") == "delete") {
            e.click();
        }
    });
    setTimeout(i, 800);
}

function o() {
    chrome.storage.sync.get([ "app_storage" ], function(e) {
        if (e.app_storage == undefined) return;
        var n = JSON.parse(e.app_storage);
        if (n.state == "adding") {
            setTimeout(function() {
                console.log(n);
                var e = document.getElementsByClassName("a-button-input")[0];
                e.click();
                n.adding_item_index++;
                chrome.storage.sync.set({
                    app_storage: JSON.stringify(n)
                });
                console.log(n.adding_item_index + 1, n.lists[n.adding_list_id].list_items.length);
                if (n.adding_item_index + 1 > n.lists[n.adding_list_id].list_items.length) {
                    n.adding_item_index = 0;
                    n.adding_list_id = 0;
                    n.state = "";
                    console.log("adding over", n);
                    chrome.storage.sync.set({
                        app_storage: JSON.stringify(n)
                    });
                } else {
                    var t = n.lists[n.adding_list_id].list_items[n.adding_item_index].url;
                    setTimeout(function() {
                        if (location.href == t) o(); else location.assign(t);
                    }, 800);
                }
            }, 800);
        }
    });
}

o();

var e = document.querySelectorAll('[data-a-strike="true"]');

if (e.length > 0) {
    var a = document.createElement("div");
    a.innerText = "Sales found: ";
    a.style.background = "white";
    a.style.position = "static";
    e.forEach(function(e) {
        var t = e;
        var n = document.createElement("a");
        n.innerText = t.innerText;
        n.onclick = function() {
            t.scrollIntoView({
                block: "center",
                inline: "center"
            });
            t.style.background = "lightblue";
            t.style.fontSize = "x-large";
        };
        a.appendChild(n);
    });
    document.body.prepend(a);
}
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
});

function i() {
    var e = document.querySelectorAll("input");
    e.forEach(function(e) {
        if (e.getAttribute("data-action") == "delete") {
            e.click();
        }
    });
    setTimeout(i, 800);
}

function o() {
    chrome.storage.sync.get([ "app_storage" ], function(e) {
        if (e.app_storage == undefined) return;
        var n = JSON.parse(e.app_storage);
        if (n.state == "adding") {
            setTimeout(function() {
                console.log(n);
                var e = document.getElementsByClassName("a-button-input")[0];
                e.click();
                n.adding_item_index++;
                chrome.storage.sync.set({
                    app_storage: JSON.stringify(n)
                });
                console.log(n.adding_item_index + 1, n.lists[n.adding_list_id].list_items.length);
                if (n.adding_item_index + 1 > n.lists[n.adding_list_id].list_items.length) {
                    n.adding_item_index = 0;
                    n.adding_list_id = 0;
                    n.state = "";
                    console.log("adding over", n);
                    chrome.storage.sync.set({
                        app_storage: JSON.stringify(n)
                    });
                } else {
                    var t = n.lists[n.adding_list_id].list_items[n.adding_item_index].url;
                    setTimeout(function() {
                        if (location.href == t) o(); else location.assign(t);
                    }, 800);
                }
            }, 800);
        }
    });
}

o();

var e = document.querySelectorAll('[data-a-strike="true"]');

if (e.length > 0) {
    var l = document.createElement("div");
    l.innerText = "Sales found: ";
    l.style.background = "white";
    l.style.position = "fixed";
    l.style.zIndex = "400";
    e.forEach(function(e) {
        var t = e;
        var n = document.createElement("a");
        n.innerText = t.innerText;
        n.style.border = "1px solid orange";
        n.style.display = "inline-block";
        n.style.verticalAlign = "middle";
        n.style.margin = "3px";
        n.style.padding = "1px";
        n.onclick = function() {
            t.scrollIntoView({
                block: "center",
                inline: "center"
            });
            t.style.background = "lightblue";
            t.style.fontSize = "x-large";
        };
        l.appendChild(n);
    });
    document.body.prepend(l);
}
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
});

function i() {
    var e = document.querySelectorAll("input");
    e.forEach(function(e) {
        if (e.getAttribute("data-action") == "delete") {
            e.click();
        }
    });
    setTimeout(i, 800);
}

function o() {
    chrome.storage.sync.get([ "app_storage" ], function(e) {
        if (e.app_storage == undefined) return;
        var n = JSON.parse(e.app_storage);
        if (n.state == "adding") {
            setTimeout(function() {
                console.log(n);
                var e = document.getElementsByClassName("a-button-input")[0];
                e.click();
                n.adding_item_index++;
                chrome.storage.sync.set({
                    app_storage: JSON.stringify(n)
                });
                console.log(n.adding_item_index + 1, n.lists[n.adding_list_id].list_items.length);
                if (n.adding_item_index + 1 > n.lists[n.adding_list_id].list_items.length) {
                    n.adding_item_index = 0;
                    n.adding_list_id = 0;
                    n.state = "";
                    console.log("adding over", n);
                    chrome.storage.sync.set({
                        app_storage: JSON.stringify(n)
                    });
                } else {
                    var t = n.lists[n.adding_list_id].list_items[n.adding_item_index].url;
                    setTimeout(function() {
                        if (location.href == t) o(); else location.assign(t);
                    }, 800);
                }
            }, 800);
        }
    });
}

o();

var e = document.querySelectorAll('[data-a-strike="true"]');

if (e.length > 0) {
    var l = document.createElement("div");
    l.innerText = "Sales found: ";
    l.style.background = "white";
    l.style.position = "fixed";
    l.style.zIndex = "400";
    e.forEach(function(e) {
        var t = e;
        var n = document.createElement("a");
        n.innerText = t.innerText;
        n.style.border = "1px solid orange";
        n.style.display = "inline-block";
        n.style.verticalAlign = "middle";
        n.style.margin = "3px";
        n.style.padding = "1px";
        n.onclick = function() {
            t.scrollIntoView({
                block: "center",
                inline: "center"
            });
            t.style.background = "lightblue";
            t.style.fontSize = "x-large";
        };
        l.appendChild(n);
    });
    document.body.prepend(l);
}
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
});

function i() {
    var e = document.querySelectorAll("input");
    e.forEach(function(e) {
        if (e.getAttribute("data-action") == "delete") {
            e.click();
        }
    });
    setTimeout(i, 800);
}

function o() {
    chrome.storage.sync.get([ "app_storage" ], function(e) {
        if (e.app_storage == undefined) return;
        var n = JSON.parse(e.app_storage);
        if (n.state == "adding") {
            setTimeout(function() {
                console.log(n);
                var e = document.getElementsByClassName("a-button-input")[0];
                e.click();
                n.adding_item_index++;
                chrome.storage.sync.set({
                    app_storage: JSON.stringify(n)
                });
                console.log(n.adding_item_index + 1, n.lists[n.adding_list_id].list_items.length);
                if (n.adding_item_index + 1 > n.lists[n.adding_list_id].list_items.length) {
                    n.adding_item_index = 0;
                    n.adding_list_id = 0;
                    n.state = "";
                    console.log("adding over", n);
                    chrome.storage.sync.set({
                        app_storage: JSON.stringify(n)
                    });
                } else {
                    var t = n.lists[n.adding_list_id].list_items[n.adding_item_index].url;
                    setTimeout(function() {
                        if (location.href == t) o(); else location.assign(t);
                    }, 800);
                }
            }, 800);
        }
    });
}

o();

var e = document.querySelectorAll('[data-a-strike="true"]');

if (e.length > 0) {
    var l = document.createElement("div");
    l.innerText = "Sales found: ";
    l.style.background = "white";
    l.style.position = "fixed";
    l.style.zIndex = "400";
    e.forEach(function(e) {
        var t = e;
        var n = document.createElement("a");
        n.innerText = t.innerText;
        n.style.border = "1px solid orange";
        n.style.display = "inline-block";
        n.style.verticalAlign = "middle";
        n.style.margin = "3px";
        n.style.padding = "1px";
        n.onclick = function() {
            t.scrollIntoView({
                block: "center",
                inline: "center"
            });
            t.style.background = "lightblue";
            t.style.fontSize = "x-large";
        };
        l.appendChild(n);
    });
    document.body.prepend(l);
}
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
});

function i() {
    var e = document.querySelectorAll("input");
    e.forEach(function(e) {
        if (e.getAttribute("data-action") == "delete") {
            e.click();
        }
    });
    setTimeout(i, 800);
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
                    }, 800);
                }
            }, 800);
        }
    });
}

o();

var e = document.querySelectorAll('[data-a-strike="true"]');

if (e.length > 0) {
    var l = document.createElement("div");
    l.innerText = "Sales found: ";
    l.style.background = "white";
    l.style.position = "fixed";
    l.style.zIndex = "400";
    e.forEach(function(e) {
        var t = e;
        var n = document.createElement("a");
        n.innerText = t.innerText;
        n.style.border = "1px solid orange";
        n.style.display = "inline-block";
        n.style.verticalAlign = "middle";
        n.style.margin = "3px";
        n.style.padding = "1px";
        n.onclick = function() {
            t.scrollIntoView({
                block: "center",
                inline: "center"
            });
            t.style.background = "lightblue";
            t.style.fontSize = "x-large";
        };
        l.appendChild(n);
    });
    document.body.prepend(l);
}
