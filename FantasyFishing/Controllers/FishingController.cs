using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FantasyFishing.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FantasyFishing.Controllers
{
    [Route("api/[controller]")]
    public class FishingController : Controller
    {
        FishDbContext dbcontext = new FishDbContext();

        [HttpGet("GetFish")]
        public List<GoodFish> GetFish()
        {
            List<GoodFish> goodFish = new List<GoodFish>();
            List<Fish> theFish = FishingDAL.GetFish();
            foreach (Fish f in theFish)
            {
                string urlJson = JsonConvert.SerializeObject(f.Img_Src_Set);
                string SciJson = JsonConvert.SerializeObject(f.Meta.Scientific_Classification);
                if (SciJson.Contains("{"))
                {
                    GoodFish gf = new GoodFish();
                    gf.Id = f.Id;
                    gf.Name = f.Name;
                    gf.Url = f.Url;
                    gf.Img_Src_Set = JsonConvert.DeserializeObject<ImgLink>(urlJson);
                    gf.Meta = new GoodMeta();
                    gf.Meta.Scientific_Classification = JsonConvert.DeserializeObject<SciClass>(SciJson);
                    goodFish.Add(gf);
                }
            }
            return goodFish;
        }


        [HttpGet("GetCaughtFish")]
        public List<CaughtFish> GetCaughtFish(string userId)
        {
            List<CaughtFish> caughtList = new List<CaughtFish>();
            caughtList = dbcontext.CaughtFishes.Where(c => c.UserId == userId).ToList();
            return caughtList;
        }


        [HttpPost("AddCaughtFish")]
        public CaughtFish AddCaughtFish(string userId, string fishName, string fishImage, string fishClass, string fishOrder, string fishFamily, string genus, string species)
        {
            CaughtFish newCatch = new CaughtFish();
            newCatch.UserId = userId;
            newCatch.FishName = fishName;
            newCatch.FishImage = fishImage;
            newCatch.FishClass = fishClass;
            newCatch.FishOrder = fishOrder;
            newCatch.FishFamily = fishFamily;
            newCatch.Genus = genus;
            newCatch.Species = species;

            dbcontext.CaughtFishes.Add(newCatch);
            dbcontext.SaveChanges();
            return newCatch;
        }


        [HttpDelete("DeleteCaughtFish")]
        public void DeleteCaughtFish(int id)
        {
            CaughtFish c = dbcontext.CaughtFishes.FirstOrDefault(c => c.Id == id);
            dbcontext.CaughtFishes.Remove(c);
            dbcontext.SaveChanges();
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

