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
                var html = string.Format("<img src=\"{0}\" alt=\"{1}\" />", url, reference.Name);

                return new OverlayAction("Image", html);
            }

            throw new Exception();
        }
    }
}