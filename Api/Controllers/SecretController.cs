using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class SecretController : Controller
    {

        [Authorize]
        [Route("/secret")]
        public string Index()
        {
            return "Secret msg from the API";
        }
    }
}