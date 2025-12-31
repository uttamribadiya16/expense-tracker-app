using System.Collections.Generic;
using System.Threading.Tasks;
using ExpenseTracker.Application.DTOs;

namespace ExpenseTracker.Application.Interfaces
{
    public interface IExpenseService
    {
        Task<IEnumerable<ExpenseDto>> GetAllExpensesAsync();
        Task<ExpenseDto?> GetExpenseByIdAsync(int id);
        Task<ExpenseDto> CreateExpenseAsync(CreateExpenseDto expenseDto);
        Task UpdateExpenseAsync(int id, CreateExpenseDto expenseDto);
        Task DeleteExpenseAsync(int id);
    }
}