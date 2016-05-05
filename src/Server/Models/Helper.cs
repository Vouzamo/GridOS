using System;

namespace Server.Models
{
    public static class Helper
    {
        public static string Parent(string layer)
        {
            if (layer == "/")
            {
                return layer;
            }

            var parent = layer.Substring(0, layer.LastIndexOf('/'));
            return parent.Substring(0, parent.LastIndexOf('/')) + '/';
        }

        public static bool TryGetValue<T>(this ValueCollection values, string field, out T value)
        {
            var raw = values.RetrieveOne(field);

            try
            {
                value = (T) Convert.ChangeType(raw, typeof(T));
                return true;
            }
            catch
            {
                value = default(T);
            }

            return false;
        }
    }
}