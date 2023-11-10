﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.Domain.Dtos;

namespace Vtt_Api.CommandsAndQueries.Queries
{
    public class GetTravelerListQuery : VttRequest<List<TravelerListUI>>
    {
        public int pageNumber { get; set; }
        public int pageSize { get; set; }
    }
}
