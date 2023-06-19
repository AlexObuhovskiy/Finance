using Microsoft.EntityFrameworkCore;

namespace Finance.Api.Setup;

public static class DbSetupExtensions
{
    public static void SetupDb<T>(this WebApplicationBuilder builder) where T : DbContext
    {
        var dbBuilder = new DbContextOptionsBuilder<T>();
        var connectionString = builder.Configuration.GetConnectionString("FinanceDb");
        dbBuilder.UseSqlServer(connectionString);
        using var tenantMigrationContext = Activator.CreateInstance(typeof(T), dbBuilder.Options) as T;
        tenantMigrationContext!.Database.SetCommandTimeout(300);
        tenantMigrationContext.Database.Migrate();

        builder.Services.AddDbContext<T>(opt =>
        {
            opt.UseSqlServer(connectionString);
        });
    }
}