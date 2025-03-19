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

        public IEnumerable<Book> GetBooks()
        {
            return _bookContext.Books.ToList();
        }
    }
}