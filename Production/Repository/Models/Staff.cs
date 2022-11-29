using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Production.Repository.Models;

public partial class Staff
{
    [Key]
    public int Id { get; set; }

    [Column("fullName")]
    [StringLength(20)]
    public string FullName { get; set; } = null!;

    [Column("postId")]
    public int PostId { get; set; }

    [Column("salary")]
    [StringLength(10)]
    public string Salary { get; set; } = null!;

    [Column("adress")]
    [StringLength(10)]
    public string Adress { get; set; } = null!;

    [Column("phoneNumber")]
    [StringLength(15)]
    public string PhoneNumber { get; set; } = null!;

    [ForeignKey("PostId")]
    [InverseProperty("Staff")]
    public virtual Post Post { get; set; } = null!;

    [InverseProperty("Staff")]
    [JsonIgnore]
    public virtual ICollection<ProdProduct> ProdProducts { get; } = new List<ProdProduct>();

    [InverseProperty("Staff")]
    [JsonIgnore]
    public virtual ICollection<PurchaseStock> PurchaseStocks { get; } = new List<PurchaseStock>();

    [InverseProperty("Staff")]
    [JsonIgnore]
    public virtual ICollection<SaleProduct> SaleProducts { get; } = new List<SaleProduct>();
}
