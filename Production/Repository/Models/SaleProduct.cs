using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Production.Repository.Models;

[Table("SaleProduct")]
public partial class SaleProduct
{
    [Key]
    public int Id { get; set; }

    [Column("productId")]
    public int ProductId { get; set; }

    [Column("count")]
    public double Count { get; set; }

    [Column("sum")]
    public double Sum { get; set; }

    [Column("date", TypeName = "datetime")]
    public DateTime Date { get; set; }

    [Column("staffId")]
    public int StaffId { get; set; }

    [ForeignKey("ProductId")]
    [InverseProperty("SaleProducts")]
    public virtual ReadyProduct Product { get; set; } = null!;

    [ForeignKey("StaffId")]
    [InverseProperty("SaleProducts")]
    public virtual Staff Staff { get; set; } = null!;
}
