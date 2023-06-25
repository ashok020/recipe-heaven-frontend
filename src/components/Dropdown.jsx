import React, { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import "./Dropdown.css";

const Dropdown = ({ header, dropDownItems, showIcon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <div
        className=" btn-small item-center dropdown-toggle"
        onClick={handleDropdownToggle}
      >
        {header}
        {isOpen
          ? showIcon && <RiArrowDropUpLine className="icon" />
          : showIcon && <RiArrowDropDownLine className="icon" />}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {dropDownItems.map((child, index) => (
            <div
              key={index}
              className={`dropdown-item ${
                child.active ? "dropdown-item-active" : ""
              }`}
              onClick={child.onClick}
            >
              {child.label}
              {child.icon && <child.icon className="icon" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
