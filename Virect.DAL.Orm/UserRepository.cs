using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Virect.Entity.Orm;

namespace Virect.DAL.Orm
{
    public class UserRepository : BaseRepository<User>
    {
        private UserRepository()
        {
            DbConnection = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
        }
        public static UserRepository Instance
        {
            get { return new UserRepository(); }
        }

        public User GetUser(string account, int status = 1)
        {
            return this.Single(a => (a.Email == account || a.MobilePhone == account) && a.Status == status);
        }
    }
}
