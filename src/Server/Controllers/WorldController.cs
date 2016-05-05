using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;
using Server.Models;

namespace Server.Controllers
{
    [Route("_api/[controller]")]
    public class WorldController : Controller
    {
        private IList<Reference> References { get; }
        private IList<Item> Items { get; }

        public WorldController()
        {
            // Items
            Items = new List<Item>();

            var image1 = new Item(new ExternalImageItemType());
            image1.Id = Guid.Parse("2584b44a-19ed-444a-998c-938b4c3f62b3");
            image1.Values.Add("image_url", "https://pbs.twimg.com/profile_images/713305214984527872/SmEl2hO3.jpg");

            var backToParent1 = new Item(new BackToParentItemType());
            backToParent1.Id = Guid.Parse("e06af59e-2a85-4856-a4db-22594862b1d8");

            Items.Add(image1);
            Items.Add(backToParent1);

            // References
            References = new List<Reference>();

            References.Add(new Reference("localhost:9000", "/", new Vector2D(0, 1), "Contacts", Guid.Empty));
            References.Add(new Reference("localhost:9000", "/", new Vector2D(1, 0), "Rayman", image1.Id));
            References.Add(new Reference("localhost:9000", "/", new Vector2D(0, -1), "Video", Guid.Empty));
            References.Add(new Reference("localhost:9000", "/", new Vector2D(-1, 0), "Folder", Guid.Empty));

            References.Add(new Reference("localhost:9000", "/contacts/", Vector2D.Zero, "Back", backToParent1.Id));
            References.Add(new Reference("localhost:9000", "/contacts/", new Vector2D(-1, 0), "Charlotte", Guid.Empty));
            References.Add(new Reference("localhost:9000", "/contacts/", new Vector2D(0, 1), "Vanessa", Guid.Empty));
            References.Add(new Reference("localhost:9000", "/contacts/", new Vector2D(1, 0), "Pom", Guid.Empty));
        }

        [HttpPost("references")]
        public IEnumerable<Reference> WorldData(string world, string layer, Vector2D position)
        {
            var layerData = References.Where(m => m.World.Equals(world, StringComparison.OrdinalIgnoreCase) && m.Layer.Equals(layer, StringComparison.OrdinalIgnoreCase));

            var viewport = Rectangle.FromCentre(position.X, position.Y, 32, 18);

            return layerData.Where(m => m.Position.IsBoundedBy(viewport));
        }

        [HttpPost("item")]
        public IAction WorldItem([FromBody] Reference reference)
        {
            var item = Items.SingleOrDefault(x => x.Id == reference.Item);

            return item?.Type.Invoke(reference, item.Values);
        }
    }
}
