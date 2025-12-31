using System.Collections.Generic;
using System.Threading.Tasks;
using ExpenseTracker.Application.DTOs;

namespace ExpenseTracker.Application.Interfaces
{
    public interface IExpenseService
    {
        Task<IEnumerable<ExpenseDto>> GetAllExpensesAsync(int userId);
        Task<ExpenseDto?> GetExpenseByIdAsync(int id, int userId);
        Task<ExpenseDto> CreateExpenseAsync(CreateExpenseDto expenseDto, int userId);
        Task UpdateExpenseAsync(int id, CreateExpenseDto expenseDto, int userId);
        Task DeleteExpenseAsync(int id, int userId);
    }
}