// src/App.js
import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip'; // Import your custom tooltip
import { gradeThresholds } from './gradeCalculator';
import Header from './components/Header'; // Import Header component
import Footer from './components/Footer'; // Import Footer component
import './App.css'; // Import the CSS file for main styling

const App = () => {
    // Set initial CIE score to 45
    const [cieScore, setCieScore] = useState(45);
    const [data, setData] = useState([]);
    const colorMap = {
        'S': 'green',
        'A+': 'blue',
        'A': 'cyan',
        'B+': 'magenta',
        'B': 'orange',
        'P': 'yellow',
        'Fail': 'red'
    };

    // Effect to update data when cieScore changes
    useEffect(() => {
        const calculateData = () => {
            if (cieScore > 20 && cieScore < 50) {
                const seeScores = [];
                for (let i = 40; i <= 100; i++) {
                    const finalScore = (i / 2) + cieScore;
                    let grade = 'Fail';
                    for (const [key, threshold] of Object.entries(gradeThresholds)) {
                        if (finalScore >= threshold) {
                            grade = key;
                            break;
                        }
                    }
                    seeScores.push({ seeScore: i, finalScore, grade });
                }
                setData(seeScores);
            } else {
                setData([]);
            }
        };

        calculateData();
    }, [cieScore]);

    const handleCieScoreChange = (e) => {
        const score = parseFloat(e.target.value);
        setCieScore(score);
    };

    return (
        <div className="app-container">
            <Header />
            <main className="main-content">
                <label>
                    Enter CIE score (must be between 20 and 50):
                    <input type="number" value={cieScore} onChange={handleCieScoreChange} />
                </label>
                <ScatterChart
                    width={800}
                    height={600}
                    margin={{ top: 20, right: 20, bottom: 60, left: 20 }} // Increase bottom margin for legend
                >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="seeScore" name="SEE Score" />
                    <YAxis type="number" dataKey="finalScore" name="Final Score" />
                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                    <Legend
                        layout="horizontal"  // Display legend horizontally
                        verticalAlign="bottom" // Align legend to the bottom
                        wrapperStyle={{
                            paddingTop: 20 // Add space between chart and legend
                        }}
                    />
                    {Object.keys(colorMap).map(grade => (
                        <Scatter key={grade} name={grade} data={data.filter(d => d.grade === grade)} fill={colorMap[grade]} />
                    ))}
                </ScatterChart>
            </main>
            <Footer />
        </div>
    );
};

export default App;
