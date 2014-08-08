/*!
Cloud4all Preferences Management Tools

Copyright 2013 Astea

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/GPII/prefsEditors/LICENSE.txt
*/

(function ($, fluid) {
    fluid.defaults("gpii.prefsEditor", {
        gradeNames: ["fluid.prefs.GPIIEditor", "autoInit"],
        prefsEditor: {
            gradeNames: ["fluid.prefs.msgLookup"],
            components: {
                socket: {
                    type: "gpii.pcp.socket"
                }
            },
            socketConnection: {
                "domain": "http://localhost",
                "port": "8081",
                "route": "update",
                "urlTemplate": "%domain:%port/%route"
            },
            members: {
                messageResolver: "{prefsEditorLoader}.msgResolver",
                socketURL: {
                    expander: {
                        funcName: "fluid.stringTemplate",
                        args: ["{that}.options.socketConnection.urlTemplate", "{that}.options.socketConnection"]
                    }
                }
            },
            events: {
                onLogout: null,
                onAdjusterChange: null
            },
            model: {
                userLoggedIn: false
            },
            listeners: {
                "onAdjusterChange.update": {
                    "listener": "{socket}.applySettings"
                },
                "onReady.setFullEditorLink": {
                    "this": "{that}.dom.fullEditorLink",
                    "method": "attr",
                    "args": ["href", "{prefsEditorLoader}.options.pmtUrl"]
                },
                "onReset.triggerLogoutEvent": {
                    "listener": "{that}.events.onLogout.fire"
                },
                "onLogout.setUserLoggedIn": {
                    listener: "{that}.applier.requestChange",
                    args: ["userLoggedIn", false]
                },
                "onLogout.gpiiLogout": {
                    listener: "{gpiiSession}.logout"
                },
                "onReady.logoutLinkPreventDefault": {
                    "this": "{that}.dom.logoutLink",
                    "method": "click",
                    "args": ["{that}.preventDefaultLinkEvent"]
                },
                "onReady.setLogoutLinkText": {
                    "this": "{that}.dom.logoutLink",
                    "method": "text",
                    "args": ["{that}.msgLookup.logoutText"]
                },
                "onReady.bindLogout": {
                    "this": "{that}.dom.logoutLink",
                    "method": "click",
                    "args": ["{that}.events.onLogout.fire"]
                },
                "onReady.setFullEditorLinkText": {
                    "this": "{that}.dom.fullEditorLink",
                    "method": "text",
                    "args": ["{that}.msgLookup.fullEditorText"]
                },
                "onReady.bindModelChangedListener": {
                    // used instead of the declarative syntax so that
                    // model won't "count" as updated when fetching from
                    // the server. Thus, onSettingChanged is not fired on load.
                    "listener": "{that}.applier.modelChanged.addListener",
                    "args": ["", "{that}.events.onSettingChanged.fire"]
                }
            },
            invokers: {
                preventDefaultLinkEvent: {
                    "funcName": "gpii.eventUtility.preventDefaultEvent"
                }
            },
            selectors: {
                fullEditorLink: ".gpiic-prefsEditor-fullEditorLink",
                logoutLink: ".gpiic-prefsEditor-userLogoutLink"
            }
        }
    });
})(jQuery, fluid);
