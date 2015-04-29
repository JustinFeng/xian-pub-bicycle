var SearchForm = React.createClass({displayName: "SearchForm",
    keywordSearch: function(e) {
        e.preventDefault();
        var term = React.findDOMNode(this.refs.term).value.trim();
        this.props.onFetchStations({"term":term});
    },
    render: function () {
        return (
            React.createElement("form", {className: "searchForm", onSubmit: this.keywordSearch}, 
                React.createElement("input", {className: "searchBox", type: "text", placeholder: "Street name or Landmark", ref: "term"}), 
                React.createElement("button", {className: "icon-search searchButton", type: "submit"})
            )
        );
    }
});