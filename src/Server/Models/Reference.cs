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
        public bool IsMovable { get; set; }
        public bool IsEditable { get; set; }

        public Reference()
        {
            IsMovable = true;
            IsEditable = true;
        }

        public Reference(string world, string layer, Vector2D position, string name, Guid item, string icon) : this()
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
