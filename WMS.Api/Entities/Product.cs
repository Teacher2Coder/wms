using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS.Api.Entities;

public class Product
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int Id { get; set; }

  [Required]
  [MaxLength(100)]
  public string Sku { get; set; }

  [MaxLength(500)]
  public string? Description { get; set; }

  [ForeignKey("SectionId")]
  public int SectionId { get; set; }

  public Section? Section { get; set; }

  public Product(string sku, int sectionId)
  {
    Sku = sku;
    SectionId = sectionId;
  }
}