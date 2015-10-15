var SiteList = React.createClass({
    render: function () {
        var siteList = [];
        var statusModifier = '';

        if(this.props.data !== null) {
            siteList = this.props.data.map(function (site) {
                return (
                    <Site key={site.siteid} info={site}/>
                );
            });
        } else {
            statusModifier = 'icon-spin1 animate-spin loading';
        }

        var classes = 'siteList ' + statusModifier;
        return (
            <section className={classes}>
                {siteList}
            </section>
        );
    }
});