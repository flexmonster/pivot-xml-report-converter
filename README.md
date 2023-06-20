# XML-to-JSON report converter
[![Flexmonster Pivot Table & Charts](https://www.flexmonster.com/fm_uploads/2020/06/GitHub_fm.png)](https://flexmonster.com)
Website: [www.flexmonster.com](https://www.flexmonster.com)

## Flexmonster Pivot Table & Charts
Flexmonster Pivot is a powerful JavaScript tool for interactive web reporting. It allows you to visualize and analyze data from JSON, CSV, SQL, NoSQL, Elasticsearch, and OLAP data sources fast and conveniently. Flexmonster is designed to integrate seamlessly with any client-side framework and can be easily embedded into your application.

This repository contains the utility for converting old XML reports (versions 1.5 through 2.2) to JSON format (version 2.3 and later).
You can also use the online version of the converter, which is [available on our website](https://www.flexmonster.com/convert-xml-report/).

Table of contents:

- [Installation and usage](#installation-and-usage)
    - [npm module](#npm-module)
    - [Simple HTML page](#simple-html-page)

## Installation and usage

### npm module 

1. Install the converter with the following npm command:

```bash
npm install pivot-xml-report-converter
```

2. Use the converter in your project. It can be done as follows:

```js
let converter = require('pivot-xml-report-converter');
let xml = '<config>' +
            '<dataSource type="csv">' +
              '<filename>https://s3.amazonaws.com/flexmonster/2.3/data/data.csv</filename>' +
            '</dataSource>' +
          '</config>';
let json = converter(xml);
console.log(json);
```

Note that the `xml` should have the `String` type. In the `index.js` file, you can find an example of reading a local `.XML` file and passing the `String` data to the converter.

### Simple HTML page

Add the following code to your page:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script type="text/javascript" src="js/fm-converter.js"></script>
<script type="text/javascript">
let xml = '<config>' +
            '<dataSource type="csv">' +
              '<filename>https://s3.amazonaws.com/flexmonster/2.3/data/data.csv</filename>' +
            '</dataSource>' +
          '</config>';
let json = fmCovertXmlReport(xml);
console.log(json);
</script>
```
