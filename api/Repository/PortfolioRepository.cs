using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    // Repository for portfolios
    public class PortfolioRepository : IPortfolioRepository
    {
        // Constructor with dependency injection
        private readonly ApplicationDBContext _context;
        public PortfolioRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        // Method to create a portfolio
        public async Task<Portfolio> CreateAsync(Portfolio portfolio)
        {
            await _context.Portfolios.AddAsync(portfolio);
            await _context.SaveChangesAsync();
            return portfolio;
        }

        // Method to delete a portfolio
        public async Task<Portfolio> DeletePortfolio(AppUser appUser, string symbol)
        {
            var portfolioModel = await _context.Portfolios.FirstOrDefaultAsync(x => x.AppUserId == appUser.Id && x.Stock!.Symbol.ToLower() == symbol.ToLower());

            if (portfolioModel == null) return null!;

            _context.Portfolios.Remove(portfolioModel);
            await _context.SaveChangesAsync();

            return portfolioModel;
        }

        // Method to get user portfolio
        public async Task<List<Stock>> GetUserPortfolio(AppUser user)
        {
            return await _context.Portfolios
                .Where(p => p.AppUserId == user.Id)
                .Include(p => p.Stock)
                .ThenInclude(s => s!.Comments)
                .ThenInclude(c => c.AppUser)
                .Select(p => p.Stock!)
                .ToListAsync();
        }
    }
}