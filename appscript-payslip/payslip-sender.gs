function processRecords() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Payslip");
  var lastRow = sheet.getLastRow();
  var dataRange = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn());
  var data = dataRange.getValues();

  var processedColumnIndex = sheet.getLastColumn();
  var processedColumnRange = sheet.getRange(
    2,
    processedColumnIndex,
    lastRow - 1
  );

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var employeeName = row[0];
    var employeeEmail = row[1];
    var payslipData = row.slice(2);

    var processedValue = processedColumnRange.getCell(i + 1, 1).getValue();

    if (processedValue === 1) {
      continue;
    }

    try {
      sendPayslipEmail(employeeName, employeeEmail, payslipData);
      processedColumnRange.getCell(i + 1, 1).setValue(1);
    } catch (error) {
      logger.log("Error processing record for", employeeName, error);
      processedColumnRange.getCell(i + 1, 1).setValue("Error");
    }
  }
}

function sendPayslipEmail(employeeName, employeeEmail, payslipData) {
  var subject = "Payslip for " + employeeName;
  var message =
    "Dear " +
    employeeName +
    ",\n\n" +
    "Please find attached your payslip for the current month.\n\n" +
    "Payslip Details:\n" +
    "-------------------\n" +
    payslipData.join("\n") +
    "\nThank you!";

  MailApp.sendEmail({
    to: employeeEmail,
    subject: subject,
    body: message,
  });
}
