(function ($, fluid) {
    fluid.defaults("gpii.pcp.starter", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        invokers: {
            renderAdjusters: {
                "funcName": "gpii.pcp.renderPCP",
                "args": ["{that}.options.metaGradeNames", "{arguments}.0"]
            }
        },
        metaGradeNames: [
            "visualAlternatives",
            "visualAlternativesMoreLess",
            "volumeGroup",
            "languageGroup",
            "addContrast",
            "increaseSize"
        ],

    });

    // TODO: Rewrite this function more declaratively

    gpii.pcp.renderPCP = function (metaGradeNames, preferences) {

        var visualAlternativesRequiredByLevel = {
            0: ["visualAlternatives"],
            1: ["visualAlternatives", "speakText"],
            2: ["visualAlternatives", "speakText", "visualAlternativesMoreLess"]
        };

        var volumeRequiredByLevel = {
            0: ["volumeGroup"]
        };

        var languageRequiredByLevel = {
            0: ["languageGroup"]
        };

        var addContrastRequiredByLevel = {
            0: ["addContrast"],
            1: ["addContrast", "contrastEnabled"]
        };

        var increaseSizeRequiredByLevel = {
            0: ["increaseSize"],
            1: ["increaseSize", "magnifierEnabled"]
        };

        var visualAlternativesLevels = [
            ["speakText", "screenReaderBrailleOutput"],
            ["wordsSpokenPerMinute", "volume"],
            ["voicePitch", "screenReaderLanguage", "punctuationVerbosity", "announceCapitals", "speakTutorialMessages", "keyEcho", "wordEcho", "textHighlighting", "screenReaderFollows"]
        ];

        var volumeLevels = [["volume"]];

        var languageLevels = [["universalLanguage"]];

        var addContrastLevels = [
            ["contrastEnabled"],
            ["contrastTheme"]
        ];

        var increaseSizeLevels = [
            ["fontSize", "cursorSize", "magnifierEnabled"],
            ["magnifier", "magnifierPosition", "magnifierFollows", "showCrosshairs"]
        ];

        var levelOfAdjuster = function (adjuster, groupLevels) {
            for (i = 0; i < groupLevels.length; i++) {
                if ($.inArray(adjuster, groupLevels[i]) > -1) {
                    return i;
                };
            };
            return -1;
        };

        var deepestLevel = function (adjusters, groupLevels) {
            return Math.max.apply(null, adjusters.map(function (adj) {
                return levelOfAdjuster(adj, groupLevels);
            }));
        };

        // used for adding gradeNames that:
        // 1) aren't part of the model, e.g. grade names for groups (called "metaGradeNames")
        // 2) have been missed in the preferences set, but should be there,
        //    e.g. if speechRate value is given, but screenReaderTTSEnabled value is not.

        var determineAdditionalGradeNames = function (modelAdjusters) {
            var commonModelPartLength = "gpii_primarySchema_".length;

            var baseAdjusters = fluid.transform(modelAdjusters, function (adjuster) {
                return adjuster.substr(commonModelPartLength);
            });

            var groups = [
                [visualAlternativesRequiredByLevel, visualAlternativesLevels],
                [volumeRequiredByLevel, volumeLevels],
                [languageRequiredByLevel, languageLevels],
                [addContrastRequiredByLevel, addContrastLevels],
                [increaseSizeRequiredByLevel, increaseSizeLevels]
            ];

            var additionals = [];

            fluid.each(groups, function (group) {
                additionals = additionals.concat(group[0][deepestLevel(baseAdjusters, group[1])]);
            });

            for (i = 0; i < additionals.length; i++) {
                if ($.inArray(additionals[i], baseAdjusters) < 0) {
                    baseAdjusters.push(additionals[i]);  // add every additional adjuster, that has been omitted
                    if (metaGradeNames.indexOf(additionals[i]) < 0) {
                        modelToRender["gpii_primarySchema_" + additionals[i]] = true; // used to update primarySchema with true values for enabling switches (if they're missed)
                    };
                };
            };

            var additionalSchemaAdjusters = fluid.transform(baseAdjusters, function (adjuster) {
                return "gpii.pcp.auxiliarySchema." + adjuster;
            });

            return additionalSchemaAdjusters;
        };

        var required = [
            "gpii.pcp.auxiliarySchema.mergePolicy",
            "gpii.pcp.progressiveEnhancement",
            "gpii.pcp.auxiliarySchema.common",
            "gpii.pcp.auxiliarySchema.followingElement"
        ];

        var modelToRender = fluid.model.transform(preferences, gpii.prefs.commonTermsInverseTransformationRules);
        var modelKeys = Object.keys(modelToRender);
        var additionalGradeNames = determineAdditionalGradeNames(modelKeys);

        for (var key in modelToRender) {
            if (modelToRender.hasOwnProperty(key)) {
                var schemaKey = key.replace(/_/g, ".");
                gpii.primarySchema[schemaKey]["default"] = modelToRender[key];
            };
        };

        fluid.prefs.create("#gpiic-pcp", {
            build: {
                gradeNames: required.concat(additionalGradeNames),
                primarySchema: gpii.primarySchema
            },
            prefsEditor: {
                gradeNames: ["demo.pcp"]
            }
        });
    };
})(jQuery, fluid);
