using System;
using System.Collections.Generic;
using System.Linq;

namespace Server.Models
{
    public class FieldCollection
    {
        protected IList<Field> Values { get; set; }

        public FieldCollection()
        {
            Values = new List<Field>();
        }

        public void Add(Field field)
        {
            if (!Values.Any(x => x.FieldName.Equals(field.FieldName, StringComparison.OrdinalIgnoreCase)))
            {
                Values.Add(field);
            }
        }

        public IEnumerable<Field> All()
        {
            return Values;
        }
    }

    public abstract class Field
    {
        public string FieldName { get; protected set; }
        public FieldType Type { get; protected set; }
        public bool IsMandatory { get; protected set; }
        public bool IsMultiValue { get; protected set; }

        protected Field(string fieldName, FieldType type)
        {
            FieldName = fieldName;
            Type = type;
            IsMandatory = false;
            IsMultiValue = false;
        }
    }

    public class TextField : Field
    {
        public TextField(string fieldName) : base(fieldName, FieldType.Text)
        {

        }
    }

    public enum FieldType
    {
        Text,
        Integer,
        Decimal,
        Boolean,
        DateTime,
        Binary
    }
}