// src/SIPCalculator.js
import React, { useState } from 'react';
import './SIPCalculator.css';

const SIPCalculator = () => {
    const [monthlyInvestment, setMonthlyInvestment] = useState('10000');
    const [annualInterestRate, setAnnualInterestRate] = useState('10');
    const [investmentPeriod, setInvestmentPeriod] = useState('10');
    const [futureValue, setFutureValue] = useState(null);
    const [totalInvestment, setTotalInvestment] = useState(null);

    const calculateSIP = () => {
        const P = parseFloat(monthlyInvestment);
        const r = parseFloat(annualInterestRate) / 12 / 100;
        const n = parseFloat(investmentPeriod) * 12;

        if (P > 0 && r > 0 && n > 0) {
            const totalInv = P * n;
            const FV = P * (((1 + r) ** n - 1) / r) * (1 + r);
            setFutureValue(FV);
            setTotalInvestment(totalInv);
        } else {
            setFutureValue('Please enter valid inputs');
            setTotalInvestment(null);
        }
    };

    const formatNumber = (value) => {
        if (value >= 10000000) {
            return (value / 10000000).toFixed(2) + ' Crores';
        } else if (value >= 100000) {
            return (value / 100000).toFixed(2) + ' Lakhs';
        } else if (value >= 1000) {
            return (value / 1000).toFixed(2) + ' Thousand';
        } else {
            return value.toFixed(2);
        }
    };

    const getMessage = () => {
        if (futureValue !== null && typeof futureValue === 'number') {
            const expectedReturn = formatNumber(futureValue);
            const formattedInvestment = formatNumber(monthlyInvestment);
            return `For a monthly investment of ₹${formattedInvestment}, your return would be ${expectedReturn}.`;
        } else {
            return '';
        }
    };

    return (
        <div className="sip-container">
            <h1 className="sip-title">SIP Calculator</h1>
            <div className="input-group">
                <label htmlFor="monthly-investment">Monthly Investment (₹):</label>
                <input
                    id="monthly-investment"
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="annual-interest-rate">Annual Interest Rate (%):</label>
                <input
                    id="annual-interest-rate"
                    type="number"
                    value={annualInterestRate}
                    onChange={(e) => setAnnualInterestRate(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="investment-period">Investment Period (Years):</label>
                <input
                    id="investment-period"
                    type="number"
                    value={investmentPeriod}
                    onChange={(e) => setInvestmentPeriod(e.target.value)}
                />
            </div>
            <button className="calculate-btn" onClick={calculateSIP}>Calculate SIP</button>
            {futureValue !== null && (
                <div className="result-container">
                    <h2 className="result-title">Future Value:</h2>
                    <h3 className="result-value">{formatNumber(futureValue)}</h3>
                    <h2 className="result-title">Total Investment:</h2>
                    <h3 className="result-value">{formatNumber(totalInvestment)}</h3>
                </div>
            )}
            <p className="bottom-message">{getMessage()}</p>
        </div>
    );
};

export default SIPCalculator;

