sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"customerloyalty/customers/test/integration/pages/CustomersList",
	"customerloyalty/customers/test/integration/pages/CustomersObjectPage"
], function (JourneyRunner, CustomersList, CustomersObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('customerloyalty/customers') + '/test/flpSandbox.html#customerloyaltycustomers-tile',
        pages: {
			onTheCustomersList: CustomersList,
			onTheCustomersObjectPage: CustomersObjectPage
        },
        async: true
    });

    return runner;
});

