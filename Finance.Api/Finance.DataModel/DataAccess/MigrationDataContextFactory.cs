using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Finance.DataModel.DataAccess;

public class MigrationDataContextFactory : IDesignTimeDbContextFactory<DataContext>
{
    public DataContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
        optionsBuilder.UseSqlServer("Server=localhost;Database=FinanceDb;Integrated Security=true;Max Pool Size=1000;TrustServerCertificate=true");

        return new DataContext(optionsBuilder.Options);
    }
}
