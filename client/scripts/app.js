$(document).ready(function() {

  window.app = {
    users: [],
    rooms: ['All Rooms'],
    server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages?order=-updatedAt',
    
    init: function() {

      this.renderRoom(this.rooms[0]);
      this.fetch();
      this.fetchTimer();
      this.handleUsernameClick();
      this.handleSubmit();
          
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
    handleSubmit: function(){ // set up submit button
      var roomname;
      if (this.findCurrentRoom()!=="All Rooms") {
        roomname = undefined;
      }
      return $("#send .submit").on('click', function(){
        
        var text= _.escape($('#input').val());// escape scripts
        var message = {
          username: window.location.search.slice(10),
          text: text,
          roomname: window.app.findCurrentRoom()
        }
        this.send(message); // send message to 
      });
    },

    fetch: function() { // retrieve messages from server
      $.ajax({
    // This is the url you should use to communicate with the parse API server.
        url: this.server,
        type: 'GET',
        success: function (fetchResult) {
          
          window.app.renderAllMessages(fetchResult.results); // render messages
          window.app.renderUserList(fetchResult.results); // reun
          window.app.renderAllRooms(fetchResult.results);
          
          console.log('chatterbox: Fetched');
        },
        error: function (fetchResult) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message');
        }
      });
    },
    fetchTimer: function(){
      setTimeout(window.app.fetchTimer, 2000);
      window.app.fetch();
    },

    clearMessages: function() {
      $('#chats').empty();
    },

    renderMessage: function(message) {
      var {username, text} = message;
     $('#chats').append('<div><p class="username">User: ' + _.escape(username) + '</p>\n<p class="text">Message: ' + _.escape(text) + '</div>');
    },
    renderAllMessages: function(messageArray) {
      this.clearMessages();


      var messages = messageArray;
      var currentRoom = this.findCurrentRoom();
      var currentFriend = this.findFriend();
      
      if (currentRoom !== "All Rooms") {
        messages = messages.filter(function(msg){
          if (_.escape(msg.roomname)===currentRoom){
            return true;
          }
        });
      }
      if (currentFriend !== 'Default' && currentFriend !== undefined) {

        messages = messages.filter(function(msg){
          if (_.escape(msg.username)===currentFriend){
            return true;
          }
        });
      }
      messages.forEach(this.renderMessage);  
      
    },

    renderRoom: function(roomname) {
      $('#roomSelect').append(`<option class="roomname"><a href=>${roomname}</a></option>`);
    },
    renderAllRooms: function(resultArray){
      // bring current list
      
      if (this.rooms[0]!=='All Rooms') {
        this.rooms.push('All Rooms');
      }
      var newList = resultArray.map(function(result) {// newlist with escaped room names
        return _.escape(result.roomname);
      });

      newList = _.uniq(newList);
      // check if anything new on new list
      this.removeOutdated('rooms', newList);
      newList = this.removeDuplicates(newList, this.rooms);// remove dupes
      for (var i = 0; i<newList.length; i++) { // push non-dupes to array
        this.rooms.push(newList[i]);
      }
      newList.forEach(this.renderRoom);// render new non-dupes

    },
    renderUserName: function(username) {
      $('#userList').append(`<li class="username">${username}</li>`);
    },
    renderUserList: function(resultArray) {
      document.getElementById('userList').innerHTML = '';
        var usernames = resultArray.map(function(result) {
            return _.escape(result.username);
        });
        usernames = _.uniq(usernames);
        usernames = _.filter(usernames, function(ar) {
          return ar !== null && ar !== undefined;
        });
      usernames = usernames.sort(function(a,b) {
        return a.toString().toLowerCase()>b.toString().toLowerCase();
      });
      usernames.forEach(this.renderUserName);
      
    },
    handleUsernameClick: function() {
      return $('#userList, .username').on('click',function(clicked){
        
        var friendName = clicked.target.childNodes[0].nodeValue;

        $('#friendList').append(`<option class="friend"><a href="#" >${friendName}</a></option>`);

      });
    },
    findCurrentRoom: function(){
      return $('#roomSelect').val();
    },
    findFriend: function(){
      return $('#friendList').val();
    },
    removeDuplicates: function(newArray, oldArray) {
     
      var duplicate = [];

      newArray.forEach(function(arr, index){ // finds new index
        if (oldArray.indexOf(arr)>-1) {
          duplicate.push(index);
        }
      });
      for (var i = duplicate.length-1; i>=0; i--) {// removes duplicate rooms
        newArray.splice(duplicate[i],1);
      } 
      
      return newArray;
    },
    removeOutdated: function(typeString, newArray){
    
      if (typeString === 'rooms') {
        var outdated = [];
        this.rooms.forEach(function(arr, index) {// finds outdated index
          if (newArray.indexOf(arr)===-1 && arr!=='All Rooms') {
            outdated.push(index);
          }

        });
        for (var i = outdated.length-1; i>=0; i--) {// removes outdated rooms
          this.rooms.splice(outdated[i],1);
        
        }
      
      // add to current list

      }
    }






     
  };

    
  app.init();
 
});

