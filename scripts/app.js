const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newName = document.querySelector('.new-name');
const btns = document.querySelectorAll('.chatbtn');
const updateMssg = document.querySelector('.update-mssg');


newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
})

newName.addEventListener('submit', e => {
    e.preventDefault();

    const name = newName.name.value.trim();
    localStorage.setItem('name', name);

    chatroom.updateName(name)
    newName.reset()

    updateMssg.innerText = `Your name was updated to ${name}`;

    setTimeout(() => updateMssg.innerText = '', 3000)
    
})

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const room = btn.getAttribute('id');
            chatroom.updateRoom(room);
            chatUI.clear()
            chatroom.getChats(chat => chatUI.render(chat));
    })
})

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'shaun');

if (localStorage.getItem('name'))
{
    chatroom.updateName(localStorage.getItem('name'));
}
else
{
    chatroom.updateName('anoniem');
}


chatroom.getChats( data => chatUI.render(data) );