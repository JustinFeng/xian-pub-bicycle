var StationList = React.createClass({
    render: function () {
        var stationList = this.props.data.map(function (station) {
            return (
                <Station info={station}/>
            );
        });
        return (
            <section className="stationList">
                {stationList}
            </section>
        );
    }
});