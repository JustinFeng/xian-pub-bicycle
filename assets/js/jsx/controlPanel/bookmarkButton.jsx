var BookmarkButton = React.createClass({
    idsSearch: function(e) {
        this.props.onFetchStations({"ids": localStorage["bookmarks"]});
    },
    render: function () {
        return (
            <button className="icon-star-1 bookmarkButton" onClick={this.idsSearch}/>
        );
    }
});