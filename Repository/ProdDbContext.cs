using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Production.Repository.Models;

namespace Production.Repository;

public partial class ProdDbContext : DbContext
{
    public ProdDbContext()
    {
    }
    
    public ProdDbContext(DbContextOptions<ProdDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Budget> Budgets { get; set; }

    public virtual DbSet<Feedstock> Feedstocks { get; set; }

    public virtual DbSet<Ingredient> Ingredients { get; set; }

    public virtual DbSet<Measure> Measures { get; set; }

    public virtual DbSet<Post> Posts { get; set; }

    public virtual DbSet<ProdProduct> ProdProducts { get; set; }

    public virtual DbSet<PurchaseStock> PurchaseStocks { get; set; }

    public virtual DbSet<ReadyProduct> ReadyProducts { get; set; }

    public virtual DbSet<SaleProduct> SaleProducts { get; set; }

    public virtual DbSet<Staff> Staff { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=HELPER;Initial Catalog=Production;Trust Server Certificate=True;Integrated Security=True;User ID = sa;Password=123;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("SQL_Latin1_General_CP1_CI_AS");

        modelBuilder.Entity<Feedstock>(entity =>
        {
            entity.Property(e => e.Name).IsFixedLength();

            entity.HasOne(d => d.Measure).WithMany(p => p.Feedstocks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Feedstock_Measure");
        });

        modelBuilder.Entity<Ingredient>(entity =>
        {
            entity.HasOne(d => d.Feedstock).WithMany(p => p.Ingredients)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Ingredients_Feedstock");

            entity.HasOne(d => d.ReadyProduct).WithMany(p => p.Ingredients)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Ingredients_ReadyProduct");
        });

        modelBuilder.Entity<Measure>(entity =>
        {
            entity.Property(e => e.Measure1).IsFixedLength();
        });

        modelBuilder.Entity<Post>(entity =>
        {
            entity.Property(e => e.Post1).IsFixedLength();
        });

        modelBuilder.Entity<ProdProduct>(entity =>
        {
            entity.HasOne(d => d.Product).WithMany(p => p.ProdProducts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProdProduct_ReadyProduct");

            entity.HasOne(d => d.Staff).WithMany(p => p.ProdProducts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProdProduct_Staff");
        });

        modelBuilder.Entity<PurchaseStock>(entity =>
        {
            entity.HasOne(d => d.Feedstock).WithMany(p => p.PurchaseStocks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PurchaseStock_Feedstock");

            entity.HasOne(d => d.Staff).WithMany(p => p.PurchaseStocks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PurchaseStock_Staff");
        });

        modelBuilder.Entity<ReadyProduct>(entity =>
        {
            entity.Property(e => e.Name).IsFixedLength();

            entity.HasOne(d => d.Measure).WithMany(p => p.ReadyProducts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ReadyProduct_Measure");
        });

        modelBuilder.Entity<SaleProduct>(entity =>
        {
            entity.HasOne(d => d.Product).WithMany(p => p.SaleProducts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SaleProduct_ReadyProduct");

            entity.HasOne(d => d.Staff).WithMany(p => p.SaleProducts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SaleProduct_Staff");
        });

        modelBuilder.Entity<Staff>(entity =>
        {
            entity.Property(e => e.Adress).IsFixedLength();
            entity.Property(e => e.FullName).IsFixedLength();
            entity.Property(e => e.PhoneNumber).IsFixedLength();
            entity.Property(e => e.Salary).IsFixedLength();

            entity.HasOne(d => d.Post).WithMany(p => p.Staff)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Staff_Posts");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
