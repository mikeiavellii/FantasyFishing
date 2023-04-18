using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FantasyFishing.Models;

public partial class FishDbContext : DbContext
{
    public FishDbContext()
    {
    }

    public FishDbContext(DbContextOptions<FishDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CaughtFish> CaughtFishes { get; set; }

    public virtual DbSet<UserInfo> UserInfos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer($"Server={Secret.serverName}; Initial Catalog=FishDB; User ID={Secret.uname}; Password={Secret.password}; TrustServerCertificate=true;");
    //        => optionsBuilder.UseSqlServer("Data Source=.\\sqlexpress;Initial Catalog=FishDB; Integrated Security=SSPI;Encrypt=false;TrustServerCertificate=True;");
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CaughtFish>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CaughtFi__3214EC077CAF4CB4");

            entity.ToTable("CaughtFish");

            entity.Property(e => e.FishClass).HasMaxLength(100);
            entity.Property(e => e.FishFamily).HasMaxLength(100);
            entity.Property(e => e.FishName).HasMaxLength(100);
            entity.Property(e => e.FishOrder).HasMaxLength(100);
            entity.Property(e => e.Genus).HasMaxLength(100);
            entity.Property(e => e.Species).HasMaxLength(100);
            entity.Property(e => e.UserId).HasColumnName("UserID");
        });

        modelBuilder.Entity<UserInfo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__UserInfo__3214EC0785A05DA9");

            entity.ToTable("UserInfo");

            entity.Property(e => e.BetterRod).HasColumnName("betterRod");
            entity.Property(e => e.CleanWaters).HasColumnName("cleanWaters");
            entity.Property(e => e.FasterReel).HasColumnName("fasterReel");
            entity.Property(e => e.GoogleName).HasMaxLength(60);
            entity.Property(e => e.UserLevel).HasColumnName("userLevel");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
