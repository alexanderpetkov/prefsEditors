(function ($, fluid) {
    fluid.defaults("gpii.pcp.stepperCreator", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],
        invokers: {
            handle: {
                funcName: "gpii.pcp.stepperCreator.create",
                args: ["{arguments}.0"]
            }
        }
    });

    gpii.pcp.stepperCreator.create = function (data) {
        var name = data.name;

        fluid.defaults("gpii.pcp.auxiliarySchema." + name, {
            gradeNames: ["fluid.littleComponent", "autoInit"],
            auxiliarySchema: {
                groups: {
                    visualAlternatives: {
                        panels: {
                            "gpii.primarySchema.speakText": [name]
                        }
                    }
                }
            }
        });

        schemaData = {
            "type": "gpii.primarySchema." + name,
            "panel": {
                "type": "gpii.adjuster." + name,
                "template": "%prefix/" + name + "Template.html",
                "container": "." + name,
                "message": "%prefix/message.json"
            }
        };

        auxEntry = eval("gpii.pcp.auxiliarySchema." + name)();
        auxEntry.options.auxiliarySchema[name] = schemaData;

        pMap = {};
        pMap["gpii.primarySchema." + name] = {"model.value": "default"};
        pMap["gpii.primarySchema." + name]["controlValues." + name + ".min"] = "minimum";
        pMap["gpii.primarySchema." + name]["controlValues." + name + ".max"] = "maximum";
        pMap["gpii.primarySchema." + name]["controlValues." + name + ".step"] = "divisibleBy";

        sels = {};
        sels[name + "Label"] = ".gpiic-speakText-" + name + "-label";
        sels[name] = ".gpiic-speakText-" + name + "-stepper";

        pTree = {};
        pTree[name + "Label"] = {messagekey: name + "Label"};


        fluid.defaults("gpii.adjuster." + name, {
            gradeNames: ["fluid.prefs.panel", "autoInit"],
            preferenceMap: pMap,
            selectors: sels,
            selectorsToIgnore: [name],
            components: {
                textfieldStepper: {
                    type: "gpii.adjuster.textfieldStepper",
                    container: "{that}.dom." + name,
                    createOnEvent: "afterRender",
                    options: {
                        sourceApplier: "{" + name + "}.applier",
                        rules: {
                            "value": "value"
                        },
                        model: {
                            value: "{"+ name + "}.model.value"
                        },
                        range: "{"+ name + "}.options.controlValues." + name,
                        labelledbyDomElement: "{"+ name + "}.dom.volumeLabel"
                    }
                }
            },
            protoTree: pTree
        });

    };

})(jQuery, fluid);
