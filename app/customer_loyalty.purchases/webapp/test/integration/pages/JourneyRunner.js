sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"customerloyalty/purchases/test/integration/pages/PurchasesList",
	"customerloyalty/purchases/test/integration/pages/PurchasesObjectPage"
], function (JourneyRunner, PurchasesList, PurchasesObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('customerloyalty/purchases') + '/test/flpSandbox.html#customerloyaltypurchases-tile',
        pages: {
			onThePurchasesList: PurchasesList,
			onThePurchasesObjectPage: PurchasesObjectPage
        },
        async: true
    });

    return runner;
});

