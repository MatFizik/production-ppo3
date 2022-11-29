using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Production.Repository.Models;
using Production.Repository;

namespace Production.Controllers;

public class IngridientController : Controller
{
    [HttpGet]
    [Route("[controller]/GetIngridients")]
    public IActionResult GetIngridients()
    {
        try
        {
            List<Ingredient> ingredients = null;
            using (ProdDbContext prodDbContext = new ProdDbContext())
            {
                ingredients = prodDbContext.Ingredients
                    .Include(x=>x.Feedstock)
                    .Include(x=>x.ReadyProduct)
                    .ToList();
            }
            return Ok(ingredients);
        }
        catch (Exception exception)
        {
            return BadRequest("Ошибка запроса!");
        }
    }
    
    [HttpPost]
    [Route("[controller]/AddIngridient")]
    public IActionResult AddIngridient([FromBody] Ingredient ingredient)
    {
        ResponseData answer = new ResponseData();
        try
        {
            using (ProdDbContext context = new ProdDbContext())
            {
                context.Ingredients.Add(ingredient);
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
    [Route("[controller]/EditIng")]
    public IActionResult EditIng([FromBody] Ingredient model)
    {
        ResponseData answer = new ResponseData();
        try
        {
            using (ProdDbContext context = new ProdDbContext())
            {
                Ingredient ing = context.Ingredients.Find(model.Id);
                if (ing == null)
                {
                    return NotFound();
                }

                ing.ReadyProductId = model.ReadyProductId;
                ing.FeedstockId = model.FeedstockId;
                ing.Count = model.Count;

                context.SaveChanges();
            }
            answer.status = "200";
            answer.text = "Успешно!";
            return Ok(answer);
        }
        catch (Exception exception)
        {
            answer.status = "500";
            answer.text = "Ошибка!";
            return BadRequest(answer);
        }
    }
}