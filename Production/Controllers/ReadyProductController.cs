using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Production.Repository.Models;
using Production.Repository;

namespace Production.Controllers
{
    public class ReadyProductController : Controller
    {
        [HttpGet]
        [Route("[controller]/GetReadyProduct")]
        public IActionResult GetReadyProduct()
        {
            try
            {
                List<ReadyProduct> ReadyProducts = null;
                using (ProdDbContext prodDbContext = new ProdDbContext())
                {
                    ReadyProducts = prodDbContext.ReadyProducts
                        .Include(x => x.Measure).ToList();
                }

                return Ok(ReadyProducts);
            }
            catch (Exception exception)
            {
                return BadRequest("Ошибка запроса!");
            }
        }
        
        [HttpGet]
        [Route("[controller]/GetIngrProduct")]
        public IActionResult GetIngrProduct()
        {
            try
            {
                List<Ingredient> Ingredients = null;
                using (ProdDbContext prodDbContext = new ProdDbContext())
                {
                    Ingredients = prodDbContext.Ingredients
                        .Include(x => x.Feedstock).ToList();
                }

                return Ok(Ingredients);
            }
            catch (Exception exception)
            {
                return BadRequest("Ошибка запроса!");
            }
        }
        
        [HttpPost]
        [Route("[controller]/AddProduct")]
        public IActionResult AddProduct([FromBody] ReadyProduct model)
        {
            ResponseData answer = new ResponseData();
            try
            {
                using (ProdDbContext context = new ProdDbContext())
                {
                    context.ReadyProducts.Add(model);
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
        [Route("[controller]/EditProduct")]
        public IActionResult EditProduct([FromBody] ReadyProduct model)
        {
            ResponseData answer = new ResponseData();
            try
            {
                using (ProdDbContext context = new ProdDbContext())
                {
                    ReadyProduct product = context.ReadyProducts.Find(model.Id);
                    if (product == null)
                    {
                        return NotFound();
                    }

                    product.Name = model.Name;
                    product.MeasureId = model.MeasureId;
                    product.Count = model.Count;
                    product.Sum = model.Sum;

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
}