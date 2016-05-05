namespace Server.Models
{
    public class HyperlinkAction : Action
    {
        public string Url { get; protected set; }

        public HyperlinkAction(string url) : base(ActionType.Hyperlink)
        {
            Url = url;
        }
    }
}