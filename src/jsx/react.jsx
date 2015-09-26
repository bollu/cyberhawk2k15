var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var HeaderContainer = React.createClass({
    render: function() {
        var text = this.state.text;
        return(<header>{text}</header>);
    }
})

var InputContainer = React.createClass({
    getInitialState: function() {
        return {selected: false};
    },
    onFocus: function() {
        console.log("focused");
        this.setState({selected: true});
    },

    onBlur: function() {
        console.log("blurred");
        this.setState({selected: false});
    },

    render: function() {
        var underline_style =  {
          transitionDuration: "1s",
          color: '#ffffff',
          backgroundColor: '#ffffff',
          width: "100%",
          height: "2px",
          transform: this.state.selected ? "scaleX(1)" : "scaleX(0)",
          transitionTimingFunction: "easeOut",
      };

      var input_style = {
        fontFamily: "RobotoCondensed",
        transitionDuration: "1s",
        color: "#efefef",
        border: "none",
        outline: "none",
        fontWeight: "300",
        fontSize: "1.3em",
        backgroundColor: "rgba(255, 255, 255, 0.0)",
        width: "100%",
        borderLeft: this.state.selected ? "2px solid rgba(0, 0, 0, 0)" : "2px solid #bfbfbf",
    };

    var desc_style = {
        fontFamily: "RobotoCondensed",
        transitionDuration: "0.3s",
        paddingLeft: "-2px",
        color: this.state.selected ? "#ffffff" : "#bfbfbf",
        letterSpacing: "0.15em",
        fontWeight: 300,
    };

    var container_style = {
        transitionDuration: "1s",
        marginBottom: "1em",
        marginTop: "1em",
    };
    return (<div class="input-container" style={container_style}>
            <span style={desc_style}>{this.props.placeholder}</span>
            <input onFocus={this.onFocus}
            onBlur={this.onBlur}
            style={input_style}
            type={this.props.type}></input>
            <div style={underline_style}></div>
            </div>);
}
})

var LoginButton = React.createClass({
    getInitialState: function() {
        return {loggingIn: false};
    },

    onClick: function() {
        this.setState({loggingIn: true});
    },

    render: function() {
        var button_style = {
          transitionDuration: "0.2s",
          border: "none",
          marginTop: "1em",
          outline: "none",
          fontWeight: "300",
          fontSize: "1.3em",
          paddingTop: "0.3em",
          paddingBottom: "0.3em",
          backgroundColor: "#EE6383",
          color: "#ffffff",
          width: "100%",
          borderRadius: this.state.loggingIn  ? "70px" : "20px",
          
          transform: this.state.loggingIn ? "scaleX(0)" : "scaleX(1)",
          //transitionTimingFunction: "easeIn",
          //width: this.state.loggingIn ? "50px" : "100%",
          //borderRadius: this.state.loggingIn  ? "50px" : "20px",
          //marginLeft: this.state.loggingIn ? "50%" : "0px",
          //transform: this.state.loggingIn ? "scaleX(0.2)" : "scaleX(1)",
      };

      var spinner_style = {

      };

      var inner_html_generator = function() { 
        if(this.state.loggingIn) {
            return {__html: ' <div class="sk-double-bounce">' +
            '<div class="sk-child sk-double-bounce1"></div>' +
            '<div class="sk-child sk-double-bounce2"></div>' +  
            '</div>' };
        } else {
            return {__html: "Submit"};
        }
    };
    inner_html_generator = inner_html_generator.bind(this);

    return (<div class="button-container">
            <div class="spinner-container" inn>
            <button style={button_style} onClick={this.onClick}>Submit</button>
            </div>);
}
})

React.render((<div>
             <InputContainer type="text" placeholder="Username"/>
             <InputContainer type="password" placeholder="Password"/>
             <LoginButton/>
             </div>), 
document.getElementById('react-input-container'));

