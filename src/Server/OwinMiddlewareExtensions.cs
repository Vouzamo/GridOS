using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;

namespace Server
{
    public static class OwinMiddlewareExtensions
    {
        public static void UseGrid(this IApplicationBuilder app)
        {
            app.Use((context, next) =>
            {
                if (IsGridRequest(context))
                {
                    context.Request.Path = new PathString("/_static/index.html");
                }

                return next();
            });
        }

        private static bool IsGridRequest(HttpContext context)
        {
            return !context.Request.Path.Value.StartsWith("/_");
        }
    }
}
