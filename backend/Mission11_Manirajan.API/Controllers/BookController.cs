using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Manirajan.API.Data;

namespace Mission11_Manirajan.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        public BookController(BookDbContext temp) => _bookContext = temp;

        [HttpGet]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1)
        {
            var catalogue = _bookContext.Books
                .Skip((pageNum-1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            var weirdObject = new
            {
                Catalogue = catalogue,
                TotalNumBooks = totalNumBooks
            };

            return Ok(weirdObject);   // Can only return 1 thing. Ok is 200 code
        }
    }
}