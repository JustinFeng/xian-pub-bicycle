var ControlPanel = React.createClass({displayName: "ControlPanel",
    locationSearch: function(e) {
        navigator.geolocation.getCurrentPosition(function(position) {
            this.props.onFetchStations({"lat": position.coords.latitude, "lng": position.coords.longitude});
        }.bind(this));
    },
    idsSearch: function(e) {
        this.props.onFetchStations({"ids": localStorage["bookmarks"]});
    },
    changeStatus: function(e) {
        this.setState({activeButtonClass: e.target.className});
    },
    getInitialState: function() {
        return {activeButtonClass: ""};
    },
    render: function () {
        return (
            React.createElement("section", {className: "controlPanel", onClick: this.changeStatus}, 
                React.createElement(SearchForm, {onFetchStations: this.props.onFetchStations, active: this.state.activeButtonClass.indexOf("searchButton") >= 0}), 
                React.createElement(LocationButton, {onFetchStations: this.props.onFetchStations, active: this.state.activeButtonClass.indexOf("locationButton") >= 0}), 
                React.createElement(BookmarkButton, {onFetchStations: this.props.onFetchStations, active: this.state.activeButtonClass.indexOf("bookmarkButton") >= 0})
            )
        );
    }
});