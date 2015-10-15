var SearchForm = React.createClass({
    keywordSearch: function(e) {
        e.preventDefault();
        var term = React.findDOMNode(this.refs.term).value.trim();
        if (term !== undefined && term.length > 0) {
            this.props.onFetchSites({"term":term});
        }
    },
    render: function () {
        var status = this.props.active ? 'active' : '';
        var classes = 'icon-search searchButton ' + status;

        return (
            <form className="searchForm" onSubmit={this.keywordSearch}>
                <input className="searchBox" type="text" placeholder="Street name or Landmark" ref="term"/>
                <button className={classes} type="submit"/>
            </form>
        );
    }
});