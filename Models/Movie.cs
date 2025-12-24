using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MVC_EF2.Models
{
    public class Movie
    {
        [Key]
        public int MovieId { get; set; }

        [Required]
        public string Title { get; set; }

        public ICollection<Actor> Actors { get; set; }
    }
    public class Actor
    {
        [Key]
        public int ActorId { get; set; }

        [Required]
        public string Name { get; set; }

        public ICollection<Movie> Movies { get; set; }
    }
}
