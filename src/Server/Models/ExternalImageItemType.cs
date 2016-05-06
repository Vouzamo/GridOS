using System;

namespace Server.Models
{
    public class ExternalImageItemType : ItemType
    {
        private const string ImageUrlFieldName = "image_url";

        public ExternalImageItemType() : base("External Image")
        {
            Fields.Add(new TextField(ImageUrlFieldName));
        }

        public override IAction Invoke(IReference reference, ValueCollection values)
        {
            string url;

            if (values.TryGetValue(ImageUrlFieldName, out url))
            {
                var html = $"<img src=\"{url}\" alt=\"{reference.Name}\" />";

                return new OverlayAction(reference.Name, html);
            }

            throw new Exception();
        }
    }
}