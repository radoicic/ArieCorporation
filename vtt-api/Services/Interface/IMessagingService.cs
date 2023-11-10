using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vtt_Api.Services.Interface
{
    public interface IMessagingService
    {
        Task SendSms(string message, string phoneNumber);
        void SendEmail(string[] to, string[] cc, string[] bcc, string subject, string message);
    }
}
