/**
 * This custom logic calculates reward points based on the purchase value and updates the total purchase value and total reward points of the related customer before creating or updating a purchase.
 * @Before(event = { "CREATE","UPDATE" }, entity = "customer_loyaltySrv.Purchases")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function(request) {
  const { Purchases, Customers } = cds.entities;
  const { purchaseValue, customer_ID } = request.data;

  if (purchaseValue === undefined || customer_ID === undefined) {
    return;
  }

  // Calculate reward points based on the purchase value
  const rewardPoints = Math.floor(purchaseValue / 10); // Example: 1 reward point for every 10 currency units

  // Update the request data with calculated reward points
  request.data.rewardPoints = rewardPoints;

  // Fetch the related customer to update their total purchase value and total reward points
  const customer = await SELECT.one.from(Customers).where({ ID: customer_ID });

  if (customer) {
    customer.totalPurchaseValue += purchaseValue;
    customer.totalRewardPoints += rewardPoints;

    // Update the customer entity
    await UPDATE(Customers).set({
      totalPurchaseValue: customer.totalPurchaseValue,
      totalRewardPoints: customer.totalRewardPoints
    }).where({ ID: customer_ID });
  }
}