using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MVC_EF2.Models;

namespace MVC_EF2.Controllers
{
    public class MovieController : Controller
    {
        private readonly AppDbContext _context;

        public MovieController(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.Movies.ToListAsync());
        }

        public IActionResult Create()
        {
            ViewBag.Actors = _context.Actors.ToList();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Movie movie, int[] actorIds)
        {
            ModelState.Remove("Actors");

            if (ModelState.IsValid)
            {
                if (actorIds != null)
                {
                    movie.Actors = new List<Actor>();
                    foreach (var id in actorIds)
                    {
                        var actor = await _context.Actors.FindAsync(id);
                        if (actor != null)
                        {
                            movie.Actors.Add(actor);
                        }
                    }
                }

                _context.Movies.Add(movie);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewBag.Actors = _context.Actors.ToList();
            return View(movie);
        }
    }
}
