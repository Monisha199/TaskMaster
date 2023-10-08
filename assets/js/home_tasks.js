const check_box=document.getElementsByClassName("check_box");
console.log(check_box);

var checked_elements= new Set(); //set that stores elements checked

// to check the element that is selcted by user and store in set
for (let i=0;i<check_box.length;i++){
    console.log(check_box[i]);
    check_box[i].addEventListener("click",()=>{
    check_box[i].style.backgroundImage="url('https://tse2.mm.bing.net/th?id=OIP.Tg7fvFywT24QYfMQ2awZzgHaHa&pid=Api&P=0&h=180')";
    check_box[i].style.backgroundSize="contain";
    var check_box_id=String(check_box[i].getAttribute("data-cbid"))
    if((checked_elements.has(check_box_id))){ // handles the case where user selects a checkbox and then unselect it
        console.log("i have to delete")
        checked_elements.delete(check_box_id);
        check_box[i].style.backgroundImage="none";
        
    }
    else{
        console.log("im here")
        checked_elements.add(check_box_id);
    }
    
    // console.log("hello from",check_box[i]);
    // console.log("checkeddd",checked_elements);
})
}
// console.log("checked",checked_elements);


//to make color of category button unique
const category_arr = document.getElementsByClassName('category_class');

// console.log(category_arr)
for (let j=0; j<category_arr.length;j++){
    var check_string= category_arr[j].innerText;
    console.log("check string",check_string)
    if(check_string=="Work"){
        category_arr[j].style.backgroundColor="lightgreen";
    }
    else if(check_string=="School"){
        category_arr[j].style.backgroundColor="lightgray";
    }
    else if(check_string=="Cleaning"){
        category_arr[j].style.backgroundColor="orange";
    }
    else if(check_string=="Other"){
        category_arr[j].style.backgroundColor="pink";
    }
}


// to delete the selected elements
const deletetask= document.getElementById("delete-btn");

deletetask.addEventListener("click",()=>{
    let arr = Array.from(checked_elements); // convert set-checked_elements to array 
    const params = new URLSearchParams();// URLSearchParams API to construct (and deconstruct) the querystring to pass in url of delete-task
    arr.forEach((player) => params.append("playerName", player));
    console.log("params",params.toString());
    // creating final url as "/delete-task/?playerName=64c6bd881a0dc7219c36f83f&playerName=64c6bd7d1a0dc7219c36f83c"
    add_arr_to_url=deletetask.getAttribute("href")+'?'; 
    deletetask.setAttribute("href",add_arr_to_url+params.toString()); // setting href attr to required format
    console.log(deletetask.getAttribute("href"));

})


