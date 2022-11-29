using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Production.Repository.Models;

public partial class Post
{
    [Key]
    public int Id { get; set; }

    [Column("post")]
    [StringLength(10)]
    public string Post1 { get; set; } = null!;

    [InverseProperty("Post")]
    [JsonIgnore]
    public virtual ICollection<Staff> Staff { get; } = new List<Staff>();
}
