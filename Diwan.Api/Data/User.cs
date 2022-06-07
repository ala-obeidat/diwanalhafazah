using System;
using System.Collections.Generic;

namespace Diwan.Api.Data
{
    public partial class User
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Mobile { get; set; }
        public long Level { get; set; }
        public long Gender { get; set; }
        public long Age { get; set; }
        public long CurrentPage { get; set; }
        public string Token { get; set; }
        public string LoginDate { get; set; }
    }
}
