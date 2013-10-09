var demo2 = demo2 || {};
(function ($, fluid) {
    demo2.initGPII = function (container, compOpts) {
        var uioBuilder = fluid.uiOptions.builder({
            primarySchema: gpii.speakText.primarySchema,
            auxiliarySchema: gpii.speakText.auxiliarySchema
        });
        var baseOpts = {
            uioType: "gpii.speakText"
        };
        $.extend(true, baseOpts, compOpts);
        return fluid.invokeGlobalFunction(uioBuilder.options.assembledUIOGrade, [container, baseOpts]);
    };
})(jQuery, fluid);