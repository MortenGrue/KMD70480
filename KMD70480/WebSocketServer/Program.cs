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
                    Thread.Sleep(1000); //Init can be slow...

                    do
                    {
                        s = reader.ReadLine();
                        Console.WriteLine("Read: " + s);

                        if (s.Contains("Sec-WebSocket-Key:"))
                        {
                            Console.WriteLine(s.Substring(s.IndexOf(':') + 2));
                            key = s.Substring(s.IndexOf(':') + 2);
                            sha.ComputeHash(GetDataStream(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")); //Magic number fra WebSocket doc.
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
                    writer.AutoFlush = false;
                    Console.WriteLine(client.Connected);

                    while (client.Connected && s != "quit")
                    {
                        
                        //s = Console.ReadLine();
                        //   Console.WriteLine("Sent: "+ s +" to the client.)");
                        //writer.WriteLine(new byte[] { (byte)WrapperBytes.Start }, 1, 0); // start with a 0x00

                        //writer.Write(""); // start with a 0x00
                        //writer.Write(s);
                        //writer.Write(((char)WrapperBytes.End)); // end with a 0xFF
                        //writer.Flush();
                        
                        //client.Client.Send(new byte[] { (byte)WrapperBytes.End }, 1, 0); // end with a 0xFF

                        if(client.Client.Available > 0)
                        {
                            byte[] b = new byte[client.Client.Available];
                            client.Client.Receive(b, 0, client.Client.Available, 0);

                            s = DecodeRecivedMsg(b);

                            Console.WriteLine("Recived: " + s);
                        }
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


        public static string DecodeRecivedMsg(byte[] b)
        {
            byte[] decoded = new byte[b.Length - 6];
            byte[] encoded = new byte[b.Length - 6];
            byte[] keys = new byte[4];
            int j = 0;
            int z = 0;
            int y = 0;
            foreach (var item in b)
            {
                if (y < 2) //First 2 are flags.
                {
                }
                else if (y < 6) // next 4 are the key
                {
                    keys[j] = item;
                    j++;
                }
                else //The rest is the massage.
                {
                    encoded[z] = item;
                    z++;
                }
                y++;
            }
            for (int i = 0; i < encoded.Length; i++)
            {
                decoded[i] = (Byte)(encoded[i] ^ keys[i % 4]);
            }
            
            return System.Text.Encoding.UTF8.GetString(decoded);
        }
    }
}
