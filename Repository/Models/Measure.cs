using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Production.Repository.Models;

[Table("Measure")]
public partial class Measure
{
    [Key]
    public int Id { get; set; }

    [Column("measure")]
    [StringLength(10)]
    public string Measure1 { get; set; } = null!;
    [InverseProperty("Measure")]
    [JsonIgnore]
    public virtual ICollection<Feedstock> Feedstocks { get; } = new List<Feedstock>();

    [InverseProperty("Measure")]
    [JsonIgnore]
    public virtual ICollection<ReadyProduct> ReadyProducts { get; } = new List<ReadyProduct>();
}
