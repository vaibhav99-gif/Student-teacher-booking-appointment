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
      
        const registrationForm = document.getElementById('registration-form');
        const loginForm = document.getElementById('login-form');
        const searchTeachersForm = document.getElementById('search-teachers-form');
        const teacherList = document.getElementById('teacher-list');
        const bookAppointmentForm = document.getElementById('book-appointment-form');
        const logoutButton = document.getElementById('logout-btn');
   
        registrationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = registrationForm.querySelector('#student-name').value;
            const email = registrationForm.querySelector('#student-email').value;
            const password = registrationForm.querySelector('#student-password').value;
            
            try {
                await auth.createUserWithEmailAndPassword(email, password);
                await db.collection('students').doc(user.uid).set({
                    name,
                    email
                });
                registrationForm.reset();
            } catch (error) {
                console.error('Registration error:', error);
            }
        });
        
        searchTeachersForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const searchQuery = searchTeachersForm.querySelector('#search-query').value;
            
            teacherList.innerHTML = ''; // Clear the list
            
            try {
                const snapshot = await db.collection('teachers')
                    .where('name', '>=', searchQuery)
                    .where('name', '<=', searchQuery + '\uf8ff')
                    .get();
                    
                snapshot.forEach(doc => {
                    const teacher = doc.data();
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<strong>${teacher.name}</strong> - ${teacher.department}`;
                    const bookButton = document.createElement('button');
                    bookButton.textContent = 'Book';
                    bookButton.addEventListener('click', () => {
                        // Handle booking appointment logic
                    });
                    listItem.appendChild(bookButton);
                    teacherList.appendChild(listItem);
                });
            } catch (error) {
                console.error('Teacher search error:', error);
            }
        });
    } else {
        // User is not logged in, redirect to login page
        window.location.href = 'index.html';
    }
});
