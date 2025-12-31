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

        public async Task<IEnumerable<ExpenseDto>> GetAllExpensesAsync()
        {
            var expenses = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<ExpenseDto>>(expenses);
        }

        public async Task<ExpenseDto?> GetExpenseByIdAsync(int id)
        {
            var expense = await _repository.GetByIdAsync(id);
            return _mapper.Map<ExpenseDto>(expense);
        }

        public async Task<ExpenseDto> CreateExpenseAsync(CreateExpenseDto expenseDto)
        {
            var expense = _mapper.Map<Expense>(expenseDto);
            var createdExpense = await _repository.AddAsync(expense);
            return _mapper.Map<ExpenseDto>(createdExpense);
        }

        public async Task UpdateExpenseAsync(int id, CreateExpenseDto expenseDto)
        {
            var existingExpense = await _repository.GetByIdAsync(id);
            if (existingExpense != null)
            {
                _mapper.Map(expenseDto, existingExpense);
                await _repository.UpdateAsync(existingExpense);
            }
        }

        public async Task DeleteExpenseAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}