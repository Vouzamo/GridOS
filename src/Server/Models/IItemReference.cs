using System;

namespace Server.Models
{
    public interface IItemReference
    {
        string World { get; }
        string Layer { get; }
        Vector2D Position { get; }
        string Name { get; }
    }

    public interface IAction
    {

    }

    public class HyperlinkAction : IAction
    {
        public string Url { get; protected set; }

        public HyperlinkAction(string url)
        {
            Url = url;
        }
    }

    public class OverlayAction : IAction
    {
        public string Title { get; protected set; }
        public string Html { get; protected set; }

        public OverlayAction(string title, string html)
        {
            Title = title;
            Html = html;
        }
    }

    public class ItemReference : IItemReference
    {
        public string World { get; protected set; }
        public string Layer { get; protected set; }
        public Vector2D Position { get; protected set; }
        public string Name { get; protected set; }
        public Guid Item { get; protected set; }

        public ItemReference(string world, string layer, Vector2D position, string name, Guid item)
        {
            World = world;
            Layer = layer;
            Position = position;
            Name = name;
            Item = item;
        }
    }

    public class FieldCollection
    {

    }

    public class ValueCollection
    {

    }

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

        public abstract IAction Invoke(IItemReference reference, ValueCollection values);
    }

    public static class Helper
    {
        public static string Parent(string layer)
        {
            return string.Empty;
        }

        public static bool TryGetValue<T>(this ValueCollection values, string field, out T value)
        {
            value = default(T);
            return true;
        }
    }

    public class BackToParentItemType : ItemType
    {
        public BackToParentItemType() : base("Back To Parent")
        {

        }

        public override IAction Invoke(IItemReference reference, ValueCollection values)
        {
            var parentUrl = Helper.Parent(reference.Layer);

            return new HyperlinkAction(parentUrl);
        }
    }

    public class ExternalImageItemType : ItemType
    {
        private const string ImageUrlFieldName = "image_url";

        public ExternalImageItemType() : base("Back To Parent")
        {
            Fields.Add(new TextField(ImageUrlFieldName));
        }

        public override IAction Invoke(IItemReference reference, ValueCollection values)
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

    public class GridItem
    {
        public Guid Id { get; protected set; }
        public ItemType Type { get; protected set; }
        public ValueCollection Values { get; protected set; }
    
        public GridItem(ItemType itemType)
        {
            Id = Guid.NewGuid();
            Type = itemType;
            Values = new ValueCollection();
        }

        public IAction Invoke(IItemReference reference)
        {
            return Type.Invoke(reference, Values);
        }
    }
}
