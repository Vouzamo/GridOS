using System;

namespace Server.Models
{
    public class BackToParentItemType : ItemType
    {
        public BackToParentItemType() : base("Back To Parent")
        {

        }

        public override IAction Invoke(IReference reference, ValueCollection values)
        {
            var parentUrl = Helper.Parent(reference.Layer);

            return new HyperlinkAction(parentUrl);
        }
    }

    public class FolderItemType : ItemType
    {
        public FolderItemType() : base("Folder")
        {
            
        }

        public override IAction Invoke(IReference reference, ValueCollection values)
        {
            return new HyperlinkAction(reference.Layer + reference.Name.ToLower() + '/');
        }
    }
}