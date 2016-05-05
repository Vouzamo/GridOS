using System;

namespace Server.Models
{
    public class Item
    {
        public Guid Id { get; set; }
        public ItemType Type { get; protected set; }
        public ValueCollection Values { get; protected set; }

        public Item(ItemType itemType)
        {
            Id = Guid.NewGuid();
            Type = itemType;
            Values = new ValueCollection();
        }

        public IAction Invoke(IReference reference)
        {
            return Type.Invoke(reference, Values);
        }
    }
}
