import { CiViewList, CiGrid41 } from "react-icons/ci"
import { GiPayMoney } from "react-icons/gi"
import { TbReport } from "react-icons/tb"
import { MdPeopleOutline, MdOutlinePeople } from "react-icons/md"
import { CgWebsite } from "react-icons/cg"
import { FaPeopleCarry } from "react-icons/fa"

export const NavItems = [
    { title: "Dashboard", icon: <CiViewList size={30} /> },
    { title: "Expenses", icon: <GiPayMoney size={30} /> },
    { title: "Attendance", icon: <TbReport size={30} /> },
    { title: "Manage HR", icon: <MdPeopleOutline size={30} /> },
    { title: "Manage Master", icon: <CiGrid41 size={30} /> },
    { title: "Manage Website", icon: <CgWebsite size={30} /> },
    { title: "Customer", icon: <FaPeopleCarry size={30} /> },
    { title: "Roles & Permission", icon: <MdOutlinePeople size={30} /> },
    ,
]


export const barchartdata = [
    {
        name: 'June',
        Income: 4000,
        Expense: 2400,
        Profit: 4000 - 2400,
        amt: 2400,
    },
    {
        name: 'July',
        Income: -3000,
        Expense: 1398,
        Profit: 4000 - 2400,
        amt: 2210,
    },
    {
        name: 'Aug',
        Income: -2000,
        Expense: -9800,
        Profit: 4000 - 2400,
        amt: 2290,
    },
    {
        name: 'Sep',
        Income: 2780,
        Expense: 3908,
        Profit: 4000 - 2400,
        amt: 2000,
    },
    {
        name: 'Oct',
        Income: -1890,
        Expense: 4800,
        Profit: 4000 - 2400,
        amt: 2181,
    },
    {
        name: 'Nov',
        Income: 2390,
        Expense: -3800,
        Profit: 4000 - 2400,
        amt: 2500,
    },
    {
        name: 'Dec',
        Income: 3490,
        Expense: 4300,
        Profit: 4000 - 2400,
        amt: 2100,
    },
];
