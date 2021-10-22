
const studentList = document.querySelector(".student-list");
const modal = document.querySelector(".modal");
const preview = document.querySelector(".preview");
let gender = 'all'; 
const search = document.querySelector("#search");
const studentApp = {
  state: {
    students: [
      {
        
        id: 1,
        firstName: "Irfan Ali",
        class: "10th",
        DOB: "1995/11/11",
        Phone: "03120000000",
        gender:"Male",
        about:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus fugiat atque quasi esse sapiente aut. Cumque dolorum, architecto laboriosam aut",
      },
      
      {
        id: 2,
        firstName: "Haider",
        class: "12th",
        DOB: "1997/10/10",
        Phone: "03120002222",
        gender:"Male",
        about:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus fugiat atque quasi esse sapiente aut. Cumque dolorum, architecto laboriosam aut",
      },
      {id: 3,
      firstName: "Ambreen",
      class: "11th",
      DOB: "1991/05/01",
      Phone: "03129990000",
      gender:"Female",
      about:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus fugiat atque quasi esse sapiente aut. Cumque dolorum, architecto laboriosam aut",
    },
    {id: 4,
    firstName: "Mavish",
    class: "10th",
    DOB: "1993/05/06",
    Phone: "03126660000",
    gender:"Female",
    about:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus fugiat atque quasi esse sapiente aut. Cumque dolorum, architecto laboriosam aut",
  },
  {id: 5,
    firstName: "Koi B larki",
    class: "13th",
    DOB: "1999/05/01",
    Phone: "03129990022",
    gender:"Female",
    about:
     "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus fugiat atque quasi esse sapiente aut. Cumque dolorum, architecto laboriosam aut",
  },
  {id: 6,
    firstName: "Khan",
    class: "9th",
    DOB: "2002/05/01",
    Phone: "Nill ",
    gender:"Male",
    about:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus fugiat atque quasi esse sapiente aut. Cumque dolorum, architecto laboriosam aut",
  },
    ],
    newStudent: {
      firstName: "",
      class: "",
      DOB: "",
      Phone: "",
      image: "",
      about:"",
      gender: "",
    },
    
  },

  stopPropagation: (e) => {
    e.stopPropagation();
  },

  handleChange: (e) => {
    const newStudent = {
      [e.target.name]: e.target.value,
    };

    studentApp.state.newStudent = {
      ...studentApp.state.newStudent,
      ...newStudent,
    };
  },
  handleStudent: (e) => {
    e.preventDefault();
    let gndr = "";
    let gendes = document.getElementsByName('gdr');

    for(i = 0; i < gendes.length; i++) {
      if(gendes[i].checked) {

        console.log(gendes[i].value);
        gndr = gendes[i].value;
      } 
    }
    console.log(gndr);
    const studentObj = {
      ...studentApp.state.newStudent,
      id:
      studentApp.state.newStudent.id ||
      Number(Math.floor(Math.random() * 100).toFixed(0)),
      gender:gndr,
    };
    
    
    if (studentApp.state.newStudent.id) {
      const index = studentApp.state.students.findIndex(
        (x) => x.id === studentApp.state.newStudent.id
      );
      if (index > -1) {
        studentApp.state.students.splice(index, 1, studentObj);
      }
    } else {
      studentApp.state.students.push(studentObj);
    }
    
    studentApp.closeModal();
    studentApp.render([...studentApp.state.students]);
  },
  loadFile:(event)=> {
    const img = URL.createObjectURL(event.target.files[0]);
    
    const newStudent={
      [event.target.name]:img,
    }
    studentApp.state.newStudent={
      ...studentApp.state.newStudent,
      ...newStudent,
    }
    console.log(studentApp.state.students)
  },

  studentsSearch:()=>{
    let nade = search.value.toLowerCase();
    let myAry = studentApp.state.students.filter((std) =>std.firstName.toLowerCase().includes(nade))
    studentApp.render(myAry)
      },
      showMales: ()=>{
        console.log({gender}
        )
          // if (gender === "all"){
          //   gender = "Male"
          //   studentApp.render(studentApp.state.students)
          // }else{
            gender = "Male"
            let nade = search.value.toLowerCase();
            const newArray = studentApp.state.students.filter( item => item.gender === 'Male')
            let myAry = newArray.filter((std) =>std.firstName.toLowerCase().includes(nade))
            studentApp.render(myAry)
          // }
      },
      showFemales: ()=>{
        console.log([gender])
        if(gender === "all"){
          gender = "Female"
          studentApp.render(studentApp.state.students)
        }
        else
        {
          gender = "all"
          let nade = search.value.toLowerCase();
          const newArray = studentApp.state.students.filter( item => item.gender === 'Female')
          let myAry = newArray.filter((std) =>std.firstName.toLowerCase().includes(nade))
          studentApp.render(myAry);
        }
      },
  handleStudentForm: (student) => {
    const form = `
    <div class="modal-content" id="formModal"onclick="studentApp.stopPropagation(event)">
    <div class="close" onclick="studentApp.closeModal()">&times</div>
    <h3>${student ? "Update" : "Add"} Student Form</h3>
      <form id="form" onkeyup="studentApp.handleChange(event)" onsubmit="studentApp.handleStudent(event)">
      <input class="input" value="${
        student ? student.firstName : ""
      }" name="firstName" placeholder="Enter first name"/>
        <input class="input" value="${
          student ? student.class : ""
        }" name="class" placeholder="Enter class"/>
        <input class="input" value="${
          student ? student.DOB : ""
        }" name="DOB" placeholder="DOB"/>
        <input class="input" value="${
          student ? student.Phone : ""
        }" name="Phone" placeholder="contact"/>
        <div>
        gender:
        <label for="male">Male: </label>
        <input  type="radio" id="male" name="gdr" value="Male">
        <label for="female">Female</label>
        <input  type="radio" id="female" name="gdr" value="Female">
        <div><br>
        <textarea cols="41" rows="3" value="${student ? student.about : ""}" name="about" placeholder="Write ur about"></textarea><br>
        <input type="file"  value="${student ? student.image : ""}" id="output" accept="image/*" name="image"  onchange="studentApp.loadFile(event)">
        <button type="submit">${student ? "Update" : "Add"}</button>
        </div>
        </form>
        </div>
        `;

    modal.style.display = "flex";
    modal.innerHTML = form;
  },
  confirmDelete: () => {
    if (studentApp.state.newStudent.id) {
      const index = studentApp.state.students.findIndex(
        (x) => x.id === studentApp.state.newStudent.id
      );
      if (index > -1) {
        studentApp.state.students.splice(index, 1);
      }
    }
    studentApp.closeModal();
    studentApp.render([...studentApp.state.students]);
  },

  openDeleteModal: (id) => {
    const studentState = [...studentApp.state.students];
    const student = studentState.find((x) => x.id === id);
    if (student) {
      studentApp.state.newStudent = student;
      studentApp.handleStudentForm(student);
      const deleteModal = `
          <div class="confirm" onclick="studentApp.stopPropagation(event)">
              <div class="close" onclick="studentApp.closeModal()">&times;</div>
              <h5>Are you sure?<h5>
              <p>Do you want to delete <strong>${student.firstName}</strong>?</p>
              <button onclick="studentApp.closeModal()">No</button>
              <button onclick="studentApp.confirmDelete()">Yes</button>
          </div>
      `;
      modal.style.display = "flex";
      modal.innerHTML = deleteModal;
    }
  },

  closeModal: () => {
    modal.style.display = "none";
    studentApp.state.newStudent = {
      firstName: "",
      class: "",

    };
  },

  handleUpdate: (id) => {
    const studentState = [...studentApp.state.students];
    const student = studentState.find((x) => x.id === id);
    if (student) {
      studentApp.state.newStudent = student;
      studentApp.handleStudentForm(student);
    }
  },

  handlePreview: (id) => {
    console.log(id);
    const studentState = [...studentApp.state.students];
    const student = studentState.find((x) => x.id === id);

    if (student) {
      studentApp.state.newStudent = student;
      const previewContent = `
          <div class= "previews">
          <img src= ${student.image} >
          <div class="fornt-aswomew"><i class="fas fa-phone-alt"></i> <i class="far fa-comment-dots"></i> <i class="far fa-envelope"></i></div>
          <p><span>About</span><br> ${student.about}</p>
          <div class="about-details">
          <p><span>ID:</span><br> ${student.id}</p>
          <p><span>Name: </span><br> ${student.firstName}</p>
          </div>
          <div class="about-details">
          <p><span style="padding:">Class: </span><br> ${student.class}</p>
          <p><span>Gender: </span><br> ${student.gender}</p>
          </div>
          <div class="about-details">
          <p><span>DOB: </span><br> ${student.DOB}</p>
          <p><span>Phone: </span><br> ${student.Phone}</p>
          </div>
          </div>
      `;
      // preview.style.border = `1px solid #eee`;
      preview.innerHTML = previewContent;
    }
  },
  asscend:() =>{
    const{state, render} = studentApp
    const{students} = state
    students.sort((a, b) =>(a.firstName.toLowerCase() > b.firstName.toLowerCase()) ? 1 : -1 )
    render([...students]);
  },
  idAsscend:() =>{
    const{state,render} = studentApp
    const{students} = state
    students.sort((a, b) =>(a.id> b.id) ? 1 : -1 )
    render([...studentApp.state.students]);
  },
  dobAsnd:() =>{
      const{state,render} = studentApp
      const{students} = state
    students.sort((a, b) =>(a.DOB < b.DOB) ? -1 : 1 )
    render([...students]);
  },
  render: (array) => { 
   
    studentList.innerHTML = "";
    
    let student = `<div class="head"><tr><th>Images</th><th onclick="studentApp.idAsscend()">ID</th><th onclick="studentApp.asscend()">firstName</th><th>class</th><th onclick="studentApp.dobAsnd()">DOB</th><th>Phone</th><th>Action</th></tr></div>`
    array.forEach((item) => {
      student += `
      <div>    
            <tr>
            
                <td class="list-img"><img src="${item.image}" alt="Image"></td>
                <td class="list-item">${item.id}</td>
                <td class="list-item">${item.firstName}</td>
                <td class="list-item">${item.class}</td>
                <td class="list-item">${item.DOB}</td>
                <td class="list-item">${item.Phone}</td>
                <td class="btns">
                    <button onclick="studentApp.handlePreview(${item.id})">View</button>
                    <button onclick="studentApp.handleUpdate(${item.id})">Edit</button>
                    <button onclick="studentApp.openDeleteModal(${item.id})">Delete</button>
                </td>
            </tr>
          </div>
        `;
      });
      studentList.innerHTML = student;
    },
    init: () => {
        const{state,render}=studentApp
        const{students} = state
        render(students);
    },
};
const{init} = studentApp
init();
