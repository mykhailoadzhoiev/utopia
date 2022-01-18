using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
namespace Utopia.Controllers
{
    [ApiController]
    [Route("api/web3")]
    public class UtopiaWeb3Controller : Controller
    {
        [HttpGet]
        [Route("forTimer")]
        public async Task<string[]> GetForTimer()
        {
            try
            {
                return GlobalValues.ForTimerString;
            }
            catch (Exception ex)
            {
                return Array.Empty<string>();
            }
        }

        [HttpGet]
        [Route("fromTimer")]
        public async Task<string[]> GetFromTimer()
        {
            try
            {
                return GlobalValues.FromTimerString;
            }
            catch (Exception ex)
            {
                return Array.Empty<string>();
            }
        }
    }

    public static class GlobalValues
    {
        public static Stopwatch _fromTimer;
        public static Stopwatch _forTimer;

        public static string[] FromTimerString
        {
            get
            {
                if (_fromTimer == null)
                {
                    return new string[0];
                }
                
                var timer = _fromTimer.Elapsed;
                return new[] { $"{timer.Hours:00}", $"{timer.Minutes:00}", $"{timer.Seconds:00}" };
            }
        }

        public static string[] ForTimerString
        {
            get
            {
                if (!_forTimer.IsRunning)
                {
                    return new string[0];
                }
                
                var fiveHoursSpan = new TimeSpan(3, 21, 0);
                var timer = _forTimer.Elapsed;

                var difference = fiveHoursSpan - timer;

                if (difference.Ticks < 0 && _fromTimer == null && _forTimer.IsRunning)
                {
                    StartFromTimer();
                    _forTimer.Stop();
                }

                return new[] { $"{difference.Hours:00}", $"{difference.Minutes:00}", $"{difference.Seconds:00}" };
            }
        }

        public static void StartFromTimer()
        {
            _fromTimer = new Stopwatch();
            _fromTimer.Start();
        }

        public static void StartForTimer()
        {
            _forTimer = new Stopwatch();
            _forTimer.Start();
        }
    }
}