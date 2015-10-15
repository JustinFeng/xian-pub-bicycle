var LocationButton = React.createClass({
    locationSearch: function(e) {
        navigator.geolocation.getCurrentPosition(function(position) {
            this.props.onFetchSites({"lat": position.coords.latitude, "lng": position.coords.longitude});
        }.bind(this));
    },
    render: function () {
        var status = this.props.active ? 'active' : '';
        var classes = 'icon-location locationButton ' + status;

        return (
            <button className={classes} onClick={this.locationSearch}/>
        );
    }
});