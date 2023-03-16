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
            request.Headers.Add("X-RapidAPI-Key", "671e579402mshe540f19948d59f0p12c4a1jsn85fd6c1964c4");
            request.Headers.Add("X-RapidAPI-Host", "fish-species.p.rapidapi.com");
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

