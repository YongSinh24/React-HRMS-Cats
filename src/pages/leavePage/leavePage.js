import './leavePage.css'
import { Button, Space, DatePicker, Table, Select,Pagination, Flex } from 'antd';
import { SearchOutlined,ExportOutlined,EyeFilled,EditFilled,DeleteOutlined } from '@ant-design/icons';
import PageTitle from '../../components/Title_Page/TitlePage';
const { RangePicker } = DatePicker;


const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};


// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
const LeavePage = () => {
  
  
  const columns = [
    
    {
      title: 'Department',
      dataIndex: 'department',

      title: 'empId',
      dataIndex: 'empId',
    },

    {
      title: 'firstName',
      dataIndex: 'firstName',
    },
    {
      title: 'lastName',
      dataIndex: 'lastName',

      // sorter: {
      //   compare: (a, b) => a.chinese - b.chinese,
      //   multiple: 3,
      // },
    },

    {

      title: ' birthDate',
      dataIndex: 'birthDate',
      
    },
    {
      title: ' Action',
      dataIndex: 'action',
      render: (_, ) => (
        <Space>
          <Button icon={<EyeFilled />} />
          <Button type="primary" icon={<EditFilled />} />
          <Button type="primary" icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];
  const data = [
        {
          "empId": 1000,
          "firstName": "Steven",
          "lastName": "King",
          "email": "steven@mail.com",
          "birthDate": "1987-06-17",
          "age": 40,
          "sex": "Male",
          "height": 1.7,
          "address": "Siem Reap Cambodia",
          "empDate": "2024-06-17",
          "joinDate": "2024-06-17",
          "mangerId": 4,
          "location": "VDPP",
          "maritalStats": "N",
          "nationality": "Khmer",
          "workType": "M",
          "religion": "buddhist",
          "idCard": "10008626AB4",
          "passport": "",
          "remark": "",
          "govOfficer": "",
          "govTel": "",
          "govAddress": "",
          "govPosition": "",
          "depId": "MIS",
          "posId": "Director",
          "educationDtoReps": [],
          "jobHistoryDtoReps": [],
          "emergencyContacts": [],
          "siblingData": [],
          "weight": 70
        },
        {
          "empId": 1001,
          "firstName": "Neena",
          "lastName": "Kochhar",
          "email": "neena@mail.com",
          "birthDate": "1987-06-17",
          "age": 40,
          "sex": "Male",
          "height": 1.7,
          "address": "Siem Reap Cambodia",
          "empDate": "2024-06-17",
          "joinDate": "2024-06-17",
          "mangerId": 6,
          "location": "VDPP",
          "maritalStats": "N",
          "nationality": "Khmer",
          "workType": "M",
          "religion": "buddhist",
          "idCard": "10018626AB4",
          "passport": "",
          "remark": "",
          "govOfficer": "",
          "govTel": "",
          "govAddress": "",
          "govPosition": "",
          "depId": "MIS",
          "posId": "ATS & Application Support Manager",
          "educationDtoReps": [],
          "jobHistoryDtoReps": [],
          "emergencyContacts": [],
          "siblingData": [],
          "weight": 60
        },
        {
          "empId": 1002,
          "firstName": "Lex",
          "lastName": "De Haan",
          "email": "lex@mail.com",
          "birthDate": "1987-06-17",
          "age": 40,
          "sex": "Male",
          "height": 1.7,
          "address": "Siem Reap Cambodia",
          "empDate": "2024-06-17",
          "joinDate": "2024-06-17",
          "mangerId": 9,
          "location": "VDPP",
          "maritalStats": "N",
          "nationality": "Khmer",
          "workType": "M",
          "religion": "buddhist",
          "idCard": "10028626AB4",
          "passport": "",
          "remark": "",
          "govOfficer": "",
          "govTel": "",
          "govAddress": "",
          "govPosition": "",
          "depId": "MIS",
          "posId": "System Programming Officer",
          "educationDtoReps": [],
          "jobHistoryDtoReps": [],
          "emergencyContacts": [],
          "siblingData": [],
          "weight": 80
        },
        {
          "empId": 1003,
          "firstName": "Alexander",
          "lastName": "Hunold",
          "email": "alexander@mail.com",
          "birthDate": "1990-01-03",
          "age": 40,
          "sex": "Female",
          "height": 1.7,
          "address": "Siem Reap Cambodia",
          "empDate": "2024-06-17",
          "joinDate": "2024-06-17",
          "mangerId": 4,
          "location": "VDPP",
          "maritalStats": "N",
          "nationality": "Khmer",
          "workType": "M",
          "religion": "buddhist",
          "idCard": "10038626AB4",
          "passport": "",
          "remark": "",
          "govOfficer": "",
          "govTel": "",
          "govAddress": "",
          "govPosition": "",
          "depId": "FAD",
          "posId": "Director",
          "educationDtoReps": [],
          "jobHistoryDtoReps": [],
          "emergencyContacts": [],
          "siblingData": [],
          "weight": 70
        },
        {
          "empId": 1004,
          "firstName": "Bruce",
          "lastName": "Ernst",
          "email": "bruce@mail.com",
          "birthDate": "1991-05-21",
          "age": 40,
          "sex": "Female",
          "height": 1.7,
          "address": "Siem Reap Cambodia",
          "empDate": "2024-06-17",
          "joinDate": "2024-06-17",
          "mangerId": 6,
          "location": "VDPP",
          "maritalStats": "N",
          "nationality": "Khmer",
          "workType": "M",
          "religion": "buddhist",
          "idCard": "10048626AB4",
          "passport": "",
          "remark": "",
          "govOfficer": "",
          "govTel": "",
          "govAddress": "",
          "govPosition": "",
          "depId": "FAD",
          "posId": "Finance Manager",
          "educationDtoReps": [],
          "jobHistoryDtoReps": [],
          "emergencyContacts": [],
          "siblingData": [],
          "weight": 60
        },
        {
          "empId": 1005,
          "firstName": "David",
          "lastName": "Austin",
          "email": "david@mail.com",
          "birthDate": "1997-06-25",
          "age": 40,
          "sex": "Female",
          "height": 1.7,
          "address": "Siem Reap Cambodia",
          "empDate": "2024-06-17",
          "joinDate": "2024-06-17",
          "mangerId": 9,
          "location": "VDPP",
          "maritalStats": "N",
          "nationality": "Khmer",
          "workType": "M",
          "religion": "buddhist",
          "idCard": "10058626AB4",
          "passport": "",
          "remark": "",
          "govOfficer": "",
          "govTel": "",
          "govAddress": "",
          "govPosition": "",
          "depId": "FAD",
          "posId": "Accountant Manager",
          "educationDtoReps": [],
          "jobHistoryDtoReps": [],
          "emergencyContacts": [],
          "siblingData": [],
          "weight": 80
        },
        {
          "empId": 1006,
          "firstName": "Valli",
          "lastName": "Pataballa",
          "email": "vallir@mail.com",
          "birthDate": "1990-01-03",
          "age": 40,
          "sex": "Female",
          "height": 1.7,
          "address": "Siem Reap Cambodia",
          "empDate": "2024-06-17",
          "joinDate": "2024-06-17",
          "mangerId": 9,
          "location": "VDPP",
          "maritalStats": "N",
          "nationality": "Khmer",
          "workType": "M",
          "religion": "buddhist",
          "idCard": "10068626AB4",
          "passport": "",
          "remark": "",
          "govOfficer": "",
          "govTel": "",
          "govAddress": "",
          "govPosition": "",
          "depId": "FAD",
          "posId": "Accountant Manager",
          "educationDtoReps": [],
          "jobHistoryDtoReps": [],
          "emergencyContacts": [],
          "siblingData": [],
          "weight": 70
        },
        {
          "empId": 1007,
          "firstName": "Diana",
          "lastName": "Lorentz",
          "email": "dianar@mail.com",
          "birthDate": "1990-01-03",
          "age": 40,
          "sex": "Female",
          "height": 1.7,
          "address": "Siem Reap Cambodia",
          "empDate": "2024-06-17",
          "joinDate": "2024-06-17",
          "mangerId": 4,
          "location": "VDPP",
          "maritalStats": "N",
          "nationality": "Khmer",
          "workType": "M",
          "religion": "buddhist",
          "idCard": "10078626AB4",
          "passport": "",
          "remark": "",
          "govOfficer": "",
          "govTel": "",
          "govAddress": "",
          "govPosition": "",
          "depId": "HRD",
          "posId": "Director",
          "educationDtoReps": [],
          "jobHistoryDtoReps": [],
          "emergencyContacts": [],
          "siblingData": [],
          "weight": 70
        },
        {
          "empId": 1008,
          "firstName": "Nancy",
          "lastName": "Greenberg",
          "email": "nancy@mail.com",
          "birthDate": "1990-01-03",
          "age": 40,
          "sex": "Female",
          "height": 1.7,
          "address": "Phnom Penh Cambodia",
          "empDate": "2024-06-17",
          "joinDate": "2024-06-17",
          "mangerId": 6,
          "location": "VDPP",
          "maritalStats": "N",
          "nationality": "Khmer",
          "workType": "M",
          "religion": "buddhist",
          "idCard": "10088626AB4",
          "passport": "",
          "remark": "",
          "govOfficer": "",
          "govTel": "",
          "govAddress": "",
          "govPosition": "",
          "depId": "HRD",
          "posId": "Human Resource Manager",
          "educationDtoReps": [],
          "jobHistoryDtoReps": [],
          "emergencyContacts": [],
          "siblingData": [],
          "weight": 70
        },
        {
          "empId": 1009,
          "firstName": "Daniel",
          "lastName": "Faviet",
          "email": "daniel@mail.com",
          "birthDate": "1990-01-03",
          "age": 40,
          "sex": "Female",
          "height": 1.7,
          "address": "Phnom Penh Cambodia",
          "empDate": "2024-06-17",
          "joinDate": "2024-06-17",
          "mangerId": 9,
          "location": "VDPP",
          "maritalStats": "N",
          "nationality": "Khmer",
          "workType": "M",
          "religion": "buddhist",
          "idCard": "10098626AB4",
          "passport": "",
          "remark": "",
          "govOfficer": "",
          "govTel": "",
          "govAddress": "",
          "govPosition": "",
          "depId": "HRD",
          "posId": "Human Resource Supervisor",
          "educationDtoReps": [],
          "jobHistoryDtoReps": [],
          "emergencyContacts": [],
          "siblingData": [],
          "weight": 70
        },
        {
          "empId": 1010,
          "firstName": "John",
          "lastName": "Chen",
          "email": "john@mail.com",
          "birthDate": "1997-09-28",
          "age": 40,
          "sex": "Male",
          "height": 1.7,
          "address": "Phnom Penh Cambodia",
          "empDate": "2024-06-17",
          "joinDate": "2024-06-17",
          "mangerId": 11,
          "location": "VDPP",
          "maritalStats": "N",
          "nationality": "Khmer",
          "workType": "M",
          "religion": "buddhist",
          "idCard": "10108626AB4",
          "passport": "",
          "remark": "",
          "govOfficer": "",
          "govTel": "",
          "govAddress": "",
          "govPosition": "",
          "depId": "HRD",
          "posId": "Human Resource Officer",
          "educationDtoReps": [],
          "jobHistoryDtoReps": [],
          "emergencyContacts": [],
          "siblingData": [],
          "weight": 70
        },
        {
          "empId": 1011,
          "firstName": "Ismael",
          "lastName": "Ismael",
          "email": "ismael@mail.com",
          "birthDate": "1997-09-30",
          "age": 40,
          "sex": "Female",
          "height": 1.7,
          "address": "Phnom Penh Cambodia",
          "empDate": "2024-06-17",
          "joinDate": "2024-06-17",
          "mangerId": 11,
          "location": "VDPP",
          "maritalStats": "N",
          "nationality": "Khmer",
          "workType": "M",
          "religion": "buddhist",
          "idCard": "10118626AB4",
          "passport": "",
          "remark": "",
          "govOfficer": "",
          "govTel": "",
          "govAddress": "",
          "govPosition": "",
          "depId": "FAD",
          "posId": "Accountant Officer",
          "educationDtoReps": [],
          "jobHistoryDtoReps": [],
          "emergencyContacts": [],
          "siblingData": [],
          "weight": 70
        },
        {
          "empId": 1012,
          "firstName": "Jose Manuel",
          "lastName": "Urman",
          "email": "manuel@mail.com",
          "birthDate": "1997-09-30",
          "age": 40,
          "sex": "Male",
          "height": 1.7,
          "address": "Phnom Penh Cambodia",
          "empDate": "2024-06-17",
          "joinDate": "2024-06-17",
          "mangerId": 11,
          "location": "VDPP",
          "maritalStats": "N",
          "nationality": "Khmer",
          "workType": "M",
          "religion": "buddhist",
          "idCard": "10128626AB4",
          "passport": "",
          "remark": "",
          "govOfficer": "",
          "govTel": "",
          "govAddress": "",
          "govPosition": "",
          "depId": "HRD",
          "posId": "Human Resource Officer",
          "educationDtoReps": [],
          "jobHistoryDtoReps": [],
          "emergencyContacts": [],
          "siblingData": [],
          "weight": 70
        },
        {
          "empId": 1013,
          "firstName": "Luis",
          "lastName": "Urman",
          "email": "luis@mail.com",
          "birthDate": "1997-09-30",
          "age": 40,
          "sex": "Male",
          "height": 1.7,
          "address": "Phnom Penh Cambodia",
          "empDate": "2024-06-17",
          "joinDate": "2024-06-17",
          "mangerId": 9,
          "location": "VDPP",
          "maritalStats": "N",
          "nationality": "Khmer",
          "workType": "M",
          "religion": "buddhist",
          "idCard": "10138626AB4",
          "passport": "",
          "remark": "",
          "govOfficer": "",
          "govTel": "",
          "govAddress": "",
          "govPosition": "",
          "depId": "MIS",
          "posId": "System Programming Officer",
          "educationDtoReps": [],
          "jobHistoryDtoReps": [],
          "emergencyContacts": [],
          "siblingData": [],
          "weight": 70
        },
        {
          "empId": 1014,
          "firstName": "Den",
          "lastName": "Raphaely",
          "email": "den@mail.com",
          "birthDate": "1997-09-30",
          "age": 40,
          "sex": "Male",
          "height": 1.7,
          "address": "Phnom Penh Cambodia",
          "empDate": "2024-06-17",
          "joinDate": "2024-06-17",
          "mangerId": 4,
          "location": "VDPP",
          "maritalStats": "N",
          "nationality": "Khmer",
          "workType": "M",
          "religion": "buddhist",
          "idCard": "10148626AB4",
          "passport": "",
          "remark": "",
          "govOfficer": "",
          "govTel": "",
          "govAddress": "",
          "govPosition": "",
          "depId": "MIS",
          "posId": "System Programming Officer",
          "educationDtoReps": [],
          "jobHistoryDtoReps": [],
          "emergencyContacts": [],
          "siblingData": [],
          "weight": 70
        },
        {
          "empId": 1015,
          "firstName": "Alexander",
          "lastName": "Khoo",
          "email": "alexander@mail.com",
          "birthDate": "1997-09-30",
          "age": 40,
          "sex": "Male",
          "height": 1.7,
          "address": "Phnom Penh Cambodia",
          "empDate": "2024-06-17",
          "joinDate": "2024-06-17",
          "mangerId": 9,
          "location": "VDPP",
          "maritalStats": "N",
          "nationality": "Khmer",
          "workType": "M",
          "religion": "buddhist",
          "idCard": "10158626AB4",
          "passport": "",
          "remark": "",
          "govOfficer": "",
          "govTel": "",
          "govAddress": "",
          "govPosition": "",
          "depId": "MIS",
          "posId": "System Programming Officer",
          "educationDtoReps": [],
          "jobHistoryDtoReps": [],
          "emergencyContacts": [],
          "siblingData": [],
          "weight": 70
        },
        {
          "empId": 1016,
          "firstName": "Shelli",
          "lastName": "Baida",
          "email": "ahelli@mail.com",
          "birthDate": "1997-09-30",
          "age": 40,
          "sex": "Male",
          "height": 1.7,
          "address": "Phnom Penh Cambodia",
          "empDate": "2024-06-17",
          "joinDate": "2024-06-17",
          "mangerId": 4,
          "location": "VDPP",
          "maritalStats": "N",
          "nationality": "Khmer",
          "workType": "M",
          "religion": "buddhist",
          "idCard": "10168626AB4",
          "passport": "",
          "remark": "",
          "govOfficer": "",
          "govTel": "",
          "govAddress": "",
          "govPosition": "",
          "depId": "ENG",
          "posId": "Director",
          "educationDtoReps": [],
          "jobHistoryDtoReps": [],
          "emergencyContacts": [],
          "siblingData": [],
          "weight": 70
        }

  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
   

  return (
    <>
      <PageTitle
         PageTitle='Leave'
      
      />

      <Space  >
        
        <Select
        style={{
          width: 180,
          height: 30,

        }}
        Select
        showSearch
        placeholder="Leave Type"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'tom',
            label: 'Tom',
          },
        ]}
      />
      <Select
        style={{
          width: 180,
          height: 30,

        }}
        Select
        showSearch
        placeholder="Status"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'tom',
            label: 'Tom',
          },
        ]}
      />
        
        <RangePicker />
        <Select
        style={{
          width: 180,
          height: 30,

        }}
        Select
        showSearch
        placeholder="Department"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'tom',
            label: 'Tom',
          },
        ]}
      />
        <Button icon={<SearchOutlined />} type='primary' >Search</Button>

        <div>
          
          <Button icon={<ExportOutlined />} type='primary' >Export xlsx</Button>
        </div>
      </Space>

      <Table style={{marginTop:10}} dataSource={data} columns={columns} />;
    </>
  )

}
const App = () => <Pagination defaultCurrent={6} total={500} />;
export default LeavePage;