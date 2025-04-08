using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Intex2025.API.Data;

public partial class CineRecsContext : DbContext
{
    public CineRecsContext()
    {
    }

    public CineRecsContext(DbContextOptions<CineRecsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CollabRec> CollabRecs { get; set; }

    public virtual DbSet<ContentRec> ContentRecs { get; set; }

    public virtual DbSet<UserHomeGenreRec> UserHomeGenreRecs { get; set; }

    public virtual DbSet<UserOverallTopPick> UserOverallTopPicks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlite("Data Source=cine_recs.sqlite");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CollabRec>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("collab_recs");

            entity.Property(e => e.Rank).HasColumnName("rank");
            entity.Property(e => e.RecId).HasColumnName("rec_id");
            entity.Property(e => e.ShowId).HasColumnName("show_id");
        });

        modelBuilder.Entity<ContentRec>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("content_recs");

            entity.Property(e => e.Rank).HasColumnName("rank");
            entity.Property(e => e.RecId).HasColumnName("rec_id");
            entity.Property(e => e.ShowId).HasColumnName("show_id");
        });

        modelBuilder.Entity<UserHomeGenreRec>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("user_home_genre_recs");

            entity.Property(e => e.Genre).HasColumnName("genre");
            entity.Property(e => e.Rank).HasColumnName("rank");
            entity.Property(e => e.Title).HasColumnName("title");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<UserOverallTopPick>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("user_overall_top_picks");

            entity.Property(e => e.Rank).HasColumnName("rank");
            entity.Property(e => e.Title).HasColumnName("title");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
