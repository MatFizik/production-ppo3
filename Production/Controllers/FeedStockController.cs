using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Production.Repository.Models;
using Production.Repository;

namespace Production.Controllers;

public class FeedStockController : Controller
{
    [HttpGet]
    [Route("[controller]/GetFeedStock")]
    public IActionResult GetFeedStock()
    {
        try
        {
            List<Feedstock> stock = null;
            using (ProdDbContext prodDbContext = new ProdDbContext())
            {
                stock = prodDbContext.Feedstocks
                    .Include(x=>x.Measure).ToList();
            }
            return Ok(stock);
        }
        catch (Exception exception)
        {
            return BadRequest("Ошибка запроса!");
        }
    }
    
    [HttpPost]
    [Route("[controller]/AddFeedStock")]
    public IActionResult AddFeedStock([FromBody] Feedstock stock)
    {
        ResponseData answer = new ResponseData();
        try
        {
            using (ProdDbContext context = new ProdDbContext())
            {
                context.Feedstocks.Add(stock);
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
    [Route("[controller]/EditStock")]
    public IActionResult EditStock([FromBody] Feedstock model)
    {
        ResponseData answer = new ResponseData();
        try
        {
            using (ProdDbContext context = new ProdDbContext())
            {
                Feedstock stock = context.Feedstocks.Find(model.Id);
                if (stock == null)
                {
                    return NotFound();
                }

                stock.Name = model.Name;
                stock.MeasureId = model.MeasureId;
                stock.Count = model.Count;
                stock.Sum = model.Sum;
                stock.costPrice = model.costPrice;

                context.SaveChanges();
            }
            answer.status = 200;
            answer.text = "Успешно!";
            return Ok(answer);
        }
        catch (Exception exception)
        {
            answer.status = 500;
            answer.text = "Ошибка!";
            return BadRequest(answer);
        }
    }
}