using Microsoft.EntityFrameworkCore;
using ExpenseTracker.Domain.Entities;

namespace ExpenseTracker.Infrastructure.Data
{
    public class ExpenseDbContext : DbContext
    {
        public ExpenseDbContext(DbContextOptions<ExpenseDbContext> options) : base(options)
        {
        }

        public DbSet<Expense> Expenses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Expense>().Property(e => e.Amount).HasColumnType("decimal(18,2)");
        }
    }
}