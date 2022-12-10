using Microsoft.AspNetCore.Mvc;
using Production.Repository.Models;
using Production.Repository;

namespace Production.Controllers;

public class BudgetController : Controller
{
    [HttpGet]
    [Route("[controller]/GetBudget")]
    public IActionResult GetBudget()
    {
        try
        {
            List<Budget> budgets = null;
            using (ProdDbContext prodDbContext = new ProdDbContext())
            {
                budgets = prodDbContext.Budgets.ToList();
            }

            return Ok(budgets);
        }
        catch (Exception exception)
        {
            return BadRequest("Ошибка запроса!");
        }
    }
    
    [HttpPost]
    [Route("[controller]/EditBudget")]
    public IActionResult EditMeasure([FromBody] Budget model)
    {
        ResponseData answer = new ResponseData();
        try
        {
            using (ProdDbContext context = new ProdDbContext())
            {
                Budget budget = context.Budgets.Find(model.Id);
                if (budget == null)
                {
                    return NotFound();
                }
                budget.Budget1 = model.Budget1;
                
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