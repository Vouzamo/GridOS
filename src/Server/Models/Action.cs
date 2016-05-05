namespace Server.Models
{
    public abstract class Action : IAction
    {
        public ActionType Type { get; }

        protected Action(ActionType type)
        {
            Type = type;
        }
    }
}