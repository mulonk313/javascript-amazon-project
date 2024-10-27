import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
},{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if(option.id === deliveryOptionId) deliveryOption = option;
    });

    return deliveryOption || deliveryOptions[0]; 
}

function isWeekend(date) {
    const day = date.day(); 
    return day === 0 || day === 6;
}

export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();
    let deliveryDate = today;
    let remainingDays = deliveryOption ? deliveryOption.deliveryDays : 0;

    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'day'); 

        if (!isWeekend(deliveryDate)) {
            remainingDays--;
        }
    }

    return deliveryDate.format('dddd, MMMM D');
}