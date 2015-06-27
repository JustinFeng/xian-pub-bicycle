var BookmarkButton = React.createClass({displayName: "BookmarkButton",
    idsSearch: function(e) {
        this.props.onFetchSites({"ids": localStorage["bookmarks"]});
    },
    render: function () {
        var status = this.props.active ? 'active' : '';
        var classes = React.addons.classSet('icon-star-1', 'bookmarkButton', status);

        return (
            React.createElement("button", {className: classes, onClick: this.idsSearch})
        );
    }
});