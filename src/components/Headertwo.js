import React from "react";
import classes from "../App.css";
class Headertwo extends React.Component{
    render(){
        return(
            <div className={classes.Header}>
                <h4>Place respective device anywhere in this world and get Temperature and Humidity for that area:</h4>
            </div>
        );
    }
};
export default Headertwo;