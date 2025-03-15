import React from "react";
import TeamCard from "./TeamCard";

const members = [
    {
        image: "src/assets/image/Sushrita.png",
        name: "Sushrita Biswas",
        id: "001",
        semester: "3",
        designation: "Student",
        college: "Barrackpore Rastraguru Surendranath College",
        email: "sushritabiswas19@gmail.com",
    },
    {
        image: "src/assets/image/Anushree.png",
        name: "Anushree Roy",
        id: "002",
        semester: "3",
        designation: "Student",
        college: "St. Xavier's College",
        email: "anushree562@gmail.com",
    },
    {
        image: "src/assets/image/Rajib.png",
        name: "Rajib Addya",
        id: "003",
        semester: "3",
        designation: "Student",
        college: "Syamaprasad College",
        email: "rajibaddya@gmail.com",
    },
    
    {
        image: "src/assets/image/Fiza.png",
        name: "Fiza Tarannum",
        id: "004",
        semester: "3",
        designation: "Student",
        college: "Syamaprasad College",
        email: "fizatarannum8898@yahoo.com",
    },
    {
        image: "src/assets/image/Piyas.png",
        name: "Piyas Dey",
        id: "005",
        semester: "3",
        designation: "Student",
        college: "Barrackpore Rastraguru Surendranath College",
        email: "ppyas67@gmail.com",
    },
    {
        image: "src/assets/image/Divyanshi.png",
        name: "Divyanshi Ghosh",
        id: "006",
        semester: "NA",
        designation: "Kiddo",
        college: "NA",
        email: "notverified@gmail.com",
    },
    
];

const TeamList = () => {
    return (
        <div className="team-list">
            <h3>Meet Our Team</h3>
            <div className="team-container">
                {members.map((member, index) => (
                    <TeamCard key={index} {...member} />
                ))}
            </div>
        </div>
    );
};

export default TeamList;
