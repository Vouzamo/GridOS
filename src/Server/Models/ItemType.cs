using System;

namespace Server.Models
{
    public abstract class ItemType
    {
        public Guid Id { get; protected set; }
        public string Name { get; protected set; }
        public FieldCollection Fields { get; protected set; }

        protected ItemType(string name)
        {
            Id = Guid.NewGuid();
            Name = name;
            Fields = new FieldCollection();
        }

        public abstract IAction Invoke(IReference reference, ValueCollection values);
    }
}