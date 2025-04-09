namespace Intex2025.API.Data
{
    public class UserTopPick
    {
        public int user_id { get; set; }
        public string title { get; set; } = null!;
        public int rank { get; set; }
        public string show_id { get; set;}
    }
}
