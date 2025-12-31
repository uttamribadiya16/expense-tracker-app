using AutoMapper;
using ExpenseTracker.Application.DTOs;
using ExpenseTracker.Application.Interfaces;
using ExpenseTracker.Domain.Entities;
using ExpenseTracker.Domain.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExpenseTracker.Application.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly IExpenseRepository _repository;
        private readonly IMapper _mapper;

        public ExpenseService(IExpenseRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ExpenseDto>> GetAllExpensesAsync(int userId)
        {
            var expenses = await _repository.GetAllAsync(userId);
            return _mapper.Map<IEnumerable<ExpenseDto>>(expenses);
        }

        public async Task<ExpenseDto?> GetExpenseByIdAsync(int id, int userId)
        {
            var expense = await _repository.GetByIdAsync(id, userId);
            return _mapper.Map<ExpenseDto>(expense);
        }

        public async Task<ExpenseDto> CreateExpenseAsync(CreateExpenseDto expenseDto, int userId)
        {
            var expense = _mapper.Map<Expense>(expenseDto);
            expense.UserId = userId;
            var createdExpense = await _repository.AddAsync(expense);
            return _mapper.Map<ExpenseDto>(createdExpense);
        }

        public async Task UpdateExpenseAsync(int id, CreateExpenseDto expenseDto, int userId)
        {
            var existingExpense = await _repository.GetByIdAsync(id, userId);
            if (existingExpense != null)
            {
                _mapper.Map(expenseDto, existingExpense);
                await _repository.UpdateAsync(existingExpense);
            }
        }

        public async Task DeleteExpenseAsync(int id, int userId)
        {
            var expense = await _repository.GetByIdAsync(id, userId);
            if (expense != null)
            {
                await _repository.DeleteAsync(id);
            }
        }
    }
}