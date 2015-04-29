$(document).ready(function () {
    if(localStorage["bookmarks"] === undefined) {
        localStorage["bookmarks"] = JSON.stringify([]);
    }

    React.render(
        <AppContainer />,
        document.getElementById('content')
    );
});
