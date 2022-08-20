import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { AiFillSchedule } from "react-icons/ai";
import { BiCalendarCheck, BiCalendarX } from "react-icons/bi";
import { BsBoxSeam, BsCurrencyDollar, BsShield } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import { FaCodeBranch } from "react-icons/fa";
import { FiBarChart, FiCreditCard, FiSettings } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { HiDocumentReport, HiOutlineRefresh } from "react-icons/hi";
import { IoMdContacts } from "react-icons/io";
import {
  MdDashboard,
  MdManageAccounts,
  MdOutlineSupervisorAccount,
  MdReviews,
} from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { TiContacts } from "react-icons/ti";
import avatar from "./avatar.jpg";
import avatar2 from "./avatar2.jpg";
import avatar3 from "./avatar3.png";
import avatar4 from "./avatar4.jpg";
import product1 from "./product1.jpg";
import product2 from "./product2.jpg";
import product3 from "./product3.jpg";
import product4 from "./product4.jpg";
import product5 from "./product5.jpg";
import product6 from "./product6.jpg";
import product7 from "./product7.jpg";

export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);

export const gridOrderStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-neutral py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);

export const kanbanGrid = [
  { headerText: "To Do", keyField: "Open", allowToggle: true },

  { headerText: "In Progress", keyField: "InProgress", allowToggle: true },

  {
    headerText: "Testing",
    keyField: "Testing",
    allowToggle: true,
    isExpanded: false,
  },

  { headerText: "Done", keyField: "Close", allowToggle: true },
];
const gridEmployeeProfile = (props) => (
  <div className="flex items-center gap-2">
    <img
      className="rounded-full w-10 h-10"
      src={props.EmployeeImage}
      alt="employee"
    />
    <p>{props.Name}</p>
  </div>
);

const gridEmployeeCountry = (props) => (
  <div className="flex items-center justify-center gap-2">
    <GrLocation />
    <span>{props.Country}</span>
  </div>
);
export const EditorData = () => (
  <div>
    <h3>
      Try React React has been designed from the start for gradual adoption, and
      you can use as little or as much React as you need. Whether you want to
      get a taste of React, add some interactivity to a simple HTML page, or
      start a complex React-powered app, the links in this section will help you
      get started. Online Playgrounds If you’re interested in playing around
      with React, you can use an online code playground. Try a Hello World
      template on CodePen, CodeSandbox, or Stackblitz. If you prefer to use your
      own text editor, you can also download this HTML file, edit it, and open
      it from the local filesystem in your browser. It does a slow runtime code
      transformation, so we’d only recommend using this for simple demos. Add
      React to a Website You can add React to an HTML page in one minute. You
      can then either gradually expand its presence, or keep it contained to a
      few dynamic widgets. Create a New React App When starting a React project,
      a simple HTML page with script tags might still be the best option. It
      only takes a minute to set up! As your application grows, you might want
      to consider a more integrated setup. There are several JavaScript
      toolchains we recommend for larger applications. Each of them can work
      with little to no configuration and lets you take full advantage of the
      rich React ecosystem. Learn how. Learn React People come to React from
      different backgrounds and with different learning styles. Whether you
      prefer a more theoretical or a practical approach, we hope you’ll find
      this section helpful. If you prefer to learn by doing, start with our
      practical tutorial. If you prefer to learn concepts step by step, start
      with our guide to main concepts. Like any unfamiliar technology, React
      does have a learning curve. With practice and some patience, you will get
      the hang of it. First Examples The React homepage contains a few small
      React examples with a live editor. Even if you don’t know anything about
      React yet, try changing their code and see how it affects the result.
      React for Beginners If you feel that the React documentation goes at a
      faster pace than you’re comfortable with, check out this overview of React
      by Tania Rascia. It introduces the most important React concepts in a
      detailed, beginner-friendly way. Once you’re done, give the documentation
      another try! React for Designers If you’re coming from a design
      background, these resources are a great place to get started. JavaScript
      Resources The React documentation assumes some familiarity with
      programming in the JavaScript language. You don’t have to be an expert,
      but it’s harder to learn both React and JavaScript at the same time. We
      recommend going through this JavaScript overview to check your knowledge
      level. It will take you between 30 minutes and an hour but you will feel
      more confident learning React.
    </h3>
  </div>
);
const customerGridImage = (props) => (
  <div className="image flex gap-4">
    <img
      className="rounded-full w-10 h-10"
      src={props.CustomerImage}
      alt="employee"
    />
    <div>
      <p>{props.CustomerName}</p>
      <p>{props.CustomerEmail}</p>
    </div>
  </div>
);

const customerGridStatus = (props) => (
  <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
    <p
      style={{ background: props.StatusBg }}
      className="rounded-full h-3 w-3"
    />
    <p>{props.Status}</p>
  </div>
);
export const areaPrimaryXAxis = {
  valueType: "DateTime",
  labelFormat: "y",
  majorGridLines: { width: 0 },
  intervalType: "Years",
  edgeLabelPlacement: "Shift",
  labelStyle: { color: "gray" },
};

export const areaPrimaryYAxis = {
  labelFormat: "{value}%",
  lineStyle: { width: 0 },
  maximum: 4,
  interval: 1,
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelStyle: { color: "gray" },
};
export const barPrimaryXAxis = {
  valueType: "Category",
  interval: 1,
  majorGridLines: { width: 0 },
};
export const barPrimaryYAxis = {
  majorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 },
  labelStyle: { color: "transparent" },
};
const areaChartData = [
  [
    { x: new Date(2002, 0, 1), y: 2.2 },
    { x: new Date(2003, 0, 1), y: 3.4 },
    { x: new Date(2004, 0, 1), y: 2.8 },
    { x: new Date(2005, 0, 1), y: 1.6 },
    { x: new Date(2006, 0, 1), y: 2.3 },
    { x: new Date(2007, 0, 1), y: 2.5 },
    { x: new Date(2008, 0, 1), y: 2.9 },
    { x: new Date(2009, 0, 1), y: 3.8 },
    { x: new Date(2010, 0, 1), y: 1.4 },
    { x: new Date(2011, 0, 1), y: 3.1 },
  ],
  [
    { x: new Date(2002, 0, 1), y: 2 },
    { x: new Date(2003, 0, 1), y: 1.7 },
    { x: new Date(2004, 0, 1), y: 1.8 },
    { x: new Date(2005, 0, 1), y: 2.1 },
    { x: new Date(2006, 0, 1), y: 2.3 },
    { x: new Date(2007, 0, 1), y: 1.7 },
    { x: new Date(2008, 0, 1), y: 1.5 },
    { x: new Date(2009, 0, 1), y: 2.8 },
    { x: new Date(2010, 0, 1), y: 1.5 },
    { x: new Date(2011, 0, 1), y: 2.3 },
  ],
  [
    { x: new Date(2002, 0, 1), y: 0.8 },
    { x: new Date(2003, 0, 1), y: 1.3 },
    { x: new Date(2004, 0, 1), y: 1.1 },
    { x: new Date(2005, 0, 1), y: 1.6 },
    { x: new Date(2006, 0, 1), y: 2 },
    { x: new Date(2007, 0, 1), y: 1.7 },
    { x: new Date(2008, 0, 1), y: 2.3 },
    { x: new Date(2009, 0, 1), y: 2.7 },
    { x: new Date(2010, 0, 1), y: 1.1 },
    { x: new Date(2011, 0, 1), y: 2.3 },
  ],
];

export const areaCustomSeries = [
  {
    dataSource: areaChartData[0],
    xName: "x",
    yName: "y",
    name: "USA",
    opacity: "0.8",
    type: "SplineArea",
    width: "2",
  },
  {
    dataSource: areaChartData[1],
    xName: "x",
    yName: "y",
    name: "France",
    opacity: "0.8",
    type: "SplineArea",
    width: "2",
  },
  {
    dataSource: areaChartData[2],
    xName: "x",
    yName: "y",
    name: "Germany",
    opacity: "0.8",
    type: "SplineArea",
    width: "2",
  },
];

export const barChartData = [
  [
    { x: "Developer", y: 50 },
    { x: "Design", y: 27 },
    { x: "Marketing", y: 26 },
  ],
  [
    { x: "Developer", y: 37 },
    { x: "Design", y: 23 },
    { x: "Marketing", y: 18 },
  ],
  [
    { x: "Developer", y: 38 },
    { x: "Design", y: 17 },
    { x: "Marketing", y: 26 },
  ],
];

export const barCustomSeries = [
  {
    dataSource: barChartData[0],
    xName: "x",
    yName: "y",
    name: "Gold",
    type: "Column",
    marker: {
      dataLabel: {
        visible: true,
        position: "Top",
        font: { fontWeight: "600", color: "#ffffff" },
      },
    },
  },
  {
    dataSource: barChartData[1],
    xName: "x",
    yName: "y",
    name: "Silver",
    type: "Column",
    marker: {
      dataLabel: {
        visible: true,
        position: "Top",
        font: { fontWeight: "600", color: "#ffffff" },
      },
    },
  },
  {
    dataSource: barChartData[2],
    xName: "x",
    yName: "y",
    name: "Bronze",
    type: "Column",
    marker: {
      dataLabel: {
        visible: true,
        position: "Top",
        font: { fontWeight: "600", color: "#ffffff" },
      },
    },
  },
];

export const ColorMappingPrimaryXAxis = {
  valueType: "Category",
  majorGridLines: { width: 0 },
  title: "Months",
};

export const ColorMappingPrimaryYAxis = {
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelFormat: "{value}°C",
  title: "Temperature",
};

export const FinancialPrimaryXAxis = {
  valueType: "DateTime",
  minimum: new Date("2016, 12, 31"),
  maximum: new Date("2017, 9, 30"),
  crosshairTooltip: { enable: true },
  majorGridLines: { width: 0 },
};

export const FinancialPrimaryYAxis = {
  title: "Price",
  minimum: 100,
  maximum: 180,
  interval: 20,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
};

export const LinePrimaryXAxis = {
  valueType: "DateTime",
  labelFormat: "y",
  intervalType: "Years",
  edgeLabelPlacement: "Shift",
  majorGridLines: { width: 0 },
  background: "white",
};

export const LinePrimaryYAxis = {
  labelFormat: "{value}%",
  rangePadding: "None",
  minimum: 0,
  maximum: 100,
  interval: 20,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
};

export const customersGrid = [
  { type: "checkbox", width: "50" },
  {
    headerText: "Name",
    width: "150",
    template: customerGridImage,
    textAlign: "Center",
  },
  {
    field: "ProjectName",
    headerText: "Project Name",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "Status",
    headerText: "Status",
    width: "130",
    format: "yMd",
    textAlign: "Center",
    template: customerGridStatus,
  },
  {
    field: "Weeks",
    headerText: "Weeks",
    width: "100",
    format: "C2",
    textAlign: "Center",
  },
  {
    field: "Budget",
    headerText: "Budget",
    width: "100",
    format: "yMd",
    textAlign: "Center",
  },

  {
    field: "Location",
    headerText: "Location",
    width: "150",
    textAlign: "Center",
  },

  {
    field: "CustomerID",
    headerText: "Customer ID",
    width: "120",
    textAlign: "Center",
    isPrimaryKey: true,
  },
];

export const employeesGrid = [
  {
    headerText: "Employee",
    width: "150",
    template: gridEmployeeProfile,
    textAlign: "Center",
  },
  { field: "Name", headerText: "", width: "0", textAlign: "Center" },
  {
    field: "Title",
    headerText: "Designation",
    width: "170",
    textAlign: "Center",
  },
  {
    headerText: "Country",
    width: "120",
    textAlign: "Center",
    template: gridEmployeeCountry,
  },

  {
    field: "HireDate",
    headerText: "Hire Date",
    width: "135",
    format: "yMd",
    textAlign: "Center",
  },

  {
    field: "ReportsTo",
    headerText: "Reports To",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "EmployeeID",
    headerText: "Employee ID",
    width: "125",
    textAlign: "Center",
  },
];

export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "overview",
        icon: <MdDashboard />,
      },
    ],
  },

  {
    title: "Pages",
    links: [
      {
        name: "branch",
        icon: <FaCodeBranch />,
      },
      {
        name: "Payroll",
        icon: <LocalAtmIcon />,
      },
      {
        name: "employees",
        icon: <IoMdContacts />,
      },
      {
        name: "attendance",
        icon: <BiCalendarCheck />,
      },
      {
        name: "leave",
        icon: <BiCalendarX />,
      },
      {
        name: "Shift & Scheduling",
        icon: <AiFillSchedule />,
      },
      {
        name: "review",
        icon: <MdReviews />,
      },
      {
        name: "report",
        icon: <HiDocumentReport />,
      },
      {
        name: "Manage",
        icon: <MdManageAccounts />,
      },
      {
        name: "permission",
        icon: <MdManageAccounts />,
      },
      {
        name: "polices",
        icon: <CgFileDocument />,
      },
      {
        name: "profile",
        icon: <RiContactsLine />,
      },
      {
        name: "EmployeesContact",
        icon: <TiContacts />,
      },
      {
        name: "settings",
        icon: <FiSettings />,
      },
    ],
  },
];

export const cartData = [
  {
    image: product5,
    name: "butterscotch ice-cream",
    category: "Milk product",
    price: "$250",
  },
  {
    image: product6,
    name: "Supreme fresh tomato",
    category: "Vegetable Item",
    price: "$450",
  },
  {
    image: product7,
    name: "Red color candy",
    category: "Food Item",
    price: "$190",
  },
];

export const earningData = [
  {
    icon: <MdOutlineSupervisorAccount />,
    amount: "39,354",
    percentage: "-4%",
    title: "Customers",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    pcColor: "red-600",
  },
  {
    icon: <BsBoxSeam />,
    amount: "4,396",
    percentage: "+23%",
    title: "Products",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
    pcColor: "green-600",
  },
  {
    icon: <FiBarChart />,
    amount: "423,39",
    percentage: "+38%",
    title: "Sales",
    iconColor: "rgb(228, 106, 118)",
    iconBg: "rgb(255, 244, 229)",

    pcColor: "green-600",
  },
  {
    icon: <HiOutlineRefresh />,
    amount: "39,354",
    percentage: "-12%",
    title: "Refunds",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
    pcColor: "red-600",
  },
];

export const medicalproBranding = {
  data: [
    {
      title: "Due Date",
      desc: "Oct 23, 2021",
    },
    {
      title: "Budget",
      desc: "$98,500",
    },
    {
      title: "Expense",
      desc: "$63,000",
    },
  ],
  teams: [
    {
      name: "Bootstrap",
      color: "orange",
    },
    {
      name: "Angular",
      color: "#FB9678",
    },
  ],
  leaders: [
    {
      image: avatar2,
    },
    {
      image: avatar3,
    },
    {
      image: avatar2,
    },
    {
      image: avatar4,
    },
    {
      image: avatar,
    },
  ],
};

export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: "My Profile",
    desc: "Account Settings",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
  },
  {
    icon: <BsShield />,
    title: "My Inbox",
    desc: "Messages & Emails",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
  },
  {
    icon: <FiCreditCard />,
    title: "My Tasks",
    desc: "To-do and Daily Tasks",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
  },
];

export const employeesData = [
  {
    EmployeeID: 1,
    Name: "Nancy Davolio",
    Title: "Sales Representative",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    EmployeeID: 2,
    Name: "Nasimiyu Danai",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    EmployeeID: 3,
    Name: "Iulia Albu",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar4,
  },
  {
    EmployeeID: 4,
    Name: "Siegbert Gottfried",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 5,
    Name: "Omar Darobe",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 4,
    Name: "Penjani Inyene",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 5,
    Name: "Miron Vitold",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 1,
    Name: "Nancy Davolio",
    Title: "Sales Representative",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 2,
    Name: "Nasimiyu Danai",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    EmployeeID: 3,
    Name: "Iulia Albu",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar4,
  },
  {
    EmployeeID: 4,
    Name: "Siegbert Gottfried",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 5,
    Name: "Omar Darobe",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 4,
    Name: "Penjani Inyene",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 5,
    Name: "Miron Vitold",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 1,
    Name: "Nancy Davolio",
    Title: "Sales Representative",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 2,
    Name: "Nasimiyu Danai",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    EmployeeID: 3,
    Name: "Iulia Albu",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar4,
  },
  {
    EmployeeID: 4,
    Name: "Siegbert Gottfried",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 5,
    Name: "Omar Darobe",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 4,
    Name: "Penjani Inyene",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 5,
    Name: "Miron Vitold",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 1,
    Name: "Nancy Davolio",
    Title: "Sales Representative",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 2,
    Name: "Nasimiyu Danai",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    EmployeeID: 3,
    Name: "Iulia Albu",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar4,
  },
  {
    EmployeeID: 4,
    Name: "Siegbert Gottfried",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 5,
    Name: "Omar Darobe",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 4,
    Name: "Penjani Inyene",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 5,
    Name: "Miron Vitold",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 1,
    Name: "Nancy Davolio",
    Title: "Sales Representative",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 2,
    Name: "Nasimiyu Danai",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    EmployeeID: 3,
    Name: "Iulia Albu",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar4,
  },
  {
    EmployeeID: 4,
    Name: "Siegbert Gottfried",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 5,
    Name: "Omar Darobe",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 4,
    Name: "Penjani Inyene",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 5,
    Name: "Miron Vitold",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 1,
    Name: "Nancy Davolio",
    Title: "Sales Representative",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 2,
    Name: "Nasimiyu Danai",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    EmployeeID: 3,
    Name: "Iulia Albu",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar4,
  },
  {
    EmployeeID: 4,
    Name: "Siegbert Gottfried",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 5,
    Name: "Omar Darobe",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 4,
    Name: "Penjani Inyene",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 5,
    Name: "Miron Vitold",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 1,
    Name: "Nancy Davolio",
    Title: "Sales Representative",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 2,
    Name: "Nasimiyu Danai",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    EmployeeID: 3,
    Name: "Iulia Albu",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar4,
  },
  {
    EmployeeID: 4,
    Name: "Siegbert Gottfried",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 5,
    Name: "Omar Darobe",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 4,
    Name: "Penjani Inyene",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 5,
    Name: "Miron Vitold",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 1,
    Name: "Nancy Davolio",
    Title: "Sales Representative",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 2,
    Name: "Nasimiyu Danai",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    EmployeeID: 3,
    Name: "Iulia Albu",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar4,
  },
  {
    EmployeeID: 4,
    Name: "Siegbert Gottfried",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 5,
    Name: "Omar Darobe",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 4,
    Name: "Penjani Inyene",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 5,
    Name: "Miron Vitold",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 1,
    Name: "Nancy Davolio",
    Title: "Sales Representative",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 2,
    Name: "Nasimiyu Danai",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    EmployeeID: 3,
    Name: "Iulia Albu",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar4,
  },
  {
    EmployeeID: 4,
    Name: "Siegbert Gottfried",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    EmployeeID: 5,
    Name: "Omar Darobe",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 4,
    Name: "Penjani Inyene",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar,
  },
  {
    EmployeeID: 5,
    Name: "Miron Vitold",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar2,
  },
];

export const ordersData = [
  {
    OrderID: 10248,
    CustomerName: "Vinet",

    TotalAmount: 32.38,
    OrderItems: "Fresh Tomato",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage: product6,
  },
  {
    OrderID: 345653,
    CustomerName: "Carson Darrin",
    TotalAmount: 56.34,
    OrderItems: "Butter Scotch",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product5,
  },
  {
    OrderID: 390457,
    CustomerName: "Fran Perez",
    TotalAmount: 93.31,
    OrderItems: "Candy Gucci",
    Location: "New York",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product7,
  },
  {
    OrderID: 893486,
    CustomerName: "Anika Viseer",
    TotalAmount: 93.31,
    OrderItems: "Night Lamp",
    Location: "Germany",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage: product4,
  },
  {
    OrderID: 748975,
    CustomerName: "Miron Vitold",
    TotalAmount: 23.99,
    OrderItems: "Healthcare Erbology",
    Location: "Spain",
    Status: "rejected",
    StatusBg: "red",
    ProductImage: product1,
  },
  {
    OrderID: 94757,
    CustomerName: "Omar Darobe",
    TotalAmount: 95.99,
    OrderItems: "Makeup Lancome Rouge",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage: product2,
  },
  {
    OrderID: 944895,
    CustomerName: "Lulia albu",
    TotalAmount: 17.99,
    OrderItems: "Skincare",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product3,
  },
  {
    OrderID: 845954,
    CustomerName: "Penjani",
    TotalAmount: 59.99,
    OrderItems: "Headphone",
    Location: "USA",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product4,
  },
  {
    OrderID: 845954,
    CustomerName: "Jie Yan",
    TotalAmount: 87.99,
    OrderItems: "Shoes",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage:
      "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
  },
  {
    OrderID: 874534,
    CustomerName: "Danai",
    TotalAmount: 122.99,
    OrderItems: "Watch",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    OrderID: 38489,
    CustomerName: "Miron",
    TotalAmount: 87.99,
    OrderItems: "Ice Cream",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg",
  },
  {
    OrderID: 24546,
    CustomerName: "Frank",
    TotalAmount: 84.99,
    OrderItems: "Pan Cake",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    OrderID: 874534,
    CustomerName: "Danai",
    TotalAmount: 122.99,
    OrderItems: "Watch",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    OrderID: 10248,
    CustomerName: "Vinet",

    TotalAmount: 32.38,
    OrderItems: "Fresh Tomato",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage: product6,
  },
  {
    OrderID: 345653,
    CustomerName: "Carson Darrin",
    TotalAmount: 56.34,
    OrderItems: "Butter Scotch",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product5,
  },
  {
    OrderID: 390457,
    CustomerName: "Fran Perez",
    TotalAmount: 93.31,
    OrderItems: "Candy Gucci",
    Location: "New York",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product7,
  },
  {
    OrderID: 893486,
    CustomerName: "Anika Viseer",
    TotalAmount: 93.31,
    OrderItems: "Night Lamp",
    Location: "Germany",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage: product4,
  },
  {
    OrderID: 748975,
    CustomerName: "Miron Vitold",
    TotalAmount: 23.99,
    OrderItems: "Healthcare Erbology",
    Location: "Spain",
    Status: "rejected",
    StatusBg: "red",
    ProductImage: product1,
  },
  {
    OrderID: 94757,
    CustomerName: "Omar Darobe",
    TotalAmount: 95.99,
    OrderItems: "Makeup Lancome Rouge",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage: product2,
  },
  {
    OrderID: 944895,
    CustomerName: "Lulia albu",
    TotalAmount: 17.99,
    OrderItems: "Skincare",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product3,
  },
  {
    OrderID: 845954,
    CustomerName: "Penjani",
    TotalAmount: 59.99,
    OrderItems: "Headphone",
    Location: "USA",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product4,
  },
  {
    OrderID: 845954,
    CustomerName: "Jie Yan",
    TotalAmount: 87.99,
    OrderItems: "Shoes",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage:
      "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
  },
  {
    OrderID: 874534,
    CustomerName: "Danai",
    TotalAmount: 122.99,
    OrderItems: "Watch",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    OrderID: 38489,
    CustomerName: "Miron",
    TotalAmount: 87.99,
    OrderItems: "Ice Cream",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg",
  },
  {
    OrderID: 24546,
    CustomerName: "Frank",
    TotalAmount: 84.99,
    OrderItems: "Pan Cake",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    OrderID: 874534,
    CustomerName: "Danai",
    TotalAmount: 122.99,
    OrderItems: "Watch",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    OrderID: 10248,
    CustomerName: "Vinet",

    TotalAmount: 32.38,
    OrderItems: "Fresh Tomato",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage: product6,
  },
  {
    OrderID: 345653,
    CustomerName: "Carson Darrin",
    TotalAmount: 56.34,
    OrderItems: "Butter Scotch",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product5,
  },
  {
    OrderID: 390457,
    CustomerName: "Fran Perez",
    TotalAmount: 93.31,
    OrderItems: "Candy Gucci",
    Location: "New York",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product7,
  },
  {
    OrderID: 893486,
    CustomerName: "Anika Viseer",
    TotalAmount: 93.31,
    OrderItems: "Night Lamp",
    Location: "Germany",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage: product4,
  },
  {
    OrderID: 748975,
    CustomerName: "Miron Vitold",
    TotalAmount: 23.99,
    OrderItems: "Healthcare Erbology",
    Location: "Spain",
    Status: "rejected",
    StatusBg: "red",
    ProductImage: product1,
  },
  {
    OrderID: 94757,
    CustomerName: "Omar Darobe",
    TotalAmount: 95.99,
    OrderItems: "Makeup Lancome Rouge",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage: product2,
  },
  {
    OrderID: 944895,
    CustomerName: "Lulia albu",
    TotalAmount: 17.99,
    OrderItems: "Skincare",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product3,
  },
  {
    OrderID: 845954,
    CustomerName: "Penjani",
    TotalAmount: 59.99,
    OrderItems: "Headphone",
    Location: "USA",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product4,
  },
  {
    OrderID: 845954,
    CustomerName: "Jie Yan",
    TotalAmount: 87.99,
    OrderItems: "Shoes",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage:
      "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
  },
  {
    OrderID: 874534,
    CustomerName: "Danai",
    TotalAmount: 122.99,
    OrderItems: "Watch",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    OrderID: 38489,
    CustomerName: "Miron",
    TotalAmount: 87.99,
    OrderItems: "Ice Cream",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg",
  },
  {
    OrderID: 24546,
    CustomerName: "Frank",
    TotalAmount: 84.99,
    OrderItems: "Pan Cake",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    OrderID: 874534,
    CustomerName: "Danai",
    TotalAmount: 122.99,
    OrderItems: "Watch",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    OrderID: 10248,
    CustomerName: "Vinet",

    TotalAmount: 32.38,
    OrderItems: "Fresh Tomato",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage: product6,
  },
  {
    OrderID: 345653,
    CustomerName: "Carson Darrin",
    TotalAmount: 56.34,
    OrderItems: "Butter Scotch",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product5,
  },
  {
    OrderID: 390457,
    CustomerName: "Fran Perez",
    TotalAmount: 93.31,
    OrderItems: "Candy Gucci",
    Location: "New York",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product7,
  },
  {
    OrderID: 893486,
    CustomerName: "Anika Viseer",
    TotalAmount: 93.31,
    OrderItems: "Night Lamp",
    Location: "Germany",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage: product4,
  },
  {
    OrderID: 748975,
    CustomerName: "Miron Vitold",
    TotalAmount: 23.99,
    OrderItems: "Healthcare Erbology",
    Location: "Spain",
    Status: "rejected",
    StatusBg: "red",
    ProductImage: product1,
  },
  {
    OrderID: 94757,
    CustomerName: "Omar Darobe",
    TotalAmount: 95.99,
    OrderItems: "Makeup Lancome Rouge",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage: product2,
  },
  {
    OrderID: 944895,
    CustomerName: "Lulia albu",
    TotalAmount: 17.99,
    OrderItems: "Skincare",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product3,
  },
  {
    OrderID: 845954,
    CustomerName: "Penjani",
    TotalAmount: 59.99,
    OrderItems: "Headphone",
    Location: "USA",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product4,
  },
  {
    OrderID: 845954,
    CustomerName: "Jie Yan",
    TotalAmount: 87.99,
    OrderItems: "Shoes",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage:
      "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
  },
  {
    OrderID: 874534,
    CustomerName: "Danai",
    TotalAmount: 122.99,
    OrderItems: "Watch",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    OrderID: 38489,
    CustomerName: "Miron",
    TotalAmount: 87.99,
    OrderItems: "Ice Cream",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg",
  },
  {
    OrderID: 24546,
    CustomerName: "Frank",
    TotalAmount: 84.99,
    OrderItems: "Pan Cake",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    OrderID: 874534,
    CustomerName: "Danai",
    TotalAmount: 122.99,
    OrderItems: "Watch",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    OrderID: 10248,
    CustomerName: "Vinet",

    TotalAmount: 32.38,
    OrderItems: "Fresh Tomato",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage: product6,
  },
  {
    OrderID: 345653,
    CustomerName: "Carson Darrin",
    TotalAmount: 56.34,
    OrderItems: "Butter Scotch",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product5,
  },
  {
    OrderID: 390457,
    CustomerName: "Fran Perez",
    TotalAmount: 93.31,
    OrderItems: "Candy Gucci",
    Location: "New York",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product7,
  },
  {
    OrderID: 893486,
    CustomerName: "Anika Viseer",
    TotalAmount: 93.31,
    OrderItems: "Night Lamp",
    Location: "Germany",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage: product4,
  },
  {
    OrderID: 748975,
    CustomerName: "Miron Vitold",
    TotalAmount: 23.99,
    OrderItems: "Healthcare Erbology",
    Location: "Spain",
    Status: "rejected",
    StatusBg: "red",
    ProductImage: product1,
  },
  {
    OrderID: 94757,
    CustomerName: "Omar Darobe",
    TotalAmount: 95.99,
    OrderItems: "Makeup Lancome Rouge",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage: product2,
  },
  {
    OrderID: 944895,
    CustomerName: "Lulia albu",
    TotalAmount: 17.99,
    OrderItems: "Skincare",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product3,
  },
  {
    OrderID: 845954,
    CustomerName: "Penjani",
    TotalAmount: 59.99,
    OrderItems: "Headphone",
    Location: "USA",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product4,
  },
  {
    OrderID: 845954,
    CustomerName: "Jie Yan",
    TotalAmount: 87.99,
    OrderItems: "Shoes",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage:
      "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
  },
  {
    OrderID: 874534,
    CustomerName: "Danai",
    TotalAmount: 122.99,
    OrderItems: "Watch",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    OrderID: 38489,
    CustomerName: "Miron",
    TotalAmount: 87.99,
    OrderItems: "Ice Cream",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg",
  },
  {
    OrderID: 24546,
    CustomerName: "Frank",
    TotalAmount: 84.99,
    OrderItems: "Pan Cake",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    OrderID: 874534,
    CustomerName: "Danai",
    TotalAmount: 122.99,
    OrderItems: "Watch",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
];

export const scheduleData = [
  {
    Id: 1,
    Subject: "Explosion of Betelgeuse Star",
    Location: "Space Center USA",
    StartTime: "2021-01-10T04:00:00.000Z",
    EndTime: "2021-01-10T05:30:00.000Z",
    CategoryColor: "#1aaa55",
  },
  {
    Id: 2,
    Subject: "Thule Air Crash Report",
    Location: "Newyork City",
    StartTime: "2021-01-11T06:30:00.000Z",
    EndTime: "2021-01-11T08:30:00.000Z",
    CategoryColor: "#357cd2",
  },
  {
    Id: 3,
    Subject: "Blue Moon Eclipse",
    Location: "Space Center USA",
    StartTime: "2021-01-12T04:00:00.000Z",
    EndTime: "2021-01-12T05:30:00.000Z",
    CategoryColor: "#7fa900",
  },
  {
    Id: 4,
    Subject: "Meteor Showers in 2021",
    Location: "Space Center USA",
    StartTime: "2021-01-13T07:30:00.000Z",
    EndTime: "2021-01-13T09:00:00.000Z",
    CategoryColor: "#ea7a57",
  },
  {
    Id: 5,
    Subject: "Milky Way as Melting pot",
    Location: "Space Center USA",
    StartTime: "2021-01-14T06:30:00.000Z",
    EndTime: "2021-01-14T08:30:00.000Z",
    CategoryColor: "#00bdae",
  },
  {
    Id: 6,
    Subject: "Mysteries of Bermuda Triangle",
    Location: "Bermuda",
    StartTime: "2021-01-14T04:00:00.000Z",
    EndTime: "2021-01-14T05:30:00.000Z",
    CategoryColor: "#f57f17",
  },
  {
    Id: 7,
    Subject: "Glaciers and Snowflakes",
    Location: "Himalayas",
    StartTime: "2021-01-15T05:30:00.000Z",
    EndTime: "2021-01-15T07:00:00.000Z",
    CategoryColor: "#1aaa55",
  },
  {
    Id: 8,
    Subject: "Life on Mars",
    Location: "Space Center USA",
    StartTime: "2021-01-16T03:30:00.000Z",
    EndTime: "2021-01-16T04:30:00.000Z",
    CategoryColor: "#357cd2",
  },
  {
    Id: 9,
    Subject: "Alien Civilization",
    Location: "Space Center USA",
    StartTime: "2021-01-18T05:30:00.000Z",
    EndTime: "2021-01-18T07:30:00.000Z",
    CategoryColor: "#7fa900",
  },
  {
    Id: 10,
    Subject: "Wildlife Galleries",
    Location: "Africa",
    StartTime: "2021-01-20T05:30:00.000Z",
    EndTime: "2021-01-20T07:30:00.000Z",
    CategoryColor: "#ea7a57",
  },
  {
    Id: 11,
    Subject: "Best Photography 2021",
    Location: "London",
    StartTime: "2021-01-21T04:00:00.000Z",
    EndTime: "2021-01-21T05:30:00.000Z",
    CategoryColor: "#00bdae",
  },
  {
    Id: 12,
    Subject: "Smarter Puppies",
    Location: "Sweden",
    StartTime: "2021-01-08T04:30:00.000Z",
    EndTime: "2021-01-08T06:00:00.000Z",
    CategoryColor: "#f57f17",
  },
  {
    Id: 13,
    Subject: "Myths of Andromeda Galaxy",
    Location: "Space Center USA",
    StartTime: "2021-01-06T05:00:00.000Z",
    EndTime: "2021-01-06T07:00:00.000Z",
    CategoryColor: "#1aaa55",
  },
  {
    Id: 14,
    Subject: "Aliens vs Humans",
    Location: "Research Center of USA",
    StartTime: "2021-01-05T04:30:00.000Z",
    EndTime: "2021-01-05T06:00:00.000Z",
    CategoryColor: "#357cd2",
  },
  {
    Id: 15,
    Subject: "Facts of Humming Birds",
    Location: "California",
    StartTime: "2021-01-19T04:00:00.000Z",
    EndTime: "2021-01-19T05:30:00.000Z",
    CategoryColor: "#7fa900",
  },
  {
    Id: 16,
    Subject: "Sky Gazers",
    Location: "Alaska",
    StartTime: "2021-01-22T05:30:00.000Z",
    EndTime: "2021-01-22T07:30:00.000Z",
    CategoryColor: "#ea7a57",
  },
  {
    Id: 17,
    Subject: "The Cycle of Seasons",
    Location: "Research Center of USA",
    StartTime: "2021-01-11T00:00:00.000Z",
    EndTime: "2021-01-11T02:00:00.000Z",
    CategoryColor: "#00bdae",
  },
  {
    Id: 18,
    Subject: "Space Galaxies and Planets",
    Location: "Space Center USA",
    StartTime: "2021-01-11T11:30:00.000Z",
    EndTime: "2021-01-11T13:00:00.000Z",
    CategoryColor: "#f57f17",
  },
  {
    Id: 19,
    Subject: "Lifecycle of Bumblebee",
    Location: "San Fransisco",
    StartTime: "2021-01-14T00:30:00.000Z",
    EndTime: "2021-01-14T02:00:00.000Z",
    CategoryColor: "#7fa900",
  },
  {
    Id: 20,
    Subject: "Alien Civilization",
    Location: "Space Center USA",
    StartTime: "2021-01-14T10:30:00.000Z",
    EndTime: "2021-01-14T12:30:00.000Z",
    CategoryColor: "#ea7a57",
  },
  {
    Id: 21,
    Subject: "Alien Civilization",
    Location: "Space Center USA",
    StartTime: "2021-01-10T08:30:00.000Z",
    EndTime: "2021-01-10T10:30:00.000Z",
    CategoryColor: "#ea7a57",
  },
  {
    Id: 22,
    Subject: "The Cycle of Seasons",
    Location: "Research Center of USA",
    StartTime: "2021-01-12T09:00:00.000Z",
    EndTime: "2021-01-12T10:30:00.000Z",
    CategoryColor: "#00bdae",
  },
  {
    Id: 23,
    Subject: "Sky Gazers",
    Location: "Greenland",
    StartTime: "2021-01-15T09:00:00.000Z",
    EndTime: "2021-01-15T10:30:00.000Z",
    CategoryColor: "#ea7a57",
  },
  {
    Id: 24,
    Subject: "Facts of Humming Birds",
    Location: "California",
    StartTime: "2021-01-16T07:00:00.000Z",
    EndTime: "2021-01-16T09:00:00.000Z",
    CategoryColor: "#7fa900",
  },
];

export const lineChartData = [
  [
    { x: new Date(2005, 0, 1), y: 21 },
    { x: new Date(2006, 0, 1), y: 24 },
    { x: new Date(2007, 0, 1), y: 36 },
    { x: new Date(2008, 0, 1), y: 38 },
    { x: new Date(2009, 0, 1), y: 54 },
    { x: new Date(2010, 0, 1), y: 57 },
    { x: new Date(2011, 0, 1), y: 70 },
  ],
  [
    { x: new Date(2005, 0, 1), y: 28 },
    { x: new Date(2006, 0, 1), y: 44 },
    { x: new Date(2007, 0, 1), y: 48 },
    { x: new Date(2008, 0, 1), y: 50 },
    { x: new Date(2009, 0, 1), y: 66 },
    { x: new Date(2010, 0, 1), y: 78 },
    { x: new Date(2011, 0, 1), y: 84 },
  ],

  [
    { x: new Date(2005, 0, 1), y: 10 },
    { x: new Date(2006, 0, 1), y: 20 },
    { x: new Date(2007, 0, 1), y: 30 },
    { x: new Date(2008, 0, 1), y: 39 },
    { x: new Date(2009, 0, 1), y: 50 },
    { x: new Date(2010, 0, 1), y: 70 },
    { x: new Date(2011, 0, 1), y: 100 },
  ],
];
export const dropdownData = [
  {
    Id: "1",
    Time: "March 2021",
  },
  {
    Id: "2",
    Time: "April 2021",
  },
  {
    Id: "3",
    Time: "May 2021",
  },
];
export const SparklineAreaData = [
  { x: 1, yval: 2 },
  { x: 2, yval: 6 },
  { x: 3, yval: 8 },
  { x: 4, yval: 5 },
  { x: 5, yval: 10 },
];

export const lineCustomSeries = [
  {
    dataSource: lineChartData[0],
    xName: "x",
    yName: "y",
    name: "Germany",
    width: "2",
    marker: { visible: true, width: 10, height: 10 },
    type: "Line",
  },

  {
    dataSource: lineChartData[1],
    xName: "x",
    yName: "y",
    name: "England",
    width: "2",
    marker: { visible: true, width: 10, height: 10 },
    type: "Line",
  },

  {
    dataSource: lineChartData[2],
    xName: "x",
    yName: "y",
    name: "India",
    width: "2",
    marker: { visible: true, width: 10, height: 10 },
    type: "Line",
  },
];

export const pieChartData = [
  { x: "Male", y: 18, text: "18%" },
  { x: "Female", y: 8, text: "8%" },
  // { x: "Production", y: 15, text: "15%" },
  // { x: "License", y: 11, text: "11%" },
  // { x: "Facilities", y: 18, text: "18%" },
  // { x: "Taxes", y: 14, text: "14%" },
  // { x: "Insurance", y: 16, text: "16%" },
];
export const employeeStuctureData = [
  { x: "Developer", y: 18, text: "18%" },
  { x: "Designer", y: 8, text: "8%" },
  { x: "Marketing", y: 10, text: "10%" },
  { x: "Sells", y: 9, text: "9%" },
  // { x: "Production", y: 15, text: "15%" },
  // { x: "License", y: 11, text: "11%" },
  // { x: "Facilities", y: 18, text: "18%" },
  // { x: "Taxes", y: 14, text: "14%" },
  // { x: "Insurance", y: 16, text: "16%" },
];

export const contextMenuItems = [
  "AutoFit",
  "AutoFitAll",
  "SortAscending",
  "SortDescending",
  "Copy",
  "Edit",
  "Delete",
  "Save",
  "Cancel",
  "PdfExport",
  "ExcelExport",
  "CsvExport",
  "FirstPage",
  "PrevPage",
  "LastPage",
  "NextPage",
];

export const ecomPieChartData = [
  { x: "2018", y: 18, text: "35%" },
  { x: "2019", y: 18, text: "15%" },
  { x: "2020", y: 18, text: "25%" },
  { x: "2021", y: 18, text: "25%" },
];
