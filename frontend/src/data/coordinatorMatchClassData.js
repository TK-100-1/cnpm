// Danh sách Khoa để lọc
export const departments = ["Khoa học và Kỹ thuật máy tính", "Điện-điện tử", "Cơ Khí"];

// Danh sách Mentee (Học viên) chờ ghép lớp
export const initialMentees = [
  { id: 101, mssv: "2310001", name: "Nguyễn Văn A", department: "Khoa học và Kỹ thuật máy tính" },
  { id: 102, mssv: "2310002", name: "Trần Thị B", department: "Khoa học và Kỹ thuật máy tính" },
  { id: 103, mssv: "2310003", name: "Nguyễn Văn C", department: "Khoa học và Kỹ thuật máy tính" },
  { id: 104, mssv: "2310004", name: "Trần Thị D", department: "Khoa học và Kỹ thuật máy tính" },
  { id: 105, mssv: "2310005", name: "Nguyễn Văn E", department: "Điện-điện tử" },
  { id: 106, mssv: "2310006", name: "Trần Thị F", department: "Điện-điện tử" },
  { id: 107, mssv: "2310007", name: "Nguyễn Văn G", department: "Điện-điện tử" },
  { id: 108, mssv: "2310008", name: "Trần Thị H", department: "Điện-điện tử" },
  { id: 109, mssv: "2310009", name: "Nguyễn Văn I", department: "Cơ Khí" },
  { id: 110, mssv: "2310010", name: "Trần Thị J", department: "Cơ Khí" },
  { id: 111, mssv: "2310011", name: "Nguyễn Văn K", department: "Cơ Khí" },
  { id: 112, mssv: "2310012", name: "Trần Thị L", department: "Cơ Khí" },
];

// Danh sách Mentor (Giảng viên) và các lớp họ đang mở
export const mentorsList = [
  { 
    id: 201, 
    mscb: "GV001", 
    name: "Nguyễn Văn X", 
    department: "Khoa học và Kỹ thuật máy tính",
    classes: [
      { id: "c1", name: "CO3001 - Công nghệ phần mềm - L01" },
      { id: "c2", name: "CO3001 - Công nghệ phần mềm - L02" }
    ]
  },
  { 
    id: 202, 
    mscb: "GV002", 
    name: "Trần Thị Y", 
    department: "Điện-điện tử",
    classes: [
      { id: "c3", name: " CO2037 - Mạch điện điện tử - L01" }
    ]
  },
  { 
    id: 203, 
    mscb: "GV003", 
    name: "Lê Văn Z", 
    department: "Cơ Khí",
    classes: [
      { id: "c4", name: "IS2012 - Vẽ kí thuật - L03" },
      { id: "c5", name: "IS2012 - Vẽ kí thuật - L04" }
    ]
  },
];