import React from "react";
class Form extends React.Component{
    render(){
        return(
            <form onSubmit={this.props.getWeather}>
                <input type="text" name="city" placeholder="City..."  /><br />
                <input type="text" name="country" placeholder="Country..." /><br />
                <input type="submit" value="Get Weather"/>
            </form>
        );
    }
};
export default Form;