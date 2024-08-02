export const gradeThresholds = {
    'S': 90,
    'A+': 80,
    'A': 70,
    'B+': 60,
    'B': 50,
    'P': 40
};

export const calculateMinSeeScores = (cieScore) => {
    const minSeeScores = {};
    for (const [grade, threshold] of Object.entries(gradeThresholds)) {
        const minFinalScore = threshold;
        const minSeeScore = Math.max(40, Math.min(100, 2 * (minFinalScore - cieScore)));
        minSeeScores[grade] = minSeeScore;
    }

    // Ensure only 'P' grade is shown if multiple grades have the same cutoff of 40 marks
    if ('P' in minSeeScores && minSeeScores['P'] === 40) {
        for (const grade of ['S', 'A+', 'A', 'B+', 'B']) {
            if (minSeeScores[grade] === 40) delete minSeeScores[grade];
        }
    }

    // Ensure if multiple grades have the same cutoff of 100, display only the least grade
    const gradesOrder = ['S', 'A+', 'A', 'B+', 'B', 'P'];
    for (const grade of gradesOrder.reverse()) {
        if (minSeeScores[grade] === 100) delete minSeeScores[grade];
    }

    return minSeeScores;
};
