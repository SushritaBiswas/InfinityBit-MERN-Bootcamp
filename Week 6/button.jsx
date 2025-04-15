import React from "react";

const Button = ({ squareClick, value }) => {
    let className = "";
    if (value === "X") className = "x";
    else if (value === "O") className = "o";

    return (
        <button onClick={squareClick} className={className}>
            {value}
        </button>
    );
};

export default Button;
