using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Production.Repository.Models;

[Table("Feedstock")]
public partial class Feedstock
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
    [Column("costPrice")]
    public double costPrice { get; set; }

    [InverseProperty("Feedstock")]
    [JsonIgnore]
    public virtual ICollection<Ingredient> Ingredients { get; } = new List<Ingredient>();

    [ForeignKey("MeasureId")]
    [InverseProperty("Feedstocks")]
    public virtual Measure Measure { get; set; } = null!;

    [InverseProperty("Feedstock")]
    [JsonIgnore]
    public virtual ICollection<PurchaseStock> PurchaseStocks { get; } = new List<PurchaseStock>();
}
