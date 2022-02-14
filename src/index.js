import sgMail from '@sendgrid/mail';

sgMail.setApiKey('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');
const msg = {
    to: 'leslyesoares@gmail.com', // Change to your recipient
    from: 'leslyesf@outlook.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

sgMail.send(msg)
    .then(() => {
        console.log('Email sent');
    })
    .catch((error) => {
        console.error(error);
    });
