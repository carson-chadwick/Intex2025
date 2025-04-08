using Microsoft.EntityFrameworkCore;

namespace Intex2025.API.Data
{
    public class RecommendationsContext : DbContext
    {
        public RecommendationsContext(DbContextOptions<RecommendationsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CollaborativeRecommendation> CollabRecs { get; set; }
        public virtual DbSet<ContentRecommendation> ContentRecs { get; set; }
        public virtual DbSet<UserGenreRecommendation> UserHomeGenreRecs { get; set; }
        public virtual DbSet<UserTopPick> UserTopPicks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CollaborativeRecommendation>().ToTable("collab_recs").HasNoKey();
            modelBuilder.Entity<ContentRecommendation>().ToTable("content_recs").HasNoKey();
            modelBuilder.Entity<UserGenreRecommendation>().ToTable("user_home_genre_recs").HasNoKey();
            modelBuilder.Entity<UserTopPick>().ToTable("user_overall_top_picks").HasNoKey();
        }
    }
}
