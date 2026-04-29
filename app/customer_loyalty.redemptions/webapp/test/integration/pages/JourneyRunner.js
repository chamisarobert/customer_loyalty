sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"customerloyalty/redemptions/test/integration/pages/RedemptionsList",
	"customerloyalty/redemptions/test/integration/pages/RedemptionsObjectPage"
], function (JourneyRunner, RedemptionsList, RedemptionsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('customerloyalty/redemptions') + '/test/flpSandbox.html#customerloyaltyredemptions-tile',
        pages: {
			onTheRedemptionsList: RedemptionsList,
			onTheRedemptionsObjectPage: RedemptionsObjectPage
        },
        async: true
    });

    return runner;
});

