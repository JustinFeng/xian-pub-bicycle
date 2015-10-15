var BookmarkButton = React.createClass({
    idsSearch: function(e) {
        this.props.onFetchSites({"ids": localStorage["bookmarks"]});
    },
    render: function () {
        var status = this.props.active ? 'active' : '';
        var classes = 'icon-star-1 bookmarkButton ' + status;

        return (
            <button className={classes} onClick={this.idsSearch}/>
        );
    }
});