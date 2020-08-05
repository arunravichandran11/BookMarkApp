var React = require('react');
var AppActions = require('../actions/appAction.js');

var BookMarkModel = React.createClass({

  getDetails: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var bookObj = {
    };
    var bookname = event.target.parentNode.children[0].value;
    var url = event.target.parentNode.children[1].value;
    var folder = event.target.parentNode.children[2].value;

    if ((bookname && url) != '' || null) {
      bookObj.url = url;
      bookObj.folder = (folder != '') ? folder : 'OtherBookmarks';
      bookObj.name = bookname;
      AppActions.addBookmark(bookObj);
    }

    this.props.closeModel();

  },

  render: function () {

    const inputStyle = {
      fontSize: 20,
      margin: 5,
      width: '100%',
      fontStyle: 'italic',
    };

    const buttonStyle = {
      fontSize: 20,
      borderRadius: 15,
      marginLeft: '40%',
    };
    return (
      <div>
        <input id="input" style={inputStyle} type="text" placeholder="Enter BookMark Name"/>
        <input id="url" style={inputStyle} type="text" placeholder="Enter BookMark URL"/>
        <select id="folder" style={inputStyle} placeholder="seldcrt">
          <option value="">Select The Category</option>
          {
            this.props.folderData._items.folder.map(function (folder, index) {
            return <option className="input" key={index + 1}>{folder.folderName}</option>;
          })
          }
        </select>
        <button type="button" style={buttonStyle} onClick= {this.getDetails}>Add BookMark</button>
      </div>
    );
  },
});

module.exports = BookMarkModel;
