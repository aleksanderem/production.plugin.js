/**
 *  Handle getting cookie from document.cookie
 *  without any 3rd party plugin, in case
 *  there is no such thing, or this script is executing before one.
 */

if (typeof String.prototype.trimLeft !== "function") {
    String.prototype.trimLeft = function() {
        return this.replace(/^\s+/, "");
    };
}
if (typeof String.prototype.trimRight !== "function") {
    String.prototype.trimRight = function() {
        return this.replace(/\s+$/, "");
    };
}
if (typeof Array.prototype.map !== "function") {
    Array.prototype.map = function(callback, thisArg) {
        for (var i=0, n=this.length, a=[]; i<n; i++) {
            if (i in this) a[i] = callback.call(thisArg, this[i]);
        }
        return a;
    };
}
function getCookies() {
    var c = document.cookie, v = 0, cookies = {};
    if (document.cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/)) {
        c = RegExp.$1;
        v = 1;
    }
    if (v === 0) {
        c.split(/[,;]/).map(function(cookie) {
            var parts = cookie.split(/=/, 2),
                name = decodeURIComponent(parts[0].trimLeft()),
                value = parts.length > 1 ? decodeURIComponent(parts[1].trimRight()) : null;
            cookies[name] = value;
        });
    } else {
        c.match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function($0, $1) {
            var name = $0,
                value = $1.charAt(0) === '"'
                          ? $1.substr(1, -1).replace(/\\(.)/g, "$1")
                          : $1;
            cookies[name] = value;
        });
    }
    return cookies;
}
function getCookie(name) {
    return getCookies()[name];
}

/**
 *  Overwrite all major console functions
 *  @param isDebug {Boolean}
 *  @description for isDebug 
 *  in default is set to false, so no console at all. 
 *  if you need to debug, please add for dev environment debugJS : true cookie
 *  @param isSaveLog {Boolean}
 *  @description isSaveLog
 *  in default is set to true. If you don't need to save all console operations, and still not to
 *  show them in the console, set to false. Then you will receive an array with all console info
 *  by executing console.logArray();
 */

window.console = (function (origConsole) {

    if (!window.console || !origConsole) {
        origConsole = {};
    }

    var isDebug = getCookie('debugJS') == true || getCookie('debugJS') == 'true' ? true : false, isSaveLog = true,
        logArray = {
            logs: [],
            errors: [],
            warns: [],
            infos: []
        };

    return {
        log: function () {
            this.addLog(arguments, "logs");
            isDebug && origConsole.log && origConsole.log.apply(origConsole, arguments);
        },
        warn: function () {
            this.addLog(arguments, "errors");
            isDebug && origConsole.warn && origConsole.warn.apply(origConsole, arguments);
        },
        error: function () {
            this.addLog(arguments, "warns");
            isDebug && origConsole.error && origConsole.error.apply(origConsole, arguments);
        },
        info: function (v) {
            this.addLog(arguments, "infos");
            isDebug && origConsole.info && origConsole.info.apply(origConsole, arguments);
        },
        debug: function (bool) {
            isDebug = bool;
        },
        saveLog: function (bool) {
            isSaveLog = bool;
        },
        addLog: function (arguments, array) {
            if (!isSaveLog) {
                return;
            }
            logArray[array || "logs"].push(arguments);
        },
        logArray: function () {
            return logArray;
        }
    };

}(window.console));