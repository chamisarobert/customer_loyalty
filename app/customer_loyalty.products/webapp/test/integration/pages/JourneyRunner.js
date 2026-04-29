sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"customerloyalty/products/test/integration/pages/ProductsList",
	"customerloyalty/products/test/integration/pages/ProductsObjectPage"
], function (JourneyRunner, ProductsList, ProductsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('customerloyalty/products') + '/test/flpSandbox.html#customerloyaltyproducts-tile',
        pages: {
			onTheProductsList: ProductsList,
			onTheProductsObjectPage: ProductsObjectPage
        },
        async: true
    });

    return runner;
});

