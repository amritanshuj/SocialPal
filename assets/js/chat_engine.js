class chatEngine{
    constructor(chatBoxId, userName, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userName = userName;
        this.userEmail = userEmail;

        this.socket = io.connect('http://34.203.33.178:5000');

        if (this.userEmail){
            this.connectionHandler();
        }

    }

    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('Connection established using sockets!');


            self.socket.emit('join_room', {
                user_name: self.userName,
                chatroom: 'socialpal'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })


        });

        // Send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_name: self.userName,
                    chatroom: 'socialpal'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_name == self.userName){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_name
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
};