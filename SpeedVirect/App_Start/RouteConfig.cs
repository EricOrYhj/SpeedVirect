using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace SpeedVirect
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
               name: "videos/",
               url: "videos/",
               defaults: new { controller = "Video", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
               name: "get-quote/",
               url: "get-quote/",
               defaults: new { controller = "Order", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
               name: "signup/",
               url: "signup/",
               defaults: new { controller = "SignUp", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
               name: "signin/",
               url: "signin/",
               defaults: new { controller = "SignUp", action = "SignIn", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
