var React = require('react');

var BookMark = React.createClass({

  render: function () {
    const BookmarkList = this.props.categoryData.map(function (bookmarks, index) {
      return (
        <div key={index} style={{ borderRadius: 10, border: '1px solid white', marginTop: 10 }}>
          <h1 style={{ textAlign: 'center' }}>{bookmarks.name}</h1>
          <div style={{ borderTop: '1px solid black', padding: 5 }}>
            <a href={bookmarks.url}
               style={{ fontSize: 25, fontStyle: 'italic', color: '#A3A3E4', }} >{bookmarks.url}
             </a>
          </div>
        </div>
      );
    });

    return (
      <div style={{ marginTop: '5%', padding: 10, }}>
        {BookmarkList}
      </div>
    );
  },
});

module.exports = BookMark;
