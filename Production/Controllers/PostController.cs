using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Production.Repository.Models;
using Production.Repository;

namespace Production.Controllers;

public class PostController : Controller
{
        [HttpGet]
        [Route("[controller]/GetPosts")]
        public IActionResult GetPosts()
        {
            try
            {
                List<Post> posts = null;
                using (ProdDbContext prodDbContext = new ProdDbContext())
                {
                    posts = prodDbContext.Posts.ToList();
                }

                return Ok(posts);
            }
            catch (Exception exception)
            {
                return BadRequest("Ошибка запроса!");
            }
        }
        
        [HttpPost]
        [Route("[controller]/EditPost")]
        public IActionResult EditPost([FromBody] Post model)
        {
            ResponseData answer = new ResponseData();
            try
            {
                using (ProdDbContext context = new ProdDbContext())
                {
                    Post post = context.Posts.Find(model.Id);
                    if (post == null)
                    {
                        return NotFound();
                    }
                    post.Post1 = model.Post1;
                
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