using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Sockets;
using System.Net;
using System.IO;
using System.Threading;
using System.Security.Cryptography;

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

            string s = string.Empty;
            string key = string.Empty;
            var dict = new Dictionary<string,string>();
            SHA1 sha = new SHA1CryptoServiceProvider();
            try
            {
                TcpListener listner = new TcpListener(ipAddress, 1337);
                listner.Start();

                TcpClient client = listner.AcceptTcpClient();

                Console.WriteLine("Connected");
                
                
                using (var writer = new StreamWriter(client.GetStream()))
                using (var reader = new StreamReader(client.GetStream()))
                {
                    Thread.Sleep(1000);

                    do
                    {
                        s = reader.ReadLine();
                        Console.WriteLine("Read: " + s);

                        if (s.Contains("Sec-WebSocket-Key:"))
                        {
                            Console.WriteLine(s.Substring(s.IndexOf(':') + 2));
                            key = s.Substring(s.IndexOf(':') + 2);
                            sha.ComputeHash(GetDataStream(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"));
                        }

                    } while (!string.IsNullOrEmpty(s));

                    Console.WriteLine("Sha1: " + Convert.ToBase64String(sha.Hash));

                    writer.WriteLine("HTTP/1.1 101 Web Socket Protocol Handshake");
                    writer.WriteLine("Upgrade: WebSocket");
                    writer.WriteLine("Connection: Upgrade");
                    writer.WriteLine("Sec-WebSocket-Accept: " + Convert.ToBase64String(sha.Hash));
                    writer.WriteLine("WebSocket-Origin: http://localhost:1337");
                    writer.WriteLine("WebSocket-Location:  ws://localhost:1337/");
                    writer.WriteLine("");

                    writer.Flush();


                    while (client.Connected && s != "quit")
                    {
                        Console.WriteLine(client.Connected);
                        s = Console.ReadLine();
                        //   Console.WriteLine("Sent: "+ s +" to the client.)");
                        //writer.WriteLine(new byte[] { (byte)WrapperBytes.Start }, 1, 0); // start with a 0x00

                        //writer.Write(((char)WrapperBytes.Start)); // start with a 0x00
                        writer.Write(GetDataStream(s));
                        writer.Write(((char)WrapperBytes.End)); // end with a 0xFF
                        writer.Flush();

                        //client.Client.Send(new byte[] { (byte)WrapperBytes.End }, 1, 0); // end with a 0xFF
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                Console.WriteLine("Ups...");
                throw;
            }
            Console.WriteLine("Closes press enter...");
            Console.ReadLine();
        }

        private static byte[] GetDataStream(string s)
        {
            return Encoding.UTF8.GetBytes(s);
        }


        private enum WrapperBytes : byte { Start = 0, End = 255 };
    }
}
