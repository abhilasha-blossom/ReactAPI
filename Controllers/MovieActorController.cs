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
    public class MovieActorController : Controller
    {
        private readonly AppDbContext _context;

        public MovieActorController(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var movieActors = _context.MovieActors
                .Include(ma => ma.Movie)
                .Include(ma => ma.Actor);
            return View(await movieActors.ToListAsync());
        }

        public IActionResult Create()
        {
            ViewBag.MovieId = new SelectList(_context.Movies, "MovieId", "Title");
            ViewBag.ActorId = new SelectList(_context.Actors, "ActorId", "Name");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,MovieId,ActorId")] MovieActor movieActor)
        {
            if (ModelState.IsValid)
            {
                _context.Add(movieActor);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewBag.MovieId = new SelectList(_context.Movies, "MovieId", "Title", movieActor.MovieId);
            ViewBag.ActorId = new SelectList(_context.Actors, "ActorId", "Name", movieActor.ActorId);
            return View(movieActor);
        }
    }
}
