(function (fluid) {
    fluid.defaults("speakText.primarySchema", {
        gradeNames: ["fluid.uiOptions.schemas", "autoInit"],
        schema: {
            "addOrRemovePreference": {
                "type": "boolean",
                "default": false
            },
            "screenReaderTTSEnabled": {
                "type": "boolean",
                "default": true
            },
            "speechRate": {
                "type": "number",
                "default": 130,
                "minimum": 0,
                "divisibleBy": 10
            },
            "auditoryOutLanguage": {
                "type": "string",
                "default": "English",
                "enum": ["English", "Deutsch", "Français", "Русский"]
            },
            "punctuationVerbosity": {
                "type": "string",
                "default": "none",
                "enum": ["none", "some", "most", "all"]
            },
            "announceCapitals": {
                "type": "boolean",
                "default": false
            },
            "speakTutorialMessages": {
                "type": "boolean",
                "default": false
            },
            "keyEcho": {
                "type": "boolean",
                "default": false
            },
            "wordEcho": {
                "type": "boolean",
                "default": false
            },
            "screenReaderBrailleOutput": {
                "type": "boolean",
                "default": false
            }
        }
    });

    fluid.defaults("speakText.auxSchema", {
        gradeNames: ["fluid.uiOptions.auxSchema", "autoInit"],
        auxiliarySchema: {
            "namespace": "gpii.adjusters.speakText",
            "templatePrefix": "../../src/shared/lib/infusion/components/uiOptions/html/",
            "messagePrefix": "",
            "template": "./speakTextFrame.html", //main template for all three groups (speakText, incSize, highContrast)

            "addOrRemovePreference": {
                "type": "addOrRemovePreference",
                "panel": {
                    "type": "speakText.panel"
                }
            },

            "screenReaderTTSEnabled": {
                "type": "screenReaderTTSEnabled",
                "panel": {
                    "type": "speakText.panel",
                    "container": ".gpii-speak-text-group", // container for the speakText panel, holding all speakText adjusters
                    "template": "../../src/shared/adjusters/html/newestSpeakText.html", // same as above
                    "message": "../../src/shared/adjusters/messages/speakText.json"
                }
            },

            "speechRate": {
                "type": "speechRate",
                "panel": {
                    "type": "speakText.panel"
                }
            },

            "auditoryOutLanguage": {
                "type": "auditoryOutLanguage",
                "panel": {
                    "type": "speakText.panel"
                }
            },

            "punctuationVerbosity": {
                "type": "punctuationVerbosity",
                "panel": {
                    "type": "speakText.panel",
                    "classnameMap": {"punctuationVerbosity": "@punctuationVerbosity.classes"},
                },
                "classes": {
                    "none": "radioButton-left",
                    "some": "radioButton-middle radioButton-second",
                    "most": "radioButton-middle radioButton-third",
                    "all": "radioButton-right"
                }
            },

            "announceCapitals": {
                "type": "announceCapitals",
                "panel": {
                    "type": "speakText.panel"
                }
            },

            "speakTutorialMessages": {
                "type": "speakTutorialMessages",
                "panel": {
                    "type": "speakText.panel"
                }
            },

            "keyEcho": {
                "type": "keyEcho",
                "panel": {
                    "type": "speakText.panel"
                }
            },

            "wordEcho": {
                "type": "wordEcho",
                "panel": {
                    "type": "speakText.panel"
                }
            },

            "screenReaderBrailleOutput": {
                "type": "screenReaderBrailleOutput",
                "panel": {
                    "type": "speakText.panel"
                }
            }
        }
    });

    fluid.defaults("speakText.panel", {
        gradeNames: ["fluid.uiOptions.panels", "autoInit"],
        model: {
            speakTextPresetButton: false,
            moreOptions: false
        },
        preferenceMap: {
            "addOrRemovePreference": {
                "model.addOrRemovePreference": "default"
            },
            "screenReaderTTSEnabled": {
                "model.screenReaderTTSEnabled": "default"
            },
            "speechRate": {
                "model.speechRate": "default",
                "controlValues.speechRate.min": "minimum",
                "controlValues.speechRate.step": "divisibleBy"
            },
            "auditoryOutLanguage": {
                "model.auditoryOutLanguage": "default",
                "controlValues.auditoryOutLanguage": "enum"
            },
            "punctuationVerbosity": {
                "model.punctuationVerbosity": "default",
                "controlValues.punctuationVerbosity": "enum"
            },
            "announceCapitals": {
                "model.announceCapitals": "default"
            },
            "speakTutorialMessages": {
                "model.speakTutorialMessages": "default"
            },
            "keyEcho": {
                "model.keyEcho": "default"
            },
            "wordEcho": {
                "model.wordEcho": "default"
            },
            "screenReaderBrailleOutput": {
                "model.screenReaderBrailleOutput": "default"
            }
        },

        selectors: {
            addOrRemovePreference: ".gpii-addOrRemovePreference",
            speakTextPresetButton: ".gpii-speakTextPresetButton",
            screenReaderTTSEnabled: ".gpii-screenReaderTTSEnabled",
            speechRate: ".gpii-speechRate",
            auditoryOutLanguage: ".gpii-auditoryOutLanguage",

            punctuationVerbosityRow: ".gpii-punctuationVerbosity-row",
            punctuationVerbosityOptionLabel: ".gpii-punctuationVerbosity-option-label",
            punctuationVerbosityInput: ".gpii-punctuationVerbosity",

            announceCapitals: ".gpii-announceCapitals",
            speakTutorialMessages: ".gpii-speakTutorialMessages",
            keyEcho: ".gpii-keyEcho",
            wordEcho: ".gpii-wordEcho",
            screenReaderBrailleOutput: ".gpii-screenReaderBrailleOutput",

            addOrRemovePreferenceLabel: ".gpii-addOrRemovePreference-label",
            speakTextPresetButtonLabel: ".gpii-speakTextPresetButton-label",
            screenReaderTTSEnabledLabel: ".gpii-screenReaderTTSEnabled-label",
            speechRateLabel: ".gpii-speechRate-label",
            speechRateMinus: ".gpii-speechRate-minus",
            speechRatePlus: ".gpii-speechRate-plus",
            auditoryOutLanguageLabel: ".gpii-auditoryOutLanguage-label",
            punctuationVerbosityLabel: ".gpii-punctuationVerbosity-label",
            announceCapitalsLabel: ".gpii-announceCapitals-label",
            speakTutorialMessagesLabel: ".gpii-speakTutorialMessages-label",
            keyEchoLabel: ".gpii-keyEcho-label",
            wordEchoLabel: ".gpii-wordEcho-label",
            screenReaderBrailleOutputLabel: ".gpii-screenReaderBrailleOutput-label",

            screenReaderBrailleOutputDescription: ".gpii-screenReaderBrailleOutput-description",

            moreOptions: ".more-options-checkbox",
            moreOptionsLabel: ".more-options-label"
        },

        repeatingSelectors: ["punctuationVerbosityRow"],

        protoTree: {
            expander: {
                type: "fluid.renderer.selection.inputs",
                rowID: "punctuationVerbosityRow",
                labelID: "punctuationVerbosityOptionLabel",
                inputID: "punctuationVerbosityInput",
                selectID: "punctuationVerbosity-selection",
                tree: {
                    optionnames: "{that}.options.controlValues.punctuationVerbosity",
                    optionlist: "{that}.options.controlValues.punctuationVerbosity",
                    selection: "${punctuationVerbosity}"
                }
            },

            addOrRemovePreference: "${addOrRemovePreference}",
            speakTextPresetButton: "${speakTextPresetButton}",
            screenReaderTTSEnabled: "${screenReaderTTSEnabled}",
            speechRate: {
                decorators: {
                    type: "fluid",
                    func: "gpii.uiOptions.textfieldStepper",
                    options: {
                        range: "{that}.options.controlValues.speechRate",
                        model: {
                            value: "${speechRate}"
                        },
                        rules: {
                            "speechRate": "value"
                        },
                        sourceApplier: "{that}.applier"
                    }
                }
            },
            auditoryOutLanguage: {
                selection: "${auditoryOutLanguage}",
                optionlist: "{that}.options.controlValues.auditoryOutLanguage"
            },

            announceCapitals: "${announceCapitals}",
            speakTutorialMessages: "${speakTutorialMessages}",
            keyEcho: "${keyEcho}",
            wordEcho: "${wordEcho}",
            screenReaderBrailleOutput: "${screenReaderBrailleOutput}",
            moreOptions: "${moreOptions}",

            addOrRemovePreferenceLabel: {messagekey: "addOrRemovePreferenceLabelOff"},
            speakTextPresetButtonLabel: {messagekey: "speakTextPresetButtonLabel"},
            screenReaderTTSEnabledLabel: {messagekey: "screenReaderTTSEnabledLabel"},
            speechRateLabel: {messagekey: "speechRateLabel"},
            speechRateMinus: {messagekey: "speechRateMinus"},
            speechRatePlus: {messagekey: "speechRatePlus"},
            auditoryOutLanguageLabel: {messagekey: "auditoryOutLanguageLabel"},
            punctuationVerbosityLabel: {messagekey: "punctuationVerbosityLabel"},
            announceCapitalsLabel: {messagekey: "announceCapitalsLabel"},
            speakTutorialMessagesLabel: {messagekey: "speakTutorialMessagesLabel"},
            keyEchoLabel: {messagekey: "keyEchoLabel"},
            wordEchoLabel: {messagekey: "wordEchoLabel"},
            screenReaderBrailleOutputLabel: {messagekey: "screenReaderBrailleOutputLabel"},
            moreOptionsLabel: {messagekey: "moreOptionsLabel"},

            screenReaderBrailleOutputDescription: {messagekey: "screenReaderBrailleOutputDescription"},
            punctuationVerbosityDescription: {messagekey: "punctuationVerbosityDescription"}
        },

        strings: {
            moreText: {
                expander: {
                    func: "speakText.showMoreText"
                }
            },

            lessText: {
                expander: {
                    func: "speakText.showLessText"
                }
            }
        },

        finalInitFunction: "speakText.finalInit",

        listeners: {
            afterRender: "{that}.style"
        },

        invokers: {
            style: {
                funcName: "speakText.panel.punctuationVerbosityStyle",
                args: [
                    "{that}.dom.punctuationVerbosityOptionLabel",
                    "{that}.options.controlValues.punctuationVerbosity",
                    "{that}.options.classnameMap.punctuationVerbosity"
                ]
            }
        }
    });

    speakText.showMoreText = function () {
        return "- less";
    }

    speakText.showLessText = function () {
        return "+ more";
    }

    speakText.finalInit = function (that) {
        something = that;
        that.applier.modelChanged.addListener("speakTextPresetButton", function () {
            if (that.model.speakTextPresetButton) {
                that.locate("moreOptionsLabel").text(that.options.strings.lessText);
                $("#speech-rate").slideDown();
                $(".more-options").slideDown();

            } else {
                $("#speech-rate").slideUp();
                $(".more-options").slideUp();
                $(".fully-expanded").slideUp();
                that.locate("addOrRemovePreferenceLabel").hide();
                that.locate("moreOptions").attr('checked', false);
            }
        });

        that.applier.modelChanged.addListener("addOrRemovePreference", function () {
            if (that.model.addOrRemovePreference) {
                $.getJSON('../../src/shared/adjusters/messages/speakText.json', function (data) {
                that.locate("addOrRemovePreferenceLabel").text(data["addOrRemovePreferenceLabelOn"]);
            });
            } else {
                $.getJSON('../../src/shared/adjusters/messages/speakText.json', function (data) {
                that.locate("addOrRemovePreferenceLabel").text(data["addOrRemovePreferenceLabelOff"])
            });
            }
        });

        that.applier.modelChanged.addListener("moreOptions", function () {
            if (that.model.moreOptions) {
                $(".fully-expanded").slideDown();
                that.locate("addOrRemovePreferenceLabel").show();
                that.locate("moreOptionsLabel").text(that.options.strings.moreText);
                that.locate("addOrRemovePreferenceLabel").hover(function () {
                        $("#prompt-message").show();
                    }, function () {
                        $("#prompt-message").hide();
                    });
            } else {
                $(".fully-expanded").slideUp();
                that.locate("addOrRemovePreferenceLabel").hide();
                that.locate("moreOptionsLabel").text(that.options.strings.lessText);
            }
        })
    };

    speakText.panel.punctuationVerbosityStyle = function (labels, values, classes) {
        fluid.each(labels, function (label, index) {
            $(label).addClass(classes[values[index]]);
        });

        // FIXME: This is probably not the best idea, but it works for now.
        var contents = $(".gpii-punctuationVerbosity-row").contents()
        $(".gpii-punctuationVerbosity-row").replaceWith(contents);
    };

})(fluid);




