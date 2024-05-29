const student_create_form = document.getElementById("student-create-form");
const student_create_modal = document.getElementById("student-create");
const studentList = document.getElementById("student-data-list");
const msg = document.querySelector(".msg");
const singleStudentData = document.querySelector(".student-data");

// show student data

const getAllStudents = () => {
  const students = getDataLs("students");

  let dataList = "";

  if (students) {
    students.forEach((item, index) => {
      dataList += `
                <tr>
                    <td>${index + 1}</td>
                    <td>
                    <img
                        src="${item.photo}"
                        alt=""
                    />
                    </td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
                    <td>${item.location}</td>
                    <td>${timeJustNow(item.createdAt)}</td>
                    <td>
                    <button class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#student-show" onclick="shwoSingleStudent(
                      '${item.id}'
                    )">
                        <i class="fa fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteStudent('${item.id}')">
                        <i class="fa fa-trash"></i>
                    </button>
                    </td>
                </tr>
            `;
    });
  } else {
    dataList = `
            <tr>
                <td colspan="7" class="text-center text-danger">No data founds</td>
            </tr>
        `;
  }

  studentList.innerHTML = dataList;
};


// Single student data function
const shwoSingleStudent = (id) => {
    const { name, email, phone, location, photo} = getSingledata("students", id);

    singleStudentData.innerHTML = `<img src="${photo}" alt="">
    <h2>${name}</h2>
    <p>${location}</p>`;

};



getAllStudents();


// Delete student info

const deleteStudent = (id) => {

    const conf = confirm ("Are you sure");

    if ( conf ) { 
    deleteSingleData("students", id);
    getAllStudents();
    }
};


// now submit student create form

student_create_form.onsubmit = (e) => {
  e.preventDefault();

  // get form data
  const form_data = new FormData(e.target);
  const { name, email, phone, location, photo } = Object.fromEntries(form_data);

  // form validation
  if (!name || !email || !phone || !location || !photo) {
    msg.innerHTML = createAlert("All fields are required");
  } else if (!isEmail(email)) {
    msg.innerHTML = createAlert("Invalid Email Address", "warning");
  } else if (!isMobile(phone)) {
    msg.innerHTML = createAlert("Invalid Mobile Number", "warning");
  } else {
    sendDataLS("students", {
      id: createID(),
      name,
      email,
      phone,
      location,
      photo,
      createdAt: Date.now(),
    });

    msg.innerHTML = createAlert("student data created", "success");

    e.target.reset();
    getAllStudents();

    student_create_modal.classList.remove("show");
  }
};
