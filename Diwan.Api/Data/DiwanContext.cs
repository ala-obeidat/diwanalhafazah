using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Diwan.Api.Data
{
    public partial class DiwanContext : DbContext
    {
        public DiwanContext()
        {
        }

        public DiwanContext(DbContextOptions<DiwanContext> options)
            : base(options)
        {
        }

        public virtual DbSet<SavedTransaction> SavedTransactions { get; set; }
        public virtual DbSet<System> Systems { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite("name=DiwanDb");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SavedTransaction>(entity =>
            {
                entity.ToTable("SavedTransaction");

                entity.HasIndex(e => e.Id, "IX_SavedTransaction_Id")
                    .IsUnique();

                entity.Property(e => e.CreatedDate).IsRequired();
            });

            modelBuilder.Entity<System>(entity =>
            {
                entity.ToTable("System");

                entity.HasIndex(e => e.Id, "IX_System_Id")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Password).IsRequired();

                entity.Property(e => e.Username).IsRequired();
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.HasIndex(e => e.Id, "IX_User_Id")
                    .IsUnique();

                entity.Property(e => e.Mobile).IsRequired();

                entity.Property(e => e.Name).IsRequired();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
