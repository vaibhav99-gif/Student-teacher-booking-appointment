const firebaseConfig = {
    apiKey: "AIzaSyCgtnsaJYZ9xy36v9j1bNhfNLFpdm-qP9w",
    authDomain: "automatic-opus-382309.firebaseapp.com",
    databaseURL:"https://automatic-opus-382309-default-rtdb.firebaseio.com",
    projectId: "automatic-opus-382309",
    storageBucket: "automatic-opus-382309.appspot.com",
    messagingSenderId: "813997175242",
    appId: "1:813997175242:web:20daf0e3626a64ae0c5f33",
    measurementId: "G-5DB78QE1BJ"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

auth.onAuthStateChanged(user => {
    if (user) {
        // User is logged in as teacher
        const scheduleForm = document.getElementById('schedule-form');
        const appointmentList = document.getElementById('appointment-list');
        const messagesList = document.getElementById('messages');

        scheduleForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const selectedDate = scheduleForm.querySelector('#appointment-date').value;

            try {
                await db.collection('appointments').add({
                    teacher: user.uid,
                    date: selectedDate,
                    status: 'pending'
                });
                scheduleForm.reset();
            } catch (error) {
                console.error('Appointment scheduling error:', error);
            }
        });

        // Fetch and display teacher's appointments
        db.collection('appointments')
            .where('teacher', '==', user.uid)
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const appointment = doc.data();
                    const listItem = document.createElement('li');
                    listItem.textContent = `Date: ${appointment.date}, Status: ${appointment.status}`;
                    appointmentList.appendChild(listItem);
                });
            });

        // Fetch and display messages
        db.collection('messages')
            .where('recipient', '==', user.uid)
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const message = doc.data();
                    const listItem = document.createElement('li');
                    listItem.textContent = `From: ${message.sender}, Message: ${message.text}`;
                    messagesList.appendChild(listItem);
                });
            });

    } else {
        // User is not logged in, redirect to login page
        window.location.href = 'index.html';
    }
});
