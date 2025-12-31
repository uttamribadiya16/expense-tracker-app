using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ExpenseTracker.Application.DTOs;
using ExpenseTracker.Application.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Claims;
using System;

namespace ExpenseTracker.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseService _service;

        public ExpensesController(IExpenseService service)
        {
            _service = service;
        }

        private int GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) throw new UnauthorizedAccessException("Invalid token");
            return int.Parse(userIdClaim.Value);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseDto>>> GetAll()
        {
            var expenses = await _service.GetAllExpensesAsync(GetUserId());
            return Ok(expenses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ExpenseDto>> GetById(int id)
        {
            var expense = await _service.GetExpenseByIdAsync(id, GetUserId());
            if (expense == null) return NotFound();
            return Ok(expense);
        }

        [HttpPost]
        public async Task<ActionResult<ExpenseDto>> Create(CreateExpenseDto dto)
        {
            var created = await _service.CreateExpenseAsync(dto, GetUserId());
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CreateExpenseDto dto)
        {
            await _service.UpdateExpenseAsync(id, dto, GetUserId());
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteExpenseAsync(id, GetUserId());
            return NoContent();
        }
    }
}