using Microsoft.EntityFrameworkCore;

namespace MVC_EF2.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<Actor> Actors { get; set; }

        public DbSet<MovieActor> MovieActors { get; set; }
        public DbSet<Student> Students { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>()
                .HasMany(m => m.Actors)
                .WithMany(a => a.Movies)
                .UsingEntity<MovieActor>(
                    j => j.HasOne(ma => ma.Actor).WithMany().HasForeignKey(ma => ma.ActorId),
                    j => j.HasOne(ma => ma.Movie).WithMany().HasForeignKey(ma => ma.MovieId));
        }
    }
}
