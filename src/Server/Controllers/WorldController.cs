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

        private Item BackToParentItem { get; }

        public WorldController()
        {
            // Items
            Items = new List<Item>();

            var image1 = new Item(new ExternalImageItemType());
            image1.Id = Guid.Parse("2584b44a-19ed-444a-998c-938b4c3f62b3");
            image1.Values.Add("image_url", "https://pbs.twimg.com/profile_images/713305214984527872/SmEl2hO3.jpg");

            var video1 = new Item(new ExternalVideoItemType());
            video1.Id = Guid.Parse("c9c45d2d-0fc9-442c-b6f0-f40b59b7d6ad");
            video1.Values.Add("video_id", "kLBDuWvcy7U");
            video1.Values.Add("width", "560");
            video1.Values.Add("height", "315");

            BackToParentItem = new Item(new BackToParentItemType());
            BackToParentItem.Id = Guid.Parse("e06af59e-2a85-4856-a4db-22594862b1d8");

            var childFolder = new Item(new FolderItemType());
            childFolder.Id = Guid.Parse("257c7db9-8d35-4a1a-a0b5-3755f68b8eb1");

            Items.Add(image1);
            Items.Add(video1);
            Items.Add(BackToParentItem);
            Items.Add(childFolder);

            // References
            References = new List<Reference>();

            References.Add(new Reference("*", "/", new Vector2D(0, 1), "Contacts", childFolder));
            References.Add(new Reference("*", "/", new Vector2D(1, 0), "Rayman", image1));
            References.Add(new Reference("*", "/", new Vector2D(0, -1), "Ronnie O'Sullivan", video1));
            References.Add(new Reference("*", "/", new Vector2D(-1, 0), "Empty Folder", childFolder));

            References.Add(new Reference("*", "/contacts/", new Vector2D(-1, 0), "Charlotte", childFolder));
            References.Add(new Reference("*", "/contacts/", new Vector2D(0, 1), "Vanessa", childFolder));
            References.Add(new Reference("*", "/contacts/", new Vector2D(1, 0), "Pom", childFolder));
        }

        [HttpPost("references")]
        public IEnumerable<Reference> WorldData(string world, string layer, Vector2D position)
        {
            var layerData = References.Where(m => (m.World.Equals(world, StringComparison.OrdinalIgnoreCase) || m.World.Equals("*")) && m.Layer.Equals(layer, StringComparison.OrdinalIgnoreCase)).ToList();

            if (layer != "/")
            {
                layerData.Add(new Reference(world, layer, Vector2D.Zero, "Back", BackToParentItem));
            }

            var viewport = Rectangle.FromCentre(position.X, position.Y, 32, 18);

            return layerData.Where(m => m.Position.IsBoundedBy(viewport));
        }

        [HttpPost("item")]
        public IAction WorldItem([FromBody] Reference reference)
        {
            var itemId = reference?.Item;

            var item = Items.SingleOrDefault(x => x.Id == itemId);

            return item?.Type.Invoke(reference, item.Values);
        }
    }
}
