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

        [HttpPost("AddUser")]
        public UserInfo AddUser(string UserName, string GoogleName)
        {
            if (dbcontext.UserInfos.Any(c => c.UserName == UserName) == false){
                List<UserInfo> users = new List<UserInfo>();
                UserInfo newUser = new UserInfo();
                newUser.UserName = UserName;
                newUser.GoogleName = GoogleName;
                newUser.Currency = 1;
                newUser.BetterRod = false;
                newUser.CleanWaters = false;
                newUser.FasterReel = false;
                newUser.UserLevel = 1;

                users.Add(newUser);
                dbcontext.UserInfos.Add(newUser);
                dbcontext.SaveChanges();
                return newUser;
            }
            else
            {
                return null;
            }

        }

        [HttpGet("AllUsers")]
        public List<UserInfo> AllUsers()
        {
            return dbcontext.UserInfos.ToList();
        }

        [HttpGet("UserById")]
        public UserInfo UserById(string id)
        {
            UserInfo u = dbcontext.UserInfos.FirstOrDefault(u => u.UserName == id);
            return u;
        }

        [HttpDelete("DeleteCaughtFish")]
        public void DeleteCaughtFish(int id)
        {
            CaughtFish c = dbcontext.CaughtFishes.FirstOrDefault(c => c.Id == id);
            UserInfo u = dbcontext.UserInfos.FirstOrDefault(u => u.UserName == c.UserId);
            u.Currency += c.FishName.Length;
            u.UserLevel = Math.Floor((double)(u.Currency / 1000));
            dbcontext.CaughtFishes.Remove(c);
            dbcontext.UserInfos.Update(u);
            dbcontext.SaveChanges();
        }

        [HttpPut("BuyBetterRod")]
        public void BuyBetterRod(string userId)
        {
            UserInfo u = dbcontext.UserInfos.FirstOrDefault(u => u.UserName == userId);
            u.Currency -= 200;
            u.BetterRod = true;
            dbcontext.UserInfos.Update(u);
            dbcontext.SaveChanges();
        }

        [HttpPut("BuyCleanWaters")]
        public void BuyCleanWaters(string userId)
        {
            UserInfo u = dbcontext.UserInfos.FirstOrDefault(u => u.UserName == userId);
            u.Currency -= 200;
            u.CleanWaters = true;
            dbcontext.UserInfos.Update(u);
            dbcontext.SaveChanges();
        }

        [HttpPut("BuyFasterReel")]
        public void BuyFasterReel(string userId)
        {
            UserInfo u = dbcontext.UserInfos.FirstOrDefault(u => u.UserName == userId);
            u.Currency -= 200;
            u.FasterReel = true;
            dbcontext.UserInfos.Update(u);
            dbcontext.SaveChanges();
        }
    }
}
