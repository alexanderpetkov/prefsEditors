/*!
Copyright 2014 Astea

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/gpii/universal/LICENSE.txt
*/

// Declare dependencies
/*global fluid, jqUnit, expect, jQuery*/

// JSLint options
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */

(function ($) {
    fluid.registerNamespace("gpii.tests");

    fluid.defaults("gpii.tests.pcpStatusMessages", {
        gradeNames: ["fluid.test.testEnvironment", "autoInit"],
        invokers: {
            createPrefs: {
                funcName: "gpii.tests.constructPrefsGrade",
                args: [{
                    gradeNames: ["gpii.pcp.progressiveEnhancement", "gpii.pcp.auxiliarySchema.common"],
                    primarySchema: gpii.primarySchema
                }]
            }
        },
        components: {
            pcp: {
                type: "fluid.viewComponent",
                container: "#gpiic-pcp",
                options: {
                    gradeNames: ["{pcpStatusMessages}.createPrefs"],
                    prefsEditorType: "fluid.prefs.fullPreview"
                }
            },
            pcpMessageTester: {
                type: "gpii.tests.pcpMessageTester"
            }
        }
    });

    fluid.defaults("gpii.tests.pcpMessageTester", {
        gradeNames: ["fluid.test.testCaseHolder", "autoInit"],
        messageDialogSelector: ".gpiic-pcp-statusMessage",
        invokers: {},
        modules: [{}]
    });

    gpii.tests.constructPrefsGrade = function (options) {
        var builder = fluid.prefs.builder(options);
        return builder.options.assembledPrefsEditorGrade;
    };

    $(document).ready(function () {
        fluid.test.runTests([
            "gpii.tests.pcpStatusMessages"
        ]);
    });
})(jQuery);
