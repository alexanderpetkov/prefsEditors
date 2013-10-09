(function ($, fluid) {
	
	fluid.defaults("fluid.uiOptions.panels.contrast", {
		gradeNames: ["fluid.uiOptions.panels", "autoInit"],
		preferenceMap: {
			"fluid.uiOptions.contrast": {
				"model.value": "default"
			}
		},
		selectors: {
            valueCheckbox: ".flc-uiOptions-constrastInput",
            headingLabel: ".flc-uiOptions-contrast-label",
            panelLabel: ".headerTitle",
            addToMyPreferencesLabel: ".addToMyPreferencesLabel"
		},
		protoTree: {
			valueCheckbox: "${value}",
            headingLabel: {messagekey: "contrast"},
            panelLabel: {messagekey: "addContrast"},
            addToMyPreferencesLabel: " "
		},
		components: {
            preview: {
                type: "fluid.uiOptions.preview",
                createOnEvent: "afterRender",
                container: ".flc-uiOptions-contrast .flc-uiOptions-preview-per-setting-frame",
                options: {
                    templateUrl: "../../src/shared/preview/html/uiOptionsContrastPreview.html"
                }
            }
        },
        
        outerPreviewEnhancerOptions: "{originalEnhancerOptions}.options.originalUserOptions",
        emptyComponentType: "fluid.emptySubcomponent",
        distributeOptions: [{
            source: "{that}.options.outerPreviewEnhancerOptions",
            removeSource: true,
            target: "{that preview enhancer}.options"
        }, {
            source: "{that}.options.emptyComponentType",
            removeSource: true,
            target: "{that preview enhancer magnifier}.type"
        }],
		
        finalInitFunction: "fluid.uiOptions.panels.contrast.finalInit"
	});
    
    fluid.uiOptions.panels.contrast.finalInit = function (that) {
        that.applier.modelChanged.addListener("value", function (that) {
        	if(that.value)
    		{
        		$(".flc-uiOptions-contrast .fl-uiOptions-category").slideDown();
    		}
        	else
    		{
        		$(".flc-uiOptions-contrast .fl-uiOptions-category").slideUp();
    		}
        });
        
        // need this in order not to always show content on save.
        that.events.afterRender.addListener(function (that) {
        	if(that.model.value)
    		{
        		$(".flc-uiOptions-contrast .fl-uiOptions-category").slideDown(0);
    		}
        	else
    		{
        		$(".flc-uiOptions-contrast .fl-uiOptions-category").slideUp(0);
    		}

        	var checkedTooltip = that.options.parentBundle.lookup(["tooltipChecked"]);
        	that.locate("addToMyPreferencesLabel").attr("tooltip-checked", checkedTooltip ? checkedTooltip.template : checkedTooltip);

        	var uncheckedTooltip = that.options.parentBundle.lookup(["tooltipUnchecked"]);
        	that.locate("addToMyPreferencesLabel").attr("tooltip-unchecked", uncheckedTooltip ? uncheckedTooltip.template : uncheckedTooltip);

        	// Not very elegant solution
        	var previewframe = that.preview;
        	var previewText = that.options.parentBundle.lookup(["contrastPreviewText"]).template;
        	that.preview.events.onReady.addListener(function () {
        		previewframe.container.contents().find('body').find('.flc-uiOptions-preview-per-setting-label').text(previewText);
            });
        });
    };
})(jQuery, fluid);
