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
            Random r = new Random();

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
                    if(client.GetStream().DataAvailable)
                    {
                        byte[] b = new byte[1000];
                        client.GetStream().Read(b, 0, 1000);
                        Console.WriteLine("Read: " + System.Text.Encoding.Default.GetString(b) + " From client") ;
                    }
                    string s = Console.ReadLine();
                    Console.WriteLine("Sent: \""+ s +"\" to the client.)");
                    client.Client.Send(GetDataStream(s));
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                Console.WriteLine("Ups...");
            }
            Console.ReadLine();
        }

        private static byte[] GetDataStream(string s)
        {
            return Encoding.ASCII.GetBytes(s);
        }
    }
}
