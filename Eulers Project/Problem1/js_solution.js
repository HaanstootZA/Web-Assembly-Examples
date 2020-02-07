const THREE = 3;
const FIVE = 5;
const FIFTEEN = 15;

function getSumOfAllValuesLimited(limit) {
    //((n)(n + 1)) / 2
    //https://en.wikipedia.org/wiki/1_%2B_2_%2B_3_%2B_4_%2B_%E2%8B%AF
    return ((limit) * (limit + 1)) / 2;
};

function getSumOfAllValuesBetween(minValue, maxValue){
    //((n - m + 1)(n + m)) / 2
    //http://mathforum.org/library/drmath/view/63722.html
    var deltaValue = ((maxValue) - (minValue));
    var accumulatedValue = ((maxValue) + (minValue));
    return ((accumulatedValue) * (deltaValue + 1)) / 2;
}

function getSumOfAllValuesLimitedDivisibleBy(limit, divisor)
{
    //logicked
    var adjustedMaxValue = Math.floor(limit / divisor);
    var adjustedSum = getSumOfAllValuesLimited(adjustedMaxValue);
    return adjustedSum * divisor;
}

function getSumOfAllValuesBetweenDivisibleBy(minValue, maxValue, divisor)
{
    //logicked
    var adjustedMinValue = Math.floor(minValue / divisor);
    var adjustedMaxValue = Math.floor(maxValue / divisor);
    var adjustedSum = getSumOfAllValuesBetween(adjustedMinValue, adjustedMaxValue);
    return adjustedSum * divisor;
}

function sumValuesDivisibleByThreeAndFive(limit)
{
    var divisbleThree = getSumOfAllValuesLimitedDivisibleBy(limit, THREE);
    var divisbleFive = getSumOfAllValuesLimitedDivisibleBy(limit, FIVE);
    var divisbleBoth = getSumOfAllValuesLimitedDivisibleBy(limit, FIFTEEN);
    return divisbleThree + divisbleFive - divisbleBoth;
}
