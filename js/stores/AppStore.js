var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _items = {
  id: 2222223,
  bookInfo: [],
  folder: [
    {
      id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
      complete: false,
      folderName: 'OtherBookmarks',
      books: [],
    },
  ],
};

function createFolder(text) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  var data = {
    id: id,
    complete: false,
    folderName: text,
    books: [],
  };

  _items.folder.unshift(data);
};

function createBookmark(bookObj) {
  for (var index = 0; index < _items.folder.length; index++) {
    if (_items.folder[index].folderName === bookObj.folder) {
      _items.folder[index].books.push(bookObj);
    }
  }

  _items.bookInfo.push(bookObj);
};

function deleteBookmark(bookName) {

  for (var index = 0; index < _items.folder.length; index++) {
    if (_items.folder[index].folderName === bookName.folderName) {

      function findBookMark(book) {
        return book.name === bookName.bookmark;
      }

      var targetBookmark = _items.folder[index].books.find(findBookMark);
      var itemToDelete = _items.folder[index].books.indexOf(targetBookmark);
      _items.folder[index].books.splice(itemToDelete, 1);
    }
  };

  var newArray = _items.bookInfo.filter(function (book) {
    return book.name !== bookName.bookmark;
  });

  _items.bookInfo = newArray;
};

function deleteFolder(folder) {
  for (var index = 0; index < _items.folder.length; index++) {
    if (folder === _items.folder[index].folderName) {
      _items.folder.splice(index, 1);
    }
  }
}

var AppStore = assign({}, EventEmitter.prototype, {

  getAll: function () {
    return {
      _items: _items,
    };
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

});

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.ADD_FOLDER:

      if (action.foldername !== '') {
        createFolder(action.foldername.trim());
        AppStore.emitChange();
      }

    break;

    case AppConstants.ADD_BOOK:

      if (action.books !== '') {
        createBookmark(action.books);
        AppStore.emitChange();
      }

    break;
    case AppConstants.REMOVE_BOOKMARK:

      if (action.book !== '') {

        deleteBookmark(action.bookObj);

        AppStore.emitChange();
      }

    break;
    case AppConstants.REMOVE_CATEGORY:

      if (action.category !== '') {

        deleteFolder(action.category);

        AppStore.emitChange();
      }

    break;

    default: null;
  }
});

module.exports = AppStore;
