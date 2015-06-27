var AppContainer = React.createClass({
    fetchSites: function(query) {
        this.setState({data: null});
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
            <div className="appContainer">
                <ControlPanel onFetchSites={this.fetchSites} />
                <SiteList data={this.state.data}/>
            </div>
        );
    }
});