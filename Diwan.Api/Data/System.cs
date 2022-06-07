using System;
using System.Collections.Generic;

namespace Diwan.Api.Data
{
    public partial class System
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public string LoginDate { get; set; }
    }
}
