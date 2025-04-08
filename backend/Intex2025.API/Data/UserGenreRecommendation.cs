namespace Intex2025.API.Data
{
    public class UserGenreRecommendation
    {
        public int user_id { get; set; }
        public string genre { get; set; } = null!;
        public string title { get; set; } = null!;
        public int rank { get; set; }
        public string show_id {get; set;}
    }
}
