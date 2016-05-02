using System;

namespace Server.Models
{
    public class Reference
    {
        public string World { get; set; }
        public string Layer { get; set; }
        public Vector2D Position { get; set; }
        public string Name { get; set; }
        public Guid ItemId { get; set; }

        public Reference(string world, string layer, Vector2D position, string name, Guid itemId)
        {
            World = world;
            Layer = layer;
            Position = position;
            Name = name;
            ItemId = itemId;
        }
    }
}
