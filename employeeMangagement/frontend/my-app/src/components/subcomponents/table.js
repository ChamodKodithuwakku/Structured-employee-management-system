import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Table() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchItems() {
            try {
                const response = await axios.get('/api/getEmployees');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/deleteEmployee/${id}`);
            const newItems = items.filter((item) => item._id !== id);
            setItems(newItems);
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleUpdateClick = (id) => {
        navigate(`/updateItem/${id}`);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredItems = searchTerm
        ? items.filter((item) =>
            item.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : items;

    return (
        <div>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by Employee ID..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                    width: '100%',
                    marginBottom: '20px',
                    padding: '10px 15px',
                    border: '1px solid #ced4da',
                    borderRadius: '25px', // Gives rounded corners
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // Adds a subtle shadow
                    transition: 'all 0.2s ease-in-out', // Smooth transition for focus effect
                }}
            />

            <table className='table table-hover' style={{ backgroundColor: '#b2bec3', marginTop: '80px' }}>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Employee ID</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Phone No</th>
                        <th scope='col'>Department</th>
                        <th scope='col'>Availability Status</th>
                        <th scope='col'>Update</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((item, index) => (
                        <tr key={item._id}>
                            <th scope='row'>{index + 1}</th>
                            <td>{item.licenseNumber}</td>
                            <td>{item.fullName}</td>
                            <td>{item.phoneNo}</td>
                            <td>{item.department}</td>
                            <td>{item.availabilityStatus}</td>
                            <td>
                                <button
                                    type='button'
                                    className='btn btn-primary'
                                    onClick={() => handleUpdateClick(item._id)}
                                >
                                    Update
                                </button>
                            </td>
                            <td>
                                <button
                                    type='button'
                                    className='btn btn-danger'
                                    onClick={() => handleDelete(item._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
