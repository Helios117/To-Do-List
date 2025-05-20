import React, { useState }  from 'react'

const ListCard = ({name}) => {
    const FILTER_MAP = {
        All: () => true,
        Active: task => !task.completed,
        Completed: task => task.completed
    };
    const [filter, setFilter] = useState('All')
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const [due, setDue] = useState('');

    const addTask = () => {
        if (input.trim() !== '') {
        setTasks([...tasks, { id: Date.now(), text: input, date: due, completed: false }]);
        setInput('');
        setDue('');
        }
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleComplete = (id) => {
        setTasks(
        tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        )
        );
    };

    const dateCompare = (date) => {
        if (date !== ''){
            let now = new Date();
            return date > now.toISOString();
        }
        return false
    }

    return (
        <div className="border-2 border-black rounded-md p-2 flex flex-col justify-center items-center gap-2">
            <p className='text-2xl font-semibold'>{name}</p>
            <div className='flex justify-center gap-2 border-2 border-black rounded-md p-2'>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {if(e.key === 'Enter'){addTask()}}}
                    placeholder="Add a new task"
                    className='border-r-2 border-black'
                />
                <input 
                    type='date'
                    value={due}
                    onChange={(e) => setDue(e.target.value)}
                    className='border-r-2 border-black pr-2'
                />
                <button onClick={addTask} className='hover:scale-105  active:text-gray-500 transition duration-200'>Add</button>
            </div>
            <div className='flex w-full justify-around'>
                <button onClick={() => {setFilter('All')}} className={`border-2 pl-2 pr-2 border-black rounded-md ${filter === 'All'? 'bg-gray-300' : ''}`}>All</button>
                <button onClick={() => {setFilter('Active')}} className={`border-2 pl-2 pr-2 border-black rounded-md ${filter === 'Active'? 'bg-gray-300' : ''}`}>Active</button>
                <button onClick={() => {setFilter('Completed')}} className={`border-2 pl-2 pr-2 border-black rounded-md ${filter === 'Completed'? 'bg-gray-300' : ''}`}>Completed</button>
            </div>
            <div className='flex flex-col w-full gap-2'>
                {tasks.filter(FILTER_MAP[filter]).map(task => (
                <div key={task.id} className='flex w-full justify-between items-center pl-2 pr-2'>
                    <input type='checkbox' onClick={() => toggleComplete(task.id)} checked={`${task.completed ? 'checked': ''}`}/>
                    <p className={`${task.completed ? 'text-gray-500 text-decoration-line: line-through': ''}`}>{task.text}</p>
                    <p className={`text-sm ${dateCompare(task.date) ? 'text-green-700': 'text-red-700'} ${task.completed ? 'text-decoration-line: line-through': ''}`}>{task.date}</p>
                    <button onClick={() => deleteTask(task.id)} className='bg-gray-300 ml-2 border-2 border-black pl-2 pr-2 rounded-md hover:scale-105 transition duration-200'>Delete</button>
                </div>
                ))}
            </div>
        </div>
    );
}

export default ListCard