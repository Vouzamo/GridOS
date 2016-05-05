namespace Server.Models
{
    public interface IAction
    {
        ActionType Type { get; }
    }
}