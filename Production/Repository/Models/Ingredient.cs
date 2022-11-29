using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Production.Repository.Models;

public partial class Ingredient
{
    [Key]
    public int Id { get; set; }

    [Column("readyProductId")]
    public int ReadyProductId { get; set; }

    [Column("feedstockId")]
    public int FeedstockId { get; set; }

    [Column("count")]
    public double Count { get; set; }

    [ForeignKey("FeedstockId")]
    [InverseProperty("Ingredients")]
    
    public virtual Feedstock Feedstock { get; set; } = null!;

    [ForeignKey("ReadyProductId")]
    [InverseProperty("Ingredients")]
    public virtual ReadyProduct ReadyProduct { get; set; } = null!;
}
