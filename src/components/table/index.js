import React, { useEffect, useState } from "react";
import './style.css'
import { MdDelete, MdEdit, MdSort } from "react-icons/md";

export const Table = () => {
    const [usersData, setUsersData] = useState([]);
    const [disable, setDisable] = useState(true);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [searchQuery, setSearchQuery] = useState('');


    const fetchUsers = () => {
        let endpoint = 'https://jsonplaceholder.typicode.com/users';
        let headers = {
            'Content-Type': 'application/json'
        }

        fetch(endpoint, { headers })
            .then(response => response.json())
            .then((json) => {
                setUsersData(json)
            })
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const sortTable = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }

    const sortedUsersData = [...usersData].sort((a, b) => {
        if (sortConfig.key && a[sortConfig.key] && b[sortConfig.key]) {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
        }
        return 0;
    });


    const editRow = (id) => {
        setDisable(true);
    }

    const deleteRow = (id) => {
        console.log(id, 'idddddddddddddd')
        let res = usersData.filter((user) => user.id !== id)    
        setUsersData(res)    
    }

    const handleChangeId = (e, index) => {
        setDisable(true)
        const items = [...usersData];
        items[index] = {
          ...items[index],
          id: e.target.value,
        };
        setUsersData(items);        
    }

    const handleChangeUserName = (e, index) => {
        setDisable(true)
        const items = [...usersData];
        items[index] = {
          ...items[index],
          username: e.target.value,
        };
        setUsersData(items);        
    }


    const handleChangeName = (e, index) => {
        setDisable(true)
        const items = [...usersData];
        items[index] = {
          ...items[index],
          name: e.target.value,
        };
        setUsersData(items);        
    }

    const handleChangeEmail = (e, index) => {
        setDisable(true)
        const items = [...usersData];
        items[index] = {
          ...items[index],
          email: e.target.value,
        };
        setUsersData(items);        
    }

    const handleChangePhone = (e, index) => {
        setDisable(true)
        const items = [...usersData];
        items[index] = {
          ...items[index],
          phone: e.target.value,
        };
        setUsersData(items);        

    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }



    return (
        <>
            <h3>Data Table</h3>
            <div className="wrapper">
                <div className="table_wrapper">
                    <div className="searchField" style={{ marginTop: '20px', marginLeft: '10px' }}>
                        <input type="text" placeholder="Search..." onChange={handleSearch()}/>
                        <button>Search</button>
                    </div>
                    <div className="table_body">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Id 
                                        <button onClick={() => sortTable('id')}><MdSort/></button>
                                    </th>
                                    <th>User Name
                                        <button onClick={() => sortTable('username')}><MdSort/></button>
                                    </th>
                                    <th>Name
                                        <button onClick={() => sortTable('name')}><MdSort/></button>
                                    </th>
                                    <th>Email
                                        <button onClick={() => sortTable('email')}><MdSort/></button>                                    
                                    </th>
                                    <th>Phone
                                        <button onClick={() => sortTable('phone')}><MdSort/></button>
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedUsersData.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    className="table_inputs"
                                                    type="text"
                                                    onChange={(e) => handleChangeId(e, index)}
                                                    value={user.id}
                                                    required='true'
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="table_inputs"
                                                    type="text"
                                                    onChange={(e) => handleChangeUserName(e, index)}
                                                    value={user.username}
                                                    required='true'
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="table_inputs"
                                                    type="text"
                                                    onChange={(e) => handleChangeName(e, index)}
                                                    value={user.name}
                                                    required='true'
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="table_inputs"
                                                    type="text"
                                                    onChange={(e) => handleChangeEmail(e, index)}
                                                    value={user.email}
                                                    required='true'
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="table_inputs"
                                                    type="text"
                                                    onChange={(e) => handleChangePhone(e, index)}
                                                    value={user.phone}
                                                    required='true'
                                                />
                                            </td>
                                            <td>
                                                <button onClick={() => editRow(user.id)}><MdEdit/></button>
                                                <button onClick={() => deleteRow(user.id)}><MdDelete/></button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Table;
