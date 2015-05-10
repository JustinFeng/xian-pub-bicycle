var AppContainer = React.createClass({
    fetchStations: function(query) {
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
                <ControlPanel onFetchStations={this.fetchStations} />
                <StationList data={this.state.data}/>
            </div>
        );
    }
});