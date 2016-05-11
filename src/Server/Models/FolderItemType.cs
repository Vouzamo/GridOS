namespace Server.Models
{
    public class FolderItemType : ItemType
    {
        public FolderItemType() : base("Folder", "http://icons.iconarchive.com/icons/icontexto/elite-folders/256/Open-Folder-icon.png")
        {
            
        }

        public override IAction Invoke(IReference reference, ValueCollection values)
        {
            return new HyperlinkAction(reference.Layer + reference.Name.ToLower() + '/');
        }
    }
}