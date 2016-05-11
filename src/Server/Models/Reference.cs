using System;

namespace Server.Models
{
    public class Reference : IReference
    {
        public string World { get; set; }
        public string Layer { get; set; }
        public Vector2D Position { get; set; }
        public string Name { get; set; }

        public Guid Item { get; set; }
        public string Icon { get; set; }

        public Reference()
        {
            
        }

        public Reference(string world, string layer, Vector2D position, string name, Guid item, string icon)
        {
            World = world;
            Layer = layer;
            Position = position;
            Name = name;
            Item = item;
            Icon = icon;
        }

        public Reference(string world, string layer, Vector2D position, string name, Item item) : this(world, layer, position, name, item.Id, item.Type.Icon)
        {
            
        }
    }
}
