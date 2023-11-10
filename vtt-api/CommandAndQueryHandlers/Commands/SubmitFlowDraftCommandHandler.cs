using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vtt_Api.CommandAndQueryHandlers.Shared;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Commands;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Domain.Dtos;
using Vtt_Api.Middleware.Authorization;

namespace Vtt_Api.CommandAndQueryHandlers.Commands
{
    [AuthorizeVttHandler("Flow Records", ModuleAction.Add)]
    public class SubmitFlowDraftCommandHandler : AbstractVttRequestHandler<SubmitFlowDraftCommand, int>
    {
        public readonly VttContext _vttContext;
        public SubmitFlowDraftCommandHandler(VttContext vttContext)
        {
            _vttContext = vttContext;
        }
        public async override Task<VttHandlerResponse<int>> Handle(SubmitFlowDraftCommand request, CancellationToken cancellationToken)
        {
            var draft = _vttContext.FlowRegistrationDrafts.FirstOrDefault(x => x.FlowRegistrationDraftId == request.DraftId);
            if (draft == null)
            {
                return NotFound();
            }
            if (!request.VttClaims.UserRegionAssignments.HasSdpAuthorization(draft.SdpId, _vttContext))
            {
                return NotAllowed();
            }
            var userId = int.Parse(request.VttClaims.UserId);
            if (draft.UserId != userId)
            {
                return NotAllowed();
            }

            var flowFormData = new FlowFormData
            {
                GuardianFormData = JsonConvert.DeserializeObject<List<GuardianFormItem>>(draft.SerializedGuardianData),
                ChildFormData = JsonConvert.DeserializeObject<List<ChildFormItem>>(draft.SerializedChildData),
                TravelFormData = JsonConvert.DeserializeObject<TravelFormData>(draft.SerializedTravelerData),
                VaccineFormData = JsonConvert.DeserializeObject<VaccineFormData>(draft.SerializedVaccineData)
            };
            using var transaction = _vttContext.Database.BeginTransaction();
            try
            {
                var flow = new Flow()
                {
                    SdpId = draft.SdpId,
                    AddedByUserId = userId,
                    DateAdded = DateTime.UtcNow,
                    ReasonForTravel = flowFormData.TravelFormData.TravelReason,
                    ComingFromCountryId = flowFormData.TravelFormData.OriginCountryId,
                    ComingFromProvinceId = flowFormData.TravelFormData.OriginProvinceId,
                    ComingFromDistrictId = flowFormData.TravelFormData.OriginDistrictId,
                    ComingFromVillageId = flowFormData.TravelFormData.OriginVillageId,
                    GoingToCountryId = flowFormData.TravelFormData.DestinationCountryId,
                    GoingToProvinceId = flowFormData.TravelFormData.DestinationProvinceId,
                    GoingToDistrictId = flowFormData.TravelFormData.DestinationDistrictId,
                    GoingToVillageId = flowFormData.TravelFormData.DestinationVillageId,
                    ModeOfTransport = (byte)flowFormData.TravelFormData.ModeOfTransport
                };
                _vttContext.Flows.Add(flow);
                _vttContext.SaveChanges();
                if (flowFormData.GuardianFormData.Any())
                {
                    foreach(var item in flowFormData.GuardianFormData)
                    {
                        var Traveler = new Traveler();
                        if(item.TravelerId == null)
                        {
                            Traveler = new Traveler
                            {
                                FirstName = item.FirstName,
                                MiddleName = item.MiddleName,
                                LastName = item.LastName,
                                Address = item.Address,
                                Sex = (byte)item.Sex,
                                NationalityCountryId = item.NationalityCountryId,
                                PhoneNumber = item.PhoneNumber,
                                Dob = item.DateOfBirth
                            };
                            _vttContext.Travelers.Add(Traveler);
                        }
                        else
                        {
                            Traveler = _vttContext.Travelers.FirstOrDefault(x => x.TravelerId.Equals(item.TravelerId));
                        }
                        flow.FlowTravelers.Add(new FlowTraveler() { Traveler = Traveler}); // watch out!!!
                        _vttContext.SaveChanges();
                    }
                }
                if(flowFormData.ChildFormData != null)
                {
                    foreach(var item in flowFormData.ChildFormData)
                    {
                        var child = new Child();
                        if(item.ChildId == null)
                        {
                            child = new Child()
                            {
                                FirstName = item.FirstName,
                                MiddleName = item.MiddleName,
                                LastName = item.LastName,
                                Dob = item.DateOfBirth,
                                Sex = (byte)item.Sex,
                                NationalityCountryId = item.NationalityCountryId,
                                PhotoDataUrl = item.Photo
                            };
                            _vttContext.Children.Add(child);
                        }
                        else
                        {
                            child = _vttContext.Children.FirstOrDefault(x => x.ChildId.Equals(item.ChildId));
                        }
                        flow.FlowChildren.Add(new FlowChild() { Child = child });
                        _vttContext.SaveChanges();
                        /*
                         * TO-DO: Refactor to use with multiple children
                         * 
                        _vttContext.VaccineCardPhotos.Add(new VaccineCardPhoto()
                        {
                            ChildId = child.ChildId,
                            PhotoDataUrl = flowFormData.VaccineFormData.VaccineFormItems.FirstOrDefault(x => x.ChildTempId == item.TempId).CardPhoto
                        });*/
                        _vttContext.SaveChanges();
                    }
                }
                transaction.Commit();
                return Success(flow.FlowId);
            }
            catch 
            {
                transaction.Rollback();
                throw;
            }
        }
    }
}
