namespace Server.Models
{
    public interface IReference
    {
        string World { get; }
        string Layer { get; }
        Vector2D Position { get; }
        string Name { get; }
    }
}
