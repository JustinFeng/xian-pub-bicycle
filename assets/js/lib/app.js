$(document).ready(function () {
    if(localStorage["bookmarks"] === undefined) {
        localStorage["bookmarks"] = JSON.stringify([]);
    }

    React.render(
        React.createElement(AppContainer, null),
        document.getElementById('content')
    );
});
