# Convert XML pivot reports to JSON format

Flexmonster utility to convert old XML pivot reports (versions 1.5-2.2) to new JSON format (version 2.3+).
Online version is [available on Flexmonser website](http://www.flexmonster.com/convert-xml-report/).

## Usage	
	### Simple html page
```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script type="text/javascript" src="js/fm-converter.js"></script>
<script type="text/javascript">
var xml = '<config>' +
            '<dataSource type="csv">' +
              '<filename>https://s3.amazonaws.com/flexmonster/2.3/data/data.csv</filename>' +
            '</dataSource>' +
          '</config>';
var json = fmCovertXmlReport(xml);
console.log(json);
</script>
```
	### Npm module 
		#### Installation
```bash
$ npm install pivot-xml-report-converter
```
		#### Examples

```bash
$ node
> var converter = require('pivot-xml-report-converter');
undefined
> converter(xmlString)
{
	...
}
```		
The xmlString is type of `String`. 

```bash
> converter('<config></config>')
{}
> converter('<config><dataSource type="csv"></dataSource></config>')
{\n 	"dataSource": {\n 	"dataSourceType": "csv"\n 	}\n}
```
In `index.js` you can find the example with reading a local `.XML` file and passing the `String` data to the converter.