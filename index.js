var converter = require('./js/fm-converter.js');

readTextFile();
var result = "";

function readTextFile()
{
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "file:///report-converter/pivot-xml-report-converter/report.xml", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                result = converter(allText);
                console.log(">>>>",result);
            }
        }
    }
    rawFile.send(null);
}
