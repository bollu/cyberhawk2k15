var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var HeaderContainer = React.createClass({
    render: function() {
        var text = this.state.text;
        return(<header>{text}</header>);
    }
})

var MessageComponent = React.createClass({
    getInitialState: function() {
        return {visible: false, partialMessage: ""}
    },

    componentWillReceiveProps: function(newprops) {
        console.log("props changed, old: ", this.props, "new: ", newprops);
        if (this.type_callback) {
            clearTimeout(this.type_callback);
        };

        this.setState({partialMessage: ""});

        var TYPING_SPEED = 50;
        var CLEARING_SPEED = 100;
        var CLEARING_DELAY = 2000;

        var clearing_fn = function() {
            var len = this.component.state.partialMessage.length
            if (len > 0) {
                this.component.setState({partialMessage: this.component.state.partialMessage.slice(0, len - 1)});
                this.component.type_callback = setTimeout(clearing_fn.bind({
                    component: this.component
                }), CLEARING_SPEED);
            };

        }
        var typing_fn = function () {
            console.log("index: ", this.index);
            this.component.setState({partialMessage: this.component.state.partialMessage + this.message[this.index]});

            if (this.index < this.message.length - 1) {
                console.log("typing_fn", typing_fn)

                this.component.type_callback = setTimeout(typing_fn.bind({
                    component: this.component,
                    index: this.index + 1,
                    message: this.message
                }), TYPING_SPEED);
            } else {
                this.component.type_callback = setTimeout(clearing_fn.bind({
                    component: this.component,
                }), CLEARING_DELAY)
            }
        };

        this.type_callback = setTimeout(typing_fn.bind({
            component: this,
            index: 0,
            message: newprops.message
        }), TYPING_SPEED);
    },
    render: function() {
        var container_style = {
            transitionDuration: "0.2s",
            //transform: this.state.visible ? "scaleX(1)" : "scaleX(0)",
            width: "100%",
            backgroundColor: "none",
            height: "2em",
            color: "#ffffff",
            paddingBottom: "0",
            //color: this.state.visible ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
            textAlign: "center",
            fontSize: "1.7em",
        };

        //just keep this to show that message is the prop we want
        this.props.message;

        return (<div style={container_style}><span ref="messager">{this.state.partialMessage}</span></div>);
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
            fontSize: "1.8em",
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
            fontSize: "1.8em",
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
            color: "#efefef",
            width: "100%",
            borderRadius: "20px",

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

            return (<button style={button_style} onClick={this.onClick}>Submit</button>
        );
    }
})

var RegisterButton = React.createClass({
    onClick: function() {
        if (this.handleClick) {
            this.handleClick();
        }
    },

    render: function() {
        var register_style = {
            transitionDuration: "0.2s",
            border: "none",
            marginTop: "1em",
            outline: "none",
            fontWeight: "300",
            fontSize: "1.3em",
            paddingTop: "0.3em",
            paddingBottom: "0.3em",
            backgroundColor: "#4F5061",
            color: "#dddddd",
            width: "100%",
            borderRadius: "20px",
        }

        return (<button onClick={this.onClick} style={register_style}>Register</button>);
    }

});

var RegisterPane = React.createClass({
    registerClicked: function() {
        console.log("register clicked!");
        this.setProps({message: "Registering"});
    },

    componentDidMount: function() {
        this.refs.register.handleClick = this.registerClicked;
    },

    render: function() {
        return (<div>
            <MessageComponent message={this.props.message} height="2em"></MessageComponent>
            <InputContainer type="text" placeholder="Username" />
            <InputContainer type="text" placeholder="E-mail" />
            <InputContainer type="text" placeholder="Phone Number" />
            <InputContainer type="text" placeholder="Passsword" />
            <InputContainer type="text" placeholder="Repeat Password" />
            <RegisterButton ref="register"/>
        </div>)
    }
})

/*
var loginPane = (<div>
<InputContainer type="text" placeholder="Username"/>
<InputContainer type="password" placeholder="Password"/>
<LoginButton/>
<h4 class="not-playing"> Not playing yet? </h4>
<RegisterButton/>
</div>);
*/
React.render(<RegisterPane/>,
document.getElementById('react-input-container'));
