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
            React.createElement("section", {className: "controlPanel"}, 
                React.createElement("form", {className: "searchForm", onSubmit: this.handleSearch}, 
                    React.createElement("input", {className: "searchBox", type: "text", placeholder: "Street name or Landmark", ref: "term"}), 
                    React.createElement("button", {className: "icon-search searchButton", type: "submit"})
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
            React.createElement("section", {className: "stationList"}, 
                stationList
            )
        );
    }
});

var Station = React.createClass({displayName: "Station",
    render: function () {
        var info = this.props.info;
        var title = info.sitename + " (" + (parseInt(info.locknum) - parseInt(info.emptynum)) + "/" + parseInt(info.locknum) + ")";
        return (
            React.createElement("article", {className: "station"}, 
                React.createElement("section", {className: "info"}, 
                    React.createElement("h1", null, title), 
                    React.createElement("p", null, this.props.info.location)
                )
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
