// Global Variables
const baseURL = "http://localhost:3000";
const formData = document.querySelector("#main_form");

// Event listener for the main driver form
formData.addEventListener("submit", handleSubmits);

function handleSubmits(e) {
    e.preventDefault();

    const driverObj = {
        name: e.target.driver_name.value,
        departure: e.target.departure.value,
        destination: e.target.destination.value,
        photo: e.target.driver_photo.value,
        date: e.target.trip_date.value,
        time: e.target.trip_time.value,
        description: e.target.floatingTextarea.value
    };

    handleIDPosts(driverObj);
}

// Send driverObj to API
function handleIDPosts(driverObj) {
    fetch(`${baseURL}/driver`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(driverObj)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data); // Log the response data if needed
    })
    .catch(error => {
        console.error('Error posting driver data:', error);
    });
}

// GET request for driver details
function getContentToFrontEnd() {
    fetch(`${baseURL}/driver`)
        .then(res => res.json())
        .then(drivers => {
            pushToFrontEnd(drivers);
        })
        .catch(error => {
            console.error('Error fetching driver data:', error);
        });
}

// Create a card and append it to frontend
function pushToFrontEnd(drivers) {
    drivers.forEach(driver => {
        const card = document.createElement("li");
        card.className = "appended_list";
        card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${driver.photo}" class="card-img-top" alt="driver photo">
                <div class="card-body">
                    <h5 class="card-title">${driver.name}</h5>
                    <p class="card-text">${driver.description}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">From: <span class="bold_font destination">${driver.departure}</span> To: <span class="bold_font destination">${driver.destination}</span></li>
                    
                    <li class="list-group-item"> Travel Time:  <span class="bold_font">${driver.time}</span></li>
                    <li class="list-group-item">Travel Dates: <span class="bold_font">${driver.date}</span></li>
                </ul>
                <div class="card-button" id="card-buttons">
                    <button class="edit_button">Edit</button>
                    <button class="delete_button">Delete</button>
                </div>
            </div>
        `;
        document.querySelector(".cards_container").appendChild(card);
    });

    // Add event listeners for delete buttons
    function EditButton(){
        const editButtons = document.querySelectorAll(".edit_button");
        editButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            driverObj = {
                name: e.target.driver_name.value,
                departure: e.target.departure.value,
                destination: e.target.destination.value,
                photo: e.target.driver_photo.value,
                date: e.target.trip_date.value,
                time: e.target.trip_time.value,
                description: e.target.floatingTextarea.value
            };

            handleEdits(driver.id)

        });
    });

    }
    EditButton()

    function handleEdits(id){
        fetch(`${baseURL}/driver`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(driverObj)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data); // Log the response data if needed
        })
        .catch(error => {
            console.error('Error posting driver data:', error);
        }); 
    }


   
    // Add event listeners for delete buttons
    function deleteButton(){
        const deleteButtons = document.querySelectorAll(".delete_button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.target.parentNode.parentNode.parentNode.remove()
            alert("Delete button clicked");
            handleDeletes(driver.id)
        });
    });

    }
    deleteButton()

    function handleDeletes(id){
        fetch(`${baseURL}/${id}`, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(res=>res.json())
        .then(data =>console.log(data))
    }

//comments section

    let commentForm = document.querySelector(".comments_form")
    console.log(commentForm)
    let commentsList = document.createElement("li")
    commentForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        commentsList.textContent = e.target.comments_box.value
    })
    document.querySelector(".appends_comments").appendChild(commentsList)


//Mouseover
let card = document.querySelector(".cards_container")
let cardBody = document.querySelector(".card-body")
card.forEach(item=>{
    item.addEventListener("mouseover", ()=>{
        cardBody.style.display = "block"
})

})
}



getContentToFrontEnd();

