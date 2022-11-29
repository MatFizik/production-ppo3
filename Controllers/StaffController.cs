using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Production.Repository.Models;
using Production.Repository;

namespace Production.Controllers;

public class StaffController : Controller
{
    [HttpGet]
    [Route("[controller]/GetStaff")]
    public IActionResult GetStaff()
    {
        try
        {
            List<Staff> staff = null;
            using (ProdDbContext prodDbContext = new ProdDbContext())
            {
                staff = prodDbContext.Staff
                    .Include(x=>x.Post).ToList();
            }
            return Ok(staff);
        }
        catch (Exception exception)
        {
            return BadRequest("Ошибка запроса!");
        }
    }
    
    [HttpPost]
    [Route("[controller]/AddStaff")]
    public IActionResult AddStaff([FromBody] Staff staff)
    {
        ResponseData answer = new ResponseData();
        try
        {
            using (ProdDbContext context = new ProdDbContext())
            {
                context.Staff.Add(staff);
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
    
    [HttpPost]
    [Route("[controller]/EditStaff")]
    public IActionResult EditStaff([FromBody] Staff model)
    {
        ResponseData answer = new ResponseData();
        try
        {
            using (ProdDbContext context = new ProdDbContext())
            {
                Staff staff = context.Staff.Find(model.Id);
                if (staff == null)
                {
                    return NotFound();
                }

                staff.FullName = model.FullName;
                staff.PostId = model.PostId;
                staff.Salary = model.Salary;
                staff.Adress = model.Adress;
                staff.PhoneNumber = model.PhoneNumber;

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