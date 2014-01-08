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
        gradeNames: ["gpii.prefs.pmt_pilot_2", "autoInit"],
        loggedInFlag: false,
        prefsEditor: {
            gradeNames: ["fluid.prefs.stringBundle"],
            members: {
                messageResolver: "{prefsEditorLoader}.msgBundle"
            },
            listeners: {
                "onCreate.addListener": {
                    "listener": "{that}.applier.modelChanged.addListener",
                    "args": ["gpii_primarySchema_speakText", "{that}.foldExpandedViewWhenOff"]
                },
                // "onReady.setSaveAndApplyText": {
                //     "this": "{that}.dom.saveAndApply",
                //     "method": "prop",
                //     "args": ["value", "{that}.stringBundle.saveAndApply"]
                // },
                // "onReady.setResetAndApplyText": {
                //     "this": "{that}.dom.resetAndApply",
                //     "method": "prop",
                //     "args": ["value", "{that}.stringBundle.resetAndApply"]
                // },
                // "onReady.setCancelText": {
                //     "this": "{that}.dom.cancel",
                //     "method": "prop",
                //     "args": ["value", "{that}.stringBundle.cancel"]
                // },
                "onReady.onApplySettings": {
                    "this": "{that}.dom.saveAndApply",
                    "method": "click",
                    "args": ["{that}.applySettings"]
                }
            },
            invokers: {
                foldExpandedViewWhenOff: {
                    "funcName": "gpii.foldExpandedViewWhenOff",
                    "args": ["{that}.applier",
                             "{that}.model.gpii_primarySchema_visualAlternativesMoreLess",
                             "gpii_primarySchema_visualAlternativesMoreLess"
                        ],
                    "dynamic": true
                },
                applySettings: {
                    "funcName": "gpii.applySettings",
                    "args": ["{that}", "{that}.options.loggedInFlag"],
                    "dynamic": true
                }
            },
            selectors: {
                saveAndApply: ".flc-prefsEditor-save"
                // resetAndApply: ".flc-prefsEditor-reset",
                // cancel: ".flc-prefsEditor-cancel"
            },
            selectorsToIgnore: ["saveAndApply"]
        },
        // finalInitFunction: "bababa"
    });

    // bababa = function (that) {
    //     hookBash = that;
    // };

    gpii.foldExpandedViewWhenOff = function (applier, extraVisible, valueToChange) {
        if (extraVisible) {
            applier.requestChange(valueToChange, false);
        }
    };

    gpii.applySettings = function (that, loggedIn) {
        var common_model_part = "gpii_primarySchema_";
        var size_common = common_model_part.length;

        var keys_in_model = $.grep(Object.keys(that.model), function (el) {return el.substring(0, size_common) === common_model_part;});
        var keys_for_post = $.map(keys_in_model, function (el) {return "http://registry.gpii.org/common/" + el.substring(size_common, el.length);});
        var saved_settings = {};

        for (var i = 0; i < keys_for_post.length; i++) {
            saved_settings[keys_for_post[i]] = [{value: that.model[keys_in_model[i]]}];
        }

        if (!loggedIn) {
            var port = 8081;
            // var post_url = "http://localhost:" + port + "/update";
            var post_url = "http://localhost:8081/user/screenreader_common/login";
            $.ajax({
                type: "GET",
                url: post_url,
                data: saved_settings,
                success: function () {
                    alert("Successfully sent to the Flow Manager.");
                }
            });

            that.options.loggedInFlag = true;
        }
        else {
            var host = "ws://localhost:8081";
            // var host = "ws://echo.websocket.org/";
            var socket = new WebSocket(host);

            if (socket.readyState == 1) {
                alert("nikoga")
                socket.send(saved_settings);
            }
            else {
                // socket.send(saved_settings);
                // alert("sled malko onopen")
                socket.onopen = function (e) {
                    alert("vliza se v onopen")
                    socket.send(JSON.stringify(saved_settings));
                }
                socket.onmessage = function (evt) {
                    alert("polucheno e syobshtenie")
                    alert("RESPONSE:" + JSON.stringify(evt.data));
                    socket.close();
                }
                socket.onclose = function (e) {
                    alert(JSON.stringify(e));
                    alert("Disconnected")
                }
            }
        }
    };

})(jQuery, fluid);
