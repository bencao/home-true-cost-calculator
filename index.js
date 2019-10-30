const columnify = require("columnify");

function getMonthlyMortgageCost(l, i, n) {
  const exp = Math.pow(1 + i, n);

  return Math.ceil((l * i * exp) / (exp - 1));
}

function getAssumedMonthlyMortageCost(price) {
  const ASSUMED_INTEREST_RATE = 0.035 / 12;
  const ASSUMED_MONTHS = 30 * 12;
  const ASSUMED_LOAN_RATIO = 1 - 0.2;

  return getMonthlyMortgageCost(
    price * ASSUMED_LOAN_RATIO,
    ASSUMED_INTEREST_RATE,
    ASSUMED_MONTHS
  );
}

function getAssumedHomeInsurance(home) {
  const ASSUMED_INSURANCE_MINIMAL = 80;
  const ASSUMED_INSURANCE_INCREMENT = 10;
  const ASSUMED_INSURANCE_FLOODZONE = 100;

  const diff = Math.ceil((home.squareFootage - 1800) / 100);

  let cost = ASSUMED_INSURANCE_MINIMAL;

  if (diff > 0) {
    cost += diff * ASSUMED_INSURANCE_INCREMENT;
  }

  if (home.floodZone) {
    cost += ASSUMED_INSURANCE_FLOODZONE;
  }

  return cost;
}

function getAssumedMaintenanceCost(home) {
  const ASSUMED_MAINTENANCE_COST_PER_SQ_PER_YEAR = 1;
  const ASSUMED_MAINTENANCE_COST_POOL_PER_YEAR = 4000;

  let cost = Math.ceil(
    (ASSUMED_MAINTENANCE_COST_PER_SQ_PER_YEAR * home.squareFootage) / 12
  );

  if (home.swimmingPool) {
    cost += Math.ceil(ASSUMED_MAINTENANCE_COST_POOL_PER_YEAR / 12);
  }

  return cost;
}

function getMonthlyPropertyTax(annualPropertyTax) {
  return Math.ceil(annualPropertyTax / 12);
}

function getMonthlyAdditionalCommuteCost(walk) {
  const ASSUMED_THRESHOULD = 20;
  const ASSUMED_PARKING_COST = 30;
  const ASSUMED_CAR_COST = 150;
  return walk > ASSUMED_THRESHOULD
    ? ASSUMED_CAR_COST + ASSUMED_PARKING_COST
    : 0;
}

function getEssentialMonthlyCost(home) {
  return (
    getMonthlyPropertyTax(home.annualPropertyTax) +
    getAssumedHomeInsurance(home) +
    getMonthlyAdditionalCommuteCost(home.walk) +
    getAssumedMaintenanceCost(home)
  );
}

function prettyPrice(price) {
  return Math.round(price / 1000) + "K";
}

function printResult(homeList, filter) {
  let result = homeList.map(h => ({
    name: h.name,
    monthly: getAssumedMonthlyMortageCost(h.price) + getEssentialMonthlyCost(h),
    "essential(TAX+INS+MAIN+COMMU)":
      getEssentialMonthlyCost(h) +
      ` (${getMonthlyPropertyTax(
        h.annualPropertyTax
      )} + ${getAssumedHomeInsurance(h)} + ${getAssumedMaintenanceCost(
        h
      )} + ${getMonthlyAdditionalCommuteCost(h.walk)})`,
    price: prettyPrice(h.price),
    tax: h.annualPropertyTax,
    walk: h.walk + " mins",
    sqFt: h.squareFootage,
    comment: h.comment
  }));

  if (filter) {
    result = result.filter(
      r => r.name.indexOf(filter) > 0 || r.name.indexOf("====") > 0
    );
  }

  console.log(
    columnify(result.sort((r1, r2) => r1.monthly - r2.monthly), {
      columnSplitter: " | ",
      showHeaders: true
    })
  );
}

printResult(require("./homes.json"), process.argv[2]);
