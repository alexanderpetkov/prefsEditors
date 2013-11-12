/*!
Cloud4all Preferences Management Tools

Copyright 2013 CERTH/HIT

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/GPII/prefsEditors/LICENSE.txt
*/

/*global fluid, jQuery, gpii*/
/*jslint white: true, onevar: true, funcinvoke: true, forvar: true, undef: true, newcap: true, nomen: true, regexp: true, plusplus: true, bitwise: true, maxerr: 50, indent: 4 */

(function ($, fluid) {
    
    fluid.defaults("gpii.prefs.panel.followingElement", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        listeners: {
            afterRender: "{that}.followingElementStyle"
        },
        selectors: {
            followingElementRow: ".gpiic-followingElementRow",
            followingElementLabel: ".gpiic-followingElementLabel",
            followingElementInput: ".gpiic-followingElementInput",
            followingElementHeading: ".gpiic-followingElementHeading"
        },
        members: {
            messageResolver: "{prefsEditorLoader}.msgBundle"
        },
        stringArrayIndex: {
            followingElement: ["followingElement-mousecursor", "followingElement-textcursor", "followingElement-keyboardfocus"]
        },
        repeatingSelectors: ["followingElementRow"],
        controlValues: {
            followingElement: ["mousecursor", "textcursor", "keyboardfocus"],
            followingElementBorder: ["topOnly", "bottomOnly", "noBorder"]
        },
        markup: {
            followingElementLabel:  
                    "<div class='gpiic-iconCheckAdjusterIcon gpii-iconCheckAdjusterIcon gpii-prefsEditor-adjusterIcons'></div>" +
                    "<div class='gpii-iconCheckAdjusterContainer'>" +
                    "   <label class='gpiic-iconCheckAdjusterDescription gpii-iconCheckAdjusterDescription gpii-table-cell-valign-label'>%followingElement</label>" +
                    "   <label class='gpii-table-cell-valign-label'>" +
                    "       <div class='gpii-prefsEditor-adjusterIcons gpii-prefsEditor-adjusterIcons-sept-12 gpii-iconCheckAdjusterCheckIcon'></div>" +
                    "   </label>" +
                    "</div>"
        },
        invokers: {
            followingElementStyle: {
                funcName: "gpii.prefs.panel.followingElement.style",
                args: [
                    "{that}.dom.followingElementLabel", "{that}.stringBundle.followingElement",
                    "{that}.options.markup.followingElementLabel", "{that}.options.controlValues.followingElement",
                    "{that}.options.classnameMap.followingElement",
                    "{that}.options.controlValues.followingElementBorder", "{that}.options.classnameMap.followingElementBorder"
                ],
                dynamic: true
            }
        }
    });

    gpii.prefs.panel.followingElement.style = function (labels, strings, markup, followingElement, style, followingElementBorder, borderStyle) {
        fluid.each(labels, function (label, index) {
            label = $(label);
            label.html(fluid.stringTemplate(markup, {
                followingElement: strings[index]
            }));
            label.find(".gpiic-iconCheckAdjusterIcon").addClass(style[followingElement[index]]);
            if (index === 0) {
                label.addClass(borderStyle[followingElementBorder[0]]);
            } else if (index === labels.length - 1) {
                label.addClass(borderStyle[followingElementBorder[1]]);
            } else {
                label.addClass(borderStyle[followingElementBorder[2]]);
            }
        });
    };
    
})(jQuery, fluid);