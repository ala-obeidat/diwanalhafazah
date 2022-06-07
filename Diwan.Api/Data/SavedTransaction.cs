using System;
using System.Collections.Generic;

namespace Diwan.Api.Data
{
    public partial class SavedTransaction
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public string CreatedDate { get; set; }
        public long Page { get; set; }
        public long? Percentage { get; set; }
    }
}
