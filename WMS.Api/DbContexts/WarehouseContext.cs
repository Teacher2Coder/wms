using System;
using Microsoft.EntityFrameworkCore;
using WMS.Api.Entities;

namespace WMS.Api.DbContexts;

public class WarehouseContext : DbContext
{
  public WarehouseContext(DbContextOptions<WarehouseContext> options) : base(options)
  {
  }

  public DbSet<Warehouse> Warehouses { get; set; }

  public DbSet<Section> Sections { get; set; }

  public DbSet<Product> Products { get; set; }

  public DbSet<Item> Items { get; set; }

  public DbSet<Order> Orders { get; set; }

  public DbSet<User> Users { get; set; }

  public DbSet<Entities.Action> Actions { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<Warehouse>()
      .HasData(
        new Warehouse("Main Warehouse")
        {
          Id = 1,
          Location = "123 Main St, Springfield",
          Description = "Primary warehouse for storing goods."
        },
        new Warehouse("Secondary Warehouse")
        {
          Id = 2,
          Location = "456 Elm St, Springfield",
          Description = "Secondary warehouse for overflow storage."
        }
      );

    modelBuilder.Entity<Section>()
      .HasData(
        new Section("Main Section", 1)
        {
          Id = 1,
          Description = "Main section for storing goods."
        },
        new Section("Secondary Section", 1)
        {
          Id = 2,
          Description = "Secondary section for overflow storage."
        },
        new Section("Main Section", 2)
        {
          Id = 3,
          Description = "Main section for storing goods."
        },
        new Section("Secondary Section", 2)
        {
          Id = 4,
          Description = "Secondary section for overflow storage."
        },
        new Section("Test Section", 1)
        {
          Id = 5,
          Description = "Test section for items."
        }
      );

    modelBuilder.Entity<Product>()
      .HasData(
        new Product("Product 1", "SKU001")
        {
          Id = 1,
          Description = "Product 1"
        },
        new Product("Product 2", "SKU002")
        {
          Id = 2,
          Description = "Product 2"
        },
        new Product("Product 3", "SKU003")
        {
          Id = 3,
          Description = "Product 3"
        },
        new Product("Product 4", "SKU004")
        {
          Id = 4,
          Description = "Product 4"
        },
        new Product("Test Product", "SKU005")
        {
          Id = 5,
          Description = "Test Product 5"
        }
      );

    modelBuilder.Entity<Item>()
      .HasData(
        new Item(1, "SKU001-1") { Id = 1, SectionId = 1 },
        new Item(2, "SKU002-2") { Id = 2, SectionId = 1 },
        new Item(3, "SKU003-3") { Id = 3, SectionId = 2 },
        new Item(4, "SKU004-4") { Id = 4, SectionId = 2 },
        new Item(1, "SKU001-5") { Id = 5, SectionId = 1 },
        new Item(2, "SKU002-6") { Id = 6, SectionId = 1 },
        new Item(3, "SKU003-7") { Id = 7, SectionId = 2 },
        new Item(4, "SKU004-8") { Id = 8, SectionId = 2 },
        new Item(1, "SKU001-9") { Id = 9, SectionId = 1 },
        new Item(2, "SKU002-10") { Id = 10, SectionId = 1 },
        new Item(3, "SKU003-11") { Id = 11, SectionId = 2 },
        new Item(4, "SKU004-12") { Id = 12, SectionId = 2 },
        new Item(1, "SKU001-13") { Id = 13, SectionId = 1 },
        new Item(2, "SKU002-14") { Id = 14, SectionId = 1 },
        new Item(3, "SKU003-15") { Id = 15, SectionId = 2 },
        new Item(4, "SKU004-16") { Id = 16, SectionId = 2 }
      );

    // Configure User entity
    modelBuilder.Entity<User>(entity =>
    {
      entity.HasIndex(u => u.Username).IsUnique();
      entity.Property(u => u.Role).HasConversion<string>();
    });

    // Configure Action entity
    modelBuilder.Entity<Entities.Action>(entity =>
    {
      entity.HasOne(a => a.User)
            .WithMany()
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.Restrict); // Prevent deletion of users who have logged actions
      
      entity.HasIndex(a => a.Timestamp);
      entity.HasIndex(a => new { a.UserId, a.Timestamp });
      entity.HasIndex(a => new { a.EntityType, a.EntityId });
    });

    // Note: Default users will be created programmatically in Program.cs with proper password hashing
      
    base.OnModelCreating(modelBuilder);
  }
}
