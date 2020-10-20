# Convert XML pivot reports to JSON format
[![Flexmonster Pivot Table & Charts](https://www.flexmonster.com/fm_uploads/2020/06/GitHub_fm.png)](https://flexmonster.com)
Website: www.flexmonster.com

## Flexmonster Pivot Table & Charts
Flexmonster Pivot is a powerful JavaScript tool for interactive web reporting. It allows you to visualize and analyze data from JSON, CSV, SQL, NoSQL, Elasticsearch, and OLAP data sources fast and conveniently. Flexmonster is designed to integrate seamlessly with any client-side framework and can be easily embedded into your application.

This repositiry contains the source code for Flexmonster utility to convert old XML pivot reports (versions 1.5-2.2) to new JSON format (version 2.3+).
Online version is [available on Flexmonser website](http://www.flexmonster.com/convert-xml-report/).

Table of contents:

- [Usage](#usage)
    - [npm module](#npm-module)
    - [Simple HTML page](#simple-html-page)

## Usage

### npm module 

1. Install the converter with the following npm command:

```bash
npm install pivot-xml-report-converter
```

2. Use the converter in your project. It can be done like this:

```js
var converter = require('pivot-xml-report-converter');
var xml = '<config>' +
            '<dataSource type="csv">' +
              '<filename>https://s3.amazonaws.com/flexmonster/2.3/data/data.csv</filename>' +
            '</dataSource>' +
          '</config>';
var json = converter(xml);
console.log(json);
```

The xml is type of `String`. 

In `index.js`, you can find the example with reading a local `.XML` file and passing the `String` data to the converter.

### Simple HTML page

Add the following code to your web page:

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
