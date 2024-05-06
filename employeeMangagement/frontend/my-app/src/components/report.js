import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import Header from './subcomponents/header';
import Footer from './subcomponents/footer'; // Ensure Footer is properly implemented if used

export default function Report() {
    const [reportData, setReportData] = useState({
        totalEmployees: 0,
        activeEmployees: 0,
        onLeaveEmployees: 0,
        systemDeptCount: 0,
        financialDeptCount: 0,
        vetDeptCount: 0
    });

    useEffect(() => {
        axios.get('/api/employeeReportData')
            .then(response => {
                setReportData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the report data:', error);
            });
    }, []);

    const createPdf = () => {
        const doc = new jsPDF();
        doc.text('Employee Report', 20, 20);
        doc.autoTable({
            startY: 30,
            head: [['#', 'Description', 'Value']],
            body: [
                ['1', 'Total employee count', reportData.totalEmployees],
                ['2', 'Active employee count', reportData.activeEmployees],
                ['3', 'On leave employee count', reportData.onLeaveEmployees],
                ['4', 'System Management employees', reportData.systemDeptCount],
                ['5', 'Financial Management employees', reportData.financialDeptCount],
                ['6', 'Veterinarian employees', reportData.vetDeptCount],
            ],
        });
        doc.save('employee_report.pdf');
    };

    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <h1>Employee Report</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Description</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Total employee count</td>
                            <td>{reportData.totalEmployees}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Active employee count</td>
                            <td>{reportData.activeEmployees}</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>On leave employee count</td>
                            <td>{reportData.onLeaveEmployees}</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>System Management employees</td>
                            <td>{reportData.systemDeptCount}</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Financial Management employees</td>
                            <td>{reportData.financialDeptCount}</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Veterinarian employees</td>
                            <td>{reportData.vetDeptCount}</td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={createPdf}>Create PDF Report</button>
            </div>
       
        </div>
    );
}
