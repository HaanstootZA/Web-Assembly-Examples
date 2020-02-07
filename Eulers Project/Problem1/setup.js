var statusElement = document.getElementById("status");
var Module = {
    preRun: [],
    postRun: [],
    print: function (e) {
        var outputElement = document.getElementById("output");
        if(!outputElement){
            return;
        }
        console.log(e);
        outputElement.value += e + "\n";
        outputElement.scrollTop = outputElement.scrollHeight;
    },
    printErr: function (e) { console.error(e); },
    canvas: function () {
        var canvasElement = document.getElementById("canvas");
        canvasElement.addEventListener("webglcontextlost", function (canvasElement) {
            alert("WebGL context lost. You will need to reload the page.");
            e.preventDefault();
        }, !1);
        return canvasElement;
    },
    setStatus: function (e) {
        if (!Module.setStatus.last){
            Module.setStatus.last = { time: Date.now(), text: "" }
        }

        if(e === Module.setStatus.last.text)
        {
            return;
        }

        var dateMatch = e.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
        if(!dateMatch){
            statusElement.innerHTML = e;
            return;
        }
        
        var nowDate = Date.now();
        if ((nowDate - Module.setStatus.last.time) < 30){
            return;
        }
        Module.setStatus.last.time = nowDate;
        Module.setStatus.last.text = e;
    },
    totalDependencies: 0,
    monitorRunDependencies: function (e) {
        this.totalDependencies = Math.max(this.totalDependencies, e);
        var text;
        if(!e) {
            text = "All downloads complete.";
        } else {
            text = "Preparing... (" + (this.totalDependencies - e) + "/" + this.totalDependencies + ")" 
        }
        Module.setStatus(text)
    }
};
Module.setStatus("Downloading...");
window.onerror = function (e) {
    Module.setStatus("Exception thrown, see JavaScript console");
    Module.setStatus = function (e) {
        if(!e){
            return;
        }
        Module.printErr("[post-exception status] " + e);
    };
}
