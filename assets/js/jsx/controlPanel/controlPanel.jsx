var ControlPanel = React.createClass({
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
            <section className="controlPanel" onClick={this.changeStatus}>
                <SearchForm onFetchStations={this.props.onFetchStations} active={this.state.activeButtonClass.indexOf("searchButton") >= 0} />
                <LocationButton onFetchStations={this.props.onFetchStations} active={this.state.activeButtonClass.indexOf("locationButton") >= 0} />
                <BookmarkButton onFetchStations={this.props.onFetchStations} active={this.state.activeButtonClass.indexOf("bookmarkButton") >= 0} />
            </section>
        );
    }
});