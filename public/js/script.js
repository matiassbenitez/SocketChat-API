const joinForm = document.getElementById("join-form");
    const chatDiv = document.getElementById("chat");
    const messagesUl = document.getElementById("messages");
    const roomNameSpan = document.getElementById("room-name");
    let socket;

    joinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const room = document.getElementById("room").value.trim();
      const token = document.getElementById("token").value.trim();
      if (!username || !room) return;

      // hide the join form and show the chat
      joinForm.style.display = "none";
      chatDiv.style.display = "block";
      roomNameSpan.textContent = room;

      // Conect to the socket.io server
      socket = io({ auth: { username, room, token } });

      // Listen for the 'connect' event
      socket.on("message", ({ username, text }) => {
        const li = document.createElement("li");
        li.textContent = `${username}: ${text}`;
        messagesUl.appendChild(li);
      });

      // Form submission for sending messages
      const messageForm = document.getElementById("message-form");
      messageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("message");
        const message = input.value.trim();
        if (message) {
          socket.emit("chatMessage", message);
          input.value = "";
        }
      });
    });