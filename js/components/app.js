import Accordion from './Accordion.js';

var React = require('react');
var AppActions = require('../actions/appAction.js');
var AppStore = require('../stores/AppStore.js');
var Modal = require('react-bootstrap/lib/Modal');
var ModalHeader = require('react-bootstrap/lib/ModalHeader');
var ModalBody = require('react-bootstrap/lib/ModalBody');
var FontAwesome = require('react-fontawesome');

var BookMarkModel = require('./bookmarkmodel.js');
var BookMark = require('./bookmarks.js');

function getAppState() {
  return AppStore.getAll();
};

var App = React.createClass({

  getInitialState: function () {
    return {
      all: getAppState(),
      selectedCategory: '',
      categoryData: [],
      showModal: false,
      showbookmodel: false,
      showToolTip: false,
      showBookmarkTip: false,
    };
  },

  handleClick: function () {
    this.setState({
      showbookmodel: true,
    });

  },

  getCategory: function (categoryName, data) {
    this.setState({
      selectedCategory: categoryName,
      categoryData: data,
    });
  },

  addFolder: function (event) {
    var foldername = event.target.previousElementSibling.value;
    event.stopPropagation();
    event.preventDefault();
    AppActions.addFolder(foldername);

    this.close();
  },

  close: function () {
    this.setState({ showModal: false });
    this.setState({ showbookmodel: false });
  },

  open: function () {
    this.setState({ showModal: true });
  },

  showTip: function () {
    this.setState({
      showToolTip: true,
    });
  },

  hideTip: function () {
    this.setState({
      showToolTip: false,
    });
  },

  showBookmarkTip: function () {
    this.setState({
      showBookmarkTip: true,
    });
  },

  hideBookmarkTip: function () {
    this.setState({
      showBookmarkTip: false,
    });
  },

  deleteSelectedBookMark: function (bookMarkObj) {
    AppActions.deleteBookMark(bookMarkObj);
    this.setState({
      all: AppStore.getAll(),
      categoryData: this.state.all._items.bookInfo,
    });

  },

  showAllBookMarks: function (event) {
    var allBookmarks = this.state.all._items;
    if (event.target.checked === true) {
      this.setState({
        categoryData: this.state.all._items.bookInfo,
      });
    } else {
      this.setState({
        categoryData: [],
      });
    }
  },

  searchText: function (event) {
    var result = null;
    var searchText = event.target.value;
    var bookInfo = this.state.all._items.bookInfo;

    var filtered = (function () {
      var filtered = [];
      var i = bookInfo.length;
      while (i--) {

        var textTyped = '/^' + searchText + '/';
        var testObj = eval(textTyped.trim());

        if (testObj.test(bookInfo[i].name)) {
          filtered.push(bookInfo[i]);
        }
      }

      return filtered;
    })();

    this.setState({
      categoryData: filtered,
    });

  },

  render: function () {
    const _this = this;
    var BookState = _this.state.all._items;
    const addFolder = BookState.folder.map(function (folder, index) {
      return (
          <Accordion key = {index} folderName = {folder.folderName}
             bookMarks={folder.books}
             deleteBookMark = {_this.deleteSelectedBookMark}
             selectedCategory={_this.getCategory}
            />
      );
    });

    const ToopTip = {
      visibility: this.state.showToolTip ? 'visible' : 'none',
      position: 'absolute',
      left: 0,
      bottom: '100%',
      fontSize: 15,
      textAlign: 'center',
      marginLeft: -20,
      marginTop: 0,
      marginBottom: 5,
      opacity: this.state.showToolTip ? 1 : 0,
      transition: 'opacity 1s',
      backgroundColor: 'black',
      color: 'white',
      borderRadius: 6,
      padding: 2,
      lineHeight: 1.5,
    };

    const showBookmarkTip = {
      visibility: this.state.showBookmarkTip ? 'visible' : 'hidden',
      position: 'absolute',
      right: 0,
      top: '100%',
      fontSize: 15,
      textAlign: 'center',
      marginRight: -3,
      marginBottom: 0,
      marginTop: 5,
      opacity: this.state.showBookmarkTip ? 1 : 0,
      transition: 'opacity 1s',
      backgroundColor: 'black',
      color: 'white',
      borderRadius: 6,
      padding: 2,
      lineHeight: 1.5,
    };

    return (
      <div style={{ height: window.innerHeight - 3, padding: 0 }}>
        <div className="col-sm-3 col-md-6 col-lg-4"
          style={{ backgroundColor: '#D6D679', minHeight: '100%',
                    maxHeight: '100%', overflow: 'scroll', }}
        >
          <h1 style={{ borderBottom: '1px solid red', padding: 10 }}>
            <FontAwesome name='bookmark' size='lg' style={{ color: 'black', marginRight: 10 }} />
            BookMark </h1>
          <h2 style={{ padding: 10 }}>
            Category
            <FontAwesome name='plus-circle' size='lg'
               style={{ color: 'black', float: 'right', cursor: 'pointer', position: 'relative' }}
               onClick={this.open}
               onMouseOver={this.showTip}
               onMouseOut={this.hideTip}>
              <span style={ToopTip}>
                Add Category
              </span>
            </FontAwesome>
          </h2>

            {addFolder}

            <input type="checkbox" onClick={this.showAllBookMarks}
               style={{ width: 20, height: 20, cursor: 'pointer' }} />
            <span
              style={{ fontSize: 27, padding: 10, fontFamily: 'serif', fontStyle: 'Italic' }}
            >Show all Bookmarks
            </span>
              <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ fontSize: 20 }}>Category Name
                    <input type="text" style={{ marginLeft: 15 }}/>
                    <button onClick={this.addFolder} style={{ float: 'right' }}>Create</button>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button onClick={this.close}>Close</button>
                </Modal.Footer>
              </Modal>

              <Modal show={this.state.showbookmodel} onHide={this.close}>
                <Modal.Header closeButton>
                  <Modal.Title style={{ fontSize: 20 }}>Add Bookmark</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <BookMarkModel folderData = {this.state.all} closeModel={this.close} />
                </Modal.Body>
                <Modal.Footer>
                  <button onClick={this.close}>Close</button>
                </Modal.Footer>
              </Modal>
        </div>
        <div className="col-sm-9 col-md-6 col-lg-8"
          style={{ paddingTop: '1%', backgroundColor: '#823D3D', color: 'white',
                  minHeight: '100%', maxHeight: '100%', overflow: 'scroll', }}
        >
          <div>
            <input type="text" style={{ width: '90%', color: 'black', fontSize: 25, padding: 10 }}
               placeholder="search bookmark" onKeyUp={ this.searchText }/>
            <FontAwesome
              name='plus-circle'
              size='4x'
              style={{ color: '#E0D4D4', float: 'right', cursor: 'pointer', position: 'relative' }}
              onClick={this.handleClick}
              onMouseOver={this.showBookmarkTip}
              onMouseOut={this.hideBookmarkTip}>
              <span style={showBookmarkTip}>
                Add BookMark
              </span>
            </FontAwesome>
          </div>
          <BookMark
            selectedCategory={this.state.selectedCategory}
            categoryData={this.state.categoryData} />
        </div>
      </div>
    );
  },

  _onChange: function () {
    this.setState(getAppState());
  },
});

module.exports = App;
