import React from "react";
import { useNavigate } from 'react-router-dom';
import UpdateForm from "./subcomponents/updateForm"; // Corrected case to match the file name
import Header from './subcomponents/header';

export default function Update() {
    const navigate = useNavigate();

    return (
        <div>
          <Header />
            <UpdateForm />
        </div>
    );
}
