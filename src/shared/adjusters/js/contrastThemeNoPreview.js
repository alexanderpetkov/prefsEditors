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
    
    fluid.defaults("gpii.adjuster.contrastThemeNoPreview", {
        gradeNames: ["fluid.prefs.panel.contrast", "autoInit"],
        mergePolicy: {
            "controlValues.theme": gpii.prefs.merging.arrayOverridePolicy,
            "stringArrayIndex.theme": gpii.prefs.merging.arrayOverridePolicy
        },
        preferenceMap: {
            "gpii.primarySchema.contrast.theme": {
                "model.value": "default"
            }
        },
        selectors: {
            colourTheme: ".gpiic-contrast-colourTheme"
        },
        listeners: {
            "onDomBind.setColourThemeText": {
                "this": "{that}.dom.colourTheme",
                "method": "text",
                "args": ["{that}.stringBundle.colourTheme"]
            },
            "onDomBind.style": "{that}.style"
        },
        stringArrayIndex: {
            theme: ["contrast-bw", "contrast-wb", "contrast-by", "contrast-yb"]
        },
        controlValues: {
            theme: ["black-white", "white-black", "black-yellow", "yellow-black"]
        },
        markup: {
            label: "<span>%theme</span>"
        }
    });
})(jQuery, fluid);
