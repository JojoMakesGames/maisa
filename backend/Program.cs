using Maisa.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();


app.MapPost("/number-to-words", (NumberToWordsRequest request) =>
{
    List<NumberToWords> wordList = request.Numbers
        .OrderDescending()
        .Select(n => new NumberToWords(n))
        .ToList();
    return wordList;
})
.WithName("ConvertNumberToWords");

app.Run();
