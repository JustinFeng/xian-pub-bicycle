var AppContainer = React.createClass({displayName: "AppContainer",
    fetchStations: function(query) {
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
                React.createElement(ControlPanel, {onFetchStations: this.fetchStations}), 
                React.createElement(StationList, {data: this.state.data})
            )
        );
    }
});