// #include <stdio.h>
// #include <time.h>
//#include <emscripten.h>
// #ifndef EMSCRIPTEN_KEEPALIVE
// #define EMSCRIPTEN_KEEPALIVE __attribute__((used))
// #endif

#ifdef __cplusplus
extern "C" {
#endif
//#define CPS_FRACTION ((double)1.0 / CLOCKS_PER_SEC)

const unsigned int THREE = 3;
const unsigned int FIVE = 5;
const unsigned int FIFTEEN = 15;

long getSumOfAllValuesLimited(const unsigned int* limit)
{
	//((n)(n + 1)) / 2
	//https://en.wikipedia.org/wiki/1_%2B_2_%2B_3_%2B_4_%2B_%E2%8B%AF
	return ((*limit) * (*limit + 1)) / 2;
}

long getSumOfAllValuesBetween(const unsigned int* minValue, const unsigned int* maxValue)
{
	//((n - m + 1)(n + m)) / 2
	//http://mathforum.org/library/drmath/view/63722.html
	unsigned int deltaValue = ((*maxValue) - (*minValue));
	unsigned int accumulatedValue = ((*maxValue) + (*minValue));
	return ((accumulatedValue) * (deltaValue + 1)) / 2;
}

long getSumOfAllValuesLimitedDivisibleBy(const unsigned int* limit, const unsigned int* divisor)
{
	//logicked
	unsigned int adjustedMaxValue = *limit / *divisor;
	long adjustedSum = getSumOfAllValuesLimited(&adjustedMaxValue);
	return adjustedSum * *divisor;
}

long getSumOfAllValuesBetweenDivisibleBy(const unsigned int* minValue, const unsigned int* maxValue, const unsigned int* divisor)
{
	//logicked
	unsigned int adjustedMinValue = *minValue / *divisor;
	unsigned int adjustedMaxValue = *maxValue / *divisor;
	long adjustedSum = getSumOfAllValuesBetween(&adjustedMinValue, &adjustedMaxValue);
	return adjustedSum * *divisor;
}

long sumValuesDivisibleByThreeAndFive(const unsigned int limit)
{
	long divisbleThree = getSumOfAllValuesLimitedDivisibleBy(&limit, &THREE);
	long divisbleFive = getSumOfAllValuesLimitedDivisibleBy(&limit, &FIVE);
	long divisbleBoth = getSumOfAllValuesLimitedDivisibleBy(&limit, &FIFTEEN);
	return divisbleThree + divisbleFive - divisbleBoth;
}

#ifdef __cplusplus
}
#endif
