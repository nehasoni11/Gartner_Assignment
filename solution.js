// This function get two parameter start date and end date and return time difference in minutes
const getTimeDifference = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    let diff = (endDate.getTime() - startDate.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}

const excudedIpSet = []
const includedIpSet = []

// This function check that ip is valid or not on bases of its occurence
const isValidIpForResultSet = (click, clicksArray) => {
    let counter = 0;
    if (excudedIpSet.indexOf(click.ip) >= 0) {
        return false;
    }

    if (includedIpSet.indexOf(click.ip) >= 0) {
        return true
    }

    for (let index = 0; index < clicksArray.length; index++) {
        const element = clicksArray[index];
        if (click.ip == element.ip) {
            counter++
        }
        if (counter > 10) {
            excudedIpSet.push(click.ip)
            return false
        }
    }
    includedIpSet.push(click.ip)
    return true
}

// Return expensive click of 1 hour of time slot.
const getExpensiveClick = (startIndex, maxClick, clicksArray) => {
    let max = maxClick.amount;
    let maxElement = maxClick;
    let startTime = `${maxClick.timestamp.split(':')[0]}:00:00`;
    if (startIndex >= clicksArray.length && isValidIpForResultSet(maxElement, clicksArray)) {
        return { maxElement, innerIndex: startIndex }
    } else {
        for (let innerIndex = startIndex; innerIndex < clicksArray.length; innerIndex++) {
            const innerElement = clicksArray[innerIndex];
            if (isValidIpForResultSet(innerElement, clicksArray)) {
                if (getTimeDifference(startTime, innerElement.timestamp) < 61) {
                    if (max < innerElement.amount) {
                        max = innerElement.amount;
                        maxElement = innerElement
                    }
                } else {
                    innerIndex = (innerIndex - 1);
                    return { maxElement, innerIndex }
                }
            }
        }
        return { maxElement, innerIndex: (clicksArray.length - 1) }
    }
}

// this function read clicks.json file and output the result on resultSet.json file
const getResultSet = (clicks) => {
    const resultSet = [];
    for (let index = 0; index < clicks.length; index++) {
        const currentClick = clicks[index];
        if (isValidIpForResultSet(currentClick, clicks)) {
            const expensiveClick = getExpensiveClick(index + 1, currentClick, clicks);
            if (expensiveClick && expensiveClick.innerIndex && expensiveClick.maxElement) {
                index = expensiveClick.innerIndex
                resultSet.push(expensiveClick.maxElement)
            }
        }
    }

    return resultSet;
}

const validateClicksArray = (clicks) => {
    if (Array.isArray(clicks) && clicks.length > 0) {
        return true;
    }
    return false
}
module.exports = {
    getTimeDifference,
    isValidIpForResultSet,
    getExpensiveClick,
    getResultSet,
    validateClicksArray
}