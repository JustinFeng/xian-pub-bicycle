var LocationButton = React.createClass({
    locationSearch: function(e) {
        navigator.geolocation.getCurrentPosition(function(position) {
            this.props.onFetchStations({"lat": position.coords.latitude, "lng": position.coords.longitude});
        }.bind(this));
    },
    render: function () {
        var status = this.props.active ? 'active' : '';
        var classes = React.addons.classSet('icon-location', 'locationButton', status);

        return (
            <button className={classes} onClick={this.locationSearch}/>
        );
    }
});