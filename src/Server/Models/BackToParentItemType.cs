namespace Server.Models
{
    public class BackToParentItemType : ItemType
    {
        public BackToParentItemType() : base("Back To Parent", "http://findicons.com/files/icons/77/icandy_junior_toolbar/128/back_2.png")
        {

        }

        public override IAction Invoke(IReference reference, ValueCollection values)
        {
            var parentUrl = Helper.Parent(reference.Layer);

            return new HyperlinkAction(parentUrl);
        }
    }
}