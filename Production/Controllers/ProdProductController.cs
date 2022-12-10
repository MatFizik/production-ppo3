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
                List<Ingredient> ingredients = new List<Ingredient>();
                ingredients = context.Ingredients.Where(x => x.ReadyProductId == product.ProductId).ToList();
                
                

                foreach (var ing in ingredients)
                {
                    Feedstock feedstocks = context.Feedstocks.Find(ing.FeedstockId);
                    if ((product.Count * ing.Count) > feedstocks.Count)
                    {
                        answer.status = 411;
                        answer.text = "Недостаточно материала на складе!";
                        return BadRequest(answer);
                    }
                    else
                    {
                        feedstocks.Count = feedstocks.Count - (product.Count * ing.Count);
                    }
                }
                ReadyProduct readyProduct = context.ReadyProducts.Find(product.ProductId);
                readyProduct.Count = readyProduct.Count + product.Count;
                context.ProdProducts.Add(product);
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
    [Route("[controller]/GetProdDate")]
    public async Task<ActionResult<List<ProdProduct>>> GetPStockDate([FromBody] Dates model)
    {
        using (ProdDbContext context = new ProdDbContext())
        {
            List<ProdProduct> result = await context.ProdProducts.FromSql($"PProd {model.date1}, {model.date2}").ToListAsync();
            return Ok(result);
        }
    }
}