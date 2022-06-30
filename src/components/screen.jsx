import { Component } from "react";
import "./screen.css";

//const Screen = ({ value }) => {
class Screen extends Component {

    render() {
        const { onChange } = this.props;
        return (
    
            <input 
                className="screen"
            />
        );
    }
}

export default Screen;