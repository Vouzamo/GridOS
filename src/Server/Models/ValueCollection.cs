using System;
using System.Collections.Generic;
using System.Linq;

namespace Server.Models
{
    public class ValueCollection
    {
        protected IList<Value> Values { get; set; }

        public ValueCollection()
        {
            Values = new List<Value>();
        }

        protected IEnumerable<Value> FilteredValues(string fieldName)
        {
            return Values.Where(x => x.FieldName.Equals(fieldName, StringComparison.OrdinalIgnoreCase));
        }

        public void Add<T>(string fieldName, T value)
        {
            var temp = new Value(fieldName, value.ToString());

            Values.Add(temp);
        }

        public bool HasMany(string fieldName)
        {
            return FilteredValues(fieldName).Count() > 1;
        }

        public string RetrieveOne(string fieldName)
        {
            var value = FilteredValues(fieldName).FirstOrDefault();

            return value?.FieldValue;
        }

        public IEnumerable<string> RetrieveMany(string fieldName)
        {
            return FilteredValues(fieldName).Select(x => x.FieldValue);
        }
    }

    public class Value
    {
        public string FieldName { get; }
        public string FieldValue { get; }

        public Value(string fieldName, string fieldValue)
        {
            FieldName = fieldName;
            FieldValue = fieldValue;
        }
    }
}