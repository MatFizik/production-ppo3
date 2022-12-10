using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Production.Repository.Models;
using Production.Repository;
namespace Production.Controllers;


public class PurchaseStockController : Controller
{
    [HttpGet]
    [Route("[controller]/GetPurchaseStockData")]
    public IActionResult GetPurchaseStockData()
    {
        try
        {
            List<PurchaseStock> purchaseStocks;
            using (ProdDbContext prodDbContext = new ProdDbContext())
            {
                purchaseStocks = prodDbContext.PurchaseStocks
                    .Include(x => x.Feedstock)
                    .Include(x => x.Staff)
                    .ToList();
            }

            return Ok(purchaseStocks);
        }
        catch (Exception exception)
        {
            return BadRequest("Ошибка запроса!");
        }
    }

    [HttpPost]
    [Route("[controller]/AddPurchase")]
    public IActionResult AddPurchase([FromBody] PurchaseStock stock)
    {
        ResponseData answer = new ResponseData();
        try
        {
            using (ProdDbContext context = new ProdDbContext())
            {
                Feedstock fs = context.Feedstocks.Find(stock.FeedstockId);
                fs.Count = fs.Count + stock.Count;
                fs.Sum = fs.Sum + stock.Sum;
                Budget budget = context.Budgets.FirstOrDefault(x => x.Id == 1);
                budget.Budget1 = budget.Budget1 - stock.Sum; 
                context.PurchaseStocks.Add(stock);
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
    [Route("[controller]/GetPStockDate")]
    public async Task<ActionResult<List<PurchaseStock>>> GetPStockDate([FromBody] Dates model)
    {
        using (ProdDbContext context = new ProdDbContext())
        {
            List<PurchaseStock> result = await context.PurchaseStocks.FromSql($"SPStock {model.date1}, {model.date2}").ToListAsync();
            return Ok(result);
        }
    }
}
