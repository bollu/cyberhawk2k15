
var data = [
{author: "Pete Hunt", text: "This is one comment"},
{author: "Jordan Walke", text: "This is *another* comment"}
];


var Comment = React.createClass({
    render: function() {
        return (<div>author: {this.props.author} </div>);
    }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                    <Comment author={comment.author}>
                    </Comment>
                    );
        });

        return (
                <div className="commentList">
                {commentNodes}
                </div>
                );
    }
});

var CommentBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },

    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },

    render: function() {
        return (
                <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm />
                </div>
                );
    }
});


React.render(
             <CommentBox url="comments.json" pollInterval={2000} />,
             document.getElementById('content')
             );

