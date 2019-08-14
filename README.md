# appScripts

Google app Scripts to automate workflow

```
clasp login
clasp pull
clasp push
clasp status
```

Run from UI, or else generate [OAuth token](https://github.com/google/clasp/blob/master/docs/run.md)

Running formulas from app script?

```js
function testFormula() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[1];
  var cell = sheet.getRange("A1");
  cell.setFormula("=QUERY('Sheet0'!A1:B5;\"SELECT A, B\"; 0)");
}
```