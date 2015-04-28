var AppContainer = React.createClass({
    fetchStations: function(query) {
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

var ControlPanel = React.createClass({
    handleSearch: function(e) {
        e.preventDefault();
        var term = React.findDOMNode(this.refs.term).value.trim();
        this.props.onFetchStations({"term":term});
    },
    render: function () {
        return (
            <section className="controlPanel">
                <form className="searchForm" onSubmit={this.handleSearch}>
                    <input className="searchBox" type="text" placeholder="Street name or Landmark" ref="term"/>
                    <button className="icon-search searchButton" type="submit"/>
                </form>
            </section>
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
            <section className="stationList">
                {stationList}
            </section>
        );
    }
});

var Station = React.createClass({
    render: function () {
        var info = this.props.info;
        var title = info.sitename + " (" + (parseInt(info.locknum) - parseInt(info.emptynum)) + "/" + parseInt(info.locknum) + ")";
        return (
            <article className="station">
                <section className="info">
                    <h1>{title}</h1>
                    <p>{this.props.info.location}</p>
                </section>
            </article>
        );
    }
});

$(document).ready(function () {
    React.render(
        <AppContainer />,
        document.getElementById('content')
    );
});
