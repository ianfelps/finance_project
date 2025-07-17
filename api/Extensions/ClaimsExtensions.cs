using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace api.Extensions
{
    // Extensions for claims
    public static class ClaimsExtensions
    {
        // Method to get the username from the claims
        public static string GetUsername(this ClaimsPrincipal user)
        {
            return user.Claims
                .SingleOrDefault(x => x.Type.Equals("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"))!.Value;
        }
    }
}