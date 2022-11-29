using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Production.Repository.Models;

[Table("PurchaseStock")]
public partial class PurchaseStock
{
    [Key]
    public int Id { get; set; }

    [Column("feedstockId")]
    public int FeedstockId { get; set; }

    [Column("count")]
    public double Count { get; set; }

    [Column("sum")]
    public double Sum { get; set; }

    [Column("date", TypeName = "datetime")]
    public DateTime Date { get; set; }

    [Column("staffId")]
    public int StaffId { get; set; }

    [ForeignKey("FeedstockId")]
    [InverseProperty("PurchaseStocks")]
    public virtual Feedstock Feedstock { get; set; } = null!;

    [ForeignKey("StaffId")]
    [InverseProperty("PurchaseStocks")]
    public virtual Staff Staff { get; set; } = null!;
}
