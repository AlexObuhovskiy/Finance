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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<StockInfo>().Property(x => x.Quantity).HasPrecision(18, 5);
        modelBuilder.Entity<StockInfo>().Property(x => x.PurchasePrice).HasPrecision(18, 5);
        base.OnModelCreating(modelBuilder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }
}