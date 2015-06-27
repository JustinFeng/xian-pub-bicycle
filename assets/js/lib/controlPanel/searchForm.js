var SearchForm = React.createClass({displayName: "SearchForm",
    keywordSearch: function(e) {
        e.preventDefault();
        var term = React.findDOMNode(this.refs.term).value.trim();
        if (term !== undefined && term.length > 0) {
            this.props.onFetchSites({"term":term});
        }
    },
    render: function () {
        var status = this.props.active ? 'active' : '';
        var classes = React.addons.classSet('icon-search', 'searchButton', status);

        return (
            React.createElement("form", {className: "searchForm", onSubmit: this.keywordSearch}, 
                React.createElement("input", {className: "searchBox", type: "text", placeholder: "Street name or Landmark", ref: "term"}), 
                React.createElement("button", {className: classes, type: "submit"})
            )
        );
    }
});