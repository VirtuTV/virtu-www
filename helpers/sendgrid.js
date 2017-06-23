export default (userEmail) => {
  let userComment = 
  `Thank you for subscribing for updates to the VirtuTV CrowdSale! We will notify you of any updates regarding the VirtuTV project, and send you reminders periodically leading up to the very first Crowdsale. 

    Sincerely, 
      The VirtuTV Team`

  // let sg = require('sendgrid')(process.env.SENDGRID_API_KEY)
  // let helper = require('sendgrid').mail
  // let fromEmail = new helper.Email('vporta61@gmail.com')
  // let toEmail = new helper.Email(userEmail)
  // let content = new helper.Content('text/plain', userComment)
  // let mail = new helper.Mail(fromEmail, toEmail, content)
  var helper = require('sendgrid').mail;
  var fromEmail = new helper.Email('subscribe@VirtuTV.com');
  var toEmail = new helper.Email(userEmail);
  var subject = 'VirtuTV Notification';
  var content = new helper.Content('text/plain', userComment);
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);

  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function (error, response) {
    if (error) {
      console.log('Error response received');
    }
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });
}
