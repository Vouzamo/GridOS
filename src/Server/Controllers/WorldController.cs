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

            var backToParent = new Item(new BackToParentItemType());
            backToParent.Id = Guid.Parse("e06af59e-2a85-4856-a4db-22594862b1d8");

            var childFolder = new Item(new FolderItemType());
            childFolder.Id = Guid.Parse("257c7db9-8d35-4a1a-a0b5-3755f68b8eb1");

            Items.Add(image1);
            Items.Add(backToParent);
            Items.Add(childFolder);

            // References
            References = new List<Reference>();

            References.Add(new Reference("*", "/", new Vector2D(0, 1), "Contacts", childFolder.Id));
            References.Add(new Reference("*", "/", new Vector2D(1, 0), "Rayman", image1.Id));
            References.Add(new Reference("*", "/", new Vector2D(0, -1), "Video", childFolder.Id));
            References.Add(new Reference("*", "/", new Vector2D(-1, 0), "Folder", childFolder.Id));

            References.Add(new Reference("*", "/contacts/", new Vector2D(-1, 0), "Charlotte", childFolder.Id));
            References.Add(new Reference("*", "/contacts/", new Vector2D(0, 1), "Vanessa", childFolder.Id));
            References.Add(new Reference("*", "/contacts/", new Vector2D(1, 0), "Pom", childFolder.Id));
        }

        [HttpPost("references")]
        public IEnumerable<Reference> WorldData(string world, string layer, Vector2D position)
        {
            var layerData = References.Where(m => (m.World.Equals(world, StringComparison.OrdinalIgnoreCase) || m.World.Equals("*")) && m.Layer.Equals(layer, StringComparison.OrdinalIgnoreCase)).ToList();

            if (layer != "/")
            {
                layerData.Add(new Reference(world, layer, Vector2D.Zero, "Back", Guid.Parse("e06af59e-2a85-4856-a4db-22594862b1d8")));
            }

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
