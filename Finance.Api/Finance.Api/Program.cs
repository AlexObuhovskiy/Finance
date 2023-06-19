using Finance.Api.Services;
using Finance.Api.Setup;
using Finance.DataModel.DataAccess;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program));

builder.SetupDb<DataContext>();

builder.Services.AddTransient<IStockInfoService, StockInfoService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        b =>
        {
            //you can configure your custom policy
            b.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();