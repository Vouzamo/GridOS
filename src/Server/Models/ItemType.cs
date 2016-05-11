using System;

namespace Server.Models
{
    public abstract class ItemType
    {
        public Guid Id { get; protected set; }
        public string Name { get; protected set; }
        public string Icon { get; protected set; }
        public FieldCollection Fields { get; protected set; }

        protected ItemType(string name, string icon)
        {
            Id = Guid.NewGuid();
            Name = name;
            Icon = icon;
            Fields = new FieldCollection();
        }

        public abstract IAction Invoke(IReference reference, ValueCollection values);
    }
}