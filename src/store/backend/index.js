import { TIMEOUT_TIMING, BASE_URL } from '../constants';
import { convertDateSlotsIntoObject, addAllocationToSlotsObject } from '../../utils/helpers';

export const getTimeSlotsBackend = (mentorId) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    return fetch(`${BASE_URL}/mentors/${mentorId}/agenda`, requestOptions)
        .then(response => response.json())
        .then(resp => {
            const calendarObject = convertDateSlotsIntoObject(resp);
            const slotsObject = calendarObject.slotsObject;
            const allocations = JSON.parse(localStorage.getItem('CareerFoundry:allocations'));
            if(allocations){
                allocations.forEach(allocation => {
                    addAllocationToSlotsObject(slotsObject, allocation)
                })
            }
            return calendarObject;
        })
};

export const alocateSlotBackend = (allocation) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try{
                const allocations = JSON.parse(localStorage.getItem('CareerFoundry:allocations'));
                if(!allocations){
                    localStorage.setItem('CareerFoundry:allocations', JSON.stringify([allocation]))
                }else{
                    allocations.push(allocation);
                    localStorage.setItem('CareerFoundry:allocations', JSON.stringify(allocations))
                }
                resolve({success: true})
            }catch(err){
                reject(err)
            }
        }, TIMEOUT_TIMING)
    })
};
  
export const getTimeZoneBackend = () => {
    return fetch("https://worldtimeapi.org/api/ip")
    .then(response => response.json())
};