import React, { useEffect, useState } from 'react';

const Home = () => {
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const url = `https://shrouded-spire-42050.herokuapp.com/users`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    const userOptions = new Map([
        ...users.map(user => [user.department, user.department])
    ]);

    const filteredFiles = () => {
        return users.filter(user => String(user.department) === selectedDepartment);
    };
    // filteredFiles().map(file => console.log(file.displayName))

    return (
        <div>
            <select
                onChange={({ target }) => setSelectedDepartment(target.value)}
            >
                <option value=''>--Select Department--</option>
                {[...userOptions].map(([department, displayName]) => (
                    <option
                        value={department}>
                        {displayName}
                    </option>
                ))}
            </select>

            <br />

            <select>
                <option value=''>--Select Name--</option>
                {filteredFiles().map(file => (
                    <option value={file.displayName}>
                        {file.displayName}
                    </option>
                ))}
            </select>

        </div>
    );
};

export default Home;