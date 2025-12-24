using System.ComponentModel.DataAnnotations;

namespace MVC_EF2.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }
        public string Name { get; set; }
    }
}
