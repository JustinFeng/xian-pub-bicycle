var StationList = React.createClass({
    render: function () {
        var stationList = this.props.data.map(function (station) {
            return (
                <Station key={station.siteid} info={station}/>
            );
        });
        return (
            <section className="stationList">
                {stationList}
            </section>
        );
    }
});