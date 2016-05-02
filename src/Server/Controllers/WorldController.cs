using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Server.Models;

namespace Server.Controllers
{
    [Route("_api/[controller]")]
    public class WorldController : Controller
    {
        IList<Reference> Data { get; set; }

        public WorldController()
        {
            Data = new List<Reference>();

            Data.Add(new Reference("localhost:9000", "/", Vector2D.Zero, "Home", Guid.Empty));
            Data.Add(new Reference("localhost:9000", "/", new Vector2D(0, 1), "Contacts", Guid.Empty));
            Data.Add(new Reference("localhost:9000", "/", new Vector2D(1, 0), "Images", Guid.Empty));
            Data.Add(new Reference("localhost:9000", "/", new Vector2D(0, -1), "Video", Guid.Empty));
            Data.Add(new Reference("localhost:9000", "/", new Vector2D(-1, 0), "Folder", Guid.Empty));
        }

        [HttpPost("data")]
        public IEnumerable<Reference> WorldData(string world, string layer, Vector2D position)
        {
            var layerData = Data.Where(m => m.World.Equals(world, StringComparison.OrdinalIgnoreCase) && m.Layer.Equals(layer, StringComparison.OrdinalIgnoreCase));

            var viewport = Rectangle.FromCentre(position.X, position.Y, 32, 18);

            return layerData.Where(m => m.Position.IsBoundedBy(viewport));
        }
    }
}
