var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {

  addFolder: function (foldername) {
    AppDispatcher.handleViewAction({
      actionType: 'ADD_FOLDER',
      foldername: foldername,
    });
  },

  addBookmark: function (books) {
    AppDispatcher.handleViewAction({
      actionType: 'ADD_BOOK',
      books: books,
    });
  },

  deleteBookMark: function (book) {
    AppDispatcher.handleViewAction({
      actionType: 'REMOVE_BOOKMARK',
      bookObj: book,
    });
  },

  deleteCategory: function (folderName) {
    AppDispatcher.handleViewAction({
      actionType: 'REMOVE_CATEGORY',
      category: folderName,
    });
  },
};

module.exports = AppActions;
