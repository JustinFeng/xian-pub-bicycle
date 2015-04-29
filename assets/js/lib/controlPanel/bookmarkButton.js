var BookmarkButton = React.createClass({displayName: "BookmarkButton",
    idsSearch: function(e) {
        this.props.onFetchStations({"ids": localStorage["bookmarks"]});
    },
    render: function () {
        return (
            React.createElement("button", {className: "icon-star-1 bookmarkButton", onClick: this.idsSearch})
        );
    }
});