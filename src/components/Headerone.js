import React from "react";
import classes from "../App.css";
class Headerone extends React.Component{
    render(){
        return(
            <div className={classes.Header}>
                <h4>Select Country and City for weather forecast:</h4>
            </div>
        );
    }
};
export default Headerone;