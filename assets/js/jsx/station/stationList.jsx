var StationList = React.createClass({
    render: function () {
        var stationList = [];
        var statusModifier = '';

        if(this.props.data !== null) {
            stationList = this.props.data.map(function (station) {
                return (
                    <Station key={station.siteid} info={station}/>
                );
            });
        } else {
            statusModifier = 'icon-spin1 animate-spin loading';
        }

        var classes = React.addons.classSet('stationList', statusModifier);
        return (
            <section className={classes}>
                {stationList}
            </section>
        );
    }
});