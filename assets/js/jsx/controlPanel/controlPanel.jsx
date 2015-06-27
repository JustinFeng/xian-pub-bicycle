var ControlPanel = React.createClass({
    locationSearch: function(e) {
        navigator.geolocation.getCurrentPosition(function(position) {
            this.props.onFetchSites({"lat": position.coords.latitude, "lng": position.coords.longitude});
        }.bind(this));
    },
    idsSearch: function(e) {
        this.props.onFetchSites({"ids": localStorage["bookmarks"]});
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
                <SearchForm onFetchSites={this.props.onFetchSites} active={this.state.activeButtonClass.indexOf("searchButton") >= 0} />
                <LocationButton onFetchSites={this.props.onFetchSites} active={this.state.activeButtonClass.indexOf("locationButton") >= 0} />
                <BookmarkButton onFetchSites={this.props.onFetchSites} active={this.state.activeButtonClass.indexOf("bookmarkButton") >= 0} />
            </section>
        );
    }
});