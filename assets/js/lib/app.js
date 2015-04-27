var AppContainer = React.createClass({displayName: "AppContainer",
    fetchStations: function(term) {
        $.ajax({
            url: '/api?query=' + term,
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

var ControlPanel = React.createClass({displayName: "ControlPanel",
    handleSearch: function(e) {
        e.preventDefault();
        var term = React.findDOMNode(this.refs.term).value.trim();
        this.props.onFetchStations(term);
    },
    render: function () {
        return (
            React.createElement("div", {className: "controlPanel"}, 
                React.createElement("form", {className: "searchForm", onSubmit: this.handleSearch}, 
                    React.createElement("input", {type: "text", placeholder: "Street name, landmark and so on", ref: "term"}), 
                    React.createElement("input", {type: "submit", value: "Search"})
                )
            )
        );
    }
});

var StationList = React.createClass({displayName: "StationList",
    render: function () {
        var stationList = this.props.data.map(function (station) {
            return (
                React.createElement(Station, {info: station})
            );
        });
        return (
            React.createElement("div", {className: "stationList"}, 
                stationList
            )
        );
    }
});

var Station = React.createClass({displayName: "Station",
    render: function () {
        return (
            React.createElement("div", {className: "station"}, 
                React.createElement("p", null, this.props.info.sitename), 
                React.createElement("p", null, this.props.info.location)
            )
        );
    }
});

$(document).ready(function () {
    React.render(
        React.createElement(AppContainer, null),
        document.getElementById('content')
    );
});
