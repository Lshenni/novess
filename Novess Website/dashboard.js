// Import the necessary Firebase SDK modules
import "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";

import { initializeApp} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";

//new web - novess-evidence
const firebaseConfig = {
  apiKey: "AIzaSyBU9rRU22gqv8ZAgtM_XZ88ftZQ2xbFpaM",
  authDomain: "novess-evidence.firebaseapp.com",
  databaseURL: "https://novess-evidence-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "novess-evidence",
  storageBucket: "novess-evidence.appspot.com",
  messagingSenderId: "961224559252",
  appId: "1:961224559252:web:67c6f38606569840154281",
  measurementId: "G-BTYQNX72B4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const searchButton = document.querySelector('#content main .table-data .order .head form .form-input button');

searchButton.addEventListener('click', function(e) {
  e.preventDefault(); // Prevent form submission
  displayUserDetails();
});

// function openLightbox(imgElement) {
//   var expandedImg = document.getElementById("expandedImg");
//   expandedImg.src = imgElement.src;
//   var overlay = imgElement.parentElement.nextElementSibling;
//   overlay.style.display = "flex";
// }

// function closeLightbox() {
//   var overlay = document.querySelector(".overlay");
//   overlay.style.display = "none";
// }

// document.addEventListener("DOMContentLoaded", function() {
  
//   // Add event listeners to image elements
//   var images = document.querySelectorAll("img");
//   images.forEach(function(img) {
//     img.addEventListener("click", function() {
//       openLightbox(this);
//     });
//   });

//   // Add event listener to close button
//   var closeButton = document.querySelector(".close");
//   closeButton.addEventListener("click", closeLightbox);
// });  
  
  
function displayUserDetails() {
  var carplate = document.getElementById("carplate").value; //takes in the user input
  var foldersRef = ref(database, 'user/' + carplate); // Assuming 'folders' is the parent node containing the folders

  onValue(foldersRef, function(snapshot) {
    console.log("Successfully fetched folders");

    var tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Clear the existing table rows before populating with new data
    var numSummons = 0;
    var outstandingSummons = 0;

    snapshot.forEach(function(childSnapshot) {
        var dataKey = childSnapshot.key;
        var folderData = childSnapshot.val();

        if (snapshot.exists()) {
        // Perform search based on the carplate value or any other criteria you have

        var carnum = folderData.Carnum;
        var date= folderData.Date;
        var time= folderData.Time;
        var location= folderData.Location;
        var amount= folderData.Amount;
        var audio= folderData.wavFileUrl;
        var image= folderData.imageFileUrl;
        audio = String(audio);

        // Create a new row for each item and append it to the table
        var tableRow = document.createElement("tr");
        tableRow.innerHTML = `
          <td>${carnum}</td>
          <td>${date}</td>
          <td>${time}</td>
          <td>${location}</td>
          <td>${amount}</td>
          <td><audio controls><source src='${audio}' type="audio/mpeg"></audio></td>
          <td>
          <div class="lightbox">
          <img src="${image}" alt="Image" onclick="openLightbox(this)">
            <div class="overlay">
              <span class="close" onclick="closeLightbox()">&times;</span>
              <img class="lightbox-content" id="expandedImg">
            </div>
          </div></td>
        `;
        tableBody.appendChild(tableRow);
        numSummons += 1;
        outstandingSummons += folderData.Amount;
        if (numSummons === 0) {
          // No records found
          alert("No records found for the specified carplate.");
        } else {
          // Update the total number of summons and outstanding summons
          document.getElementById("num-summons").textContent = numSummons;
          document.getElementById("outstanding-summons").textContent = outstandingSummons;
        }
      
      } else {
        // Handle case when the user data does not exist
        console.log("User data not found");
      }

  
    }) //close snapshot.forEach(function(childSnapshot){
  }) //onValue(foldersRef, function(snapshot) {
         
}//main 




//   const userRef = ref(database, 'user/'+ carplate);
//   var numSummons = 0;
//   var outstandingSummons = 0;

//     onValue(userRef, (snapshot) => {
//       snapshot.forEach((childSnapshot) => {
//         const childKey = childSnapshot.key;
//         const childData = childSnapshot.val();
//         console.log(childKey, childData);
//         // ...
//         if (snapshot.exists()) {
//           const userData = snapshot.val();
//           const carnum = userData.Carplate;
//           const date= userData.Date;
//           const time= userData.Time;
//           const location= userData.Location;
//           const amount= userData.Amount;
//           numSummons += 1;
//           outstandingSummons += data.Amount;
  
//           // Create a new row for each item and append it to the table
//           var tableRow = document.createElement("tr");
//           tableRow.innerHTML = `
//             <td>${carnum}</td>
//             <td>${date}</td>
//             <td>${time}</td>
//             <td>${location}</</td>
//             <td>${amount}</td>
//             <td>${carnum}</td>
//           `;
//           document.getElementById("table-body").appendChild(tableRow);
  
//           // Update the text content of the <h3> elements with the retrieved values
//           document.getElementById("num-summons").textContent = numSummons;
//           document.getElementById("outstanding-summons").textContent = outstandingSummons;
      
//         } else {
//             // Handle case when the user data does not exist
//             console.log("User data not found");
//             alert("User data not found");
//         }
//       });
//     }, {
//       onlyOnce: true
//     });
// }

// searchButton.addEventListener('click', function (e) {
// 	if(window.innerWidth < 576) {
// 		e.preventDefault();
// 		searchForm.classList.toggle('show');
// 		if(searchForm.classList.contains('show')) {
// 			searchButtonIcon.classList.replace('bx-search', 'bx-x');
// 		} else {
// 			searchButtonIcon.classList.replace('bx-x', 'bx-search');
// 		}
// 	}
// })


// // Retrieve the authenticated user's UID from localStorage
// var uid = localStorage.getItem("uid");

// // Create the base path to the Users folder
// var basePath = "Users/PNB8550";

// // Display user email and carnum on the web dashboard
// function displayUserDetails() {
//     const userRef = ref(db, basePath + uid);
//     onValue(userRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const userData = snapshot.val();
//         const carnum = userData.carnum;
//         const email = userData.email;
        
//        // Update the text content of the <h3> elements with the retrieved values
//       document.getElementById("num-summons").textContent = carnum;
//       document.getElementById("outstanding-summons").textContent = email;
      
//     } else {
//         // Handle case when the user data does not exist
//         console.log("User data not found");
//       }
//     }, {
//       onlyOnce: true // Unsubscribe after the initial value is retrieved
//     });
//   }