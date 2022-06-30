import React, { Component } from "react";
import "./screen.css";

class Display extends Component {

    render() {
        const { value } = this.props;

        return(
            <input
                className="screen solution"
                value={value}
                readOnly="readonly"
            />            
        );
    }
}

export default Display;