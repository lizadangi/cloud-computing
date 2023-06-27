function onFormSubmit(e) {
  var formResponse = e.response;
  var itemResponses = formResponse.getItemResponses();

  var respondentEmail = itemResponses[1].getResponse();
  var respondent = itemResponses[0].getResponse();

  var subject = "Thank You for Your Response";
  var message =
    "Dear " +
    respondent +
    ",\n\nThank you for filling out the form. We appreciate your time and feedback.\n\nBest regards\nAslesha Basnet";

  // Send the email
  MailApp.sendEmail({
    to: respondentEmail,
    subject: subject,
    body: message,
  });
}
