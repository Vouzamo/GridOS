using System;

namespace Server.Models
{
    public class Reference : IReference
    {
        public string World { get; protected set; }
        public string Layer { get; protected set; }
        public Vector2D Position { get; protected set; }
        public string Name { get; protected set; }
        public Guid Item { get; protected set; }

        public Reference(string world, string layer, Vector2D position, string name, Guid item)
        {
            World = world;
            Layer = layer;
            Position = position;
            Name = name;
            Item = item;
        }
    }
}
