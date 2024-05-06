import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateForm() {
    const { id } = useParams(); // This captures the "id" parameter from the URL.
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNo: '',
        licenseNumber: '',
        department: '',
        availabilityStatus: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const response = await axios.get(`/api/getEmployee/${id}`);
                    if (response.data) {
                        setFormData({
                            fullName: response.data.fullName || '',
                            phoneNo: response.data.phoneNo || '',
                            licenseNumber: response.data.licenseNumber || '',
                            department: response.data.department || '',
                            availabilityStatus: response.data.availabilityStatus || ''
                        });
                    }
                } catch (error) {
                    console.error('Error fetching employee data:', error);
                }
            }
        };
        fetchData();
    }, [id]); // Effect runs when "id" changes.

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/updateEmployee/${id}`, formData);
            if (response.status === 200) {
                navigate('/'); // Redirect to the home page after successful update
            }
        } catch (error) {
            console.error('Error updating employee data:', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                {/* Full Name Input */}
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Phone No Input */}
                <div className="mb-3">
                    <label htmlFor="phoneNo" className="form-label">Phone No</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phoneNo"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Employee ID Input */}
                <div className="mb-3">
                    <label htmlFor="licenseNumber" className="form-label">Employee ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="licenseNumber"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Department Input */}
                <div className="mb-3">
                    <label htmlFor="department" className="form-label">Department</label>
                    <select
                        className="form-select"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Department</option>
                        <option value="systemManagement">System Management</option>
                        <option value="financialManagement">Financial Management</option>
                        <option value="veterinarian">Veterinarian</option>
                    </select>
                </div>
                {/* Availability Status Select */}
                <div className="mb-3">
                    <label htmlFor="availabilityStatus" className="form-label">Availability Status</label>
                    <select
                        className="form-select"
                        id="availabilityStatus"
                        name="availabilityStatus"
                        value={formData.availabilityStatus}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Availability Status</option>
                        <option value="available">Available</option>
                        <option value="onLeave">On Leave</option>
                    </select>
                </div>
                {/* Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
