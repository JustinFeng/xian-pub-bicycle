var SiteList = React.createClass({displayName: "SiteList",
    render: function () {
        var siteList = [];
        var statusModifier = '';

        if(this.props.data !== null) {
            siteList = this.props.data.map(function (site) {
                return (
                    React.createElement(Site, {key: site.siteid, info: site})
                );
            });
        } else {
            statusModifier = 'icon-spin1 animate-spin loading';
        }

        var classes = React.addons.classSet('siteList', statusModifier);
        return (
            React.createElement("section", {className: classes}, 
                siteList
            )
        );
    }
});