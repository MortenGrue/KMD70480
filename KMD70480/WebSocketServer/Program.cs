using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Sockets;
using System.Net;
using System.IO;
using System.Threading;

namespace WebSocketServer
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Console running!");
            IPAddress ipAddress = Dns.GetHostAddresses("localhost")[1];

            Console.WriteLine("Ipaddress: " + ipAddress);
            try
            {
                TcpListener listner = new TcpListener(ipAddress, 1337);
                listner.Start();

                TcpClient client = listner.AcceptTcpClient();
                Console.WriteLine("Connected");
                client.Client.Send(GetDataStream("Hello for Server!"));

                while (client.Connected)
                {
                    Random r = new Random();
                    int i = r.Next(5);
                    Thread.Sleep(i);
                    client.Client.Send(GetDataStream("I just wited for: " + i + "Sec. - Are you still there?"));
                }
            }
            catch
            {
                Console.WriteLine("Ups...");
            }
            Console.ReadLine();
        }

        private static byte[] GetDataStream(string s)
        {
            return Convert.FromBase64String(s);
        }
    }
}
