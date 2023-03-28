using System;
using System.Net;
using Newtonsoft.Json;

namespace FantasyFishing.Models
{
	public class FishingDAL
	{
		public static List<Fish> GetFish()
		{
            //Setup
            string url = $"https://fish-species.p.rapidapi.com/fish_api/fishes";

            //Request
            HttpWebRequest request = WebRequest.CreateHttp(url);
            request.Headers.Add(Secret.xAPI, Secret.apiKey);
            request.Headers.Add(Secret.apiHost, Secret.apiHostLink);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();

            //Convert it to JSON
            StreamReader reader = new StreamReader(response.GetResponseStream());
			string JSON = reader.ReadToEnd();

            //Adjust here
            //Convert to C#
            List<Fish> result = JsonConvert.DeserializeObject<List<Fish>>(JSON);
            return result;
        }
    }
}

