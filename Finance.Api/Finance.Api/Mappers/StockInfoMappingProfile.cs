using AutoMapper;
using Finance.Api.Dto.GoogleSheets;
using Finance.Api.Dto.StockInfo;
using Finance.DataModel.Entities;

namespace Finance.Api.Mappers;

public class StockInfoMappingProfile : Profile
{
    public StockInfoMappingProfile()
    {
        CreateMap<StockInfo, StockInfoResponseDto>();

        CreateMap<StockInfoDto, StockInfo>()
            .ForMember(dest => dest.Id, opts => opts.Ignore());

        CreateMap<CurrentStockPrice, StockMarketInfo>()
            .ForMember(dest => dest.UpdateDate, opts => opts.MapFrom(_ => DateTime.UtcNow))
            .ForMember(dest => dest.Id, opts => opts.Ignore());

        CreateMap<StockMarketInfo, CurrentStockPrice>();
    }
}