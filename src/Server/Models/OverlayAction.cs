namespace Server.Models
{
    public class OverlayAction : Action
    {
        public string Title { get; protected set; }
        public string Html { get; protected set; }

        public OverlayAction(string title, string html) : base(ActionType.Overlay)
        {
            Title = title;
            Html = html;
        }
    }
}