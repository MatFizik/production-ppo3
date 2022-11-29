using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Production.Repository.Models;

[Table("Budget")]
public partial class Budget
{
    [Key]
    public int Id { get; set; }

    [Column("budget")]
    public double Budget1 { get; set; }
}
