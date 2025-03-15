import React from "react";
import "./TeamCard.css";

const TeamCard = ({ image, name, id, semester, designation, college, email }) => {
    const handleClick = () => {
        alert(`You clicked on ${Name}!`);
    };

    return (
        <div className="team-card">
            <img src={image} alt={name} className="team-img" />
            <h2>{name}</h2>
            <h4>ID: {id}</h4>
            <h4>Semester: {semester}</h4>
            <h4>Designation: {designation}</h4>
            <h4>College: {college}</h4>
            <h4>Email: {email}</h4>
        </div>
    );
};

export default TeamCard;
