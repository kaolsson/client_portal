// import { subDays, addDays } from 'date-fns';
import createResourceId from '../utils/createResourceId';
import deepCopy from '../utils/deepCopy';
import axios from 'axios';
import {
    serverConnection,
} from './connectionData';

let board = {
  cards: [],
  columns: [],
  members: []
};

class KanbanApi {
  getBoard(userId, caseId) {
    let apiUrl = '';
    if (userId !== null) {
        apiUrl = serverConnection.baseUrl + serverConnection.actionClientUrl + serverConnection.slash + userId;
    } else if (caseId !== null) {
        apiUrl = serverConnection.baseUrl + serverConnection.projectClientUrl + serverConnection.slash + caseId;
    } else {
        return new Promise((reject) => {
            reject(new Error('Missing input parameters'));
        });
    }

    return new Promise((resolve, reject) => {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken) {
          const tokenTitle = 'token: ';
          const Authorization = tokenTitle + accessToken;

          const theHeaders = {
            headers: {
              Accept: '*',
              Authorization
            }
          };

          axios.get(apiUrl, theHeaders)
            .then((response) => {
              resolve(response.data);
            })
            .catch((response) => {
              console.log('Fail response on GetBoard');
              reject(new Error(response));
            });
        } else {
          console.log('Fail no token');
          reject(new Error('No token'));
        }
      });
  }

  createColumn({ name }) {
    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard = deepCopy(board);

        // Create the new column
        const column = {
          id: createResourceId(),
          name,
          cardIds: []
        };

        clonedBoard.columns.push(column);

        // Save changes
        board = clonedBoard;

        resolve(deepCopy(column));
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  updateColumn({ columnId, update }) {
    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard = deepCopy(board);

        // Find the column to clear
        const column = clonedBoard.columns.find((_column) => _column.id === columnId);

        // Update the column
        Object.assign(column, update);

        // Save changes
        board = clonedBoard;

        resolve(deepCopy(column));
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  clearColumn(columnId) {
    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard = deepCopy(board);

        // Find the column to clear
        const column = clonedBoard.columns.find((_column) => _column.id === columnId);

        if (!column) {
          reject(new Error('Column not found'));
          return;
        }

        // Remove the cards with columnId reference
        clonedBoard.cards = clonedBoard.cards.filter((card) => card.columnId !== columnId);

        // Remove all cardIds from the column
        column.cardIds = [];

        // Save changes
        board = clonedBoard;

        resolve(true);
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  deleteColumn(columnId) {
    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard = deepCopy(board);

        // Find the column to remove
        const column = clonedBoard.columns.find((_column) => _column.id === columnId);

        if (!column) {
          reject(new Error('Column not found'));
          return;
        }

        // Remove the cards with columnId reference
        clonedBoard.cards = clonedBoard.cards.filter((card) => card.columnId !== columnId);

        // Remove the column from the board
        clonedBoard.columns = clonedBoard.columns.filter((_column) => _column.id !== columnId);

        // Save changes
        board = clonedBoard;

        resolve(true);
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  createCard({ columnId, name }) {
    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard = deepCopy(board);

        // Find the column where the new card will be added
        const column = clonedBoard.columns.find((_column) => _column.id === columnId);

        if (!column) {
          reject(new Error('Column not found'));
          return;
        }

        // Create the new card
        const card = {
          id: createResourceId(),
          attachments: [],
          checklists: [],
          comments: [],
          cover: null,
          description: null,
          due: null,
          isSubscribed: false,
          columnId,
          memberIds: [],
          name
        };

        // Add the new card
        clonedBoard.cards.push(card);

        // Add the cardId reference to the column
        column.cardIds.push(card.id);

        // Save changes
        board = clonedBoard;

        resolve(deepCopy(card));
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  updateCard({ cardId, update }) {
    const apiUrl = serverConnection.baseUrl + serverConnection.actionUrl + serverConnection.slash + cardId;

    return new Promise((resolve, reject) => {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken) {
          const tokenTitle = 'token: ';
          const Authorization = tokenTitle + accessToken;

          const theHeaders = {
            headers: {
              Accept: '*',
              Authorization
            }
          };

          const data = update;
          const theBody = JSON.stringify(
            {
              data
            }
          );

          axios.put(apiUrl, theBody, theHeaders)
            .then((response) => {
              resolve(deepCopy(response.data));
            })
            .catch((response) => {
              console.log('Fail update card');
              reject(new Error(response));
            });
        } else {
          console.log('Fail no token');
          reject(new Error('No token'));
        }
      });
  }

  moveCard({ cardId, position, columnId }) {
    const apiUrl = serverConnection.baseUrl + serverConnection.actionUrl + serverConnection.slash + cardId;

    return new Promise((resolve, reject) => {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken) {
          const tokenTitle = 'token: ';
          const Authorization = tokenTitle + accessToken;

          const theHeaders = {
            headers: {
              Accept: '*',
              Authorization
            }
          };

          const theBody = JSON.stringify(
            {
              data: {
                position,
                columnId
              }
            }
          );

          axios.put(apiUrl, theBody, theHeaders)
            .then((response) => {
              resolve(deepCopy(response.data));
            })
            .catch((response) => {
              console.log('Fail to move card');
              reject(new Error(response));
            });
        } else {
          console.log('Fail no token');
          reject(new Error('No token'));
        }
      });
  }

  deleteCard(cardId) {
    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard = deepCopy(board);

        // Find the card that will be removed
        const card = clonedBoard.cards.find((_card) => _card.id === cardId);

        if (!card) {
          reject(new Error('Card not found'));
          return;
        }

        // Remove the card from board
        clonedBoard.cards = clonedBoard.cards.filter((_card) => _card.id !== cardId);

        // Find the column using the columnId reference
        const column = clonedBoard.columns.find((_column) => _column.id === card.columnId);

        // If for some reason it does not exist, there's no problem. Maybe something broke before.
        if (column) {
          column.cardIds = column.cardIds.filter((_cardId) => _cardId !== cardId);
        }

        // Save changes
        board = clonedBoard;

        resolve(true);
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  addComment({ cardId, message, userId }) {
    const apiUrl = serverConnection.baseUrl + serverConnection.commentClientUrl;

    return new Promise((resolve, reject) => {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken) {
          const tokenTitle = 'token: ';
          const Authorization = tokenTitle + accessToken;

          const theHeaders = {
            headers: {
              Accept: '*',
              Authorization
            }
          };

          const theBody = JSON.stringify(
            {
                data: {
                    cardId,
                    memberId: userId,
                    message
                }
            }
          );

          axios.post(apiUrl, theBody, theHeaders)
            .then((response) => {
              resolve(deepCopy(response.data));
            })
            .catch((response) => {
              console.log('Fail add new comment');
              reject(new Error(response));
            });
        } else {
          console.log('Fail no token');
          reject(new Error('No token'));
        }
      });
  }

  addChecklist({ cardId, name }) {
    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard = deepCopy(board);

        // Find the card where the checklist will be added
        const card = clonedBoard.cards.find((_card) => _card.id === cardId);

        if (!card) {
          reject(new Error('Card not found'));
          return;
        }

        // Create the new checklist
        const checklist = {
          id: createResourceId(),
          name,
          checkItems: []
        };

        // Add the new checklist to card
        card.checklists.push(checklist);

        // Save changes
        board = clonedBoard;

        resolve(deepCopy(checklist));
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  updateChecklist({ cardId, checklistId, update }) {
    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard = deepCopy(board);

        // Find the card that contains the checklist that will be updated
        const card = clonedBoard.cards.find((_card) => _card.id === cardId);

        if (!card) {
          reject(new Error('Card not found'));
          return;
        }

        // Find the checklist that will be updated
        const checklist = card.checklists.find((_checklist) => _checklist.id === checklistId);

        if (!checklist) {
          reject(new Error('Checklist not found'));
          return;
        }

        // Update the checklist
        Object.assign(checklist, update);

        // Save changes
        board = clonedBoard;

        resolve(deepCopy(checklist));
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  deleteChecklist({ cardId, checklistId }) {
    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard = deepCopy(board);

        // Find the card that contains the checklist that will be removed
        const card = clonedBoard.cards.find((_card) => _card.id === cardId);

        if (!card) {
          reject(new Error('Card not found'));
          return;
        }

        // Remove the checklist from the card
        card.checklists = card.checklists.filter((checklists) => checklists.id !== checklistId);

        // Save changes
        board = clonedBoard;

        resolve(true);
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  addCheckItem({ cardId, checklistId, name }) {
    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard = deepCopy(board);

        // Find the card where the checklist will be added
        const card = clonedBoard.cards.find((_card) => _card.id === cardId);

        if (!card) {
          reject(new Error('Card not found'));
          return;
        }

        // Find the checklist where the check item will be added
        const checklist = card.checklists.find((_checklist) => _checklist.id === checklistId);

        if (!checklist) {
          reject(new Error('Checklist not found'));
          return;
        }

        // Create the new check item
        const checkItem = {
          id: createResourceId(),
          checklistId,
          name,
          state: 'incomplete'
        };

        // Add the check item to the checklist
        checklist.checkItems.push(checkItem);

        // Save changes
        board = clonedBoard;

        resolve(deepCopy(checkItem));
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  updateCheckItem({ cardId, checklistId, checkItemId, update }) {
    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard = deepCopy(board);

        // Find the card where the checklist will be added
        const card = clonedBoard.cards.find((_card) => _card.id === cardId);

        if (!card) {
          reject(new Error('Card not found'));
          return;
        }

        // Find the checklist where the check item will be updated
        const checklist = card.checklists.find((_checklist) => _checklist.id === checklistId);

        if (!checklist) {
          reject(new Error('Checklist not found'));
          return;
        }

        // Find the checklist where the check item will be updated
        const checkItem = checklist.checkItems.find((_checkItem) => _checkItem.id === checkItemId);

        if (!checkItem) {
          reject(new Error('Check item not found'));
          return;
        }

        // Update the check item
        Object.assign(checkItem, update);

        // Save changes
        board = clonedBoard;

        resolve(deepCopy(checkItem));
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  deleteCheckItem({ cardId, checklistId, checkItemId }) {
    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard = deepCopy(board);

        // Find the card that contains the checklist that contains the check item that will be removed
        const card = clonedBoard.cards.find((_card) => _card.id === cardId);

        if (!card) {
          reject(new Error('Card not found'));
          return;
        }

        // Find the checklist where the check item will be updated
        const checklist = card.checklists.find((_checklist) => _checklist.id === checklistId);

        if (!checklist) {
          reject(new Error('Checklist not found'));
          return;
        }

        // Remove the check item from the checklist
        checklist.checkItems = checklist.checkItems.filter((checkItem) => (checkItem.id !== checkItemId));

        // Save changes
        board = clonedBoard;

        resolve(true);
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const kanbanApi = new KanbanApi();
