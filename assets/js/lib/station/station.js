var Station = React.createClass({displayName: "Station",
    bookmark: function(e) {
        $(e.target).toggleClass("icon-star-1");
        $(e.target).toggleClass("icon-star-empty");

        var siteid = this.props.info.siteid;
        var ids = JSON.parse(localStorage["bookmarks"]);
        var pos = $.inArray(siteid, ids);

        if(pos >= 0) {
            ids.splice(pos, 1);
        } else {
            ids.push(siteid)
        }

        localStorage["bookmarks"] = JSON.stringify(ids);
    },
    isSaved: function() {
        return $.inArray(this.props.info.siteid, JSON.parse(localStorage["bookmarks"])) >= 0;
    },
    render: function () {
        var info = this.props.info;
        var title = info.sitename + " (" + (parseInt(info.locknum) - parseInt(info.emptynum)) + "/" + parseInt(info.locknum) + ")";
        if (info.distance !== undefined) {
            title = title + " - " + Math.round(info.distance) + "m";
        }

        var statusModifier = this.isSaved() ? "icon-star-1" : "icon-star-empty";
        var classes = React.addons.classSet('bookmark', statusModifier);
        return (
            React.createElement("article", {className: "station"}, 
                React.createElement("section", {className: "info"}, 
                    React.createElement("h1", null, title), 
                    React.createElement("p", null, this.props.info.location)
                ), 
                React.createElement("section", {className: "action"}, 
                    React.createElement("div", {className: classes, onClick: this.bookmark})
                )
            )
        );
    }
});