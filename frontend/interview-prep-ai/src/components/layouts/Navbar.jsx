import React from 'react';
import ProfileInfoCard from "../cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="h-16 bg-blue-50 border-b border-black backdrop-blur-sm">
            <div className="container mx-auto flex items-center justify-between gap-5 px-6 h-full">
                <Link to="/dashboard" className="flex items-center">
                    <h2 className="text-lg md:text-xl font-semibold text-blue-700 leading-5">
                        InterviewPrepAI
                    </h2>
                </Link>
                <ProfileInfoCard />
            </div>
        </div>
    );
};

export default Navbar;
