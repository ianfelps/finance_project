using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    // Interface for token service
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}