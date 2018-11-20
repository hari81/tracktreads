/* eslint-disable */
import SQLiteManager from '../database/SQLiteManager'
import Util from '../config/Util'
import axios from 'axios'
import APIManager from '../business/APIManager'
import PhotoManager from '../business/PhotoManager'
import mockData from '../__mock_data__/data'

export async function getSyncInspections(inspectionIdList) {

    let syncObject = {}
    let syncArrayInspectionList = []

    for (let i = 0; i < inspectionIdList.length; i++) {

        let syncEquipmentInfo = {}

        // Get logged in user
        await getSyncLoginInfo(syncEquipmentInfo)

        // Get equipment info
        await getSyncEquipmentInfo(1, syncEquipmentInfo)

        // Get jobsite info
        await getSyncJobsiteInfo(1, syncEquipmentInfo)

        // Get component info
        await getSyncComponentInfo(1, syncEquipmentInfo)

        syncArrayInspectionList.push(syncEquipmentInfo)

    }

    syncObject = {
        _equipmentsInspection: syncArrayInspectionList,
        _newEquipments: [],
        _totalEquipments: 1
    }
    console.log(syncObject)

    // Call API to save inspection into DB
    await postInspectionXMLHTTPRequest(syncObject)
    .then((response) => {
        console.log(response)
    })
    .catch(
        (error) => {
            console.log(error)
        }
    )
}

export async function getSyncLoginInfo(syncEquipmentInfo, isNew) {
    await SQLiteManager.selectLoggedIn()    
    .then((response) => {
        if (response != null && response._array.length > 0)
        {
            result = response._array[0];
            if(!!isNew) {
              syncEquipmentInfo._examiner = result.userid;
            } else {
            syncEquipmentInfo.Examiner = result.userid;
            }
        }          
    })
}

export async function getSyncEquipmentInfo(inspectionId, syncEquipmentInfo, isNew) {

    // Get inspection general info
    await SQLiteManager.selectInspection(inspectionId)    
    .then((response) => {

        if (response != null && response._array.length > 0)
        {
            let inspectionInfo = response._array[0]

            if(!!isNew) {
              // new Equipment info
      
              syncEquipmentInfo._base64Image = !inspectionInfo.image ? "" : inspectionInfo.image;
              syncEquipmentInfo._creationDate = Util.Functions.getSyncDateTime(); 
              syncEquipmentInfo._customer = inspectionInfo.customer;
              syncEquipmentInfo._customerAuto = inspectionInfo.customer_auto;
              syncEquipmentInfo._equipmentId = inspectionInfo.equipmentid_auto;
              syncEquipmentInfo._imageRes = 0,
              syncEquipmentInfo._inspectionId = inspectionId;
              syncEquipmentInfo._isNew = inspectionInfo.is_create_new;
              syncEquipmentInfo._ischecked = 1;
              syncEquipmentInfo._jobsite = inspectionInfo.jobsite;
              syncEquipmentInfo._jobsiteAuto = 7;
              syncEquipmentInfo._model = inspectionInfo.model;
              syncEquipmentInfo._modelAuto = 0;
              syncEquipmentInfo._serialno = inspectionInfo.serialno;
              syncEquipmentInfo._smu = inspectionInfo.currentsmu;
              syncEquipmentInfo._status = inspectionInfo.status;
              syncEquipmentInfo._trammingHours = 0;
              syncEquipmentInfo._travelHoursForwardKm = 0;
              syncEquipmentInfo._travelHoursForwardHr = 
                  Util.Functions.validateNumber(inspectionInfo.travel_forward)
                      ? inspectionInfo.travel_forward
                      : 0
              syncEquipmentInfo._travelHoursReverseKm = 0;
              syncEquipmentInfo._travelHoursReverseHr = 
                  Util.Functions.validateNumber(inspectionInfo.travel_reverse)
                      ? inspectionInfo.travel_reverse
                      : 0
                                 
              syncEquipmentInfo._travelledByKms = false 
              syncEquipmentInfo._unitno = inspectionInfo.unitno;

            } else {
            ///////////////////
            // GENERAL INFO for existing equip
            syncEquipmentInfo.EquipmentIdAuto = inspectionInfo.equipmentid_auto
            syncEquipmentInfo.InspectionDate = Util.Functions.getSyncDateTime()
            syncEquipmentInfo.SMU = inspectionInfo.currentsmu
            syncEquipmentInfo.SerialNo = inspectionInfo.serialno
            syncEquipmentInfo.travelForward = 
                Util.Functions.validateNumber(inspectionInfo.travel_forward)
                    ? inspectionInfo.travel_forward
                    : 0
            syncEquipmentInfo.travelReverse = 
                Util.Functions.validateNumber(inspectionInfo.travel_reverse)
                    ? inspectionInfo.travel_reverse
                    : 0
            //syncEquipmentInfo.travelledByKms = false                    // !!!!!!
            
            }
        }     
    })
}

export async function getSyncJobsiteInfo(inspectionId, syncEquipmentInfo, isNew) {

  // Get inspection general info
  await SQLiteManager.selectJobsiteRecord(inspectionId)    
  .then( async (response) => {
    if (response != null && response._array.length > 0) {
      let jobsiteInfo = response._array[0]

        ///////////////////
        // JOSBITE INFO
        // syncEquipmentInfo.Impact = jobsiteInfo.impact
        // syncEquipmentInfo.Abrasive = jobsiteInfo.abrasive
        // syncEquipmentInfo.Moisture = jobsiteInfo.moisture
        // syncEquipmentInfo.Packing = jobsiteInfo.packing
        // syncEquipmentInfo.TrackSagLeft = 
        //     Util.Functions.validateNumber(jobsiteInfo.track_sag_left)
        //         ? jobsiteInfo.track_sag_left
        //         : 0.0
        // syncEquipmentInfo.TrackSagRight = 
        //     Util.Functions.validateNumber(jobsiteInfo.track_sag_right)
        //         ? jobsiteInfo.track_sag_right
        //         : 0.0
        // syncEquipmentInfo.DryJointsLeft = 
        //     Util.Functions.validateNumber(jobsiteInfo.dry_joints_left)
        //         ? jobsiteInfo.dry_joints_left
        //         : 0.0
        // syncEquipmentInfo.DryJointsRight = 
        //     Util.Functions.validateNumber(jobsiteInfo.dry_joints_right)
        //         ? jobsiteInfo.dry_joints_right
        //         : 0.0
        // syncEquipmentInfo.ExtCannonLeft = 
        //     Util.Functions.validateNumber(jobsiteInfo.ext_cannon_left)
        //         ? jobsiteInfo.ext_cannon_left
        //         : 0.0
        // syncEquipmentInfo.ExtCannonRight = 
        //     Util.Functions.validateNumber(jobsiteInfo.ext_cannon_right)
        //         ? jobsiteInfo.ext_cannon_right
        //         : 0.0
        // syncEquipmentInfo.JobsiteComments = jobsiteInfo.jobsite_note
        // syncEquipmentInfo.InspectorComments = jobsiteInfo.inspector_note
        // syncEquipmentInfo.leftTrackSagComment = jobsiteInfo.track_sag_left_comment
        // syncEquipmentInfo.rightTrackSagComment = jobsiteInfo.track_sag_right_comment
        // syncEquipmentInfo.leftCannonExtComment = jobsiteInfo.ext_cannon_left_comment
        // syncEquipmentInfo.rightCannonExtComment = jobsiteInfo.ext_cannon_right_comment
        // await PhotoManager.resizePhoto(jobsiteInfo.track_sag_left_image)
        //     .then((base64response) => {
        //         syncEquipmentInfo.leftTrackSagImage = base64response
        //     })
        //     .catch((error) => {
        //         syncEquipmentInfo.leftTrackSagImage = null
        //     })
        // await PhotoManager.resizePhoto(jobsiteInfo.track_sag_right_image)
        //     .then((base64response) => {
        //         syncEquipmentInfo.rightTrackSagImage = base64response
        //     })
        //     .catch((error) => {
        //         syncEquipmentInfo.rightTrackSagImage = null
        //     })
        // await PhotoManager.resizePhoto(jobsiteInfo.ext_cannon_left_image)
        //     .then((base64response) => {
        //         syncEquipmentInfo.leftCannonExtImage = base64response
        //     })
        //     .catch((error) => {
        //         syncEquipmentInfo.leftCannonExtImage = null
        //     })
        // await PhotoManager.resizePhoto(jobsiteInfo.ext_cannon_right_image)
        //     .then((base64response) => {
        //         syncEquipmentInfo.rightCannonExtImage = base64response
        //     })
        //     .catch((error) => {
        //         syncEquipmentInfo.rightCannonExtImage = null
        //     })
        // syncEquipmentInfo.leftScallop =
        //     Util.Functions.validateNumber(jobsiteInfo.scallop_left)
        //         ? jobsiteInfo.scallop_left
        //         : 0
        // syncEquipmentInfo.rightScallop = 
        //     Util.Functions.validateNumber(jobsiteInfo.scallop_right)
        //         ? jobsiteInfo.scallop_right
        //         : 0

        const jobsiteObj = {
          Impact: jobsiteInfo.impact,
          Abrasive: jobsiteInfo.abrasive,
          Moisture: jobsiteInfo.moisture,
          Packing: jobsiteInfo.packing,
          TrackSagLeft:
            Util.Functions.validateNumber(jobsiteInfo.track_sag_left)
                ? jobsiteInfo.track_sag_left
                : 0.0,
          TrackSagRight:
            Util.Functions.validateNumber(jobsiteInfo.track_sag_right)
                ? jobsiteInfo.track_sag_right
                : 0.0,
          DryJointsLeft:
            Util.Functions.validateNumber(jobsiteInfo.dry_joints_left)
                ? jobsiteInfo.dry_joints_left
                : 0.0,
          DryJointsRight:
            Util.Functions.validateNumber(jobsiteInfo.dry_joints_right)
                ? jobsiteInfo.dry_joints_right
                : 0.0,
          ExtCannonLeft:
            Util.Functions.validateNumber(jobsiteInfo.ext_cannon_left)
                ? jobsiteInfo.ext_cannon_left
                : 0.0,
          ExtCannonRight:
            Util.Functions.validateNumber(jobsiteInfo.ext_cannon_right)
                ? jobsiteInfo.ext_cannon_right
                : 0.0,
          JobsiteComments: jobsiteInfo.jobsite_note,
          InspectorComments: jobsiteInfo.inspector_note,
          leftTrackSagComment: jobsiteInfo.track_sag_left_comment,
          rightTrackSagComment: jobsiteInfo.track_sag_right_comment,
          leftCannonExtComment: jobsiteInfo.ext_cannon_left_comment,
          rightCannonExtComment: jobsiteInfo.ext_cannon_right_comment,
          leftScallop:
            Util.Functions.validateNumber(jobsiteInfo.scallop_left)
                ? jobsiteInfo.scallop_left
                : 0,
          rightScallop:
            Util.Functions.validateNumber(jobsiteInfo.scallop_right)
                ? jobsiteInfo.scallop_right
                : 0
          }

          await PhotoManager.resizePhoto(jobsiteInfo.track_sag_left_image)
            .then((base64response) => {
                 jobsiteObj.leftTrackSagImage = base64response
              })
            .catch((error) => {
                jobsiteObj.leftTrackSagImage = null
              });
          await PhotoManager.resizePhoto(jobsiteInfo.track_sag_right_image)
            .then((base64response) => {
                jobsiteObj.rightTrackSagImage = base64response
              })
            .catch((error) => {
                jobsiteObj.rightTrackSagImage = null
              });
          await PhotoManager.resizePhoto(jobsiteInfo.ext_cannon_left_image)
            .then((base64response) => {
                jobsiteObj.leftCannonExtImage = base64response
              })
            .catch((error) => {
                jobsiteObj.leftCannonExtImage = null
              });
          await PhotoManager.resizePhoto(jobsiteInfo.ext_cannon_right_image)
            .then((base64response) => {
                jobsiteObj.rightCannonExtImage = base64response
              })
            .catch((error) => {
                  jobsiteObj.rightCannonExtImage = null
              });

        if( !!isNew ) {
          jobsiteObj.EquipmentIdAuto = syncEquipmentInfo._equipmentId;
          jobsiteObj.Examinar = syncEquipmentInfo._examiner;
          jobsiteObj.InspectionDate = syncEquipmentInfo._creationDate;
          jobsiteObj.SMU = syncEquipmentInfo._smu;
          jobsiteObj.leftDryJointsComment = jobsiteInfo.dry_joints_left_comment;
          jobsiteObj.leftDryJointsImage = jobsiteInfo.dry_joints_left_image;
          jobsiteObj.leftScallopComment = jobsiteInfo.scallop_left_comment;
          jobsiteObj.leftScallopImage = jobsiteInfo.scallop_left_image;
          jobsiteObj.rightDryJointsComment = jobsiteInfo.dry_joints_right_comment;
          jobsiteObj.rightDryJointsImage = jobsiteInfo.dry_joints_right_image;
          jobsiteObj.rightScallopComment = jobsiteInfo.scallop_right_comment;
          jobsiteObj.rightScallopImage = jobsiteInfo.scallop_right_image;
          jobsiteObj.travelForward = syncEquipmentInfo._travelHoursForwardHr;
          jobsiteObj.travelForwardKm = syncEquipmentInfo._travelHoursForwardKm;
          jobsiteObj.travelReverse = syncEquipmentInfo._travelHoursReverseHr;
          jobsiteObj.travelReverseKm = syncEquipmentInfo._travelHoursReverseKm;
          jobsiteObj.travelledByKms = false;
          const _equipmentInspection = jobsiteObj;
          Object.assign(syncEquipmentInfo, { _equipmentInspection });
        } else {
          Object.assign(syncEquipmentInfo, jobsiteObj);
        }
      }
    })
}

export async function getSyncComponentInfo(inspectionId, syncEquipmentInfo, isNew) {

    let syncDetails = []

    // Get components info
    await SQLiteManager.selectComponents(inspectionId)    
    .then(async (response) => {
        if (response != null && response._array.length > 0)
        {   
            let componentList = response._array
            for (let i = 0; i < componentList.length; i++) {

                // Component
                let currComponent = componentList[i]
                
                // Create sync object
                let details = {}

                // details.CompartIdAuto = currComponent.compartid_auto
                details.Comments = currComponent.comments
                // await PhotoManager.resizePhoto(currComponent.inspection_image)
                //     .then((base64response) => {
                //         details.Image = base64response
                //     })
                //     .catch((error) => {
                //         details.Image = null
                //     });
                if((details.Comments != null || details.Image != null) 
                    && !Util.Functions.validateString(currComponent.reading))
                    details.Reading = '0'
                else
                    details.Reading = currComponent.reading;
             
             
                details.FlangeType = currComponent.flange_type;

                // add Recommondations
                if(!!currComponent.recommendation_id) {
                    details.ActionType = currComponent.recommendation_id;
                }
                details.RecommendationComments = currComponent.recommendation_comment;
                if( !!isNew ) {
                  details.Tool = currComponent.tool;
                  details.CompartIdAuto = 0;
                  details.Compart = currComponent.compart;
                  details.Compartid = currComponent.compartid_auto;
                  details.CompType = currComponent.inspection_id;
                  details.EquipmentidAuto = currComponent.equipmentid_auto;
                  details.EqunitAuto = 0;
                  details.Side = currComponent.side;
                  details.Pos = currComponent.position;
                } else {
                  details.CompartIdAuto = currComponent.compartid_auto
                  details.TrackUnitAuto = currComponent.equnit_auto;
                  details.PercentageWorn = 
                  Util.Functions.validateNumber(currComponent.worn_percentage)
                      ? currComponent.worn_percentage
                      : -1;

                  details.ToolUsed = currComponent.tool;
                  details.AttachmentType = (currComponent.side === "Left" ? 3 : 4);
                  await PhotoManager.resizePhoto(currComponent.inspection_image)
                    .then((base64response) => {
                        details.Image = base64response
                    })
                    .catch((error) => {
                        details.Image = null
                    });
              }
              
                syncDetails.push(details);
          }
        }          
    })

    // Update
    if( !!isNew ) {
      syncEquipmentInfo._details = syncDetails;
    } else {
      syncEquipmentInfo.Details = syncDetails;
    }
}


export async function getSyncNewComponentInfo(inspectionId, syncEquipmentInfo) {

  let syncDetails = []

  // Get components info
  await SQLiteManager.selectComponents(inspectionId)    
  .then(async (response) => {
      if (response != null && response._array.length > 0)
      {   
          let componentList = response._array
          for (let i = 0; i < componentList.length; i++) {

              // Component
              let currComponent = componentList[i]
              
              // Create sync object
              let details = {}

              // details.CompartIdAuto = currComponent.compartid_auto
              details.Comments = currComponent.comments
               await PhotoManager.resizePhoto(currComponent.inspection_image)
                    .then((base64response) => {
                        details.Image = base64response
                    })
                    .catch((error) => {
                        details.Image = null
                    });

              if((details.Comments != null || details.Image != null) 
                  && !Util.Functions.validateString(currComponent.reading))
                  details.Reading = '0'
              else
                  details.Reading = currComponent.reading;
           
           
              details.FlangeType = currComponent.flange_type;

              // add Recommondations
              if(!!currComponent.recommendation_id) {
                  details.ActionType = currComponent.recommendation_id;
              }
              details.RecommendationComments = currComponent.recommendation_comment;
             
                details.CompartIdAuto = currComponent.compartid_auto
                details.TrackUnitAuto = currComponent.equnit_auto;
                details.PercentageWorn = 
                Util.Functions.validateNumber(currComponent.worn_percentage)
                    ? currComponent.worn_percentage
                    : 0;

                details.ToolUsed = currComponent.tool;
                details.AttachmentType = (currComponent.side === "Left" ? 3 : 4);
           
            
              syncDetails.push(details);
        }
      }
      if(!syncEquipmentInfo._equipmentInspection) {
        syncEquipmentInfo._equipmentInspection = {};
      }
      syncEquipmentInfo._equipmentInspection.Details = syncDetails;
  })

  // Update
  //syncEquipmentInfo._equipmentInspection.Details = syncDetails;
}

export async function postInspectionXMLHTTPRequest(syncObj) {

    let apiUrl = Util.Functions.getServiceUrl() + Util.ConstantHelper.api_SaveEquipmentsInspectionsData;
    // console.log(apiUrl)
    let string = JSON.stringify(syncObj)
    // console.log('data', string);
    return new Promise(function(resolve, reject) {
        var x = new XMLHttpRequest()
        x.open('POST', apiUrl, true)
        x.setRequestHeader('Content-type','application/json; charset=utf-8')
        x.setRequestHeader("Content-length", string.length)
        x.setRequestHeader("Connection", "close")
        x.onreadystatechange = function() {
            if (x.readyState != 4) return
            if (x.status != 200 && x.status != 304) {
                reject(x.status)
            }
            resolve(x.response)
        }
        x.ontimeout = function () {
            reject('timeout')
        }
        x.send(string)
    })
}

export async function getSyncResult(inspectionId, response) {
    
    let syncResult = 0  // Failed
    // let responseId = response[0].Id
    // console.log('res suc', response[0]);
    if (response[0].OperationSucceed) {

        // Sync succeeded
        await SQLiteManager.updateInspectionStatus(inspectionId, 'synced')
        .then(
            (response) => {
                // console.log(response)
            }
        )
        syncResult = 1
    }
    
    return syncResult
}

export async function postInspectionFetch(syncObj) {
    try {
        let apiUrl = Util.Functions.getServiceUrl() + Util.ConstantHelper.api_SaveEquipmentsInspectionsData;
        console.log(apiUrl)
        let string = JSON.stringify(syncObj);   

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: string
        });
        //const responseJson = await response.json();
        const responseJson = await response
        .then((response) => {
            // console.log('1111111111111111111111')
            // console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })

        return responseJson;
    } catch (error) {
        // console.log('2222222222222222222222')
        // console.log(error);
        return false;
    }
}

export async function postInspectionAxios(syncObj) {

    let apiUrl = Util.Functions.getServiceUrl() + Util.ConstantHelper.api_SaveEquipmentsInspectionsData;
    console.log(apiUrl) 

    await axios.post(
        apiUrl,
        syncObj)
    .then(function (response) {
        // console.log('1111111111111111111111111');
        // console.log(response);
    })
    .catch(function (error) {
        // console.log('2222222222222222222222222');
        // console.log(error);
    });
}

export async function removeSyncedInspections(inspectionIds) {
    await SQLiteManager.deleteInspections(inspectionIds)
    .then((response)=>{}).catch((error)=>{})
}
