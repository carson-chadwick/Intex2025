namespace Intex2025.API.Data
{
    public class UserGenreRecommendation
    {
        public int User_Id { get; set; }
        public string Genre { get; set; } = null!;
        public string Title { get; set; } = null!;
        public int Rank { get; set; }
    }
}
