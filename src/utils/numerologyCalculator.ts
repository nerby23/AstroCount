const reduceToSingleDigit = (num: number): number => {
    let sum = num;
    while (sum > 9) {
        sum = Array.from(String(sum), Number).reduce((a, b) => a + b, 0);
    }
    return sum;
};

export const calculateKarmicNumber = (day: number): { full: number; reduced: number } => {
    return {
        full: day,
        reduced: reduceToSingleDigit(day)
    };
};

export const calculateLifeAttitudeNumber = (month: number, day: number): { full: number; reduced: number } => {
    const sum = month + day;
    return {
        full: sum,
        reduced: reduceToSingleDigit(sum)
    };
};

interface LifePathResult {
    number: number;
    isMasterNumber: boolean;
}

export const calculateLifePathNumber = (year: number, month: number, day: number): LifePathResult => {
    // First reduce year digits
    let yearSum = Array.from(String(year), Number).reduce((a, b) => a + b, 0);
    while (yearSum > 9) {
        yearSum = Array.from(String(yearSum), Number).reduce((a, b) => a + b, 0);
    }

    // Add month and day
    const totalSum = yearSum + month + day;

    // First check for direct master numbers
    if (totalSum === 11 || totalSum === 33) {
        return { number: totalSum, isMasterNumber: true };
    }

    // If sum is greater than 9, check for 11 while reducing
    let currentSum = totalSum;
    while (currentSum > 9) {
        // Before reducing, check if we have 11
        if (currentSum === 11) {
            return { number: 11, isMasterNumber: true };
        }
        currentSum = Array.from(String(currentSum), Number).reduce((a, b) => a + b, 0);
        // After reducing, check again for 11
        if (currentSum === 11) {
            return { number: 11, isMasterNumber: true };
        }
    }

    return { number: currentSum, isMasterNumber: false };
};
