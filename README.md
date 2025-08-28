# XML-to-JSON report converter
[![Flexmonster Pivot Table & Charts](https://cdn.flexmonster.com/landing.png)](https://www.flexmonster.com/?r=github)
Website: [www.flexmonster.com](https://www.flexmonster.com/?r=github)

## Flexmonster Pivot Table & Charts
Flexmonster Pivot is a powerful JavaScript tool for interactive web reporting. It allows you to visualize and analyze data from JSON, CSV, SQL, NoSQL, Elasticsearch, and OLAP data sources fast and conveniently. Flexmonster is designed to integrate seamlessly with any client-side framework and can be easily embedded into your application.

This repository contains the utility for converting Flexmonster reports from old XML format (versions 1.5 through 2.2) to JSON format (version 2.3 and later).
You can also use the converter's online version, which is [available on our website](https://www.flexmonster.com/convert-xml-report/?r=github).

Table of contents:

- [Installation and usage](#installation-and-usage)
- [GitHub package](#github-package)
- [npm module](#npm-module)
- [Support and feedback](#support-and-feedback)
- [Flexmonster licensing](#flexmonster-licensing)
- [Social media](#social-media)

## Installation and usage

### GitHub package

1. Download a `.zip` archive with the converter or clone it from GitHub with the following command:

```bash
git clone https://github.com/flexmonster/pivot-xml-report-converter.git
```

The converter is located in the `js/` folder.

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

Note that the `xmlReport` should have the `String` type. In the `index.js` file, you can find an example of reading a local `.xml` file and passing the `String` data to the converter.

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

Note that the `xmlReport` should have the `String` type. In the `index.js` file, you can find an example of reading a local `.xml` file and passing the `String` data to the converter.

## Support and feedback

In case of any issues, visit our [Troubleshooting](https://www.flexmonster.com/doc/typical-errors?r=github) section. You can also search among the [resolved cases](https://www.flexmonster.com/technical-support?r=github) for a solution to your issue.

To share your feedback or ask questions, contact our Tech team by raising a ticket on our [Help Center](https://www.flexmonster.com/help-center?r=github). You can also find a list of samples, technical specifications, and a user interface guide there.

## Flexmonster licensing

To learn about Flexmonster Pivot licenses, visit the [Flexmonster licensing page](https://www.flexmonster.com/pivot-table-editions-and-pricing?r=github). 
If you want to test our product, we provide a 30-day free trial.

If you need any help with your license, fill out our [Contact form](https://www.flexmonster.com/contact-our-team?r=github), and we will get in touch with you.

## Social media

Follow us on social media and stay updated on our development process!

[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/company/flexmonster) [![YouTube](https://img.shields.io/badge/YouTube-red?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/user/FlexMonsterPivot) [![Twitter](https://img.shields.io/badge/Twitter-blue?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/flexmonster)
