using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SpeedVirect.Controllers
{
    public class SignUpController : Controller
    {
        // GET: SignUp
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Creator()
        {
            return View();
        }

        public ActionResult SignIn()
        {
            return View();
        }
    }
}