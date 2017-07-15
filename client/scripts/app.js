$(document).ready(function() {

  window.app = {
    
    server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    
    init: function() {
      var message = {
        username: window.location.search.slice(10),
        text: '------------------------------------------',
        roomname: '         '

      };
      window.app.send(message);
      window.app.fetch();
      
      $('.username').on('click', function(event) {
        window.app.handleUsernameClick();


      });

      $('#sendMessage').on('click', function(data) {
        var message = {
          username: window.location.search.slice(10),
          text: data,
          roomname: ' '

        };
        window.app.send(message);
        window.app.fetch();
      });
      
    },
    
    send: function(input) {
      $.ajax({
    // This is the url you should use to communicate with the parse API server.
        url: this.server,
        type: 'POST',
        data: JSON.stringify(input),
        contentType: 'application/json',
        success: function (data) {
          
          console.log('chatterbox: Message sent');
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', data);
        }
      });
    
    },
    fetch: function() {
      $.ajax({
    // This is the url you should use to communicate with the parse API server.
        url: this.server,
        type: 'GET',
        success: function (fetchResult) {
          console.log(fetchResult.results.slice(90));
          var tenMessages = fetchResult.results.slice(90, 98);
          window.app.renderAllMessages(tenMessages);
          
          //filter rooms from result and get uniq ones and put on rooms
          var usernames = fetchResult.results.map(function(result) {
            return result.username;
            
          });

          usernames = _.uniq(usernames);
          usernames = _.filter(usernames, function(ar) {
            return ar !== null && ar !== undefined;
          });
          console.log(usernames);
          window.app.renderUserList(usernames);
          
          console.log('chatterbox: Fetched');
        },
        error: function (fetchResult) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message');
        }
      });
    },

    clearMessages: function() {
      
      document.getElementById('chats').innerHTML = '';
    },

    renderMessage: function(message) {
      var {username, text} = message;
      username = $(username).text();
      text = $(message).text();
      if (message.charAt(0) !=='<') {
        $('#chats').append('<div><p class="username">' + username + '</p>\n<p class="text">' + text + '</div>');
      
      }
      
      
    },

    renderRoom: function(roomname) {
      $('#roomSelect').append(`<option class="roomname"><a href=>${roomname}</a></option>`);
    },

    renderAllMessages: function(messageArray) {
      
      messageArray.forEach(window.app.renderMessage);

    },
      
    
    handleUsernameClick: function(clickedItem) {
      alert(O);
      
    }, 
    
    renderAllRooms: function(roomArray){
      roomArray.forEach(window.app.renderRoom);

    },
    renderUserList: function(usernames) {
      
      usernames.forEach(window.app.renderUserName);
      
    },
    renderUserName: function(username) {
      $('.userList').append(`<li class="username">${username}</li>`);
    }

     
  };

    
  app.init();
 
});


//window.app.fetch();
  //
  // var message  = {
  //   username: 'shawndrost',
  //   text: 'trololo',
  //   roomname: '4chan'
  // };

  

  // var init = function() {
  //   $.ajax({
  //   // This is the url you should use to communicate with the parse API server.
  //     url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  //     type: 'POST',
  //     data: JSON.stringify(message),
  //     contentType: 'application/json',
  //     success: function (data) {
  //       console.log('chatterbox: Message sent');
  //     },
  //     error: function (data) {
  //       // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
  //       console.error('chatterbox: Failed to send message', data);
  //     }
  //   });
  // };


    // var node = $('#chat').createElement("p");                 // Create a <li> node
    // var textnode = $(document).createTextNode(data.results[0].username);         // Create a text node
    // node.appendChild(textnode);  