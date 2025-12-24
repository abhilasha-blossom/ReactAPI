using System.ComponentModel.DataAnnotations;

namespace MVC_EF2.Models
{
    public class Department
    {
        [Key]
        public int DepartmentId { get; set; }
        public string Name { get; set; }
    }
}
