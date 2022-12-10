using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Production.Repository.Models;

[Table("ReadyProduct")]
public partial class ReadyProduct
{
    [Key]
    public int Id { get; set; }

    [Column("name")]
    [StringLength(20)]
    public string Name { get; set; } = null!;

    [Column("measureId")]
    public int MeasureId { get; set; }

    [Column("count")]
    public double Count { get; set; }

    [Column("sum")]
    public double Sum { get; set; }
    
    [Column("cost")]
    public double Cost { get; set; }

    [InverseProperty("ReadyProduct")]
    [JsonIgnore]
    public virtual ICollection<Ingredient> Ingredients { get; } = new List<Ingredient>();

    [ForeignKey("MeasureId")]
    [InverseProperty("ReadyProducts")]
    public virtual Measure Measure { get; set; } = null!;

    [InverseProperty("Product")]
    [JsonIgnore]
    public virtual ICollection<ProdProduct> ProdProducts { get; } = new List<ProdProduct>();

    [InverseProperty("Product")]
    [JsonIgnore]
    public virtual ICollection<SaleProduct> SaleProducts { get; } = new List<SaleProduct>();
}
