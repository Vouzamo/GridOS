using Owin;

namespace Client
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseGrid();
            app.UseStaticFiles();
        }
    }
}
