namespace customer_loyalty;
using { cuid, Currency, Currencies } from '@sap/cds/common';

define type Amount {
  value    : Decimal(15,2);
  currency : Currency;
}

@assert.unique: { customerNumber: [customerNumber] }
entity Customers : cuid {
  name: String(100);
  email: String(100);
  customerNumber: Integer @mandatory;
  totalPurchaseValue: Amount;
  totalRewardPoints: Integer;
  totalRedeemedRewardPoints: Integer;
  purchases: Association to many Purchases on purchases.customer = $self;
  redemptions: Association to many Redemptions on redemptions.customer = $self;
}

@assert.unique: { name: [name] }
entity Products : cuid {
  name: String(100) @mandatory;
  description: String(500);
  price: Amount;
  purchases: Association to many Purchases on purchases.selectedProduct = $self;
}

entity Purchases : cuid {
  purchaseValue: Amount;
  rewardPoints: Integer;
  customer: Association to Customers;
  selectedProduct: Association to Products;
}

entity Redemptions : cuid {
  redeemedAmount: Integer;
  customer: Association to Customers;
}