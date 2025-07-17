using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Comment
{
    // DTO for creating comments
    public class CreateCommentDto
    {
        [Required]
        [MinLength(5, ErrorMessage = "Title must be at least 5 characters long!")]
        [MaxLength(100, ErrorMessage = "Title cannot exceed 100 characters!")]
        public string Title { get; set; } = string.Empty;
        [Required]
        [MinLength(5, ErrorMessage = "Content must be at least 5 characters long!")]
        [MaxLength(280, ErrorMessage = "Content cannot exceed 280 characters!")]
        public string Content { get; set; } = string.Empty;
    }
}