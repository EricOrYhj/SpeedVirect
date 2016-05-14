using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Virect.Entity.Orm;

namespace Virect.Business.SQL
{
    public class UserBusiness
    {
        public static User GetUser(string account, int status = 1)
        {
            return Virect.DAL.Orm.UserRepository.Instance.GetUser(account, status);
        }
    }
}
