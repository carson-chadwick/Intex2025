namespace Intex2025.API.Data
{
    public class ContentRecommendation
    {
        public string Show_Id { get; set; }
        public string Rec_Id { get; set; } // use this instead of Recommendation_Title
        public int Rank { get; set; }
    }
}
