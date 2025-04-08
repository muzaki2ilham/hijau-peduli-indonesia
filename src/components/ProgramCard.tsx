
import React from "react";
import { Link } from "react-router-dom";

interface ProgramCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const ProgramCard = ({ id, title, description, icon, link }: ProgramCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="text-green-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-green-800 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to={link}
        className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
      >
        Pelajari lebih lanjut
        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
};

export default ProgramCard;
