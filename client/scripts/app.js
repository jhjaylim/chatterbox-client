$(document).ready(function() {

  window.app = {

    server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    
    init: function() {
      
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
        success: function (data) {
          $('#chats').append( `<div id="chats"><p> ${data.results[0]}       </p></div>`);
          console.log(JSON.stringify(data.results[0]));
          console.log('chatterbox: Fetched');
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', data);
        }
      });
    },
    clearMessages: function() {
      
      document.getElementById('chats').innerHTML = '';
    },
    renderMessage: function() {
      
    }
     
  };
  window.app.fetch();  
  //
  // var message = {
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
    

});