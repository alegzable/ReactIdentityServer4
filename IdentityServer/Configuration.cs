using System.Collections.Generic;
using IdentityServer4;
using IdentityServer4.Models;

namespace IdentityServer
{
    public static class Configuration
    {
        private static string _clientBaseUrl = "https://localhost:44339";
        private static string _apiName = "Api";

        /// <summary>
        /// User information
        /// Possible scopes that can be requested
        /// </summary>
        public static IEnumerable<IdentityResource> GetIdentityResources() =>
            new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };

        /// <summary>
        /// Resource information
        /// Possible scopes that can be requested
        /// </summary>
        public static IEnumerable<ApiResource> GetApis() => new List<ApiResource>
        {
            new ApiResource(_apiName),
        };

        /// <summary>
        /// Clients config
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<Client> GetClients() => new List<Client>
        {
            new Client
            {
                ClientId = "client_id",
                AllowedGrantTypes = GrantTypes.Code,
                RequirePkce = true,
                RequireClientSecret = false,
                RedirectUris = {$"{_clientBaseUrl}/callback", $"{_clientBaseUrl}/silent-callback"},
                PostLogoutRedirectUris = {_clientBaseUrl},
                AllowedCorsOrigins = {_clientBaseUrl},
                AllowedScopes =
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    _apiName
                },
                AccessTokenLifetime = 65, // 65 seconds for testing silent signin
                AllowAccessTokensViaBrowser = true,
                RequireConsent = false
            }
        };
    }
}