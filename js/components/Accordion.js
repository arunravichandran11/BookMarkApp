import React, { Component, PropTypes } from 'react';
import AppActions from '../actions/appAction.js';
var FontAwesome = require('react-fontawesome');

class Accordion extends Component {

  constructor() {
    super();
    this.state = {
      openFolder: false,
    };
    this.openFolder = this.openFolder.bind(this);
    this.closeFolder = this.closeFolder.bind(this);
    this.displayContent = this.displayContent.bind(this);
    this.deleteBookMark = this.deleteBookMark.bind(this);
  }

  openFolder() {
    this.setState({
      openFolder: true,
    });
  }

  closeFolder() {
    this.setState({
      openFolder: false,
    });
  }

  deleteBookMark(event) {
    function findFolder(element) {
      while (element.parentNode) {
        element = element.parentNode;
        if (element.className === 'bookMarkContainer')
          return element.previousElementSibling;
      }

      return null;
    }

    var bookmark = event.target.parentNode;
    var containingFolder = findFolder(event.target);
    var item = {
      bookmark: bookmark.innerText,
      folderName: containingFolder.innerText,
    };

    var bookmarkToDelete = (item.bookmark !== '' && item.folderName !== '') ? item : null;
    this.props.deleteBookMark(bookmarkToDelete);
  }

  displayContent(event) {
    event.preventDefault();
    this.props.selectedCategory(event.target.innerHTML, this.props.bookMarks);
  }

  deleteCategory(event) {
    AppActions.deleteCategory(event.target.parentNode.innerText);
  }

  render() {
    var folderName = this.props.folderName;

    const folderClose =
      <FontAwesome name='folder' size='2x' style={{ color: 'black', marginLeft: 10 }} />;

    const folderOpen =
      <FontAwesome name='folder-open' size='2x' style={{ color: 'black', marginLeft: 10 }} />;

    const arrowRight =
      <FontAwesome name='caret-right' size='2x'
         style={{ color: 'black' }} onClick={this.openFolder}
      />;

    const arrowDown =
      <FontAwesome name='caret-down' size='2x'
         style={{ color: 'black' }} onClick={this.closeFolder}
      />;

    const deleteIcon =
      <FontAwesome name='trash' style={{ color: 'black', cursor: 'pointer', float: 'right' }}
         onClick={this.deleteBookMark}
      />;

    var showFolder = (this.state.openFolder === true) ? folderOpen : folderClose;

    var showArrow = (this.state.openFolder === true) ? arrowDown : arrowRight;

    var BookMarkList = this.props.bookMarks.map(function (book, index) {
      return (
          <li key={index}
            style={{ marginLeft: '18%', padding: 5, paddingLeft: 1, fontSize: 16 }}
          >
            {book.name}
            {deleteIcon}
          </li>
      );
    });

    var showBookMarks = this.state.openFolder ? BookMarkList : null;
    return (
      <div id="Accordion">
      {showArrow}
      {showFolder}
      <span style={{ marginLeft: 10, fontSize: 26 }} onClick={this.displayContent}>{folderName}
        {
          this.state.openFolder === true ?
          <FontAwesome name='times' size='lg'
            style={{ color: 'black', float: 'right', cursor: 'pointer' }}
            onClick={this.deleteCategory}
          /> :
          null
        }
      </span>
      <div className="bookMarkContainer">{showBookMarks}</div>
      </div>
    );
  }
}

export default Accordion;
