using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using ServiceStack.DataAnnotations;

namespace Virect.Entity.Orm
{
    [Alias("User")]
    public class User
    {
        [AutoIncrement]
        public int AutoId { get; set; }
        private string userId = Guid.NewGuid().ToString();

        public string UserId
        {
            get { return userId; }
            set { userId = value == null ? value : value.ToLower(); }
        }
        public string MobilePhone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public int? Status { get; set; }

        private DateTime? updateTime;

        public DateTime? UpdateTime
        {
            get { return updateTime; }
            set { updateTime = value; }
        }
        private DateTime? createTime;

        public DateTime? CreateTime
        {
            get { return createTime; }
            set { createTime = value; }
        }
    }
}
