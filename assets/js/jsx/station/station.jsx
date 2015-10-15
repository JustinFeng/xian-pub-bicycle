var Site = React.createClass({
    bookmark: function(e) {
        this.updateBookmarks();
        this.setState({isSaved: !this.state.isSaved});
    },
    getInitialState: function() {
        return {
            isSaved: $.inArray(this.props.info.siteid, JSON.parse(localStorage["bookmarks"])) >= 0
        };
    },
    updateBookmarks: function() {
        var siteid = this.props.info.siteid;
        var ids = JSON.parse(localStorage["bookmarks"]);
        var pos = $.inArray(siteid, ids);

        if(pos >= 0) {
            ids.splice(pos, 1);
        } else {
            ids.push(siteid);
        }

        localStorage["bookmarks"] = JSON.stringify(ids);
    },
    render: function () {
        var info = this.props.info;
        var title = info.sitename + " (" + (parseInt(info.locknum) - parseInt(info.emptynum)) + "/" + parseInt(info.locknum) + ")";
        var titleOnMap = title;
        if (info.distance !== undefined) {
            title = title + " - " + Math.round(info.distance) + "m";
        }

        var statusModifier = this.state.isSaved ? "icon-star-1" : "icon-star-empty";
        var classes = 'bookmark ' + statusModifier;

        var naviLink = "http://api.map.baidu.com/marker?location=" + info.latitude + "," + info.longitude +"&title=" + encodeURI(titleOnMap) + "&content=" + encodeURI(info.location) + "&output=html&src=xian-pub-bicycle";

        return (
            <article className="site">
                <section className="info">
                    <h1>{title}</h1>
                    <p>{this.props.info.location}</p>
                </section>
                <section className="action">
                    <div className="navi">
                        <a className="icon-direction" href={naviLink}/>
                    </div>
                    <button className={classes} onClick={this.bookmark}/>
                </section>
            </article>
        );
    }
});