<script src="bower_components/react-motion/react-motion.js"></script>

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


/* server contact code */
var SHOULD_REJECT_REGISTER = false;
var RequestsSender = {
    send_register: function(uname, email, phone, password, callback) {
        setTimeout(function() {
            console.log("sending register: ", uname, email, phone, password);
            if (SHOULD_REJECT_REGISTER) {
                callback(false, "unable to contact server");
            } else {
                callback(true, "registered username");
            }
        }, 400)
    }
}
/*----*/

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
            this.component.setState({partialMessage: this.component.state.partialMessage + this.message[this.index]});

            if (this.index < this.message.length - 1) {

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
            height: "1.8em",
            color: "#ffffff",
            paddingBottom: "0",
            //color: this.state.visible ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
            textAlign: "center",
            fontSize: "1.4em",
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
        this.setState({selected: true});
    },

    onBlur: function() {
        this.setState({selected: false});
    },

    getInitialState: function() {
        return {value: ''};
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
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
            onChange={this.handleChange}
            style={input_style}
            type={this.props.type}
            value={this.state.value}></input>
        <div style={underline_style}></div>
    </div>);
}
})


var GenericButton = React.createClass({
    onClick: function() {
        if (this.clickHandler) {
            this.clickHandler();
        }
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
            backgroundColor: this.props.backgroundColor,
            color: this.props.color,
            width: "100%",
            borderRadius: "20px",

        }

        if (this.props.isSubmit) {
            return (<button style={button_style} onClick={this.onClick} type="submit">{this.props.name}</button>);
        } else {
            return (<button style={button_style} onClick={this.onClick}>{this.props.name}</button>);

        }
    }
})

var RegisterPane = React.createClass({
    getInitialState: function() {
        return {message: ""};
    },

    onSubmit: function(e) {
        console.log("on submit called");
        e.preventDefault();


        var uname = this.refs.uname.state.value;
        if (uname.length == 0) {
            this.setState({message: "enter username"});
            return;
        }
        var email_regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        var email = this.refs.email.state.value;
        if (email === "" || !email_regex.test(email)) {
            this.setState({message: "Enter valid e-mail id"});
            return;

        }

        var phone_regex = /[0-9]{10}/;
        var phonenum = this.refs.phonenum.state.value;
        if (phonenum === "" || !phone_regex.test(phonenum)) {
            this.setState({message: "Enter 10 digit number"});
            return;

        }


        var password = this.refs.password.state.value;
        if (password === "") {
            this.setState({message: "password is empty"});
            return;

        }

        if(password !== this.refs.password_repeat.state.value) {
            this.setState({message: "passwords do not match"});
            return;

        }

        RequestsSender.send_register(uname, email, phonenum, password, function(success, message) {
            if (success) {
                this.setState({message: "success"});
            } else {
                this.setState({message: message});
            }
        }.bind(this));


    },

    /*
    componentDidMount: function() {
        this.refs.register.clickHandler = this.registerClicked;
    },
    */
    render: function() {
        return (<form onSubmit={this.onSubmit}>
            <MessageComponent message={this.state.message} height="2em"></MessageComponent>
            <InputContainer type="text" placeholder="Username" ref="uname"/>
            <InputContainer type="text" placeholder="E-mail" ref="email"/>
            <InputContainer type="text" placeholder="Phone Number" ref="phonenum"/>
            <InputContainer type="text" placeholder="Passsword" ref="password"/>
            <InputContainer type="text" placeholder="Repeat Password" ref="password_repeat"/>
            <GenericButton color="#ffffff" backgroundColor="#4F5061" name="register" isSubmit="true" ref="register"/>
        </form>)
    }
})


var LoginPane = React.createClass({
    onSubmit: function() {

    },

    transitionToRegister: function() {
        console.log("transitioning to register page")
    },

    componentDidMount: function() {
        this.refs.register.clickHandler = this.transitionToRegister;
    },

    render: function() {
        return (<form onSubmit={this.onSubmit}>
                    <InputContainer type="text" placeholder="Username"/>
                    <InputContainer type="password" placeholder="Password"/>
                    <GenericButton color="#ffffff" backgroundColor="#EE6383" name="Login" isSubmit="true"/>
                    <h4 class="not-playing"> Not playing yet? </h4>
                    <GenericButton color="#ffffff" backgroundColor="4F5061" name="Register" isSubmit="false" ref="register"/>
            </form>);
    }
})

React.render(<div>
                <RegisterPane/>
            </div>,
document.getElementById('react-input-container'));
