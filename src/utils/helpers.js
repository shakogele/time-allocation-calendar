export const convertDateSlotsIntoObject = ({mentor, calendar}) => {
    const slotsObject = {};

    calendar.forEach((element) => {
        addAllocationToSlotsObject(slotsObject, element);
    });
    return {mentor,slotsObject};
}

export const addAllocationToSlotsObject = (slotsObject, element) => {
    const dt = new Date(element.date_time);
    const year = dt.getFullYear();
    const month = dt.getMonth();
    const day = dt.getDate();

    if(!slotsObject[year]){slotsObject[year] = {};};
    if(!slotsObject[year][month]){slotsObject[year][month] = {}};

    if(!slotsObject[year][month][day]){
        slotsObject[year][month][day] = [dt.getHours()]
    }else{
        slotsObject[year][month][day].push(dt.getHours())
    }
}
  
export const generateTiming = (times) => {
    const timing = [];
    for(let i=0; i<24; i++){
        timing.push({
            interval: intToTime(i) + ':00 - ' + intToTime(i+1)+':00',
            available: !(times && times.includes(i))
        });
    }
    return timing;
};

export const compareTwoDates = (dt1, dt2) => {
    const date1 = (new Date(dt1)).setHours(0,0,0,0);
    const date2 = (new Date(dt2)).setHours(0,0,0,0);
    return date1 > date2;
};

const intToTime = (int) => {
    return int < 10 ? '0'+int : (int === 24 ? '00' : int);
};

