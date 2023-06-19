using Finance.DataModel.Entities;
using Microsoft.EntityFrameworkCore;
#pragma warning disable CS8618

namespace Finance.DataModel.DataAccess;

public class DataContext : DbContext
{
    public DbSet<StockInfo> StockInfos { get; set; }

    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {

    }

    protected DataContext(DbContextOptions options) : base(options)
    {

    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }
}