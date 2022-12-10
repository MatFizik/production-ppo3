using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Production.Repository.Models;
using Production.Repository;

namespace Production.Controllers;

public class MeasureController : Controller
{
    [HttpGet]
    [Route("[controller]/GetMeasure")]
    public IActionResult GetMeasure()
    {
        try
        {
            List<Measure> measures = null;
            using (ProdDbContext prodDbContext = new ProdDbContext())
            {
                measures = prodDbContext.Measures.ToList();
            }
            return Ok(measures);
        }
        catch (Exception exception)
        {
            return BadRequest("Ошибка запроса!");
        }
    }
    [HttpPost]
    [Route("[controller]/AddMeasure")]
    public IActionResult AddMeasure([FromBody] Measure opject)
    {
        ResponseData answer = new ResponseData();
        try
        {
            using (ProdDbContext context = new ProdDbContext())
            {
                context.Measures.Add(opject);
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
    
    [HttpPost]
    [Route("[controller]/EditMeasure")]
    public IActionResult EditMeasure([FromBody] Measure model)
    {
        ResponseData answer = new ResponseData();
        try
        {
            using (ProdDbContext context = new ProdDbContext())
            {
                Measure measure = context.Measures.Find(model.Id);
                if (measure == null)
                {
                    return NotFound();
                }
                measure.Measure1 = model.Measure1;
                
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