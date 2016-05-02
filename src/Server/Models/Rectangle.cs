namespace Server.Models
{
    public struct Rectangle
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }

        public int X2 { get { return X + Width; } }
        public int Y2 { get { return Y + Height; } }

        public Rectangle(int x, int y, int width, int height)
        {
            X = x;
            Y = y;
            Width = width;
            Height = height;
        }

        public static Rectangle FromCentre(int x, int y, int halfWidth, int halfHeight)
        {
            return new Rectangle(x - halfWidth, y - halfHeight, halfWidth * 2, halfHeight * 2);
        }
    }
}
