const maxLimit = 10000;
const HEADER = "REPEATS\t| RESULT\t| AVG (cps)\t| AVG (s)\t| TOTAL (cps)"

function convertTimeResultsToString(timeResults){
    return timeResults.testRuns + "\t| " + timeResults.funcOutput + "\t| " + timeResults.avg_time_spent.toExponential(3) + "\t| " + timeResults.avg_time_spent_seconds.toExponential(3)+ "\t| " + timeResults.total_time_spent.toPrecision(3);
}

function setElementText(elementName, text){
    var element = document.getElementById(elementName);
    element.innerHTML = text;
    console.log(text);
}

function measureTime() {
    if (measureTime.start === undefined) measureTime.start = performance.now();
    return performance.now() - measureTime.start
}

function resetTime(){
    measureTime.start = undefined;
}

function getTestRuns(){
    var runCountInput = document.getElementById("runCount");
    return runCountInput.value;
}

function timeFunc(test) {
    var testRuns = getTestRuns();
    var avg_time_spent;
    var total_time_spent;
    var cps = 1.0 / 1000;
    var funcOutput = test();
    measureTime();
    for (var i = 0; i < testRuns; i++) {
        test();
    }
    total_time_spent = measureTime();
    avg_time_spent = total_time_spent / (testRuns * 1.0);
    resetTime()
    return {
        testRuns: testRuns,
        funcOutput: funcOutput,
        total_time_spent: total_time_spent,
        avg_time_spent: avg_time_spent,
        avg_time_spent_seconds: avg_time_spent * cps
    };
}

function diffTimes(){
    var timeWASMResults = timeWASM();
    var timeJSResults = timeJS();
    var timeOutput, max, min;
    if(timeWASMResults.total_time_spent >= timeJSResults.total_time_spent){
        timeOutput = "JavaScript";
        max = timeWASMResults;
        min =timeJSResults;
    }
    else{
        timeOutput = "WASM";
        max = timeJSResults;
        min = timeWASMResults;
    }
    timeOutput = timeOutput + " was faster!\n";
    var diff = {
        testRuns: timeWASMResults.testRuns,
        funcOutput: timeWASMResults.funcOutput !== timeJSResults.funcOutput ? "INVALID" : timeWASMResults.funcOutput,
        total_time_spent: max.total_time_spent - min.total_time_spent,
        avg_time_spent: max.avg_time_spent - min.avg_time_spent,
        avg_time_spent_seconds: max.avg_time_spent_seconds - min.avg_time_spent_seconds
    }
    
    timeOutput = timeOutput + HEADER + '\n' + convertTimeResultsToString(diff)
    setElementText("deltaOutput", timeOutput);
    resetTime()
}

function timeWASM() {
    var timeResults = timeFunc(function () {
        return Module._sumValuesDivisibleByThreeAndFive(maxLimit);
    })
    var timeResultsOutput = HEADER + "\n" + convertTimeResultsToString(timeResults)
    setElementText("wasmOutput", timeResultsOutput);
    return timeResults;
}

function timeJS() {
    var timeResults = timeFunc(function () {
        return sumValuesDivisibleByThreeAndFive(maxLimit);
    })
    var timeResultsOutput = HEADER + "\n" + convertTimeResultsToString(timeResults)
    setElementText("jsOutput", timeResultsOutput);
    return timeResults;
}
