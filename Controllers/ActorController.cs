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
    public class ActorController : Controller
    {
        private readonly AppDbContext _context;

        public ActorController(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.Actors.ToListAsync());
        }

        public IActionResult Create()
        {
             ViewBag.Movies = _context.Movies.ToList();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Actor actor, int[] movieIds)
        {
             ModelState.Remove("Movies");

            if (ModelState.IsValid)
            {
                if (movieIds != null)
                {
                    actor.Movies = new List<Movie>();
                    foreach (var id in movieIds)
                    {
                        var movie = await _context.Movies.FindAsync(id);
                        if (movie != null)
                        {
                            actor.Movies.Add(movie);
                        }
                    }
                }

                _context.Actors.Add(actor);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewBag.Movies = _context.Movies.ToList();
            return View(actor);
        }
    }
}
