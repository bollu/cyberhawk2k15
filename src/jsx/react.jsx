var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
          width: this.state.selected ? "100%" : "0px",
          height: "2px",
      };

      var input_style = {
        transitionDuration: "0.3s",
        color: "#efefef",
        border: "none",
        outline: "none",
        fontWeight: "300",
        fontSize: "1.3em",
        backgroundColor: "rgba(255, 255, 255, 0.0)",
        width: "100%",
        paddingLeft: "0.5em",
        borderLeft: this.state.selected ? "2px solid rgba(0, 0, 0, 0)" : "2px solid #bfbfbf",
    };

    var desc_style = {
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
          transitionDuration: "1s",
          border: "none",
          marginTop: "1em",
          outline: "none",
          fontWeight: "300",
          fontSize: "1.3em",
          width: this.state.loggingIn ? "2em" : "100%",
          marginLeft: this.state.loggingIn ? "50%" : 0,
          paddingTop: "0.3em",
          paddingBottom: "0.3em",
          backgroundColor: "#EE6383",
          color: "#ffffff",
          borderRadius: 30,
      }
      var text = this.state.loggingIn ?  "o" : "Submit" ;
      return (<button style={button_style} onClick={this.onClick}> {text}</button>)
  }
})

React.render((<div>
                <InputContainer type="text" placeholder="Username"/>
                <InputContainer type="password" placeholder="Password"/>
                <LoginButton/>
            </div>), 
             document.getElementById('react-input-container'));

