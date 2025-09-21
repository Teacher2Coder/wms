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
        }
      );

    modelBuilder.Entity<Item>()
      .HasData(
        new Item(1, "SKU001") { Id = 1, SerialNumber = "SKU001-1" },
        new Item(2, "SKU002") { Id = 2, SerialNumber = "SKU002-2" },
        new Item(3, "SKU003") { Id = 3, SerialNumber = "SKU003-3" },
        new Item(4, "SKU004") { Id = 4, SerialNumber = "SKU004-4" },
        new Item(1, "SKU001") { Id = 5, SerialNumber = "SKU001-5" },
        new Item(2, "SKU002") { Id = 6, SerialNumber = "SKU002-6" },
        new Item(3, "SKU003") { Id = 7, SerialNumber = "SKU003-7" },
        new Item(4, "SKU004") { Id = 8, SerialNumber = "SKU004-8" },
        new Item(1, "SKU001") { Id = 9, SerialNumber = "SKU001-9" },
        new Item(2, "SKU002") { Id = 10, SerialNumber = "SKU002-10" },
        new Item(3, "SKU003") { Id = 11, SerialNumber = "SKU003-11" },
        new Item(4, "SKU004") { Id = 12, SerialNumber = "SKU004-12" },
        new Item(1, "SKU001") { Id = 13, SerialNumber = "SKU001-13" },
        new Item(2, "SKU002") { Id = 14, SerialNumber = "SKU002-14" },
        new Item(3, "SKU003") { Id = 15, SerialNumber = "SKU003-15" },
        new Item(4, "SKU004") { Id = 16, SerialNumber = "SKU004-16" }
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
