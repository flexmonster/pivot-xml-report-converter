# Convert XML pivot reports to JSON format

Flexmonster utility to convert old XML pivot reports (versions 1.5-2.2) to new JSON format (version 2.3+).

## Usage

```javascript
var xml = '<config>' +
            '<dataSource type="csv">' +
              '<filename>https://s3.amazonaws.com/flexmonster/2.3/data/data.csv</filename>' +
            '</dataSource>' +
          '</config>';
var json = fmCovertXmlReport(xml);
```
