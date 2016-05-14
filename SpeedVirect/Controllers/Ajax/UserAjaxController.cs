using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SpeedVirect.Models.ReciveModel.User;

namespace SpeedVirect.Controllers.Ajax
{
    public class UserAjaxController : ApiController
    {
        public JObject resultObj = new JObject();

        [HttpGet]
        public JObject Login([FromUri] UserLoginRecive Params)
        {
            var user = Virect.Business.SQL.UserBusiness.GetUser(Params.account);

            resultObj.Add("success", user.Password.Equals(Params.password));
            return resultObj;
        }
    }
}
