using Vtt_Api.Services.Interface;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Net.Mail;
using System.Net;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace Vtt_Api.Services
{
    public class MessagingService : IMessagingService
    {
        public readonly IConfiguration _configuration;
        public MessagingService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendEmail(string[] to, string[] cc, string[] bcc, string subject, string message)
        {
            MailMessage mailMessage = new();
            SmtpClient smtp = new();
            mailMessage.From = new MailAddress(_configuration["EmailConfig:SenderEmail"]);

            SetEmail(mailMessage.To, to);

            if (cc != null)
            {
                SetEmail(mailMessage.CC, cc);
            }

            if (bcc != null)
            {
                SetEmail(mailMessage.Bcc, bcc);
            }
            else
            {
                SetEmail(mailMessage.Bcc, new string[] { _configuration["EmailConfig:SenderEmail"] });
            }

            mailMessage.Subject = subject;
            mailMessage.IsBodyHtml = true; //to make message body as html  
            mailMessage.Body = message;
            mailMessage.BodyEncoding = UTF8Encoding.UTF8;
            smtp.Port = Convert.ToInt32(_configuration["EmailConfig:Port"]);
            smtp.Host = _configuration["EmailConfig:Host"];
            smtp.EnableSsl = true;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(_configuration["EmailConfig:SenderEmail"], _configuration["EmailConfig:SenderCredential"]);
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtp.Send(mailMessage);
        }

        private void SetEmail(MailAddressCollection mailAddresses, string[] mails)
        {
            foreach (string mail in mails)
            {
                mailAddresses.Add(new MailAddress(mail));
            }
        }

        public async Task SendSms(string message, string phoneNumber)
        {
            TwilioClient.Init("AC1027d55f52cf3f71637c1801239f124e", "f74469d6165246bb971544ff0194138b");
            await MessageResource.CreateAsync(
               body: message,
               to: new Twilio.Types.PhoneNumber(phoneNumber),
               from: new Twilio.Types.PhoneNumber("+18556426651")
           );
        }
    }
}
