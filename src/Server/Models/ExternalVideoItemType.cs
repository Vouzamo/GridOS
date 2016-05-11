using System;

namespace Server.Models
{
    public class ExternalVideoItemType : ItemType
    {
        private const string VideoIdFieldName = "video_id";
        private const string WidthFieldName = "width";
        private const string HeightFieldName = "height";

        public ExternalVideoItemType() : base("External Video", "https://cdn1.iconfinder.com/data/icons/logotypes/32/youtube-512.png")
        {
            Fields.Add(new TextField(VideoIdFieldName));
            Fields.Add(new IntegerField(WidthFieldName));
            Fields.Add(new IntegerField(HeightFieldName));
        }

        public override IAction Invoke(IReference reference, ValueCollection values)
        {
            string id;

            if (values.TryGetValue(VideoIdFieldName, out id))
            {
                var url = $"https://www.youtube.com/embed/{id}";
                int width;
                int height;

                values.TryGetValue(WidthFieldName, out width);
                values.TryGetValue(HeightFieldName, out height);

                var html = $"<iframe width=\"{width}\" height=\"{height}\" src=\"{url}\" frameborder=\"0\" allowfullscreen /></iframe>";

                return new OverlayAction(reference.Name, html);
            }

            throw new Exception();
        }
    }
}