using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace api.Controllers
{
    // Route prefix to comment
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        // Constructor with dependency injection
        private readonly ICommentRepository _commentRepo;
        private readonly IStockRepository _stockRepo;
        public CommentController(ICommentRepository commentRepo, IStockRepository stockRepo)
        {
            _commentRepo = commentRepo;
            _stockRepo = stockRepo;
        }

        // Route to get all comments
        [HttpGet]
        public async Task<ActionResult> GetAllAsync()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comments = await _commentRepo.GetAllAsync();
            var commentDto = comments.Select(s => s.ToCommentDto());
            return Ok(commentDto);
        }

        // Route to get comment by id
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comment = await _commentRepo.GetByIdAsync(id);
            if (comment == null)
            {
                return NotFound("Comment not found!");
            }
            
            return Ok(comment.ToCommentDto());
        }

        // Route to create a comment
        [HttpPost("{stockId:int}")]
        public async Task<IActionResult> Create([FromRoute] int stockId, [FromBody] CreateCommentDto commentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!await _stockRepo.StockExists(stockId))
            {
                return BadRequest("Stock does not exist!");
            }

            var commentModel = commentDto.ToCommentFromCreateDto(stockId);
            await _commentRepo.CreateAsync(commentModel);
            return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToCommentDto());
        }

        // Route to update a comment
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var commentModel = await _commentRepo.UpdateAsync(id, updateDto.ToCommentFromUpdate());
            if (commentModel == null)
            {
                return NotFound("Comment not found!");
            }

            return Ok(commentModel.ToCommentDto());
        }

        // Route to delete a comment
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var commentModel = await _commentRepo.DeleteAsync(id);
            if (commentModel == null)
            {
                return NotFound("Comment not found!");
            }

            return Ok(commentModel.ToCommentDto());
        }
    }
}