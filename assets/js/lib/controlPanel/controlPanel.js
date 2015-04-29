var ControlPanel = React.createClass({displayName: "ControlPanel",
    locationSearch: function(e) {
        navigator.geolocation.getCurrentPosition(function(position) {
            this.props.onFetchStations({"lat": position.coords.latitude, "lng": position.coords.longitude});
        }.bind(this));
    },
    idsSearch: function(e) {
        this.props.onFetchStations({"ids": localStorage["bookmarks"]});
    },
    render: function () {
        return (
            React.createElement("section", {className: "controlPanel"}, 
                React.createElement(SearchForm, {onFetchStations: this.props.onFetchStations}), 
                React.createElement(LocationButton, {onFetchStations: this.props.onFetchStations}), 
                React.createElement(BookmarkButton, {onFetchStations: this.props.onFetchStations})
            )
        );
    }
});