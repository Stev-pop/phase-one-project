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

    renderDriversObject(driverObj);
    document.querySelector("#main_form").reset()
}

// Render object
function renderDriversObject(driverObj) {
    fetch(`${baseURL}/drivers`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(driverObj)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error posting driver data:', error);
    });
}

// GET request for driver details
function getContentToFrontEnd() {
    fetch(`${baseURL}/drivers`)
        .then(res => res.json())
        .then(drivers => {
            pushToFrontEnd(drivers);
        })
        .catch(error => {
            console.error('Error fetching driver data:', error);
        });
}

// Create a card
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
        //Add event listener to edit button
        let editButton = card.querySelector(".edit_button")
        editButton.addEventListener("click", ()=>
                        handleEditing(driver))

        //Add event listener to delete button
        card.querySelector(".delete_button").addEventListener("click", (e)=>{
            confirmsDeleteAlert()
            updateDelete(driver.id)
        })

        function confirmsDeleteAlert(e){
            let result = confirm("Are you sure you want to delete this post?")
            if(result == false){
                e.preventDefault()
            }else{
                card.remove(e)
            }
        }
        //Mouseover Event on cards
        function mouseOver(){
            card.addEventListener("mouseover", (e)=>{
                let cardBody = e.currentTarget.querySelector('.card-body')
                console.groupCollapsed(cardBody)
                cardBody.style.display = "block"
                mouseOut(cardBody)
                
        })

        }
        mouseOver()
        
    function mouseOut(item){
        card.addEventListener("mouseout", (e) => {
            item.style.display = "none";
    })
    }

        //Append card to parentNode
        document.querySelector(".cards_container").appendChild(card);
    });

        //Update delete event
    function updateDelete(id){
        fetch(`${baseURL}/drivers/${id}`, {
            method: "DELETE",
            headers:{
            "Content-Type": "application/json"
            }
        })
        .then(res => console.log(res))  
    }


        //comments section
let commentsForm = document.querySelector(".comments_form")
commentsForm.addEventListener("submit", handleCommentSubmits)


function handleCommentSubmits(e){
    e.preventDefault()
    console.log(e.target.comments_box.value)
    let commentsObj = {username: "Anonymous", comments: e.target.comments_box.value}
    postComments(commentsObj)
    e.target.reset()
}

function postComments(comments){
    fetch(`${baseURL}/comments`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comments)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error posting driver data:', error);
    });
}

}


  
           
    


  
//handle GET request for comments
fetch(`${baseURL}/comments`)
.then(res => res.json())
.then(comments =>{
    handleComments(comments)})


function handleComments(data){
    data.forEach(item=>{
    let commentsList = document.createElement("li");
    commentsList.className = "form_list"
    commentsList.textContent = item.comments
    document.querySelector(".appends_comments").appendChild(commentsList);
        })

    }
    
 
    
    {
        
    
    }
      





    


getContentToFrontEnd();
mouseOverEvent()

