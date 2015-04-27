var AppContainer = React.createClass({
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
            <div className="appContainer">
                <ControlPanel onFetchStations={this.fetchStations} />
                <StationList data={this.state.data}/>
            </div>
        );
    }
});

var ControlPanel = React.createClass({
    handleSearch: function(e) {
        e.preventDefault();
        var term = React.findDOMNode(this.refs.term).value.trim();
        this.props.onFetchStations(term);
    },
    render: function () {
        return (
            <div className="controlPanel">
                <form className="searchForm" onSubmit={this.handleSearch}>
                    <input type="text" placeholder="Street name, landmark and so on" ref="term"/>
                    <input type="submit" value="Search"/>
                </form>
            </div>
        );
    }
});

var StationList = React.createClass({
    render: function () {
        var stationList = this.props.data.map(function (station) {
            return (
                <Station info={station} />
            );
        });
        return (
            <div className="stationList">
                {stationList}
            </div>
        );
    }
});

var Station = React.createClass({
    render: function () {
        return (
            <div className="station">
                <p>{this.props.info.sitename}</p>
                <p>{this.props.info.location}</p>
            </div>
        );
    }
});

$(document).ready(function () {
    React.render(
        <AppContainer />,
        document.getElementById('content')
    );
});
