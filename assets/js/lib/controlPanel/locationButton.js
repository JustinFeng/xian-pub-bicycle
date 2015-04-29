var LocationButton = React.createClass({displayName: "LocationButton",
    locationSearch: function(e) {
        navigator.geolocation.getCurrentPosition(function(position) {
            this.props.onFetchStations({"lat": position.coords.latitude, "lng": position.coords.longitude});
        }.bind(this));
    },
    render: function () {
        return (
            React.createElement("button", {className: "icon-location locationButton", onClick: this.locationSearch})
        );
    }
});