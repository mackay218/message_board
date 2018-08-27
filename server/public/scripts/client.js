console.log('js');

const myApp = angular.module('myApp', []);

myApp.controller('MessageController', function($http){

    const self = this;


    //POST
    self.addMessage = function(message){
        console.log('in add message');

        const newMessage = {
            user: message.user,
            message: message.message
        };

        console.log(newMessage);

        //make sure message and user aren't blank
        if(message.message.length > 0 && message.user.length > 0){
            $http({
                method: 'POST',
                url: '/message',
                data: newMessage
            })
            .then(function(response){
                console.log('added message');
            })
            .catch(function(error){
                console.log('error adding message:', error);
            });
        }
    }; //end addMessage
    
    //GET
    self.getMessage

}); //end MessageController