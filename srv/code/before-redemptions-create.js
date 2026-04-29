/**
 * This custom logic deducts the redemption amount from the customer's total reward points and adds it to their total redeemed points before creating a redemption.
 * @Before(event = { "CREATE" }, entity = "customer_loyaltySrv.Redemptions")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(request) {
  const { Customers } = cds.entities;
  const { customer_ID, redeemedAmount } = request.data;

  if (!customer_ID || redeemedAmount === undefined) {
    request.reject(400, 'CUSTOMER_ID_REDEEMED_AMOUNT_REQUIRED');
  }

  // Fetch the customer details
  const customer = await SELECT.one.from(Customers).where({ ID: customer_ID });

  if (!customer) {
    request.reject(400, 'CUSTOMER_NOT_FOUND');
  }

  if (customer.totalRewardPoints < redeemedAmount) {
    request.reject(400, 'INSUFFICIENT_REWARD_POINTS');
  }

  // Update the customer's reward points
  customer.totalRewardPoints -= redeemedAmount;
  customer.totalRedeemedRewardPoints += redeemedAmount;

  // Apply the changes to the customer entity
  await UPDATE(Customers).set({
    totalRewardPoints: customer.totalRewardPoints,
    totalRedeemedRewardPoints: customer.totalRedeemedRewardPoints
  }).where({ ID: customer_ID });
}