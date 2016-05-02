using System;
using Microsoft.Owin.Host.HttpListener;

namespace Client
{
    class Program
    {
        static void Main(string[] args)
        {
            var endpoint = "http://localhost:9000";

            using (Microsoft.Owin.Hosting.WebApp.Start<Startup>(endpoint))
            {
                Console.WriteLine("Listening at {0}", endpoint);
                Console.WriteLine("Press any key to quit...");
                Console.ReadLine();
            }
        }
    }
}
