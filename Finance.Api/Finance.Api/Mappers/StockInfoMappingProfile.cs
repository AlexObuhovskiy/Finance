using AutoMapper;
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
    }
}