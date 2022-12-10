using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Production.Repository.Models;
using Production.Repository;

namespace Production.Controllers;

public class SaleProductController : Controller
{
    [HttpGet]
    [Route("[controller]/GetSaleProduct")]
    public IActionResult GetSaleProduct()
    {
        try
        {
            List<SaleProduct> saleProducts = null;
            using (ProdDbContext prodDbContext = new ProdDbContext())
            {
                saleProducts = prodDbContext.SaleProducts
                    .Include(x=>x.Product)
                    .Include(x=>x.Staff)
                    .ToList();
            }
            return Ok(saleProducts);
        }
        catch (Exception exception)
        {
            return BadRequest("Ошибка запроса!");
        }
    }
    
    [HttpPost]
    [Route("[controller]/AddSale")]
    public IActionResult AddSale([FromBody] SaleProduct product)
    {
        ResponseData answer = new ResponseData();
        try
        {
            using (ProdDbContext context = new ProdDbContext())
            {
                ReadyProduct rp = context.ReadyProducts.Find(product.ProductId);
                rp.Count = rp.Count - product.Count;
                Budget budget = context.Budgets.FirstOrDefault(x => x.Id == 1);
                budget.Budget1 = budget.Budget1 + (rp.Sum*product.Count);
                context.SaleProducts.Add(product);
                context.SaveChanges();
            }
            answer.status = 200;
            answer.text = "Успешно!";
            return Ok(answer);
        }
        catch (Exception exception)
        {
            answer.status = 400;
            answer.text = "Ошибка!";
            return BadRequest(answer);
        }
    }
    
    
    
    
    [HttpPost]
    [Route("[controller]/GetSaleDate")]
    public async Task<ActionResult<List<PurchaseStock>>> GetPStockDate([FromBody] Dates model)
    {
        using (ProdDbContext context = new ProdDbContext())
        {
            List<SaleProduct> result = await context.SaleProducts.FromSql($"SSale {model.date1}, {model.date2}").ToListAsync();
            return Ok(result);
        }
    }
}