import React from 'react';
import { gradeThresholds } from './gradeCalculator'; // Import grade thresholds

const CustomTooltip = ({ payload, label, active }) => {
    if (active && payload && payload.length) {
        const { seeScore, finalScore, grade } = payload[0].payload;
        const minMarks = gradeThresholds[grade]; // Get the minimum marks for the grade

        return (
            <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
                <p><strong>Required SEE Score:</strong> {seeScore}</p>
                <p><strong>Final Score:</strong> {finalScore}</p>
                <p><strong>Grade:</strong> {grade}</p>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
