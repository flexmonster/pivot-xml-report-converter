# XML-to-JSON report converter
[![Flexmonster Pivot Table & Charts](https://www.flexmonster.com/fm_uploads/2020/06/GitHub_fm.png)](https://flexmonster.com/?r=github)
Website: [www.flexmonster.com](https://www.flexmonster.com/?r=github)

## Flexmonster Pivot Table & Charts
Flexmonster Pivot is a powerful JavaScript tool for interactive web reporting. It allows you to visualize and analyze data from JSON, CSV, SQL, NoSQL, Elasticsearch, and OLAP data sources fast and conveniently. Flexmonster is designed to integrate seamlessly with any client-side framework and can be easily embedded into your application.

This repository contains the utility for converting Flexmonster reports from old XML format (versions 1.5 through 2.2) to JSON format (version 2.3 and later).
You can also use the online version of the converter, which is [available on our website](https://www.flexmonster.com/convert-xml-report/?r=github).

Table of contents:

- [Installation and usage](#installation-and-usage)
    - [GitHub package](#github-package)
    - [npm module](#npm-module)

## Installation and usage

### GitHub package

1. Download a `.zip` archive with the converter or clone it from GitHub with the following command:

```bash
git clone https://github.com/flexmonster/pivot-xml-report-converter.git
```

The converter is located in the `pivot-xml-report-converter/js/` folder.

2. Use the converter in your project. It can be done as follows:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<!-- Include the converter in your HTML page -->
<script type="text/javascript" src="pivot-xml-report-converter/js/fm-converter.js"></script>
<script type="text/javascript">
const xmlReport = '<config>' +
                    '<dataSource type="csv">' +
                      '<filename>https://cdn.flexmonster.com/data/data.csv</filename>' +
                    '</dataSource>' +
                  '</config>';
let jsonReport = fmCovertXmlReport(xmlReport);
console.log(jsonReport);
</script>
```

Note that the `xmlReport` should have the `String` type. In the `pivot-xml-report-converter/index.js` file, you can find an example of reading a local `.xml` file and passing the `String` data to the converter.

### npm module 

1. Install the converter with the following npm command:

```bash
npm install pivot-xml-report-converter
```

2. Use the converter in your project. It can be done as follows:

```js
let converter = require('pivot-xml-report-converter');
const xmlReport = '<config>' +
                    '<dataSource type="csv">' +
                      '<filename>https://cdn.flexmonster.com/data/data.csv</filename>' +
                    '</dataSource>' +
                  '</config>';
let jsonReport = converter(xmlReport);
console.log(jsonReport);
```

Note that the `xmlReport` should have the `String` type. In the `pivot-xml-report-converter/index.js` file, you can find an example of reading a local `.xml` file and passing the `String` data to the converter.
