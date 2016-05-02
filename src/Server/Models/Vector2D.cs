namespace Server.Models
{
    public struct Vector2D
    {
        public static Vector2D Zero { get { return new Vector2D(0, 0); } }

        public int X { get; set; }
        public int Y { get; set; }

        public Vector2D(int x, int y)
        {
            X = x;
            Y = y;
        }

        public bool IsBoundedBy(Rectangle bounds)
        {
            var isBoundedByX = X >= bounds.X && X <= bounds.X2;
            var isBoundedByY = Y >= bounds.Y && Y <= bounds.Y2;

            return isBoundedByX && isBoundedByY;
        }
    }
}
