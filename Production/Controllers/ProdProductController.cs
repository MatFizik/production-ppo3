using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Production.Repository.Models;
using Production.Repository;
namespace Production.Controllers;

public class ProdProductController : Controller
{
    [HttpGet]
    [Route("[controller]/GetProdProduct")]
    public IActionResult GetProdProduct()
    {
        try
        {
            List<ProdProduct> prodProducts = null;
            using (ProdDbContext prodDbContext = new ProdDbContext())
            {
                prodProducts = prodDbContext.ProdProducts
                    .Include(x=>x.Product)
                    .Include(x=>x.Staff)
                    .ToList();
            }
            return Ok(prodProducts);
        }
        catch (Exception exception)
        {
            return BadRequest("Ошибка запроса!");
        }
    }
    
    [HttpPost]
    [Route("[controller]/AddProd")]
    public IActionResult AddProd([FromBody] ProdProduct product)
    {
        ResponseData answer = new ResponseData();
        try
        {
            using (ProdDbContext context = new ProdDbContext())
            {
                context.ProdProducts.Add(product);
                context.SaveChanges();
            }
            answer.status = "200";
            answer.text = "Успешно!";
            return Ok(answer);
        }
        catch (Exception exception)
        {
            answer.status = "400";
            answer.text = "Ошибка!";
            return BadRequest(answer);
        }
    }
    [HttpPost]
    [Route("[controller]/GetProdDate")]
    public async Task<ActionResult<List<ProdProduct>>> GetPStockDate([FromBody] Dates model)
    {
        using (ProdDbContext context = new ProdDbContext())
        {
            List<ProdProduct> result = await context.ProdProducts.FromSql($"SSale {model.date1}, {model.date2}").ToListAsync();
            return Ok(result);
        }
    }
}