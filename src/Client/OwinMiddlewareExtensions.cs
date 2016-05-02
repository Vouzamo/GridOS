using Microsoft.Owin;
using Owin;

namespace Client
{
    public static class OwinMiddlewareExtensions
    {
        public static void UseGrid(this IAppBuilder app)
        {
            app.Use((context, next) =>
            {
                if(IsGridRequest(context))
                {
                    context.Request.Path = new PathString("/_static/index.html");
                }

                return next();
            });
        }

        private static bool IsGridRequest(IOwinContext context)
        {
            return !context.Request.Path.Value.StartsWith("/_static/");
        }
    }
}
