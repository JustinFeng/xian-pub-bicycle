var AppContainer = React.createClass({displayName: "AppContainer",
    fetchSites: function(query) {
        this.setState({data: null});
        $.ajax({
            url: '/api?query=' + encodeURI(JSON.stringify(query)),
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    render: function () {
        return (
            React.createElement("div", {className: "appContainer"}, 
                React.createElement(ControlPanel, {onFetchSites: this.fetchSites}), 
                React.createElement(SiteList, {data: this.state.data})
            )
        );
    }
});