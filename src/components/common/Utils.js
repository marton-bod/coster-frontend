import React, {Component} from 'react';

export const getMonthList = () => {
    const currDate = new Date()
    const currYear = currDate.getFullYear()
    const currMonth = currDate.getMonth() + 1
    let monthList = []
    for (let i = currMonth; i >= 1; i -= 1) {
        monthList.push(currYear + "-" + i)
    }
    for (let i = 0; i < 12 - currMonth; i += 1) {
        monthList.push((currYear - 1) + "-" + (12 - i))
    }
    return monthList
};

export const getCurrentMonth = () => {
    const currDate = new Date()
    return currDate.getFullYear() + "-" + (currDate.getMonth() + 1)
}
