// Mock data cho danh sách lớp học của mentor
export const mentorClassesList = [
  {
    id: 1,
    code: "CO3001",
    name: "Công Nghệ Phần Mềm",
    instructor: "Tên Giảng Viên",
    lecture: "L01",
    status: "ongoing",
  },
  {
    id: 2,
    code: "CO1027",
    name: "Kỹ thuật lập trình",
    instructor: "Tên Giảng Viên",
    lecture: "L01,L04,L05",
    status: "ongoing",
  },
  {
    id: 3,
    code: "CO2007",
    name: "Kiến trúc Máy tính",
    instructor: "Tên Giảng Viên",
    lecture: "L02",
    status: "ongoing",
  },
  {
    id: 4,
    code: "CO3117",
    name: "Học máy",
    instructor: "Tên Giảng Viên",
    lecture: "L01,L02",
    status: "ongoing",
  },
  {
    id: 5,
    code: "CO1007",
    name: "Cấu trúc Rời rạc cho Khoa học Máy tính",
    instructor: "Tên Giảng Viên",
    lecture: "L01,L02",
    status: "ongoing",
  },
];

// Mock data chi tiết cho từng lớp học
export const mentorClassesDetail = {
  1: {
    code: "CO3001",
    name: "Công Nghệ Phần Mềm",
    semester: "242",
    instructor: "Tên Giảng Viên",
    lecture: "L01",
    email: "Giangvien@hcmut.edu.vn",
    schedule: [
      { group: "L03", day: "Thứ 2", period: "tiết 2, 3", room: "H6-201" },
      { group: "L01", day: "Thứ 4", period: "tiết 4, 5", room: "H6-202" },
      { group: "L02", day: "Thứ 6", period: "tiết 6, 7", room: "H6-203" },
    ],
    courseMaterials: [
      {
        id: 1,
        name: "01_Ch1 Introduction",
        fileName: "01_Ch1 Introduction.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
      {
        id: 2,
        name: "02_Ch2 Software Processes",
        fileName: "02_Ch2 Software Processes.pdf",
        fileUrl: "/02_Ch2 Software Processes.pdf",
      },
      {
        id: 3,
        name: "03_Ch3_4 Requirements Engineering",
        fileName: "03_Ch3_4_Requirements_Engineering.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf", // Tạm thời dùng file có sẵn
      },
      {
        id: 4,
        name: "06_Ch6 System Modeling",
        fileName: "06_Ch6_System_Modeling.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
      {
        id: 5,
        name: "07_Ch7 Architectural Design",
        fileName: "07_Ch7_Architectural_Design.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
      {
        id: 6,
        name: "08_Ch8 Implementation",
        fileName: "08_Ch8_Implementation.pdf",
        fileUrl: "/02_Ch2 Software Processes.pdf",
      },
      {
        id: 7,
        name: "09_Ch9 Software Testing",
        fileName: "09_Ch9_Software_Testing.pdf",
        fileUrl: "/02_Ch2 Software Processes.pdf",
      },
      {
        id: 8,
        name: "10_Ch10 Agile Methodology",
        fileName: "10_Ch10_Agile_Methodology.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
    ],
    referenceMaterials: [
      {
        id: 1,
        name: "Hướng dẫn vẽ các Usecase, Activity, Sequence, Class Diagram",
        linkUrl: "https://youtu.be/RiGCVzw7pl8?si=hyXJVoVdVvXYoPdx",
      },
      {
        id: 2,
        name: "Clean Code: A Handbook of Agile Software Craftsmanship",
        linkUrl: "https://youtu.be/RiGCVzw7pl8?si=hyXJVoVdVvXYoPdx",
      },
      {
        id: 3,
        name: "Design Patterns: Elements of Reusable Object-Oriented Software",
        linkUrl: "https://youtu.be/RiGCVzw7pl8?si=hyXJVoVdVvXYoPdx",
      },
    ],
  },
  2: {
    code: "CO1027",
    name: "Kỹ thuật lập trình",
    semester: "242",
    instructor: "Tên Giảng Viên",
    lecture: "L01,L04,L05",
    email: "Giangvien@hcmut.edu.vn",
    schedule: [
      { group: "L01", day: "Thứ 2", period: "tiết 1, 2", room: "H6-301" },
      { group: "L04", day: "Thứ 4", period: "tiết 3, 4", room: "H6-302" },
      { group: "L05", day: "Thứ 6", period: "tiết 5, 6", room: "H6-303" },
    ],
    courseMaterials: [
      {
        id: 1,
        name: "Chapter 1 - Cơ bản về Lập trình",
        fileName: "Chapter1.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
      {
        id: 2,
        name: "Chapter 2 - Cấu trúc Dữ liệu",
        fileName: "Chapter2.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
      {
        id: 3,
        name: "Chapter 3 - Thuật toán và Độ phức tạp",
        fileName: "Chapter3.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
      {
        id: 4,
        name: "Chapter 4 - Lập trình Hướng đối tượng",
        fileName: "Chapter4.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
    ],
    referenceMaterials: [
      {
        id: 1,
        name: "Introduction to Algorithms",
        linkUrl: "https://youtu.be/RiGCVzw7pl8?si=hyXJVoVdVvXYoPdx",
      },
      {
        id: 2,
        name: "Data Structures and Algorithms",
        linkUrl: "https://youtu.be/RiGCVzw7pl8?si=hyXJVoVdVvXYoPdx",
      },
    ],
  },
  3: {
    code: "CO2007",
    name: "Kiến trúc Máy tính",
    semester: "242",
    instructor: "Tên Giảng Viên",
    lecture: "L02",
    email: "Giangvien@hcmut.edu.vn",
    schedule: [
      { group: "L02", day: "Thứ 3", period: "tiết 2, 3", room: "H6-401" },
      { group: "L02", day: "Thứ 5", period: "tiết 4, 5", room: "H6-402" },
    ],
    courseMaterials: [
      {
        id: 1,
        name: "Chapter 1 - Tổng quan Kiến trúc Máy tính",
        fileName: "Chapter1.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
      {
        id: 2,
        name: "Chapter 2 - Bộ xử lý và Kiến trúc CPU",
        fileName: "Chapter2.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
      {
        id: 3,
        name: "Chapter 3 - Bộ nhớ và Hệ thống Lưu trữ",
        fileName: "Chapter3.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
      {
        id: 4,
        name: "Chapter 4 - Hệ thống Bus và I/O",
        fileName: "Chapter4.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
      {
        id: 5,
        name: "Chapter 5 - Pipeline và Superscalar",
        fileName: "Chapter5.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
    ],
    referenceMaterials: [
      {
        id: 1,
        name: "Computer Organization and Design",
        linkUrl: "https://youtu.be/RiGCVzw7pl8?si=hyXJVoVdVvXYoPdx",
      },
      {
        id: 2,
        name: "Computer Architecture: A Quantitative Approach",
        linkUrl: "https://youtu.be/RiGCVzw7pl8?si=hyXJVoVdVvXYoPdx",
      },
      {
        id: 3,
        name: "Modern Processor Design",
        linkUrl: "https://youtu.be/RiGCVzw7pl8?si=hyXJVoVdVvXYoPdx",
      },
    ],
  },
  4: {
    code: "CO3117",
    name: "Học máy",
    semester: "242",
    instructor: "Tên Giảng Viên",
    lecture: "L01,L02",
    email: "Giangvien@hcmut.edu.vn",
    schedule: [
      { group: "L01", day: "Thứ 2", period: "tiết 6, 7", room: "H6-501" },
      { group: "L02", day: "Thứ 4", period: "tiết 8, 9", room: "H6-502" },
    ],
    courseMaterials: [
      {
        id: 1,
        name: "Chapter 1 - Giới thiệu Học máy",
        fileName: "Chapter1.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
      {
        id: 2,
        name: "Chapter 2 - Học có Giám sát",
        fileName: "Chapter2.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
      {
        id: 3,
        name: "Chapter 3 - Học không Giám sát",
        fileName: "Chapter3.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
      {
        id: 4,
        name: "Chapter 4 - Neural Networks và Deep Learning",
        fileName: "Chapter4.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
    ],
    referenceMaterials: [
      {
        id: 1,
        name: "Pattern Recognition and Machine Learning",
        linkUrl: "https://youtu.be/RiGCVzw7pl8?si=hyXJVoVdVvXYoPdx",
      },
      {
        id: 2,
        name: "Deep Learning",
        linkUrl: "https://youtu.be/RiGCVzw7pl8?si=hyXJVoVdVvXYoPdx",
      },
    ],
  },
  5: {
    code: "CO1007",
    name: "Cấu trúc Rời rạc cho Khoa học Máy tính",
    semester: "242",
    instructor: "Tên Giảng Viên",
    lecture: "L01,L02",
    email: "Giangvien@hcmut.edu.vn",
    schedule: [
      { group: "L01", day: "Thứ 3", period: "tiết 1, 2", room: "H6-601" },
      { group: "L02", day: "Thứ 5", period: "tiết 3, 4", room: "H6-602" },
    ],
    courseMaterials: [
      {
        id: 1,
        name: "Chapter 1 - Logic và Chứng minh",
        fileName: "Chapter1.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
      {
        id: 2,
        name: "Chapter 2 - Tập hợp và Quan hệ",
        fileName: "Chapter2.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
      {
        id: 3,
        name: "Chapter 3 - Đồ thị và Cây",
        fileName: "Chapter3.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
      {
        id: 4,
        name: "Chapter 4 - Đếm và Xác suất",
        fileName: "Chapter4.pdf",
        fileUrl: "/01_Ch1 Introduction.pdf",
      },
    ],
    referenceMaterials: [
      {
        id: 1,
        name: "Discrete Mathematics and Its Applications",
        linkUrl: "https://youtu.be/RiGCVzw7pl8?si=hyXJVoVdVvXYoPdx",
      },
      {
        id: 2,
        name: "Concrete Mathematics",
        linkUrl: "https://youtu.be/RiGCVzw7pl8?si=hyXJVoVdVvXYoPdx",
      },
      {
        id: 3,
        name: "Introduction to Graph Theory",
        linkUrl: "https://youtu.be/RiGCVzw7pl8?si=hyXJVoVdVvXYoPdx",
      },
    ],
  },
};
